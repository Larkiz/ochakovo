import { colors } from "@/shared/colors";
import { LinkButton } from "@/ui/LinkButton";
import { Stack, Typography } from "@mui/material";
import { Link } from "react-router";

export const Header = () => {
  return (
    <Stack
      direction={"row"}
      sx={{
        maxWidth: 1440,
        alignItems: "center",
        pb: 2,
        margin: "auto",
      }}
    >
      <Typography
        sx={{
          color: colors.redBg,
          fontFamily: "Jost",
          fontWeight: 600,
          fontSize: 24,
          textDecoration: "none",
        }}
        component={Link}
        to="/"
      >
        ОЧАКОВО смена
      </Typography>
      <Stack
        sx={{
          backgroundColor: colors.redBg,
          padding: "20px 50px",
          margin: "auto",
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
        }}
        spacing={5}
        direction={"row"}
      >
        <LinkButton>Главная</LinkButton>
        <LinkButton to="simulator">История</LinkButton>
        <LinkButton to="recipes">Вакансии</LinkButton>
      </Stack>
      <Typography
        sx={{
          color: colors.redBg,
          fontFamily: "Jost",
          fontWeight: 600,
          fontSize: 24,
          opacity: 0,
        }}
      >
        ОЧАКОВО смена
      </Typography>
    </Stack>
  );
};
