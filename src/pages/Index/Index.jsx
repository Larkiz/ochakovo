import { useState } from "react";
import { useNavigate } from "react-router";
import {
  Box,
  Typography,
  Button,
  Card,
  Chip,
  Zoom,
  Tooltip,
} from "@mui/material";
import { BottlingShopIcon } from "@/pages/Index/ui/BottlingShopIcon";
import { TechWorkshopIcon } from "@/pages/Index/ui/TechWorkshopIcon";
import { LaboratoryIcon } from "@/pages/Index/ui/LaboratoryIcon";
import { Link } from "react-router";
import { colors } from "@/shared/colors";
const departments = [
  {
    id: "lab",
    title: "Лаборатория",
    icon: LaboratoryIcon,
    description:
      "Контроль качества сырья, разработка рецептур кваса и напитков на современном оборудовании.",
    path: "/Lab",
    gridArea: { xs: "1 / 1", md: "1 / 2" },
    offsetX: 0,
    offsetY: 0,
  },
  {
    id: "tech",
    title: "Технологический цех",
    icon: TechWorkshopIcon,
    description:
      "Сердце комбината «Очаково»: непрерывный процесс естественно брожения кваса и варки сусла.",
    path: "/brew",
    gridArea: { xs: "2 / 1", md: "2 / 1" },
    offsetX: -20,
    offsetY: 10,
  },
  {
    id: "bottling",
    title: "Цех розлива",
    icon: BottlingShopIcon,
    description:
      "Высокоскоростные автоматизированные линии фасовки готовой продукции в бутылки и банки.",
    path: "/conveyor",
    gridArea: { xs: "3 / 1", md: "3 / 2" },
    offsetX: 0,
    offsetY: 20,
  },
];
const scrollTo = (id) => {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  }
};
const roles = [
  {
    title: "МАШИНИСТ ОБОРУДОВАНИЯ",
    salary: "от 70.000 ₽",
    dept: "Цех розлива",
    desc: "Управление автоматическими линиями розлива KHS и Sidel. Контроль параметров выдува бутылок, укупорки и этикетировки.",
    icon: "⚙️",
  },
  {
    title: "ОПЕРАТОР ВАРОЧНОГО ЦЕХА",
    salary: "от 70.000 ₽",
    dept: "Цех варки сусла",
    desc: "Ведение технологического процесса варки квасного сусла и контроль непрерывного естественного брожения в танках.",
    icon: "🏭",
  },
  {
    title: "ЛАБОРАНТ КОНТРОЛЯ КАЧЕСТВА",
    salary: "от 60.000 ₽",
    dept: "R&D Лаборатория",
    desc: "Входной контроль натурального зернового сырья и физико-химический экспресс-анализ готовой продукции по ГОСТ.",
    icon: "🔬",
  },
];
export function Index() {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState(0);

  const [hoveredNode, setHoveredNode] = useState(null);

  return (
    <Box
      id="ochakovo-landing"
      sx={{
        width: "100%",
        minHeight: "100vh",
        pb: 12,
        color: "#18181B",
        fontFamily: '"Montserrat", "Roboto", "Helvetica", sans-serif',
      }}
    >
      {/* ================= 2. HERO + 3 ЗДАНИЯ ТРЕУГОЛЬНИКОМ ================= */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", lg: "row" },
          alignItems: "center",
          justifyContent: "space-between",
          gap: { xs: 5, lg: 4 },
          mb: { xs: 8, md: 12 },
        }}
      >
        {/* Текстовая колонка слева */}
        <Box sx={{ maxWidth: { xs: "100%", lg: 580 } }}>
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              backgroundColor: "#FCE8E9",
              borderRadius: "3px",
              borderLeft: "4px solid #E30613",
              pl: 1,
              pr: 1.5,
              py: 0.4,
              mb: 2.5,
            }}
          >
            <Typography
              sx={{
                fontWeight: 900,
                color: "#E30613",
                fontSize: "12px",
                letterSpacing: "0.05em",
              }}
            >
              #ОЧАКОВО_КАРЬЕРА
            </Typography>
          </Box>

          <Typography
            sx={{
              color: "#18181B",
              fontWeight: 900,
              fontSize: { xs: "32px", sm: "44px", md: "52px" },
              lineHeight: 1.12,
              mb: 3,
              textTransform: "uppercase",
              letterSpacing: "-0.5px",
            }}
          >
            НЕ ПРОСТО{" "}
            <Box
              component="span"
              sx={{ textDecoration: "underline", textUnderlineOffset: "6px" }}
            >
              КВАС.
            </Box>
            <br />
            ТВОЙ КАРЬЕРНЫЙ СТАРТ В ОЧАКОВО
          </Typography>

          <Typography
            sx={{
              fontSize: "15px",
              color: "#3F3F46",
              lineHeight: 1.6,
              mb: 4,
              maxWidth: 520,
            }}
          >
            Узнай, какое{" "}
            <Box component="span" sx={{ color: "#65A30D", fontWeight: 700 }}>
              направление
            </Box>{" "}
            на производстве подходит тебе больше всего.
            <br />
            <br />
            Пройди{" "}
            <Box component="span" sx={{ color: "#65A30D", fontWeight: 700 }}>
              интерактивный тест
            </Box>
            , изучи{" "}
            <Box component="span" sx={{ color: "#65A30D", fontWeight: 700 }}>
              карьерные возможности
            </Box>{" "}
            и получи приглашение на{" "}
            <Box component="span" sx={{ color: "#65A30D", fontWeight: 700 }}>
              стажировку
            </Box>{" "}
            в Очаково.
          </Typography>

          <Button
            onClick={() => scrollTo("game-center")}
            sx={{
              background: "#D7001E",
              color: "#FFFFFF",
              px: 3.8,
              py: 1.4,
              fontSize: "15px",
              fontWeight: 800,
              borderRadius: "6px",
              textTransform: "none",
              boxShadow: "0 8px 20px rgba(215, 0, 30, 0.3)",
              "&:hover": { background: "#B00018" },
            }}
          >
            Присоединиться к команде
          </Button>
        </Box>

        {/* 3 ЗДАНИЯ ТРЕУГОЛЬНИКОМ */}
        <Box
          sx={{
            position: "relative",
            width: { xs: 320, md: 380 },
            height: { xs: 420, md: 480 },
            flexShrink: 0,
          }}
        >
          {departments.map((dept, idx) => {
            const IconComponent = dept.icon;
            const isHovered = hoveredNode === dept.id;

            // Треугольное расположение:
            // idx=0 — вершина (сверху по центру)
            // idx=1 — нижний левый
            // idx=2 — нижний правый
            const positions = [
              { top: "0%", left: "50%", transform: "translateX(-50%)" },
              { top: "52%", left: "5%", transform: "none" },
              { top: "52%", right: "5%", transform: "none" },
            ];
            const pos = positions[idx];

            return (
              <Box
                key={dept.id}
                sx={{
                  position: "absolute",
                  ...pos,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  cursor: "pointer",
                  zIndex: isHovered ? 10 : 1,
                  transition: "z-index 0.2s ease",
                }}
                onMouseEnter={() => setHoveredNode(dept.id)}
                onMouseLeave={() => setHoveredNode(null)}
              >
                <Tooltip
                  title={
                    <Box sx={{ p: 1 }}>
                      <Typography
                        variant="subtitle2"
                        sx={{ fontWeight: 800, mb: 0.5 }}
                      >
                        {dept.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ fontSize: "0.775rem", opacity: 0.9 }}
                      >
                        {dept.description}
                      </Typography>
                      <Button
                        sx={{
                          fontSize: 11,
                          color: "#fff",
                          backgroundColor: colors.redBg,
                          mt: 1,
                        }}
                        component={Link}
                        to={dept.path}
                        nativeButton={false}
                      >
                        Хочу попробовать!
                      </Button>
                    </Box>
                  }
                  arrow
                  placement="top"
                  slots={{ transition: Zoom }}
                  open={isHovered}
                  slotProps={{
                    tooltip: {
                      sx: {
                        bgcolor: "#1E293B",
                        color: "#FFFFFF",
                        p: 1.5,
                        maxWidth: 220,
                        borderRadius: 2,
                        boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
                      },
                    },
                    arrow: {
                      sx: {
                        color: "#1E293B",
                      },
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <IconComponent isHovered={isHovered} />
                    <Typography
                      variant="body2"
                      sx={{
                        mt: 1,
                        fontWeight: 800,
                        color: isHovered ? "#E30613" : "#111111",
                        textAlign: "center",
                        fontSize: "0.875rem",
                        transition: "color 0.2s ease",
                        whiteSpace: "pre-line",
                        lineHeight: 1.2,
                      }}
                    >
                      {dept.title}
                    </Typography>
                  </Box>
                </Tooltip>
              </Box>
            );
          })}
        </Box>
      </Box>

      {/* ================= 3. КАРЬЕРНЫЙ ГЕЙМ-ЦЕНТР ================= */}
      <Box
        id="game-center"
        sx={{
          background: "#FFFFFF",
          border: "1px solid #E2E8F0",
          borderRadius: "32px",
          p: { xs: 3, md: 6 },
          mb: { xs: 8, md: 12 },
          boxShadow: "0 14px 35px rgba(0,0,0,0.04)",
        }}
      >
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography
            sx={{
              color: "#4B5563",
              fontSize: "13px",
              fontWeight: 800,
              mb: 1.5,
              letterSpacing: "0.5px",
            }}
          >
            🎮 Карьерный гейм-центр
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: "22px", md: "32px" },
              fontWeight: 900,
              color: "#111827",
              mb: 1.5,
              letterSpacing: "-0.5px",
              lineHeight: 1.2,
            }}
          >
            ПОПРОБУЙ СЕБЯ В ДЕЛЕ ДО ПОДАЧИ
            <br />
            ЗАЯВКИ
          </Typography>
          <Typography
            sx={{
              color: "#64748B",
              fontSize: "14px",
              maxWidth: 640,
              margin: "0 auto",
              lineHeight: 1.5,
            }}
          >
            Пройди симуляторы реальных задач «Очаково», набери баллы за точность
            и скорость, и получи прямой оффер на стажировку или фирменный мерч!
          </Typography>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
            gap: 3.5,
            mb: 5,
          }}
        >
          {/* Игра 1 */}
          <Card
            sx={{
              background: "#FFFFFF",
              border: "1px solid #E5E7EB",
              borderRadius: "20px",
              p: 3.5,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              boxShadow: "none",
              transition: "all 0.25s ease",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: "0 12px 24px rgba(0,0,0,0.06)",
              },
            }}
          >
            <Box>
              <Box
  sx={{
    width: 96,
    height: 96,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    mb: 2,
    overflow: "hidden", 
  }}
