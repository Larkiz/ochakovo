import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Button,
  Container,
  Stack,
  Card,
  CardContent,
  CircularProgress,
  Alert,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import RefreshIcon from "@mui/icons-material/Refresh";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";


// Базовый URL бэкенда (из .env или относительный путь)
const API_BASE_URL = import.meta.env.VITE_API_URL || "/api";


export function HRPanel() {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  // Получение кандидатов с бэкенда с фоллбэком на localStorage
  const loadCandidates = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/candidates`);
      if (!response.ok) {
        throw new Error(`Ошибка сервера: ${response.status}`);
      }
      const data = await response.json();
      setCandidates(Array.isArray(data) ? data : []);
    } catch (err) {
      console.warn("Бэкенд недоступен, загружаем локальные отклики:", err.message);
      // Если бэк еще не поднят, достаем реальные заявки из localStorage
      const localData = JSON.parse(localStorage.getItem("ochakovo_candidates") || "[]");
      setCandidates(localData);
      // Ошибку пользователю не показываем критично, если есть локальные данные
      if (localData.length === 0) {
        setError("Сервер пока не вернул данные. Подключите бэкенд к эндпоинту /api/candidates или оставьте заявку на сайте.");
      }
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    loadCandidates();
  }, []);


  // Экспорт текущей таблицы в реальный CSV-файл
  const exportCSV = () => {
    if (candidates.length === 0) {
      alert("Нет данных для экспорта.");
      return;
    }


    const headers = ["ID", "ФИО", "Контакты", "Учебное заведение", "Симулятор", "Результат", "Рекомендованная роль", "Статус", "Дата"];
    const rows = candidates.map((c) => [
      c.id || "",
      `"${c.name || ""}"`,
      `"${c.contact || ""}"`,
      `"${c.college || ""}"`,
      `"${c.game || ""}"`,
      `"${c.score || ""}"`,
      `"${c.role || ""}"`,
      `"${c.status || "Новый"}"`,
      `"${c.date || new Date().toLocaleDateString()}"`,
    ]);


    const csvContent = "\uFEFF" + [headers.join(";"), ...rows.map((e) => e.join(";"))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `ochakovo_candidates_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };


  // Расчет живых метрик
  const totalCount = candidates.length;
  const passedCount = candidates.filter((c) => c.status === "Оффер выдан" || (parseInt(c.score) >= 70)).length;
  const conversionRate = totalCount > 0 ? Math.round((passedCount / totalCount) * 100) : 0;


  return (
    <Box sx={{ minHeight: "100vh", py: 5, backgroundColor: "#F8FAFC" }}>
      <Container maxWidth="xl">
       
        {/* Заголовок + действия */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4, flexWrap: "wrap", gap: 2 }}>
          <Box>
            <Typography variant="h4" fontWeight={900} color="#18181B">
              HR-Панель «Очаково.Смена»
            </Typography>
            <Typography variant="body2" color="#64748B">
              Поток кандидатов со стендов ярмарок вакансий и симуляторов в реальном времени
            </Typography>
          </Box>
          <Stack direction="row" spacing={2}>
            <Button
              variant="outlined"
              startIcon={<RefreshIcon />}
              onClick={loadCandidates}
              sx={{
                borderColor: "#CBD5E1",
                color: "#334155",
                fontWeight: 700,
                borderRadius: "10px",
                textTransform: "none",
                "&:hover": { borderColor: "#94A3B8", backgroundColor: "#F1F5F9" },
              }}
            >
              Обновить
            </Button>
            <Button
              variant="contained"
              startIcon={<DownloadIcon />}
              onClick={exportCSV}
              sx={{
                background: "#D7001E",
                color: "#FFF",
                fontWeight: 800,
                borderRadius: "10px",
                textTransform: "none",
                "&:hover": { background: "#B00018" },
              }}
            >
              Экспорт в Excel / 1C
            </Button>
          </Stack>
        </Box>


        {/* Метрики (считаются динамически) */}
        <Stack direction={{ xs: "column", md: "row" }} spacing={3} sx={{ mb: 4 }}>
          <Card sx={{ flex: 1, borderRadius: "16px", border: "1px solid #E2E8F0", boxShadow: "none" }}>
            <CardContent>
              <Typography color="#64748B" fontSize="13px" fontWeight={700}>
                Всего соискателей в базе
              </Typography>
              <Typography fontSize="32px" fontWeight={900} color="#18181B" sx={{ my: 0.5 }}>
                {totalCount}
              </Typography>
              <Typography fontSize="12px" color="#16A34A" fontWeight={700}>
                Прямой поток с QR-кодов стенда
              </Typography>
            </CardContent>
          </Card>


          <Card sx={{ flex: 1, borderRadius: "16px", border: "1px solid #E2E8F0", boxShadow: "none" }}>
            <CardContent>
              <Typography color="#64748B" fontSize="13px" fontWeight={700}>
                Конверсия в оффер практики
              </Typography>
              <Typography fontSize="32px" fontWeight={900} color="#18181B" sx={{ my: 0.5 }}>
                {conversionRate}%
              </Typography>
              <Typography fontSize="12px" color="#64748B">
                Успешно подтвердили квалификацию
              </Typography>
            </CardContent>
          </Card>


          <Card sx={{ flex: 1, borderRadius: "16px", border: "1px solid #E2E8F0", boxShadow: "none" }}>
            <CardContent>
              <Typography color="#64748B" fontSize="13px" fontWeight={700}>
                Статус интеграции API
              </Typography>
              <Typography fontSize="20px" fontWeight={800} color={error ? "#D97706" : "#16A34A"} sx={{ my: 1.2 }}>
                {error ? "Локальный режим (готов к бэку)" : "Подключено к бэкенду"}
              </Typography>
              <Typography fontSize="12px" color="#64748B">
                Эндпоинт: {API_BASE_URL}/candidates
              </Typography>
            </CardContent>
          </Card>
        </Stack>


        {error && (
          <Alert severity="info" sx={{ mb: 3, borderRadius: "12px" }}>
            {error}
          </Alert>
        )}


        {/* Таблица кандидатов */}
        <TableContainer component={Paper} elevation={0} sx={{ borderRadius: "18px", border: "1px solid #E2E8F0" }}>
          <Table>
            <TableHead sx={{ backgroundColor: "#F1F5F9" }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 800 }}>Кандидат</TableCell>
                <TableCell sx={{ fontWeight: 800 }}>Контакты (ТГ/Тел)</TableCell>
                <TableCell sx={{ fontWeight: 800 }}>Колледж / ВУЗ</TableCell>
                <TableCell sx={{ fontWeight: 800 }}>Пройденный симулятор</TableCell>
                <TableCell sx={{ fontWeight: 800 }}>Результат</TableCell>
                <TableCell sx={{ fontWeight: 800 }}>Рекомендованная должность</TableCell>
                <TableCell sx={{ fontWeight: 800 }}>Статус</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={7} align="center" sx={{ py: 6 }}>
                    <CircularProgress size={36} sx={{ color: "#D7001E" }} />
                    <Typography sx={{ mt: 1.5, color: "#64748B", fontSize: "14px" }}>
                      Загрузка базы соискателей...
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : candidates.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} align="center" sx={{ py: 8 }}>
                    <Typography variant="h6" fontWeight={800} color="#334155" sx={{ mb: 1 }}>
                      База кандидатов пока пуста
                    </Typography>
                    <Typography variant="body2" color="#64748B" maxWidth={500} mx="auto">
                      Отклики появятся здесь, как только студенты пройдут симуляторы или отправят форму на ярмарке вакансий.
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                candidates.map((row, idx) => (
                  <TableRow key={row.id || idx} hover>
                    <TableCell sx={{ fontWeight: 700 }}>{row.name || "Аноним"}</TableCell>
                    <TableCell>{row.contact || "—"}</TableCell>
                    <TableCell>{row.college || "Не указан"}</TableCell>
                    <TableCell>
                      <Chip
                        label={row.game || "Общая заявка"}
                        size="small"
                        sx={{ fontWeight: 700, backgroundColor: "#E0F2FE", color: "#0369A1" }}
                      />
                    </TableCell>
                    <TableCell sx={{ fontWeight: 800, color: "#16A34A" }}>
                      {row.score || "—"}
                    </TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>{row.role || "Стажёр"}</TableCell>
                    <TableCell>
                      <Chip
                        icon={row.status === "Оффер выдан" ? <CheckCircleIcon /> : <HourglassEmptyIcon />}
                        label={row.status || "В обработке"}
                        size="small"
                        color={row.status === "Оффер выдан" ? "success" : "default"}
                        sx={{ fontWeight: 700 }}
                      />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>


      </Container>
    </Box>
  );
}