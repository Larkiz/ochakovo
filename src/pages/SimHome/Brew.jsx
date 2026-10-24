import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import {
  Box,
  Typography,
  Button,
  Slider,
  Paper,
  LinearProgress,
  Grid,
} from "@mui/material";
import { styled, keyframes } from "@mui/material/styles";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

// Анимация покачивания жидкости в чане
const waveAnimation = keyframes`
  0% { transform: scaleY(1); }
  100% { transform: scaleY(1.04); }
`;

// Кастомный термометр (сбалансированная высота 260px и ширина 20px)
const TemperatureSlider = styled(Slider)(({ value }) => {
  const inRange = value >= 70 && value <= 90;
  return {
    height: 260,
    padding: "0 10px",
    cursor: "default",
    borderRadius: 0,
    "& .MuiSlider-track": {
      width: 20,
      background:
        "linear-gradient(to top, #001fe3 0%, #bd00e3 50%, #e30022 100%)",
      border: "none",
      borderRadius: 0,
    },
    "& .MuiSlider-rail": {
      width: 20,
      opacity: 0.25,
      backgroundColor: "#bfbfbf",
      borderRadius: 0,
    },
    "& .MuiSlider-thumb": {
      width: 36,
      height: 10,
      borderRadius: 0,
      backgroundColor: inRange ? "#4caf50" : "#fff",
      border: `2px solid ${inRange ? "#4caf50" : "#666"}`,
      "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
        boxShadow: "none",
      },
    },
  };
});

// Функция плавного изменения цвета кваса от прогресса
const interpolateColor = (color1, color2, factor) => {
  const c1 = parseInt(color1.slice(1), 16);
  const c2 = parseInt(color2.slice(1), 16);
  const r1 = (c1 >> 16) & 255;
  const g1 = (c1 >> 8) & 255;
  const b1 = c1 & 255;
  const r2 = (c2 >> 16) & 255;
  const g2 = (c2 >> 8) & 255;
  const b2 = c2 & 255;
  const r = Math.round(r1 + factor * (r2 - r1));
  const g = Math.round(g1 + factor * (g2 - g1));
  const b = Math.round(b1 + factor * (b2 - b1));
  return `rgb(${r}, ${g}, ${b})`;
};

