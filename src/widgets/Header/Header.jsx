import { colors } from "@/shared/colors";
import { LinkButton } from "@/ui/LinkButton";
import { Stack, Typography } from "@mui/material";

export const Header = () => {
  return (
    <Stack direction={"row"} sx={{ width: "100%", alignItems: "center" }}>
      <Typography
        sx={{
          color: colors.redBg,
          fontFamily: "Jost",
          fontWeight: 600,
          fontSize: 24,
        }}
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
        <LinkButton to="simulator">Симулятор</LinkButton>
        <LinkButton to="recipes">Рецепты</LinkButton>
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
