import React, { useState, useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Select,
  MenuItem,
  InputLabel,
  Button,
  Paper,
  Stack,
  IconButton,
  Tooltip,
  Snackbar,
  Alert,
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

export function TestQues() {
  const [formData, setFormData] = useState({
    fullName: '',
    gender: 'male',
    birthDate: '',
    phone: '',
    email: '',
    educationType: '',
    institutionName: '',
    readinessStatus: ''
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const qrRef = useRef(null);

  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://ochakovo.ru';

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setSnackbarOpen(true);
    } catch (err) {
      console.error('Не удалось скопировать ссылку', err);
    }
  };

  const handleDownloadQR = () => {
    const svgElement = qrRef.current?.querySelector('svg');
    if (!svgElement) return;

    const svgData = new XMLSerializer().serializeToString(svgElement);
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const svgUrl = URL.createObjectURL(svgBlob);
    
    const downloadLink = document.createElement('a');
    downloadLink.href = svgUrl;
    downloadLink.download = `ochakovo-anketa-qr.svg`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    URL.revokeObjectURL(svgUrl);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      candidateId: 0, 
      fullName: formData.fullName,
      gender: formData.gender === 'male' ? 'м' : 'ж',
      birthDate: formData.birthDate, 
      phone: formData.phone,
      email: formData.email,
      educationType: formData.educationType,
      institutionName: formData.institutionName,
      workReadiness: formData.readinessStatus, 
      status: "Новый", 
      candidatevacancies: [] 
    };

    try {
      const response = await fetch('https://localhost:7076/api/Candidate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Успешно сохранено:', result);
        alert('Анкета успешно отправлена!');
        
        setFormData({
          fullName: '',
          gender: 'male',
          birthDate: '',
          phone: '',
          email: '',
          educationType: '',
          institutionName: '',
          readinessStatus: ''
        });
      } else {
        const errorData = await response.text();
        console.error('Ошибка сервера:', errorData);
        alert(`Ошибка сервера: ${response.status}`);
      }
    } catch (error) {
      console.error('Сетевая ошибка:', error);
      alert('Не удалось подключиться к серверу API. Проверьте настройки CORS на бэкенде.');
    }
  };

    return (
    <Box sx={{ bgcolor: '#fdfdfd', py: 6, display: 'flex', justifyContent: 'center' }}>
      {/* Исправлено: Возвращаем maxWidth="sm", чтобы контейнер жестко стоял по центру */}
      <Container maxWidth="sm">
        
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: 800, color: '#212121', textTransform: 'uppercase', mb: 1 }}>
            Заполни <span style={{ color: '#E30613' }}>анкету</span>
          </Typography>
          <Typography variant="body2" sx={{ color: '#666' }}>
            Сделай первый шаг к карьере в «Очаково». Заполни данные о себе, и мы подберем подходящее направление.
          </Typography>
        </Box>

        <Paper 
          elevation={0} 
          component="form" 
          onSubmit={handleSubmit}
          sx={{ p: 4, borderRadius: 4, bgcolor: '#f5f5f5', mb: 4 }}
        >
          <Stack spacing={3}>
            
            <TextField
              required
              fullWidth
              label="ФИО"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              sx={{ bgcolor: '#fff', borderRadius: 1 }}
            />

            <FormControl component="fieldset">
              <FormLabel sx={{ fontWeight: 600, color: '#212121', mb: 0.5 }}>Пол</FormLabel>
              <RadioGroup row name="gender" value={formData.gender} onChange={handleChange}>
                <FormControlLabel 
                  value="male" 
                  control={<Radio sx={{ '&.Mui-checked': { color: '#E30613' } }} />} 
                  label="Мужской" 
                />
                <FormControlLabel 
                  value="female" 
                  control={<Radio sx={{ '&.Mui-checked': { color: '#E30613' } }} />} 
                  label="Женский" 
                />
              </RadioGroup>
            </FormControl>

            <TextField
              required
              fullWidth
              name="birthDate"
              label="Дата рождения"
              type="date"
              value={formData.birthDate}
              onChange={handleChange}
              slotProps={{ inputLabel: { shrink: true } }}
              sx={{ bgcolor: '#fff', borderRadius: 1 }}
            />

            <TextField
              required
              fullWidth
              label="Номер телефона"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              sx={{ bgcolor: '#fff', borderRadius: 1 }}
            />

            <TextField
              required
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              sx={{ bgcolor: '#fff', borderRadius: 1 }}
            />

            <FormControl fullWidth required sx={{ bgcolor: '#fff', borderRadius: 1 }}>
              <InputLabel id="edu-type-label">Тип образования</InputLabel>
              <Select
                labelId="edu-type-label"
                name="educationType"
                value={formData.educationType}
                label="Тип образования"
                onChange={handleChange}
              >
                <MenuItem value="Вуз">Вуз</MenuItem>
                <MenuItem value="Колледж">Колледж</MenuItem>
              </Select>
            </FormControl>

            <TextField
              required
              fullWidth
              label="Название учебного заведения"
              name="institutionName"
              value={formData.institutionName}
              onChange={handleChange}
              sx={{ bgcolor: '#fff', borderRadius: 1 }}
            />

            <FormControl fullWidth required sx={{ bgcolor: '#fff', borderRadius: 1 }}>
              <InputLabel id="readiness-label">Готов выйти на работу</InputLabel>
              <Select
                labelId="readiness-label"
                name="readinessStatus"
                value={formData.readinessStatus}
                label="Готов выйти на работу"
                onChange={handleChange}
              >
                <MenuItem value="Готов">Готов</MenuItem>
                <MenuItem value="Не готов">Не готов</MenuItem>
                <MenuItem value="Готов после окончания учёбы">Готов выйти после окончания учёбы</MenuItem>
                <MenuItem value="В течение месяца">В течение месяца</MenuItem>
              </Select>
            </FormControl>

            <Box sx={{ pt: 1 }}>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  bgcolor: '#E30613',
                  color: '#fff',
                  px: 4,
                  py: 1.5,
                  borderRadius: 2,
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  boxShadow: 'none',
                  '&:hover': { bgcolor: '#b8050f', boxShadow: 'none' }
                }}
              >
                Отправить анкету
              </Button>
            </Box>

          </Stack>
        </Paper>

        {/* Размещаем QR-код прямо под формой, центрируя контент */}
        <Paper
          elevation={0}
          sx={{
            p: 3,
            borderRadius: 4,
            bgcolor: '#f5f5f5',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            border: '1px dashed #ccc'
          }}
        >
          <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1, color: '#212121' }}>
            Заполняйте со смартфона
          </Typography>
          <Typography variant="body2" sx={{ color: '#666', mb: 2, px: 2 }}>
            Отсканируйте QR-код, чтобы быстро открыть эту анкету на мобильном устройстве.
          </Typography>

          <Box 
            ref={qrRef} 
            sx={{ 
              p: 2, 
              bgcolor: '#fff', 
              borderRadius: 3, 
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.05)',
              mb: 2,
              display: 'inline-flex'
            }}
          >
            <QRCodeSVG
              value={currentUrl}
              size={160}
              level="M"
              bgColor="#ffffff"
              fgColor="#212121"
            />
          </Box>

          <Stack direction="row" spacing={1} sx={{ width: '100%', maxWidth: 300, mt: 1 }}>
            <Button
              variant="outlined"
              size="small"
              startIcon={<DownloadIcon />}
              onClick={handleDownloadQR}
              sx={{ 
                flexGrow: 1, 
                borderColor: '#ccc', 
                color: '#212121',
                '&:hover': { borderColor: '#212121', bgcolor: 'rgba(0,0,0,0.04)' }
              }}
            >
              Скачать
            </Button>
            <Tooltip title="Скопировать ссылку">
              <IconButton 
                onClick={handleCopyLink}
                sx={{ 
                  border: '1px solid #ccc', 
                  borderRadius: 2,
                  color: '#212121',
                  '&:hover': { borderColor: '#212121' }
                }}
              >
                <ContentCopyIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Stack>
        </Paper>

      </Container>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2500}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" variant="filled" sx={{ width: '100%' }}>
          Ссылка на анкету скопирована!
        </Alert>
      </Snackbar>
    </Box>
  );
}
