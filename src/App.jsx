import { BrowserRouter, Route, Routes } from "react-router";
import { SimHome } from "./pages/SimHome/SimHome";
import { Header } from "./widgets/Header/Header";
import { Box } from "@mui/material";

function App() {
  return (
    <Box sx={{ pl: 4, pr: 4 }}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<SimHome />} />
        </Routes>
      </BrowserRouter>
    </Box>
  );
}

export default App;
