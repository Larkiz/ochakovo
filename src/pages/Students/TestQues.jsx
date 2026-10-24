import React, { useState } from 'react';
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
  Stack // Используем Stack вместо Grid для предотвращения сжатия
} from '@mui/material';

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <Box sx={{ bgcolor: '#fdfdfd', py: 6, display: 'flex', justifyContent: 'center' }}>
      <Container maxWidth="sm">
        
        {/* Заголовок */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: 800, color: '#212121', textTransform: 'uppercase', mb: 1 }}>
            Заполни <span style={{ color: '#E30613' }}>анкету</span>
          </Typography>
          <Typography variant="body2" sx={{ color: '#666' }}>
            Сделай первый шаг к карьере в «Очаково». Заполни данные о себе, и мы подберем подходящее направление.
          </Typography>
        </Box>

        {/* Форма */}
        <Paper 
          elevation={0} 
          component="form" 
          onSubmit={handleSubmit}
          sx={{ p: 4, borderRadius: 4, bgcolor: '#f5f5f5' }}
        >
          {/* Stack гарантирует, что элементы будут идти строго сверху вниз и не сожмутся */}
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
            <TextField
              required
              fullWidth
              name="birthDate"
              type="date"
              value={formData.birthDate}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              sx={{ bgcolor: '#fff', borderRadius: 1 }}
            />

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

            {/* Кнопка отправки формы */}
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
      </Container>
    </Box>
  );
}
