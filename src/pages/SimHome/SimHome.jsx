import {
  Box,
  Typography,
  Grid,
  Card,
  CardActionArea,
  CardContent,
  ThemeProvider,
  createTheme,
  CssBaseline,
} from "@mui/material";

// Поднимаемся из src/pages в src/ и заходим в assets/fonts
import JostFont from "../../assets/fonts/Jost.ttf";

const theme = createTheme({
  typography: {
    fontFamily: "Jost, Arial, sans-serif",
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'Jost';
          font-style: normal;
          font-display: swap;
          font-weight: 100 900;
          src: url(${JostFont}) format('truetype');
        }
      `,
    },
  },
});

const items = [
  { id: 1, title: "Белый квас\n“Семейный секрет”.", subtitle: "Традиционный" },
  {
    id: 2,
    title: "Белый квас\n“Семейный секрет”.",
    subtitle: "Окрошенный с хреном",
  },
  {
    id: 3,
    title: "Белый квас\n“Семейный секрет”.",
    subtitle: "Смородина-мята",
  },
];

export const SimHome = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          p: 1,
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          sx={{ fontWeight: "800", mb: 5, fontFamily: "Unbounded" }}
        >
          Что будем варить ?
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Grid container spacing={3} justifyContent="center">
          {items.map((item) => (
            <Grid item xs={12} sm={4} key={item.id}>
              <Card
                elevation={0}
                sx={{
                  backgroundColor: "#C0C0C0",
                  borderRadius: 0,
                  aspectRatio: "1 / 1",
                  display: "flex",
                  flexDirection: "column",
                  transition: "transform 0.2s, background-color 0.2s",
                  "&:hover": {
                    backgroundColor: "#dadada",
                  },
                }}
              >
                <CardActionArea
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "stretch",
                    justifyContent: "flex-start",
                    p: 3,
                  }}
                >
                  <CardContent
                    sx={{
                      p: 0,
                      "&:last-child": { p: 0 },
                      display: "flex",
                      flexDirection: "column",
                      gap: 1,
                      height: "100%",
                    }}
                  >
                    {item.title && (
                      <Typography
                        variant="h6"
                        component="div"
                        sx={{
                          fontWeight: 800,
                          whiteSpace: "pre-line",
                          lineHeight: 1.2,
                          fontSize: "1.15rem",
                          fontFamily: "Unbounded",
                        }}
                      >
                        {item.title}
                      </Typography>
                    )}

                    {item.subtitle && (
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: "700",
                          color: "#000000",
                          fontSize: "0.85rem",
                          fontFamily: "Unbounded",
                        }}
                      >
                        {item.subtitle}
                      </Typography>
                    )}
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </ThemeProvider>
  );
};