>
  <Box
    component="img"
    src="../public/stikerhappy.png"
    alt="Иконка"
    sx={{
      maxWidth: "100%",  // Картинка не сожмется и не вылезет за границы блока
      maxHeight: "100%", // Центрирование сработает за счет флексов родителя
      objectFit: "contain" // Сохраняет пропорции и вписывает в размеры
    }}
  />
</Box>
              <Typography
                sx={{
                  fontSize: "19px",
                  fontWeight: 900,
                  color: "#111827",
                  mb: 1.2,
                }}
              >
                Заполни анкету сотрудника
              </Typography>
              <Typography
                sx={{
                  fontSize: "13px",
                  color: "#64748B",
                  lineHeight: 1.5,
                  mb: 3,
                }}
              >
                Заполни свою анкету и присоединяйся к работе с Очаково
              </Typography>
            </Box>

            <Box>
              <Box
                sx={{
                  background: "#F3F4F6",
                  px: 2,
                  py: 1,
                  borderRadius: "8px",
                  mb: 2.5,
                }}
              >
                <Typography
                  sx={{ fontSize: "12px", fontWeight: 700, color: "#374151" }}
                >
                  Запишись на свою первую смену!
                </Typography>
              </Box>
              <Button
                fullWidth
                onClick={() => navigate("/testques")}
                sx={{
                  background: "#09090B",
                  color: "#FFF",
                  borderRadius: "10px",
                  py: 1.2,
                  fontSize: "13.5px",
                  fontWeight: 800,
                  textTransform: "none",
                  "&:hover": { background: "#27272A" },
                }}
              >
                К Анкете
              </Button>
            </Box>
          </Card>

          {/* Игра 2 */}
          <Card
            sx={{
              background: "#FFFFFF",
              border: "1px solid #E5E7EB",
              borderRadius: "20px",
              p: 3.5,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              boxShadow: "none",
              transition: "all 0.25s ease",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: "0 12px 24px rgba(0,0,0,0.06)",
              },
            }}
          >
            <Box>
              <Box
  sx={{
    width: 96,
    height: 96,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    mb: 2,
    overflow: "hidden", 
  }}
