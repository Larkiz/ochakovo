import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Button,
} from "@mui/material";
import { Link } from "react-router";

// SVG Иконка "Варка кваса"
const BrewKvasIcon = () => (
  <svg
    width="50"
    height="50"
    viewBox="0 0 60 60"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="18"
      y="22"
      width="24"
      height="28"
      rx="3"
      fill="#D97706"
      stroke="#1E293B"
      strokeWidth="2.5"
    />
    <rect
      x="22"
      y="14"
      width="16"
      height="8"
      rx="2"
      fill="#F59E0B"
      stroke="#1E293B"
      strokeWidth="2"
    />
    <path
      d="M22 28 C22 28, 26 26, 30 28 C34 30, 38 28, 38 28"
      stroke="#FDE68A"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    <circle cx="26" cy="36" r="2" fill="#FDE68A" />
    <circle cx="34" cy="40" r="1.5" fill="#FDE68A" />
    <path
      d="M42 30 C47 30, 47 42, 42 42"
      stroke="#1E293B"
      strokeWidth="2.5"
      fill="none"
      strokeLinecap="round"
    />
  </svg>
);

// SVG Иконка "Управление конвейером"
const ConveyorIcon = () => (
  <svg
    width="50"
    height="50"
    viewBox="0 0 60 60"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="10"
      y="36"
      width="40"
      height="10"
      rx="5"
      fill="#64748B"
      stroke="#1E293B"
      strokeWidth="2.5"
    />
    <circle cx="16" cy="41" r="2.5" fill="#1E293B" />
    <circle cx="30" cy="41" r="2.5" fill="#1E293B" />
    <circle cx="44" cy="41" r="2.5" fill="#1E293B" />
    <rect
      x="15"
      y="18"
      width="8"
      height="18"
      rx="1.5"
      fill="#10B981"
      stroke="#1E293B"
      strokeWidth="2"
    />
    <rect
      x="26"
      y="18"
      width="8"
      height="18"
      rx="1.5"
      fill="#10B981"
      stroke="#1E293B"
      strokeWidth="2"
    />
    <rect
      x="37"
      y="18"
      width="8"
      height="18"
      rx="1.5"
      fill="#10B981"
      stroke="#1E293B"
      strokeWidth="2"
    />
  </svg>
);

// SVG Иконка "Квиз Очаково"
const QuizIcon = () => (
  <svg
    width="50"
    height="50"
    viewBox="0 0 60 60"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="12"
      y="12"
      width="36"
      height="36"
      rx="6"
      fill="#EC4899"
      stroke="#1E293B"
      strokeWidth="2.5"
    />
    <path
      d="M24 22 C24 18, 36 18, 36 24 C36 29, 30 28, 30 33"
      stroke="#FFFFFF"
      strokeWidth="3.5"
      strokeLinecap="round"
      fill="none"
    />
    <circle cx="30" cy="40" r="2" fill="#FFFFFF" />
  </svg>
);

// Данные карточек второго блока
const gameCards = [
  {
    id: "brew",
    category: "Лаборатория & R&D",
    title: "Варка кваса",
    description:
      "Скомпонуй идеальные натуральные ингредиенты, выдержи температурный режим и создай рецепт кваса",
    roleOrReward: "Роль: Химик-технолог",
    buttonText: "Запустить симулятор",
    icon: BrewKvasIcon,
    path: "./Brew",
  },
  {
    id: "conveyor",
    category: "Инженерия & АСУ ТП",
    title: "Управление конвейером",
    description:
      "Настрой скорость линии розлива, откалибруй датчики и устрани сбои в работе роботов-упаковщиков.",
    roleOrReward: "Роль: Инженер-наладчик",
    buttonText: "Управлять линией",
    icon: ConveyorIcon,
    path: "/conveyor",
  },
  {
    id: "quiz",
    category: "История & Бренды",
    title: "Квиз “Очаково”",
    description:
      "Ответь на 5 быстрых вопросов об истории эко-технологиях и секретах производства компании.",
    roleOrReward: "Награда: Мерч + Экскурсия",
    buttonText: "Пройти квиз (2 мин)",
    icon: QuizIcon,
    path: "/quiz",
  },
];

