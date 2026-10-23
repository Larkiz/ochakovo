import { BrowserRouter, Route, Routes } from "react-router";
import { Box } from "@mui/material";
import { SimHome } from "@/pages/SimHome/SimHome";
import { Header } from "@/widgets/Header/Header";
import { Index } from "@/pages/Index/Index";

function App() {
  return (
    <Box
      sx={{
        backgroundColor: "#FAFAFA",
        // Fine grid background matching screenshot
        backgroundImage: `
            linear-gradient(to right, rgba(220, 220, 220, 0.35) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(220, 220, 220, 0.35) 1px, transparent 1px)
          `,
        backgroundSize: "24px 24px",
      }}
    >
      <Box sx={{ pl: 4, pr: 4, maxWidth: 1440, margin: "auto" }}>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/sim" element={<SimHome />} />
          </Routes>
        </BrowserRouter>
      </Box>
    </Box>
  );
}

export default App;