>
  <Box
    component="img"
    src="../public/lab.png"
    alt="Иконка"
    sx={{
      maxWidth: "100%",  // Картинка не сожмется и не вылезет за границы блока
      maxHeight: "100%", // Центрирование сработает за счет флексов родителя
      objectFit: "contain" // Сохраняет пропорции и вписывает в размеры
    }}
  />
</Box>
              <Typography
                sx={{
                  fontSize: "19px",
                  fontWeight: 900,
                  color: "#111827",
                  mb: 1.2,
                }}
              >
                Симуляторы производства
              </Typography>
              <Typography
                sx={{
                  fontSize: "13px",
                  color: "#64748B",
                  lineHeight: 1.5,
                  mb: 3,
                }}
              >
                Настрой скорость линии розлива, откалибруй датчики и устрани
                сбои в работе. Создай новый вкус для напитков.
              </Typography>
            </Box>

            <Box>
              <Box
                sx={{
                  background: "#F3F4F6",
                  px: 2,
                  py: 1,
                  borderRadius: "8px",
                  mb: 2.5,
                }}
              >
                <Typography
                  sx={{ fontSize: "12px", fontWeight: 700, color: "#374151" }}
                >
                  Попробуй себя в профессии
                </Typography>
              </Box>
              <Button
                fullWidth
                onClick={() => navigate("/simhome")}
                sx={{
                  background: "#09090B",
                  color: "#FFF",
                  borderRadius: "10px",
                  py: 1.2,
                  fontSize: "13.5px",
                  fontWeight: 800,
                  textTransform: "none",
                  "&:hover": { background: "#27272A" },
                }}
              >
                К Симулятору
              </Button>
            </Box>
          </Card>

          {/* Игра 3 */}
          <Card
            sx={{
              background: "#FFFFFF",
              border: "1px solid #E5E7EB",
              borderRadius: "20px",
              p: 3.5,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              boxShadow: "none",
              transition: "all 0.25s ease",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: "0 12px 24px rgba(0,0,0,0.06)",
              },
            }}
          >
            <Box>
              <Box
  sx={{
    width: 96,
    height: 96,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    mb: 2,
    overflow: "hidden", 
  }}