export const GameCenterBlock = () => {
  return (
    <Box
      sx={{
        py: { xs: 6, md: 10 },
        px: { xs: 2, sm: 4 },
        backgroundColor: "#FFFFFF",
      }}
    >
      <Container maxWidth="lg">
        {/* Шапка блока */}
        <Box sx={{ textAlign: "center", mb: { xs: 5, md: 7 } }}>
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 1,
              px: 2,
              py: 0.75,
              borderRadius: "20px",
              backgroundColor: "#F3F4F6",
              mb: 2,
            }}
          >
            <Typography
              variant="caption"
              sx={{
                fontWeight: 700,
                fontSize: "0.85rem",
                color: "#111827",
                display: "flex",
                alignItems: "center",
                gap: 0.75,
              }}
            >
              <span>🎮</span> Карьерный гейм-центр
            </Typography>
          </Box>

          <Typography
            variant="h4"
            component="h2"
            sx={{
              fontWeight: 900,
              color: "#000000",
              fontSize: { xs: "1.6rem", sm: "2.1rem", md: "2.5rem" },
              letterSpacing: "-0.01em",
              mb: 2,
              textTransform: "uppercase",
            }}
          >
            ПОПРОБУЙ СЕБЯ В ДЕЛЕ ДО ПОДАЧИ ЗАЯВКИ
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: "#4B5563",
              maxWidth: 720,
              mx: "auto",
              fontSize: { xs: "0.95rem", md: "1.05rem" },
              lineHeight: 1.5,
            }}
          >
            Пройди симуляторы реальных задач «Очаково», набери баллы за точность
            и скорость, и получи прямой оффер на стажировку или фирменный мерч!
          </Typography>
        </Box>

        {/* Расположение карточек strictly в строку (row) */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" }, // В строку со спец. отступом
            gap: 3,
            alignItems: "stretch",
            justifyContent: "center",
            width: "100%",
          }}
        >
          {gameCards.map((card) => {
            const IconComponent = card.icon;
            return (
              <Card
                key={card.id}
                elevation={0}
                sx={{
                  flex: 1, // Каждая карточка занимает одинаковую ширину в 1/3
                  minWidth: 0,
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: "24px",
                  border: "1.5px solid #E5E7EB",
                  p: 1.5,
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  "&:hover": {
                    borderColor: "#D1D5DB",
                    boxShadow: "0 20px 30px -10px rgba(0,0,0,0.07)",
                    transform: "translateY(-4px)",
                  },
                }}
              >
                <CardContent
                  sx={{
                    p: 2.5,
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                  }}
                >
                  {/* Плейсхолдер под иконку */}
                  <Box
                    sx={{
                      width: 72,
                      height: 72,
                      borderRadius: "12px",
                      backgroundColor: "#D1D5DB",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mb: 3,
                    }}
                  >
                    <IconComponent />
                  </Box>

                  {/* Категория */}
                  <Typography
                    variant="caption"
                    sx={{
                      fontWeight: 700,
                      color: "#6B7280",
                      fontSize: "0.85rem",
                      mb: 0.5,
                    }}
                  >
                    {card.category}
                  </Typography>

                  {/* Название игры */}
                  <Typography
                    variant="h6"
                    component="h3"
                    sx={{
                      fontWeight: 800,
                      color: "#111827",
                      fontSize: "1.35rem",
                      mb: 1.5,
                      lineHeight: 1.2,
                    }}
                  >
                    {card.title}
                  </Typography>

                  {/* Описание */}
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#6B7280",
                      fontSize: "0.875rem",
                      lineHeight: 1.5,
                      mb: 3,
                    }}
                  >
                    {card.description}
                  </Typography>

                  {/* Роль или Награда */}
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 700,
                      color: "#111827",
                      fontSize: "0.875rem",
                      mt: "auto",
                      mb: 3,
                    }}
                  >
                    {card.roleOrReward}
                  </Typography>

                  {/* Кнопка действия */}
                  <Button
                    fullWidth
                    variant="contained"
                    disableElevation
                    sx={{
                      backgroundColor: "#000000",
                      color: "#FFFFFF",
                      fontWeight: 700,
                      fontSize: "0.9rem",
                      py: 1.4,
                      borderRadius: "10px",
                      textTransform: "none",
                      "&:hover": {
                        backgroundColor: "#1F2937",
                      },
                    }}
                    component={Link}
                    to={card.path}
                  >
                    {card.buttonText}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </Box>
      </Container>
    </Box>
  );
};
