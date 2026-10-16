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
<<<<<<< HEAD
          <Route path="/sim" element={<SimHome />} />
=======
          <Route path="/" element={<SimHome />} />
>>>>>>> 84797a53f4bee79895211c97d55c90cb517ddecb
        </Routes>
      </BrowserRouter>
    </Box>
  );
}

export default App;
