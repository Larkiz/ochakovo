import { Button } from "@mui/material";
import { Link } from "react-router";

export const LinkButton = ({ children, to = "/" }) => {
  return (
    <Button
      sx={{
        color: { xs: "#E30613", md: "#fff" },
        fontWeight: 600,
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
