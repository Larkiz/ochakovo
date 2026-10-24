import { styled } from "@mui/material";

export const Puller = styled("div")(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: "#E30613",
  borderRadius: 3,
  position: "absolute",
  top: 8,
  left: "calc(50% - 15px)",
  ...theme.applyStyles("dark", {
    backgroundColor: "#E30613",
  }),
}));
