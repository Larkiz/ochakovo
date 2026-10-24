import { useState } from "react";
import { colors } from "@/shared/colors";
import { LinkButton } from "@/ui/LinkButton";
import {
  Stack,
  Typography,
  IconButton,
  Box,
  useMediaQuery,
  useTheme,
  SwipeableDrawer,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router";
import { Puller } from "@/ui/Puller";

export const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  // Определение мобильного экрана (меньше 900px / md)
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev);
  };

  const navLinks = (
    <>
      <LinkButton onClick={() => setMobileOpen(false)}>Главная</LinkButton>
      <LinkButton to="history" onClick={() => setMobileOpen(false)}>
        История
      </LinkButton>
      <LinkButton to="students" onClick={() => setMobileOpen(false)}>
        Студенту
      </LinkButton>
    </>
  );

  return (
    <Stack
      component="header"
      direction="row"
      sx={{
        maxWidth: 1440,
        width: "100%",
        alignItems: "center",
        justifyContent: "space-between",
        pb: { xs: 1, md: 2 },
        margin: "0 auto",
        boxSizing: "border-box",
      }}
    >
      {/* Логотип */}
      <Typography
        sx={{
          color: colors.redBg,
          fontFamily: "Jost",
          fontWeight: 600,
          fontSize: { xs: 18, sm: 22, md: 24 },
          textDecoration: "none",
          whiteSpace: "nowrap",
          zIndex: 1,
        }}
        component={Link}
        to="/"
      >
        ОЧАКОВО смена
      </Typography>

      {/* Навигация для Десктопа */}
      {!isMobile && (
        <Stack
          direction="row"
          spacing={{ md: 3, lg: 5 }}
          sx={{
            backgroundColor: colors.redBg,
            padding: { md: "14px 32px", lg: "20px 50px" },
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            alignItems: "center",
          }}
        >
          {navLinks}
        </Stack>
      )}

      {/* Кнопка "Гамбургер" для Мобильных */}
      {isMobile && (
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="end"
          onClick={handleDrawerToggle}
          sx={{ color: colors.redBg }}
        >
          <MenuIcon fontSize="large" />
        </IconButton>
      )}

      {/* Мобильное выпадающее меню (Drawer) */}
      <SwipeableDrawer
        anchor="bottom"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        onOpen={handleDrawerToggle}
        swipeAreaWidth={56}
        disableSwipeToOpen={true}
        keepMounted
      >
        <Box sx={{ mb: 3 }}>
          <Puller />
        </Box>

        {navLinks}
      </SwipeableDrawer>
    </Stack>
  );
};
