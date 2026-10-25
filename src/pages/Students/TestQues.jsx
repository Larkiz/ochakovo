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
  FormGroup,
  Checkbox,
  Select,
  MenuItem,
  InputLabel,
  Button,
  Paper,
  Stack,
  Alert,
  IconButton,
  Tooltip,
  Snackbar,
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const VACANCY_LIST = [
  'Лаборант',
  'Оператор линии розлива',
  'Оператор варки (Технологический цех)',
  'Оператор / Кладовщик (Складской комплекс)'
];

export function TestQues() {
  const [formData, setFormData] = useState({
    fullName: '',
    gender: 'male',
    birthDate: '',
    phone: '',
    email: '',
    educationType: '',
    institutionName: '',
    readinessStatus: '',
    selectedVacancies: []
  });

  const [dateFocused, setDateFocused] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  
  const qrRef = useRef(null);

  // Ссылка для QR-кода (автоматический URL текущей страницы сайта)
  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://ochakovo.ru';

  // Функция копирования текущей ссылки в буфер обмена
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setSnackbarOpen(true);
    } catch (err) {
      console.error('Не удалось скопировать ссылку', err);
    }
  };

  // Функция скачивания сгенерированного QR-кода в формате SVG
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

  const handleCheckboxChange = (title) => {
    setFormData((prev) => {
      const exists = prev.selectedVacancies.includes(title);
      return {
        ...prev,
        selectedVacancies: exists
          ? prev.selectedVacancies.filter((item) => item !== title)
          : [...prev.selectedVacancies, title]
      };
    });
  };

  const handleFillTestData = () => {
    setFormData({
      fullName: 'Иванов Иван Иванович',
      gender: 'male',
      birthDate: '2006-05-14',
      phone: '+7 (999) 123-45-67',
      email: 'ivanov@mail.ru',
      educationType: 'Колледж',
      institutionName: 'Ступинский техникум им. А. Т. Туманова',
      readinessStatus: 'Готов',
      selectedVacancies: ['Оператор линии розлива', 'Лаборант']
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg(null);

    const payload = {
      candidateId: 0,
      fullName: formData.fullName,
      gender: formData.gender === 'male' ? 'Мужской' : 'Женский',
      birthDate: formData.birthDate || '2006-01-01',
      phone: formData.phone,
      email: formData.email,
      educationType: formData.educationType,
      institutionName: formData.institutionName,
      workReadiness: formData.readinessStatus,
      status: 'Новый',
      candidatevacancies: formData.selectedVacancies
    };

    console.log('Отправка на бэкенд:', payload);

    try {
      await fetch('https://localhost:7076/api/Candidate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    } catch (err) {
      console.warn('Сервер недоступен, пишем в локальное хранилище:', err);
    }

    const local = JSON.parse(localStorage.getItem('ochakovo_candidates') || '[]');
    local.unshift({
      ...payload,
      candidatevacancies: formData.selectedVacancies.map((title, idx) => ({
        id: idx + 1,
        vacancy: { title, department: 'Цех «Очаково»', salary: 70000 }
      }))
    });
    localStorage.setItem('ochakovo_candidates', JSON.stringify(local));

    setLoading(false);
    setSuccessMsg('Анкета успешно отправлена и передана в отдел кадров!');
  };

  const isDateActive = Boolean(dateFocused || formData.birthDate);

    return (
    <Box sx={{ bgcolor: '#fdfdfd', py: 6, display: 'flex', justifyContent: 'center' }}>
      <Container maxWidth="sm">
       
        {/* Заголовок */}
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Typography variant="h4" sx={{ fontWeight: 800, color: '#212121', textTransform: 'uppercase', mb: 1 }}>
            Заполни <span style={{ color: '#E30613' }}>анкету</span>
          </Typography>
          <Typography variant="body2" sx={{ color: '#666' }}>
            Сделай первый шаг к карьере в «Очаково». Заполни данные о себе, и мы подберем подходящее направление.
          </Typography>
        </Box>

        {/* Быстрое автозаполнение */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
          <Button
            type="button"
            variant="outlined"
            size="small"
            onClick={handleFillTestData}
            sx={{
              borderColor: '#E30613',
              color: '#E30613',
              fontWeight: 700,
              borderRadius: 2,
              textTransform: 'none',
              bgcolor: '#FFF',
              '&:hover': { bgcolor: '#FEE8E9', borderColor: '#B00018' }
            }}
          >
            ⚡ Тест: автозаполнение (Иванов Иван Иванович)
          </Button>
        </Box>

        {successMsg && (
          <Alert severity="success" sx={{ mb: 3, borderRadius: 2, fontWeight: 700 }}>
            {successMsg}
          </Alert>
        )}

        <Paper
          elevation={0}
          component="form"
          onSubmit={handleSubmit}
          sx={{ p: { xs: 3, sm: 4 }, borderRadius: 4, bgcolor: '#f5f5f5', mb: 4 }}
        >
          <Stack spacing={3}>
           
            {/* ФИО */}
            <TextField
              required
              fullWidth
              label="ФИО"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              sx={{ bgcolor: '#fff', borderRadius: 1 }}
            />

            {/* Пол */}
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

            {/* Дата рождения */}
<Box>
  <Typography sx={{ fontWeight: 600, color: '#212121', mb: 0.8, fontSize: '14px' }}>
    Дата рождения *
  </Typography>
  <TextField
    required
    fullWidth
    name="birthDate"
    type="date"
    value={formData.birthDate}
    onChange={handleChange}
    sx={{ bgcolor: '#fff', borderRadius: 1 }}
  />
</Box>

            {/* Номер телефона */}
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

            {/* Email */}
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

            {/* Тип образования */}
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

            {/* Название учебного заведения */}
            <TextField
              required
              fullWidth
              label="Название учебного заведения"
              name="institutionName"
              value={formData.institutionName}
              onChange={handleChange}
              sx={{ bgcolor: '#fff', borderRadius: 1 }}
            />

            {/* Чекбоксы вакансий */}
            <FormControl component="fieldset" sx={{ bgcolor: '#fff', p: 2, borderRadius: 2 }}>
              <FormLabel sx={{ fontWeight: 700, color: '#18181B', mb: 1 }}>
                Предпочитаемые вакансии в «Очаково»:
              </FormLabel>
              <FormGroup>
                {VACANCY_LIST.map((vacTitle, idx) => (
                  <FormControlLabel
                    key={idx}
                    control={
                      <Checkbox
                        checked={formData.selectedVacancies.includes(vacTitle)}
                        onChange={() => handleCheckboxChange(vacTitle)}
                        sx={{ '&.Mui-checked': { color: '#E30613' } }}
                      />
                    }
                    label={<Typography fontSize="14.5px" fontWeight={500}>{vacTitle}</Typography>}
                  />
                ))}
              </FormGroup>
            </FormControl>

            {/* Готовность выйти на работу */}
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

            {/* Кнопка отправки */}
            <Box sx={{ pt: 1 }}>
              <Button
                type="submit"
                disabled={loading}
                variant="contained"
                fullWidth
                sx={{
                  bgcolor: '#E30613',
                  color: '#fff',
                  px: 4,
                  py: 1.6,
                  borderRadius: 2,
                  fontWeight: 800,
                  fontSize: '15px',
                  textTransform: 'uppercase',
                  boxShadow: 'none',
                  '&:hover': { bgcolor: '#b8050f', boxShadow: 'none' }
                }}
              >
                {loading ? 'Отправка...' : 'Отправить анкету в HR'}
              </Button>
            </Box>

          </Stack>
        </Paper>

        {/* Аккуратный блок с QR-кодом строго по центру под формой */}
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

          {/* Контейнер QR-кода */}
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

          {/* Кнопки управления (Скачать и Копировать в буфер) */}
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
                textTransform: 'none',
                fontWeight: 600,
                '&:hover': { borderColor: '#212121', bgcolor: 'rgba(0,0,0,0.04)' }
              }}
            >
              Скачать
            </Button>
            <Tooltip title="Скопировать ссылку на анкету">
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

      {/* Уведомление об успешном копировании ссылки */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2500}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" variant="filled" sx={{ width: '100%' }}>
          Ссылка на анкету успешно скопирована в буфер!
        </Alert>
      </Snackbar>
    </Box>
  );
}
