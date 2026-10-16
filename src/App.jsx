import { BrowserRouter, Route, Routes } from "react-router";
import { Box } from "@mui/material";
import { SimHome } from "@/pages/SimHome/SimHome";
import { Header } from "@/widgets/Header/Header";

function App() {
  return (
    <Box sx={{ pl: 4, pr: 4 }}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/sim" element={<SimHome />} />
        </Routes>
      </BrowserRouter>
    </Box>
  );
}

export default App;
