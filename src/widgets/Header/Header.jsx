import { useState } from "react";
import {
  Stack,
  Typography,
  IconButton,
  Box,
  useMediaQuery,
  useTheme,
  SwipeableDrawer,
  Button,
  GlobalStyles,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate, useLocation } from "react-router";
import { Puller } from "@/ui/Puller";


export const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  const location = useLocation();


  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev);
  };


  const navItems = [
    { label: "Главная", path: "/" },
    { label: "Симуляторы", path: "/simhome" },
    { label: "Студенту", path: "/students" },
  ];


  return (
    <>
      {/* Убираем дефолтный отступ браузера, чтобы красный блок прилипал строго к верху окна */}
      <GlobalStyles
        styles={{
          "html, body": {
            margin: "0 !important",
            padding: "0 !important",
          },
        }}
      />


      <Stack
        component="header"
        direction="row"
        sx={{
          maxWidth: 1440,
          width: "100%",
          alignItems: "flex-start",
          justifyContent: "space-between",
          position: "relative",
          margin: "0 auto",
          boxSizing: "border-box",
          pt: 0,
          mb: { xs: 4, md: 7 },
        }}
      >
        {/* 1. Логотип слева */}
        <Box
          component={Link}
          to="/"
          sx={{
            display: "flex",
            alignItems: "baseline",
            gap: 0.8,
            textDecoration: "none",
            pt: 2.2,
            zIndex: 2,
          }}
        >
          <Typography
            sx={{
              color: "#D7001E",
              fontWeight: 900,
              fontSize: { xs: "20px", md: "26px" },
              letterSpacing: "-0.5px",
              lineHeight: 1,
            }}
          >
            ОЧАКОВО
          </Typography>
          <Typography
            sx={{
              color: "#D7001E",
              fontWeight: 700,
              fontSize: { xs: "15px", md: "19px" },
              lineHeight: 1,
            }}
          >
            карьера
          </Typography>
        </Box>


        {/* 2. Увеличенная центральная плашка из Figma (строго от верхнего края) */}
        {!isMobile && (
          <Stack
            direction="row"
            spacing={{ md: 4, lg: 6 }}
            sx={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              top: 0, // Без перерыва и зазора сверху
              backgroundColor: "#D7001E",
              padding: { md: "18px 48px", lg: "22px 64px" }, // Увеличенный размер
              borderRadius: "0 0 20px 20px",
              boxShadow: "0 6px 20px rgba(215, 0, 30, 0.32)",
              alignItems: "center",
              zIndex: 10,
            }}
          >
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Typography
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  sx={{
                    color: "#FFFFFF",
                    fontWeight: 900,
                    fontSize: { md: "17px", lg: "18px" }, // Увеличенный шрифт
                    letterSpacing: "0.2px",
                    cursor: "pointer",
                    opacity: isActive ? 1 : 0.88,
                    borderBottom: isActive ? "3px solid #FFFFFF" : "3px solid transparent",
                    pb: 0.4,
                    transition: "all 0.2s ease",
                    "&:hover": { opacity: 1 },
                  }}
                >
                  {item.label}
                </Typography>
              );
            })}
          </Stack>
        )}


        {/* 3. Кнопка ДЛЯ HR справа */}
        {!isMobile && (
          <Box sx={{ pt: 1.8, zIndex: 2 }}>
            <Button
              component={Link}
              to="/hr"
              sx={{
                backgroundColor: "#09090B",
                color: "#FFFFFF",
                fontWeight: 900,
                fontSize: "14px",
                letterSpacing: "0.5px",
                padding: "11px 26px",
                borderRadius: "9999px",
                whiteSpace: "nowrap",
                textTransform: "uppercase",
                boxShadow: "0 4px 14px rgba(0,0,0,0.18)",
                "&:hover": {
                  backgroundColor: "#27272A",
                },
              }}
            >
              ДЛЯ HR
            </Button>
          </Box>
        )}


        {/* Гамбургер для мобилок */}
        {isMobile && (
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerToggle}
            sx={{ color: "#D7001E", pt: 1.8 }}
          >
            <MenuIcon fontSize="large" />
          </IconButton>
        )}


        {/* Мобильная шторка */}
        <SwipeableDrawer
          anchor="bottom"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          onOpen={handleDrawerToggle}
          swipeAreaWidth={56}
          disableSwipeToOpen={true}
          keepMounted
        >
          <Box sx={{ mb: 2 }}>
            <Puller />
          </Box>


          <Stack spacing={2.5} sx={{ p: 3, textAlign: "center" }}>
            {navItems.map((item) => (
              <Button
                key={item.path}
                onClick={() => {
                  navigate(item.path);
                  setMobileOpen(false);
                }}
                sx={{
                  fontWeight: 900,
                  fontSize: "18px",
                  color: "#18181B",
                  textTransform: "none",
                }}
              >
                {item.label}
              </Button>
            ))}


            <Button
              component={Link}
              to="/hr"
              onClick={() => setMobileOpen(false)}
              sx={{
                backgroundColor: "#D7001E",
                color: "#FFFFFF",
                fontWeight: 900,
                fontSize: "16px",
                padding: "12px 20px",
                borderRadius: "12px",
                textTransform: "none",
                "&:hover": { backgroundColor: "#B00018" },
              }}
            >
              Панель для HR
            </Button>
          </Stack>
        </SwipeableDrawer>
      </Stack>
    </>
  );
};
