import { useState } from "react";
import {
  ThemeProvider,
  createTheme,
  Box,
  Typography,
  Button,
  Chip,
  Tooltip,
  Zoom,
  Stack,
} from "@mui/material";
import { GameCenterBlock } from "@/pages/Index/SecBlock";

// Custom theme matching Ochakovo branding
const theme = createTheme({
  palette: {
    primary: {
      main: "#E30613", // Ochakovo signature red
      dark: "#C0020F",
      contrastText: "#FFFFFF",
    },
    background: {
      default: "#FAFAFA",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#222222",
      secondary: "#555555",
    },
  },
  typography: {
    fontFamily: '"Montserrat", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 900,
      fontSize: "2.75rem",
      lineHeight: 1.15,
      letterSpacing: "-0.02em",
      "@media (max-width:960px)": {
        fontSize: "2.1rem",
      },
      "@media (max-width:600px)": {
        fontSize: "1.75rem",
      },
    },
    body1: {
      fontSize: "0.975rem",
      lineHeight: 1.6,
      color: "#4A4A4A",
    },
    button: {
      textTransform: "none",
      fontWeight: 700,
    },
  },
  shape: {
    borderRadius: 8,
  },
});

// SVG Isometric Pixel-art Pixelated Icons
const LaboratoryIcon = ({ isHovered }) => (
  <svg
    width="120"
    height="100"
    viewBox="0 0 120 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{
      transition: "transform 0.3s ease",
      transform: isHovered ? "translateY(-6px) scale(1.05)" : "none",
      filter: isHovered
        ? "drop-shadow(0 12px 16px rgba(0,0,0,0.15))"
        : "drop-shadow(0 4px 6px rgba(0,0,0,0.08))",
    }}
  >
    {/* Main Building Base */}
    <path
      d="M20 50 L60 30 L100 50 L60 70 Z"
      fill="#E2E8F0"
      stroke="#1E293B"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <path
      d="M20 50 L60 70 L60 85 L20 65 Z"
      fill="#CBD5E1"
      stroke="#1E293B"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <path
      d="M60 70 L100 50 L100 65 L60 85 Z"
      fill="#94A3B8"
      stroke="#1E293B"
      strokeWidth="2"
      strokeLinejoin="round"
    />

    {/* Top Roof Structure */}
    <path
      d="M30 45 L55 32 L80 45 L55 58 Z"
      fill="#FFFFFF"
      stroke="#1E293B"
      strokeWidth="2"
      strokeLinejoin="round"
    />

    {/* Windows grid lines */}
    <line
      x1="30"
      y1="56"
      x2="50"
      y2="66"
      stroke="#475569"
      strokeWidth="1.5"
      strokeDasharray="3 3"
    />
    <line
      x1="30"
      y1="60"
      x2="50"
      y2="70"
      stroke="#475569"
      strokeWidth="1.5"
      strokeDasharray="3 3"
    />

    {/* Industrial Tanks (Right) */}
    {/* Tank 1 */}
    <path
      d="M75 35 C75 30, 87 30, 87 35 L87 50 C87 55, 75 55, 75 50 Z"
      fill="#E2E8F0"
      stroke="#1E293B"
      strokeWidth="2"
    />
    <ellipse
      cx="81"
      cy="35"
      rx="6"
      ry="2.5"
      fill="#94A3B8"
      stroke="#1E293B"
      strokeWidth="1.5"
    />
    {/* Tank 2 */}
    <path
      d="M88 28 C88 23, 98 23, 98 28 L98 42 C98 47, 88 47, 88 42 Z"
      fill="#F1F5F9"
      stroke="#1E293B"
      strokeWidth="2"
    />
    <ellipse
      cx="93"
      cy="28"
      rx="5"
      ry="2"
      fill="#CBD5E1"
      stroke="#1E293B"
      strokeWidth="1.5"
    />
    {/* Tank 3 */}
    <path
      d="M96 22 C96 18, 104 18, 104 22 L104 34 C104 38, 96 38, 96 34 Z"
      fill="#CBD5E1"
      stroke="#1E293B"
      strokeWidth="1.5"
    />

    {/* Lab Pipes */}
    <path
      d="M55 35 L55 25 L75 25"
      fill="none"
      stroke="#64748B"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const TechWorkshopIcon = ({ isHovered }) => (
  <svg
    width="120"
    height="100"
    viewBox="0 0 120 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{
      transition: "transform 0.3s ease",
      transform: isHovered ? "translateY(-6px) scale(1.05)" : "none",
      filter: isHovered
        ? "drop-shadow(0 12px 16px rgba(0,0,0,0.18))"
        : "drop-shadow(0 4px 6px rgba(0,0,0,0.08))",
    }}
  >
    {/* Red Brick Main Factory Building */}
    {/* Roof */}
    <path
      d="M25 45 L60 25 L95 45 L60 65 Z"
      fill="#881337"
      stroke="#0F172A"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    {/* Left Wall */}
    <path
      d="M25 45 L60 65 L60 85 L25 65 Z"
      fill="#9F1239"
      stroke="#0F172A"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    {/* Right Wall */}
    <path
      d="M60 65 L95 45 L95 65 L60 85 Z"
      fill="#BE123C"
      stroke="#0F172A"
      strokeWidth="2"
      strokeLinejoin="round"
    />

    {/* Entrance Canopy */}
    <path
      d="M50 70 L60 76 L70 70 L60 64 Z"
      fill="#E2E8F0"
      stroke="#0F172A"
      strokeWidth="1.5"
    />
    <path
      d="M50 70 L60 76 L60 85 L50 79 Z"
      fill="#94A3B8"
      stroke="#0F172A"
      strokeWidth="1.5"
    />
    <path
      d="M60 76 L70 70 L70 79 L60 85 Z"
      fill="#64748B"
      stroke="#0F172A"
      strokeWidth="1.5"
    />

    {/* OCHAKOVO White Banner Sign */}
    <polygon
      points="40,50 80,27 80,37 40,60"
      fill="#FFFFFF"
      stroke="#0F172A"
      strokeWidth="1.5"
    />
    <text
      x="44"
      y="52"
      transform="rotate(-30 40 50)"
      fill="#E30613"
      fontSize="7.5"
      fontWeight="900"
      fontFamily="monospace"
    >
      ОЧАКОВО
    </text>

    {/* Windows Grid */}
    <rect
      x="32"
      y="53"
      width="5"
      height="7"
      fill="#FEF08A"
      stroke="#0F172A"
      strokeWidth="1"
    />
    <rect
      x="40"
      y="58"
      width="5"
      height="7"
      fill="#FEF08A"
      stroke="#0F172A"
      strokeWidth="1"
    />
    <rect
      x="70"
      y="52"
      width="5"
      height="7"
      fill="#FEF08A"
      stroke="#0F172A"
      strokeWidth="1"
    />
    <rect
      x="78"
      y="47"
      width="5"
      height="7"
      fill="#FEF08A"
      stroke="#0F172A"
      strokeWidth="1"
    />

    {/* Roof Logo Signboard */}
    <path
      d="M55 22 L65 22 L65 14 L55 14 Z"
      fill="#E30613"
      stroke="#0F172A"
      strokeWidth="1.5"
    />
    <circle cx="60" cy="18" r="2" fill="#FFFFFF" />
  </svg>
);

