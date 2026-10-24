import { useState } from "react";
import { useNavigate } from "react-router";
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

// Вопросы и ответы
const faqList = [
  {
    q: "Сколько человек живёт в комнате?",
    a: "Комнаты в общежитии разные. В зависимости от типа комнаты, в ней проживают от 4 до 6 человек.",
  },
  {
    q: "Как оборудована кухонная зона?",
    a: "На этаже - общие холодильники, чайники. В комнатах техники нет.",
  },
  {
    q: "Нужно ли привозить с собой утюг, фен, постельное бельё?",
    a: "В общежитии есть всё, кроме фена. Его придётся захватить",
  },
  {
    q: "Есть ли в общежитии возможность заниматься спортом?",
    a: "Около общежития есть спортивная площадка, где можно заниматься спортом.",
  },
  {
    q: "Можно ли приготовить еду?",
    a: "Да. Можно пользоваться общими кухнями на каждом этаже. Там есть холодильник, микроволновки, чайники, плиты",
  },
  {
    q: "Есть ли в комнате душевая и туалет?",
    a: "Туалет на этаже (4-6 кабин).\nДушевая - на первом этаже\nОбщие зоны убирает уборщица, а кухни и комнаты - сами проживающие.",
  },
  {
    q: "Есть ли в общежитии режим?",
    a: "Да! Вход закрыт с 23:00 до 6:00",
  },
  {
    q: "Кто ещё живёт в общежитии?",
    a: "В общежитии живут сотрудники Очаково",
  },
  {
    q: "Надо ли платить за проживание?",
    a: "Да! Для студентов стоимость 3400 за койко-место. Для остальных - 6800",
  },
];

export const StudentPage = () => {
  const navigate = useNavigate();
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
          sx={{ mb: 5, justifyContent: "center", alignItems: "stretch" }}
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
              <Grid
                key={index}
                item
                xs={12}
                sm={6}
                size={{ xs: 12, sm: 6 }}
                sx={{ display: "flex" }}
              >
                <Card
                  elevation={0}
                  sx={{
                    width: "100%",
                    borderRadius: "16px",
                    border: "1px solid #E5E7EB",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    p: 1,
                  }}
                >
                  <CardContent
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      height: "100%",
                      p: 2,
                      "&:last-child": { pb: 2 },
                    }}
                  >
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

                    <Box sx={{ mb: 2 }}>
                      <Chip
                        label={item.salary}
                        color="success"
                        size="small"
                        sx={{ fontWeight: 800 }}
                      />
                    </Box>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ flexGrow: 1, mb: 2 }}
                    >
                      {item.details}
                    </Typography>

                    <Typography
                      variant="caption"
                      display="block"
                      color="text.primary"
                      fontWeight={700}
                      sx={{ mt: "auto", pt: 1, borderTop: "1px solid #F1F5F9" }}
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
            <Typography color="text.secondary">
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
                <Grid item xs={12} sm={6} size={{ xs: 12, sm: 6 }} key={i}>
                  <Stack
                    sx={{ alignItems: "center" }}
                    direction="row"
                    spacing={1.5}
                  >
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

        {/* ================= РАЗДЕЛ FAQ (СКРУГЛЕННЫЙ, С КРАСНЫМ ОТВЕТОМ И БЕЛЫМ ТЕКСТОМ) ================= */}
        <Box sx={{ mb: 8, maxWidth: 840, mx: "auto" }}>
          <Typography
            variant="h4"
            fontWeight={900}
            sx={{
              mb: 4,
              fontSize: { xs: "1.5rem", sm: "2.125rem" },
              textAlign: "center",
            }}
          >
            Часто задаваемые вопросы (FAQ)
          </Typography>

          <Stack spacing={2}>
            {faqList.map((faq, idx) => (
              <Accordion
                key={idx}
                elevation={0}
                disableGutters
                defaultExpanded={idx === 0}
                sx={{
                  borderRadius: "16px !important",
                  overflow: "hidden",
                  boxShadow: "0 6px 16px rgba(0,0,0,0.06)",
                  border: "none",
                  "&:before": { display: "none" },
                }}
              >
                {/* Чёрная плашка вопроса */}
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon sx={{ color: "#FFFFFF" }} />}
                  sx={{
                    backgroundColor: "#000000",
                    color: "#FFFFFF",
                    px: 3,
                    py: 1.2,
                    minHeight: "58px",
                    "& .MuiAccordionSummary-content": { my: 1 },
                  }}
                >
                  <Typography fontWeight={700} fontSize="15px">
                    {faq.q}
                  </Typography>
                </AccordionSummary>

                {/* Красная плашка ответа как в хедере с белым текстом */}
                <AccordionDetails
                  sx={{
                    backgroundColor: "#D7001E",
                    color: "#FFFFFF",
                    px: 3,
                    py: 2.4,
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 500,
                      fontSize: "14.5px",
                      lineHeight: 1.6,
                      color: "#FFFFFF",
                      whiteSpace: "pre-line",
                    }}
                  >
                    {faq.a}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Stack>
        </Box>

        {/* ================= КОНТАКТЫ И КНОПКА ПОДАЧИ ЗАЯВКИ ================= */}
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, sm: 4.5 },
            borderRadius: "20px",
            backgroundColor: "#0B111E",
            color: "#FFF",
          }}
        >
          <Grid container sx={{ alignItems: "center" }} spacing={4}>
            <Grid item xs={12} md={7} size={{ xs: 12, md: 7 }}>
              <Typography variant="h5" fontWeight={800} gutterBottom>
                Остались вопросы? Свяжись с нами!
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8, mb: 3 }}>
                Учебный центр и отдел подбора «Очаково» помогут с оформлением
                документов и заселением.
              </Typography>
              <Stack spacing={1.5}>
                <Stack
                  direction="row"
                  sx={{ alignItems: "center" }}
                  spacing={1.5}
                >
                  <PhoneIcon sx={{ color: "#E30613" }} />
                  <Typography variant="body2">
                    Отдел подбора: 8 (800) 100-77-77 (доб. 1155) / +7 (903)
                    591-00-13
                  </Typography>
                </Stack>
                <Stack
                  sx={{ alignItems: "center" }}
                  direction="row"
                  spacing={1.5}
                >
                  <HomeIcon sx={{ color: "#E30613" }} />
                  <Typography variant="body2">
                    Комендант общежития: 8 (495) 446-42-55
                  </Typography>
                </Stack>
              </Stack>
            </Grid>

            <Grid item xs={12} md={5} size={{ xs: 12, md: 5 }} sx={{ textAlign: { md: "right" } }}>
              <Button
                variant="contained"
                size="large"
                fullWidth
                onClick={() => navigate("/testques")}
                sx={{
                  backgroundColor: "#E30613",
                  color: "#FFF",
                  fontWeight: 900,
                  fontSize: "15px",
                  px: 4,
                  py: 1.8,
                  borderRadius: "10px",
                  maxWidth: { md: "fit-content" },
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  "&:hover": { backgroundColor: "#B00018" },
                }}
              >
                ПОДАТЬ ЗАЯВКУ НА ПРАКТИКУ
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
};

