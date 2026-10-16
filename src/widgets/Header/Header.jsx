import { Button, Stack, Typography } from "@mui/material";
import { Link } from "react-router";
import { colors } from "../../shared/colors";
export const LinkButton = ({ children }) => {
  return (
    <Button
      sx={{
        backgroundColor: colors.buttonBg,
        color: colors.buttonText,
        fontWeight: 550,
        pl: 3,
        pr: 3,
      }}
      LinkComponent={Link}
    >
      {children}
    </Button>
  );
};
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
    </Stack>
  );
};