export function Brew() {
  const TOTAL_TIME = 15;
  const REQUIRED_SCORE = 25;
  const navigate = useNavigate();
  const [temperature, setTemperature] = useState(20);
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [score, setScore] = useState(0);
  const [currentRoundScore, setCurrentRoundScore] = useState(0);
  const [gameState, setGameState] = useState("idle");

  const isPressingRef = useRef(false);
  const physicsIntervalRef = useRef(null);
  const timerIntervalRef = useRef(null);

  const startColor = "#e9c09f";
  const endColor = "#c7610f";
  const progressFactor = Math.min(1, score / REQUIRED_SCORE);
  const currentKvassColor = interpolateColor(
    startColor,
    endColor,
    progressFactor,
  );

  const startFullGame = () => {
    setTemperature(20);
    setTimeLeft(TOTAL_TIME);
    setScore(0);
    setCurrentRoundScore(0);
    setGameState("playing");
    isPressingRef.current = false;
  };

  useEffect(() => {
    if (gameState !== "playing") return;
    physicsIntervalRef.current = setInterval(() => {
      setTemperature((prev) => {
        let nextTemp = prev;
        if (isPressingRef.current) {
          nextTemp += 2.2;
        } else {
          nextTemp -= 1.2;
        }
        return Math.max(0, Math.min(100, nextTemp));
      });
    }, 50);
    return () => clearInterval(physicsIntervalRef.current);
  }, [gameState]);

  useEffect(() => {
    if (gameState !== "playing") return;
    timerIntervalRef.current = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timerIntervalRef.current);
          return 0;
        }
        return prevTime - 1;
      });

      setTemperature((currentTemp) => {
        if (currentTemp >= 70 && currentTemp <= 90) {
          setScore((prevScore) => Math.min(REQUIRED_SCORE, prevScore + 1));
          setCurrentRoundScore((prev) => prev + 1);
        }
        return currentTemp;
      });
    }, 1000);
    return () => clearInterval(timerIntervalRef.current);
  }, [gameState]);

  useEffect(() => {
    if (timeLeft === 0 && gameState === "playing") {
      if (score >= REQUIRED_SCORE) {
        setGameState("success");
      } else {
        setGameState("round_end");
      }
    }
  }, [timeLeft, gameState, score]);

  useEffect(() => {
    if (score >= REQUIRED_SCORE && gameState === "playing") {
      clearInterval(timerIntervalRef.current);
      clearInterval(physicsIntervalRef.current);
      setGameState("success");
    }
  }, [score, gameState]);

  const handlePressStart = (e) => {
    e.preventDefault();
    if (gameState === "playing") isPressingRef.current = true;
  };

  const handlePressEnd = () => {
    isPressingRef.current = false;
  };

  const inTargetRange = temperature >= 70 && temperature <= 90;

  return (
    <Box sx={{ mt: 5, mb: 5 }}>
      <Paper
        elevation={4}
        sx={{
          p: 4,
          background: "#ffffff",
          borderRadius: 0,
          boxShadow: "0px 10px 30px rgba(0,0,0,0.06)",
        }}
      >
        <Typography
          variant="h4"
          fontWeight="900"
          align="center"
          sx={{ letterSpacing: "0.5px", mb: 4 }}
        >
          Белый квас "Семейный секрет"
        </Typography>

        {gameState !== "playing" && (
          <Box
            sx={{
              my: 6,
              minHeight: 320,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            {gameState === "idle" && (
              <>
                <Typography
                  variant="h5"
                  color="text.secondary"
                  sx={{ mb: 4, maxWidth: 600, fontWeight: 500 }}
                >
                  Удерживайте температуру в зоне <b>70° – 90°</b>. Таймер:{" "}
                  {TOTAL_TIME} сек. Цель брожения: <b>{REQUIRED_SCORE} очков</b>
                  .
                </Typography>
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<PlayArrowIcon />}
                  onClick={startFullGame}
                  sx={{
                    bgcolor: "#000",
                    "&:hover": { bgcolor: "#222" },
                    borderRadius: 0,
                    px: 6,
                    py: 2,
                    fontSize: "1.1rem",
                    fontWeight: "bold",
                  }}
                >
                  Начать игру
                </Button>
              </>
            )}

            {gameState === "success" && (
              <Box>
                <Typography variant="h2" sx={{ mb: 2 }}>
                  🍺
                </Typography>
                <Typography
                  variant="h4"
                  color="success.main"
                  fontWeight="900"
                  gutterBottom
                >
                  Идеальное брожение!
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ mb: 4, fontSize: "1.1rem" }}
                >
                  Вы набрали необходимые {score} очков идеальной температуры.
                  Квас готов!
                </Typography>
                <Button
                  variant="contained"
                  onClick={startFullGame}
                  sx={{
                    borderRadius: 0,
                    px: 5,
                    py: 2,
                    fontSize: "1rem",
                    fontWeight: "bold",
                    bgcolor: "#000",
                    "&:hover": { bgcolor: "#222" },
                  }}
                >
                  Играть снова
                </Button>
                <Button
                  variant="contained"
                  onClick={() => navigate("/testques")}
                  sx={{
                    borderRadius: 0,
                    px: 5,
                    py: 2,
                    fontSize: "1rem",
                    fontWeight: "bold",
                    bgcolor: "#000",
                    "&:hover": { bgcolor: "#222" },
                  }}
                >
                  К Анкете
                </Button>
              </Box>
            )}

            {gameState === "round_end" && (
              <Box sx={{ maxWidth: 500 }}>
                <Typography variant="h2" sx={{ mb: 2 }}>
                  ⏳
                </Typography>
                <Typography
                  variant="h4"
                  color="warning.main"
                  fontWeight="900"
                  gutterBottom
                >
                  Время раунда истекло
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ mb: 4 }}
                >
                  Всего накоплено: {score} из {REQUIRED_SCORE}.
                </Typography>
                <Button
                  variant="text"
                  color="error"
                  onClick={() => navigate("/testques")}
                  sx={{
                    borderRadius: 0,
                    fontSize: "0.9rem",
                    fontWeight: "bold",
                  }}
                >
                  Перейти к Анкете
                </Button>
                <Button
                  variant="contained"
                  onClick={startFullGame}
                  sx={{
                    borderRadius: 0,
                    px: 5,
                    py: 2,
                    fontSize: "1rem",
                    fontWeight: "bold",
                    bgcolor: "#000",
                    "&:hover": { bgcolor: "#222" },
                  }}
                >
                  Играть снова
                </Button>
              </Box>
            )}
          </Box>
        )}

        {gameState === "playing" && (
          <Grid container spacing={4} sx={{ alignItems: "stretch" }}>
            <Grid
              xs={12}
              md={6}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  bgcolor: "#fcfcfc",
                  border: "1px solid #eee",
                  p: 3,
                  height: "100%",
                  minHeight: 340,
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    width: 260,
                    height: 260,
                    border: "6px solid #333",
                    borderTop: "none",
                    borderRadius: 0,
                    position: "relative",
                    overflow: "hidden",
                    background: "#f5f5f5",
                  }}
                >
                  <Box
                    sx={{
                      width: "100%",
                      height: "80%",
                      backgroundColor: currentKvassColor,
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      transformOrigin: "bottom",
                      animation: `${waveAnimation} 1.5s infinite alternate ease-in-out`,
                      transition: "background-color 0.1s linear",
                    }}
                  />
                </Box>
              </Box>
            </Grid>

            <Grid
              xs={12}
              md={6}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 2,
                  mb: 1,
                }}
              >
                <Box
                  sx={{
                    bgcolor: "#000",
                    color: "#fff",
                    py: 1.5,
                    px: 2,
                    borderRadius: 0,
                    flex: 1,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: "500", color: "#aaa" }}
                  >
                    Температура
                  </Typography>
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: "800", fontFamily: "monospace" }}
                  >
                    {Math.round(temperature)}°
                  </Typography>
                </Box>
                <Box
                  sx={{
                    bgcolor: "#000",
                    color: "#fff",
                    py: 1.5,
                    px: 2,
                    borderRadius: 0,
                    flex: 1,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: "500", color: "#aaa" }}
                  >
                    Таймер
                  </Typography>
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: "800", fontFamily: "monospace" }}
                  >
                    {timeLeft}с
                  </Typography>
                </Box>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 3,
                  my: 2,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    height: 310,
                  }}
                >
                  <Typography
                    variant="button"
                    sx={{
                      fontWeight: "900",
                      color: "#333",
                      fontSize: "0.8rem",
                    }}
                  >
                    100°
                  </Typography>
                  <TemperatureSlider
                    orientation="vertical"
                    value={temperature}
                    min={0}
                    max={100}
                    disabled
                  />
                  <Typography
                    variant="button"
                    sx={{
                      fontWeight: "900",
                      color: "#333",
                      fontSize: "0.8rem",
                    }}
                  >
                    0°
                  </Typography>
                </Box>
                <Box
                  sx={{
                    height: 260,
                    width: 12,
                    bgcolor: "#e0e0e0",
                    borderRadius: 0,
                    position: "relative",
                    mt: "26px",
                  }}
                >
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: "70%",
                      height: "20%",
                      width: "100%",
                      bgcolor: "#4caf50",
                      borderRadius: 0,
                      boxShadow: inTargetRange ? "0 0 12px #4caf50" : "none",
                    }}
                  />
                </Box>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 0.5,
                    alignItems: "baseline",
                  }}
                >
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    fontWeight="500"
                  >
                    Общий прогресс брожения:
                  </Typography>
                  <Typography
                    variant="h6"
                    fontWeight="900"
                    color={
                      score >= REQUIRED_SCORE ? "success.main" : "text.primary"
                    }
                  >
                    {score} / {REQUIRED_SCORE}
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={Math.min(100, (score / REQUIRED_SCORE) * 100)}
                  color="success"
                  sx={{
                    height: 12,
                    borderRadius: 0,
                    bgcolor: "#eee",
                    "& .MuiLinearProgress-bar": { borderRadius: 0 },
                  }}
                />
              </Box>

              <Button
                variant="contained"
                fullWidth
                disableRipple
                sx={{
                  py: 2.5,
                  fontSize: "1.2rem",
                  fontWeight: "900",
                  borderRadius: 0,
                  bgcolor: inTargetRange ? "#4caf50" : "#ff9800",
                  boxShadow: "0 4px 15px rgba(0,0,0,0.12)",
                  userSelect: "none",
                  touchAction: "none",
                  "&:active": { transform: "scale(0.98)" },
                  "&:hover": { bgcolor: inTargetRange ? "#4caf50" : "#ff9800" },
                  transition: "background-color 0.2s, transform 0.1s",
                }}
                onMouseDown={handlePressStart}
                onMouseUp={handlePressEnd}
                onMouseLeave={handlePressEnd}
                onTouchStart={handlePressStart}
                onTouchEnd={handlePressEnd}
              >
                ЗАЖАТЬ ДЛЯ НАГРЕВА
              </Button>
            </Grid>
          </Grid>
        )}
      </Paper>
    </Box>
  );
}