const BottlingShopIcon = ({ isHovered }) => (
  <svg
    width="120"
    height="100"
    viewBox="0 0 120 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{
      transition: "transform 0.3s ease",
      transform: isHovered ? "translateY(-6px) scale(1.05)" : "none",
      filter: isHovered
        ? "drop-shadow(0 12px 16px rgba(0,0,0,0.15))"
        : "drop-shadow(0 4px 6px rgba(0,0,0,0.08))",
    }}
  >
    {/* Sawtooth Industrial Factory Roof & Walls */}
    {/* Left Wall */}
    <path
      d="M20 52 L60 72 L60 90 L20 70 Z"
      fill="#991B1B"
      stroke="#0F172A"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    {/* Right Wall */}
    <path
      d="M60 72 L100 52 L100 70 L60 90 Z"
      fill="#B91C1C"
      stroke="#0F172A"
      strokeWidth="2"
      strokeLinejoin="round"
    />

    {/* Sawtooth Roof sections */}
    <path
      d="M20 52 L35 38 L35 48 L50 34 L50 44 L65 30 L80 42 L100 52 L60 72 Z"
      fill="#64748B"
      stroke="#0F172A"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <path
      d="M35 38 L50 44 L35 48 Z"
      fill="#CBD5E1"
      stroke="#0F172A"
      strokeWidth="1.5"
    />
    <path
      d="M50 34 L65 40 L50 44 Z"
      fill="#CBD5E1"
      stroke="#0F172A"
      strokeWidth="1.5"
    />

    {/* Smoke Stacks / Chimneys */}
    <path
      d="M72 26 L80 26 L80 38 L72 38 Z"
      fill="#475569"
      stroke="#0F172A"
      strokeWidth="1.5"
    />
    {/* Smoke Clouds */}
    <circle cx="76" cy="18" r="4" fill="#94A3B8" opacity="0.8" />
    <circle cx="82" cy="12" r="6" fill="#CBD5E1" opacity="0.7" />
    <circle cx="90" cy="8" r="7" fill="#E2E8F0" opacity="0.5" />

    {/* Windows & Doors */}
    <rect
      x="30"
      y="60"
      width="6"
      height="8"
      fill="#BAE6FD"
      stroke="#0F172A"
      strokeWidth="1"
    />
    <rect
      x="40"
      y="65"
      width="6"
      height="8"
      fill="#BAE6FD"
      stroke="#0F172A"
      strokeWidth="1"
    />
    <rect
      x="70"
      y="64"
      width="6"
      height="8"
      fill="#BAE6FD"
      stroke="#0F172A"
      strokeWidth="1"
    />
    <rect
      x="80"
      y="59"
      width="6"
      height="8"
      fill="#BAE6FD"
      stroke="#0F172A"
      strokeWidth="1"
    />
  </svg>
);

