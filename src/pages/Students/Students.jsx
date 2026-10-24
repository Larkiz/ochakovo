import { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Paper,
  Stack,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import WorkIcon from "@mui/icons-material/Work";
import SchoolIcon from "@mui/icons-material/School";
import PhoneIcon from "@mui/icons-material/Phone";
import HomeIcon from "@mui/icons-material/Home";

// Данные оплачиваемых вакансий
const paidVacancies = [
  {
    title: "Лаборатория",
    role: "Лаборант",
    salary: "от 60 000 ₽",
    schedule: "2/2 (только дневные 8:00–20:00 или с ночными сменами)",
    details:
      "Контроль качества продукции, взятие проб, физико-химические анализы.",
  },
  {
    title: "Цех розлива напитков",
    role: "Оператор линии розлива",
    salary: "от 70 000 ₽",
    schedule: "Сменный (день/ночь с 8:00 до 20:00 и с 20:00 до 8:00)",
    details:
      "Работа на оборудовании (этикетировочные, упаковочные, выдувные машины, паллетайзеры).",
  },
  {
    title: "Технологический цех",
    role: "Оператор варки",
    salary: "от 70 000 ₽",
    schedule: "2/2 (день-ночь-отсыпной-выходной)",
    details:
      "Подготовка сырья (сахар, сиропы), сопровождение процессов варки кваса и напитков.",
  },
  {
    title: "Складской комплекс",
    role: "Оператор / Кладовщик",
    salary: "от 56 000 ₽ до 60 000 ₽+",
    schedule: "2/2 (дневные или с ночными сменами)",
    details:
      "Работа с ТТН, документацией в ПО, управление комплектовщиками и сборка заказов.",
  },
];

// Частые вопросы (FAQ)
const faqList = [
  {
    q: "Где находятся офис и общежитие и как добраться?",
    a: "Офис: г. Москва, ул. Рябиновая, 44. Общежитие: ул. Рябиновая, 36, к. 2 (автобусы № 275, 610 от м. Кунцевская, № 259 от ст. Рабочий поселок, или от м. Озёрная на корпоративном автобусе).",
  },
  {
    q: "Как устроено проживание и сколько это стоит?",
    a: "Комнаты от 4 до 6 человек. Стоимость для студентов — 3 400 ₽/мес (компания компенсирует 50%). На этажах есть общие кухни (плиты, холодильники, микроволновки). Туалет на этаже, душ на 1 этаже. Режим входа: с 6:00 до 23:00.",
  },
  {
    q: "Как организовано питание?",
    a: "В столовой завода. Компанией компенсируется 50% стоимости. Наличные не нужны — расчет по электронной карте сотрудника (вычитается из зарплаты). Обед: 11:30–14:30, ужин: 20:30–22:00.",
  },
  {
    q: "Выдается ли спецодежда и как проходит медосмотр?",
    a: "Спецодежда, обувь и медосмотр предоставляются бесплатно за счет компании. Спецодежду можно стирать в беплатной прачечной завода (выдача через 1–2 дня).",
  },
  {
    q: "Какие документы нужны для практики?",
    a: "Договор между ВУЗом/СУЗом и «Очаково», приказ, дневник/отчет по практике и характеристика. Со студентом оформляется срочный трудовой договор по ТК РФ с записью в электронную трудовую книжку.",
  },
];

export const StudentPage = () => {
  const [tab, setTab] = useState("paid");

  return (
    <Box
      sx={{
        backgroundColor: "#F9FAFB",
        minHeight: "100vh",
        py: { xs: 4, sm: 6 },
      }}
    >
      <Container maxWidth="lg">
        {/* Banner / Header */}
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Chip
            label="#ОЧАКОВО_СТУДЕНТАМ"
            color="primary"
            sx={{ fontWeight: 800, mb: 2, backgroundColor: "#E30613" }}
          />
          <Typography
            variant="h3"
            component="h1"
            fontWeight={900}
            gutterBottom
            sx={{ fontSize: { xs: "1.75rem", sm: "2.5rem", md: "3rem" } }}
          >
            Твой успешный старт в «Очаково»
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{
              maxWidth: 700,
              mx: "auto",
              fontSize: { xs: "0.95rem", sm: "1.25rem" },
            }}
          >
            Официальное трудоустройство, жилье, льготное питание и реальный
            практический опыт на крупном производстве.
          </Typography>
        </Box>

        {/* Переключатель вида практики */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          justifyContent="center"
          alignItems="stretch"
          sx={{ mb: 5 }}
        >
          <Button
            variant={tab === "paid" ? "contained" : "outlined"}
            size="large"
            startIcon={<WorkIcon />}
            onClick={() => setTab("paid")}
            sx={{
              borderRadius: "12px",
              px: 3,
              backgroundColor: tab === "paid" ? "#E30613" : "transparent",
              borderColor: "#E30613",
              color: tab === "paid" ? "#FFF" : "#E30613",
              "&:hover": {
                backgroundColor: tab === "paid" ? "#C0020F" : "#FCE8E9",
              },
            }}
          >
            Оплачиваемая практика (март — август)
          </Button>
          <Button
            variant={tab === "free" ? "contained" : "outlined"}
            size="large"
            startIcon={<SchoolIcon />}
            onClick={() => setTab("free")}
            sx={{
              borderRadius: "12px",
              px: 3,
              backgroundColor: tab === "free" ? "#111827" : "transparent",
              borderColor: "#111827",
              color: tab === "free" ? "#FFF" : "#111827",
              "&:hover": {
                backgroundColor: tab === "free" ? "#0d1421" : "#F3F4F6",
              },
            }}
          >
            Учебная / Бесплатная практика
          </Button>
        </Stack>

        {/* Контент: Оплачиваемая практика */}
        {tab === "paid" && (
          <Grid container spacing={3} sx={{ mb: 8 }}>
            {paidVacancies.map((item, index) => (
              <Grid size={{ xs: 12, sm: 6 }} key={index}>
                <Card
                  elevation={0}
                  sx={{
                    borderRadius: "16px",
                    border: "1px solid #E5E7EB",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    p: 1,
                  }}
                >
                  <CardContent>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      fontWeight={700}
                    >
                      {item.title}
                    </Typography>
                    <Typography
                      variant="h5"
                      fontWeight={800}
                      sx={{ my: 1, fontSize: { xs: "1.1rem", sm: "1.5rem" } }}
                    >
                      {item.role}
                    </Typography>
                    <Chip
                      label={item.salary}
                      color="success"
                      size="small"
                      sx={{ fontWeight: 800, mb: 2 }}
                    />
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      paragraph
                    >
                      {item.details}
                    </Typography>
                    <Typography
                      variant="caption"
                      display="block"
                      color="text.primary"
                      fontWeight={700}
                    >
                      График: {item.schedule}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        {/* Контент: Бесплатная практика */}
        {tab === "free" && (
          <Paper
            elevation={0}
            sx={{
              p: { xs: 2.5, sm: 4 },
              borderRadius: "16px",
              border: "1px solid #E5E7EB",
              mb: 8,
            }}
          >
            <Typography variant="h5" fontWeight={800} gutterBottom>
              Проекты и задания для бесплатной практики
            </Typography>
            <Typography color="text.secondary" paragraph>
              Вы можете пройти практику по индивидуальной договоренности и
              получить реальные кейсы в портфолио:
            </Typography>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              {[
                "Создание маскотов и контента для страниц ВКонтакте/Telegram",
                "Разработка и проведение электронных курсов обучения",
                "Работа в IT-поддержке с инженерами технической помощи",
                "Оцифровка производственных линий и оптимизация процессов",
                "Взятие контрольных проб и качество лабораторных анализов",
                "Разработка макетов выкладки продукции в маркетинге",
              ].map((task, i) => (
                <Grid size={{ xs: 12, sm: 6 }} key={i}>
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <Box
                      component="span"
                      sx={{ color: "#E30613", fontWeight: "bold", mr: 1 }}
                    >
                      ✓
                    </Box>
                    <Typography variant="body2" fontWeight={600}>
                      {task}
                    </Typography>
                  </Stack>
                </Grid>
              ))}
            </Grid>
          </Paper>
        )}

        {/* Раздел FAQ */}
        <Box sx={{ mb: 8 }}>
          <Typography
            variant="h4"
            fontWeight={900}
            textAlign="center"
            sx={{ mb: 4, fontSize: { xs: "1.5rem", sm: "2.125rem" } }}
          >
            Часто задаваемые вопросы (FAQ)
          </Typography>
          {faqList.map((faq, idx) => (
            <Accordion
              key={idx}
              elevation={0}
              disableGutters
              sx={{
                border: "1px solid #E5E7EB",
                mb: 1.5,
                borderRadius: "12px !important",
                "&:before": { display: "none" },
                overflow: "hidden",
              }}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography fontWeight={700}>{faq.q}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2" color="text.secondary">
                  {faq.a}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>

        {/* Контакты и справочник */}
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, sm: 4 },
            borderRadius: "20px",
            backgroundColor: "#111827",
            color: "#FFF",
          }}
        >
          <Grid container spacing={4} alignItems="center">
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="h5" fontWeight={800} gutterBottom>
                Остались вопросы? Свяжись с нами!
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8, mb: 3 }}>
                Учебный центр и отдел подбора «Очаково» помогут с оформлением
                документов и заселением.
              </Typography>
              <Stack spacing={1.5}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <PhoneIcon color="error" />
                  <Typography variant="body2">
                    Отдел подбора: 8 (800) 100-77-77 (доб. 1155) / +7 (903)
                    591-00-13
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={1} alignItems="center">
                  <HomeIcon color="error" />
                  <Typography variant="body2">
                    Комендант общежития: 8 (495) 446-42-55
                  </Typography>
                </Stack>
              </Stack>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }} sx={{ textAlign: { md: "right" } }}>
              <Button
                variant="contained"
                size="large"
                fullWidth
                sx={{
                  backgroundColor: "#E30613",
                  color: "#FFF",
                  fontWeight: 800,
                  px: 4,
                  py: 1.5,
                  borderRadius: "10px",
                  maxWidth: { md: "fit-content" },
                  "&:hover": { backgroundColor: "#C0020F" },
                }}
              >
                Подать заявку на практику
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
};
