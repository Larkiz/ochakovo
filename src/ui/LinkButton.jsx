import { colors } from "@/shared/colors";
import { Button } from "@mui/material";
import { Link } from "react-router";

export const LinkButton = ({ children, to = "/" }) => {
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
      to={to}
    >
      {children}
    </Button>
  );
};
