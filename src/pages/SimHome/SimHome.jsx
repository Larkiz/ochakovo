import {
  Typography,
  Grid,
  Card,
  CardActionArea,
  CardContent,
} from "@mui/material";

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
    <>
      <Typography
        variant="h4"
        component="h1"
        sx={{ fontWeight: "800", mb: 7, mt: 3, fontFamily: "Jost" }}
      >
        Что будем варить ?
      </Typography>

      <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
        {items.map((item) => (
          <Grid item xs={12} sm={4} key={item.id}>
            <Card
              elevation={0}
              sx={{
                backgroundColor: "#dadada",
                borderRadius: 0,
                aspectRatio: "1 / 1",
                display: "flex",
                flexDirection: "column",
                transition: "transform 0.2s, background-color 0.2s",
                "&:hover": {
                  backgroundColor: "#dddddd",
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
                        fontWeight: "800",
                        whiteSpace: "pre-line",
                        lineHeight: 1.2,
                        fontSize: 30,
                        fontFamily: "Jost",
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
                        color: "#353535",
                        fontSize: 20,
                        fontFamily: "Jost",
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
    </>
  );
};