export function Index() {
  const [hoveredNode, setHoveredNode] = useState(null);

  const departments = [
    {
      id: "lab",
      title: "Лаборатория",
      icon: LaboratoryIcon,
      description:
        "Контроль качества сырья, разработка рецептур кваса и напитков на современном оборудовании.",
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
      gridArea: { xs: "3 / 1", md: "3 / 2" },
      offsetX: 0,
      offsetY: 20,
    },
  ];

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          // minHeight: "100vh",
          display: "flex",
          justifyContent: "flex-start",
          mt: 5,
          mb: 15,
        }}
      >
        <Stack
          spacing={{ xs: 4, md: 6 }}
          direction={"row"}
          sx={{
            alignItems: "flex-start",
            justifyContent: "space-between",
            width: "100%",
            maxWidth: 1440,
          }}
        >
          <Box>
            <Box
              sx={{
                display: "inline-flex",
                alignItems: "center",
                backgroundColor: "#FCE8E9",
                borderRadius: "4px",
                pl: 1,
                pr: 1.5,
                py: 0.5,
                mb: 2.5,
                borderLeft: "4px solid #E30613",
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  fontWeight: 800,
                  color: "#E30613",
                  letterSpacing: "0.05em",
                  fontSize: "0.8rem",
                }}
              >
                #ОЧАКОВО_КАРЬЕРА
              </Typography>
            </Box>

            {/* Main Hero Title */}
            <Typography variant="h1" sx={{ color: "#222222", mb: 2.5 }}>
              НЕ ПРОСТО{" "}
              <Box component="span" sx={{ color: "#E30613" }}>
                КВАС.
              </Box>
              <br />
              ТВОЙ КАРЬЕРНЫЙ СТАРТ
              <br />В ОЧАКОВО
            </Typography>

            {/* Subtitle Paragraph */}
            <Typography
              variant="body1"
              sx={{
                mb: 3.5,
                fontSize: { xs: "0.95rem", md: "1.05rem" },
                color: "#444444",
                maxWidth: 520,
              }}
            >
              Не просто квас, а современное производство и технологии! Исследуй
              карту направлений, пройди быстрый экспресс-тест и получи
              приглашение на оплачиваемую стажировку.
            </Typography>

            {/* Feature Chips / Pills */}
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 1.25,
                mb: 4,
              }}
            >
              {[
                "Оплата с 1-го дня",
                "Гибкий график под учебу",
                "Зачет практики в ВУЗе",
              ].map((text) => (
                <Chip
                  key={text}
                  label={text}
                  sx={{
                    backgroundColor: "#EAEAEA",
                    color: "#111111",
                    fontWeight: 700,
                    fontSize: "0.85rem",
                    height: "36px",
                    borderRadius: "20px",
                    px: 0.5,
                    "& .MuiChip-label": {
                      px: 2,
                    },
                    transition: "all 0.2s ease",
                    "&:hover": {
                      backgroundColor: "#E0E0E0",
                      transform: "translateY(-1px)",
                    },
                  }}
                />
              ))}
            </Box>

            {/* CTA Primary Action Button */}
            <Button
              variant="contained"
              color="primary"
              size="large"
              sx={{
                px: 4,
                py: 1.6,
                fontSize: "1rem",
                borderRadius: "8px",
                boxShadow: "0 8px 20px rgba(227, 6, 19, 0.25)",
                "&:hover": {
                  backgroundColor: "#C0020F",
                  boxShadow: "0 10px 24px rgba(227, 6, 19, 0.35)",
                  transform: "translateY(-1px)",
                },
              }}
            >
              Присоединиться к команде
            </Button>
          </Box>

          {/* Right Interactive Isometric Nodes Side */}
          <Box
            sx={{
              position: "relative",
              minHeight: { xs: 450, md: 520 },
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* Isometric Grid Container Layout */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                gap: { xs: 3, md: 4 },
                width: "100%",
                maxWidth: 420,
                margin: "0 auto",
              }}
            >
              {departments.map((dept) => {
                const IconComponent = dept.icon;
                const isHovered = hoveredNode === dept.id;

                return (
                  <Box
                    key={dept.id}
                    sx={{
                      gridArea: dept.gridArea,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      zIndex: isHovered ? 10 : 1,
                      transform: {
                        xs: "none",
                        md: `translate(${dept.offsetX}px, ${dept.offsetY}px)`,
                      },
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
                        </Box>
                      }
                      arrow
                      placement="top"
                      TransitionComponent={Zoom}
                      open={isHovered}
                      componentsProps={{
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
                        {/* Pixel Art Building SVG */}
                        <IconComponent isHovered={isHovered} />

                        {/* Label Below Icon */}
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
        </Stack>
      </Box>
      <GameCenterBlock />
    </ThemeProvider>
  );
}
