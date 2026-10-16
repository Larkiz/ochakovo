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
        <LinkButton>Симулятор</LinkButton>
        <LinkButton>Рецепты</LinkButton>
      </Stack>
<<<<<<< HEAD
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
=======
>>>>>>> 84797a53f4bee79895211c97d55c90cb517ddecb
    </Stack>
  );
};
