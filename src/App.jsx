import { BrowserRouter, Route, Routes } from "react-router";
import { Box } from "@mui/material";
import { Brew } from "@/pages/SimHome/Brew";
import { Header } from "@/widgets/Header/Header";
import { Index } from "@/pages/Index/Index";
import { Conveyor } from "./pages/SimHome/Conveyor";
import Quiz from "./pages/SimHome/Quiz";
import Lab from "./pages/SimHome/Lab";

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
      <Box
        sx={{
          pl: { xs: 2, md: 4 },
          pr: { xs: 2, md: 4 },
          maxWidth: 1440,
          margin: "auto",
        }}
      >
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/Lab" element={<Lab/>} />
            <Route path="/brew" element={<Brew />} />
            <Route path="/conveyor" element={<Conveyor />} />
            <Route path="/quiz" element={<Quiz />} />
          </Routes>
        </BrowserRouter>
      </Box>
    </Box>
  );
}

export default App;