>
  <Box
    component="img"
    src="../public/hamster.png"
    alt="Иконка"
    sx={{
      maxWidth: "100%",  // Картинка не сожмется и не вылезет за границы блока
      maxHeight: "100%", // Центрирование сработает за счет флексов родителя
      objectFit: "contain" // Сохраняет пропорции и вписывает в размеры
    }}
  />
</Box>
              <Typography
                sx={{
                  fontSize: "11px",
                  fontWeight: 800,
                  color: "#9CA3AF",
                  letterSpacing: "0.5px",
                  mb: 0.8,
                }}
              >
                ИСТОРИЯ & БРЕНДЫ
              </Typography>
              <Typography
                sx={{
                  fontSize: "19px",
                  fontWeight: 900,
                  color: "#111827",
                  mb: 1.2,
                }}
              >
                Квиз «Очаково»
              </Typography>
              <Typography
                sx={{
                  fontSize: "13px",
                  color: "#64748B",
                  lineHeight: 1.5,
                  mb: 3,
                }}
              >
                Ответь на 5 быстрых вопросов об истории, эко-технологиях и
                секретах производства компании.
              </Typography>
            </Box>

            <Box>
              <Box
                sx={{
                  background: "#F3F4F6",
                  px: 2,
                  py: 1,
                  borderRadius: "8px",
                  mb: 2.5,
                }}
              >
                <Typography
                  sx={{ fontSize: "12px", fontWeight: 700, color: "#374151" }}
                >
                  🎁 Награда: Мерч + Экскурсия
                </Typography>
              </Box>
              <Button
                fullWidth
                onClick={() => navigate("/quiz")}
                sx={{
                  background: "#09090B",
                  color: "#FFF",
                  borderRadius: "10px",
                  py: 1.2,
                  fontSize: "13.5px",
                  fontWeight: 800,
                  textTransform: "none",
                  "&:hover": { background: "#27272A" },
                }}
              >
                Пройти квиз (2 мин)
              </Button>
            </Box>
          </Card>
        </Box>

        {/* Плашка быстрой заявки */}
        <Box
          sx={{
            background: "#18181B",
            borderRadius: "16px",
            p: { xs: 2.5, md: 3.5 },
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2.5,
          }}
        >
          <Box>
            <Typography
              sx={{
                color: "#FFFFFF",
                fontSize: "16px",
                fontWeight: 800,
                mb: 0.5,
              }}
            >
              Уже знаешь, в чем ты силен?
            </Typography>
            <Typography sx={{ color: "#9CA3AF", fontSize: "13.5px" }}>
              Подай упрощенную заявку без резюме — мы подберем направление под
              твой профиль и курс колледжа или вуза.
            </Typography>
          </Box>
          <Button
            onClick={() => scrollTo("roles")}
            sx={{
              background: "#D7001E",
              color: "#FFFFFF",
              px: 3.5,
              py: 1.3,
              borderRadius: "10px",
              fontSize: "14px",
              fontWeight: 800,
              textTransform: "none",
              flexShrink: 0,
              boxShadow: "0 4px 14px rgba(215, 0, 30, 0.4)",
              "&:hover": { background: "#B00018" },
            }}
          >
            Подать заявку в 1 клик 🚀
          </Button>
        </Box>
      </Box>

      {/* ================= 4. ЧТО ТЫ ПОЛУЧИШЬ РАБОТАЯ У НАС ================= */}
      <Box id="benefits" sx={{ mb: { xs: 8, md: 12 } }}>
        <Typography
          sx={{
            fontSize: { xs: "22px", md: "30px" },
            fontWeight: 900,
            mb: 4,
            letterSpacing: "-0.5px",
          }}
        >
          ЧТО ТЫ ПОЛУЧИШЬ РАБОТАЯ У НАС?
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "1fr 1fr",
              md: "1fr 1fr 1fr",
            },
            gap: 2.5,
          }}
        >
          <Box
            sx={{
              background: "#E2E8F0",
              borderRadius: "20px",
              p: 3.5,
              minHeight: 140,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Typography
              sx={{
                fontSize: "20px",
                fontWeight: 900,
                color: "#0F172A",
                lineHeight: 1.2,
              }}
            >
              Наставник с первого дня
            </Typography>
            <Typography
              sx={{ fontSize: "13px", color: "#475569", fontWeight: 600 }}
            >
              Опытный куратор ведёт за руку и помогает быстро освоить
              оборудование цеха.
            </Typography>
          </Box>

          <Box
            sx={{
              background: "#0F172A",
              color: "#FFFFFF",
              borderRadius: "20px",
              p: 3.5,
              minHeight: 140,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              boxShadow: "0 8px 24px rgba(15, 23, 42, 0.15)",
            }}
          >
            <Typography
              sx={{ fontSize: "20px", fontWeight: 900, lineHeight: 1.2 }}
            >
              Официальный стаж
            </Typography>
            <Typography
              sx={{ fontSize: "13px", color: "#94A3B8", fontWeight: 600 }}
            >
              Срочный трудовой договор по ТК РФ, «белая» зарплата и зачёт
              студенческой практики.
            </Typography>
          </Box>

          <Box
            sx={{
              background: "#E2E8F0",
              borderRadius: "20px",
              p: 3.5,
              minHeight: 140,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Typography
              sx={{
                fontSize: "20px",
                fontWeight: 900,
                color: "#0F172A",
                lineHeight: 1.2,
              }}
            >
              Общежитие рядом с заводом
            </Typography>
            <Typography
              sx={{ fontSize: "13px", color: "#475569", fontWeight: 600 }}
            >
              Комфортное жильё на Рябиновой за 3 400 ₽/мес в пешей доступности
              от проходной[cite: 3].
            </Typography>
          </Box>

          <Box
            sx={{
              gridColumn: { md: "1 / span 3" },
              background: "#F8FAFC",
              border: "1.5px solid #E2E8F0",
              borderRadius: "20px",
              p: 3,
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              alignItems: { sm: "center" },
              justifyContent: "space-between",
              gap: 2,
            }}
          >
            <Box>
              <Typography
                sx={{
                  fontSize: "19px",
                  fontWeight: 900,
                  color: "#0F172A",
                  mb: 0.5,
                }}
              >
                100% Российское производство
              </Typography>
              <Typography
                sx={{ fontSize: "13px", color: "#64748B", fontWeight: 600 }}
              >
                Собственные сельхозугодья, натуральное зерновое сырьё и
                независимость от внешних поставок.
              </Typography>
            </Box>
            <Chip
              label="Эко-стандарт"
              sx={{
                background: "#DCFCE7",
                color: "#166534",
                fontWeight: 800,
                fontSize: "12px",
              }}
            />
          </Box>
        </Box>
      </Box>

      {/* ================= 5. ВЫБЕРИ СВОЮ РОЛЬ ================= */}
      <Box id="roles" sx={{ mb: 6 }}>
        <Typography
          sx={{
            fontSize: { xs: "22px", md: "30px" },
            fontWeight: 900,
            mb: 3.5,
            letterSpacing: "-0.5px",
          }}
        >
          Выбери свою роль
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
            gap: 3,
          }}
        >
          {roles.map((role, idx) => {
            const isSelected = selectedRole === idx;
            return (
              <Box
                key={idx}
                onClick={() => setSelectedRole(idx)}
                sx={{
                  background: "#FFFFFF",
                  borderRadius: "20px",
                  p: 3.5,
                  cursor: "pointer",
                  border: isSelected
                    ? "2px solid #E30613"
                    : "1.5px solid #E5E7EB",
                  boxShadow: isSelected
                    ? "0 10px 25px rgba(227, 6, 19, 0.12)"
                    : "none",
                  transition: "all 0.25s ease",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  minHeight: 220,
                  position: "relative",
                  overflow: "hidden",
                  "&:hover": {
                    borderColor: "#E30613",
                    transform: "translateY(-4px)",
                  },
                }}
              >
                <Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      mb: 2,
                    }}
                  >
                    <Box sx={{ fontSize: "28px" }}>{role.icon}</Box>
                    <Chip
                      label={role.salary}
                      sx={{
                        background: "#FEE2E2",
                        color: "#DC2626",
                        fontWeight: 900,
                        fontSize: "13px",
                      }}
                    />
                  </Box>
                  <Typography
                    sx={{
                      fontSize: "17px",
                      fontWeight: 900,
                      color: "#0F172A",
                      mb: 1,
                      lineHeight: 1.25,
                    }}
                  >
                    {role.title}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "13px",
                      color: "#64748B",
                      lineHeight: 1.5,
                      mb: 3,
                    }}
                  >
                    {role.desc}
                  </Typography>
                </Box>

                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    alert(
                      `Отклик на направление: ${role.title}. Скоро свяжемся!`,
                    );
                  }}
                  sx={{
                    color: "#E30613",
                    fontWeight: 900,
                    fontSize: "13px",
                    p: 0,
                    justifyContent: "flex-start",
                    letterSpacing: "0.5px",
                    "&:hover": { background: "transparent", color: "#991B1B" },
                  }}
                >
                  ПОДРОБНЕЕ —›
                </Button>
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
}
