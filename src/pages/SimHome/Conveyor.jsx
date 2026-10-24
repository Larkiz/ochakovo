import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  Grid,
  Card,
  CardContent,
} from "@mui/material";

// Импортируем иконки напрямую из их файлов
import PlayArrow from "@mui/icons-material/PlayArrow";
import Refresh from "@mui/icons-material/Refresh";
import Favorite from "@mui/icons-material/Favorite";
import SportsBar from "@mui/icons-material/SportsBar"; // Иконка кружки для Кваса
import LocalDrink from "@mui/icons-material/LocalDrink"; // Иконка стакана для Лимонада
import LocalFlorist from "@mui/icons-material/LocalFlorist"; // Иконка цветка/листка для натурального Сока

// Фирменные цвета комбината "Очаково"
const OCHAKOVO_THEME = {
  primary: "#8B0000",
  secondary: "#FFD700",
  background: "#FDFBF7",
  conveyor: "#222222",
  conveyorBorder: "#A0522D",
};

// Продукты Очаково с гарантированно существующими SVG-компонентами
const PRODUCTS = [
  {
    id: "kvas",
    name: "Квас Очаковский",
    color: "#4A2306",
    icon: <SportsBar sx={{ fontSize: 32, color: "#fff" }} />,
    shelfIndex: 0,
  },
  {
    id: "lemonade",
    name: "Лимонад АХ!",
    color: "#FF8C00",
    icon: <LocalDrink sx={{ fontSize: 32, color: "#fff" }} />,
    shelfIndex: 1,
  },
  {
    id: "goodini",
    name: "Сок Goodini",
    color: "#228B22",
    icon: <LocalFlorist sx={{ fontSize: 32, color: "#fff" }} />,
    shelfIndex: 2,
  },
];

export function Conveyor() {
  const [gameState, setGameState] = useState("menu");
  const [score, setScore] = useState(0);
  const [bottles, setBottles] = useState([]);

  const livesRef = useRef(3);
  const [visualLives, setVisualLives] = useState(3);

  const containerRef = useRef(null);
  const requestRef = useRef(null);
  const lastSpawnTime = useRef(0);
  const bottleIdCounter = useRef(0);

  const draggingInfo = useRef({ id: null, offsetX: 0, offsetY: 0 });
  // Замок для предотвращения двойного просчета любых бутылок (и успехов, и ошибок)
  const processedBottles = useRef(new Set());

  const startGame = () => {
    livesRef.current = 3;
    setVisualLives(3);
    setScore(0);
    setBottles([]);
    bottleIdCounter.current = 0;
    lastSpawnTime.current = performance.now();
    processedBottles.current.clear();
    setGameState("playing");
  };

  // Единственное место в игре, которое обрабатывает очки, жизни и замки ID
  const gameLoop = (time) => {
    if (gameState !== "playing") return;

    // Спавн бутылок
    const currentSpawnInterval = Math.max(800, 2000 - score * 50);
    if (time - lastSpawnTime.current > currentSpawnInterval) {
      const randomProduct =
        PRODUCTS[Math.floor(Math.random() * PRODUCTS.length)];
      bottleIdCounter.current += 1;

      setBottles((prev) => [
        ...prev,
        {
          id: bottleIdCounter.current,
          product: randomProduct,
          x: -40,
          y: 280,
          isDragging: false,
          isMarkedForDeath: false,
          isMarkedForSuccess: false, // Новое свойство: флаг успешной сортировки
        },
      ]);
      lastSpawnTime.current = time;
    }

    const containerWidth = containerRef.current
      ? containerRef.current.getBoundingClientRect().width
      : 800;
    const widthFactor = containerWidth / 800;
    const baseSpeed = 2.0 + Math.floor(score / 5) * 0.5;
    const currentSpeed = baseSpeed * widthFactor;

    setBottles((prevBottles) => {
      let updated = [];
      let livesToDeduct = 0;
      let scoreToAdd = 0;

      for (let i = 0; i < prevBottles.length; i++) {
        const bottle = prevBottles[i];

        // Полностью игнорируем бутылку, если её ID уже заблокирован
        if (processedBottles.current.has(bottle.id)) {
          continue;
        }

        if (bottle.isDragging) {
          updated.push(bottle);
        } else {
          // 1. ПРОВЕРКА УСПЕХА (Бутылка правильно донесена до полки)
          if (bottle.isMarkedForSuccess) {
            if (!processedBottles.current.has(bottle.id)) {
              processedBottles.current.add(bottle.id); // Мгновенно блокируем ID
              scoreToAdd++; // Планируем добавить очко
            }
          }
          // 2. ПРОВЕРКА ОШИБКИ ИЛИ ПРОПУСКА (Ошиблись полкой или она улетела за правый край конвейера)
          else if (bottle.isMarkedForDeath || bottle.x > containerWidth + 40) {
            if (!processedBottles.current.has(bottle.id)) {
              processedBottles.current.add(bottle.id); // Мгновенно блокируем ID
              livesToDeduct++; // Планируем снять жизнь
            }
          }
          // 3. ОБЫЧНОЕ ДВИЖЕНИЕ
          else {
            updated.push({ ...bottle, x: bottle.x + currentSpeed });
          }
        }
      }

      // Начисляем очки строго один раз за кадр
      if (scoreToAdd > 0) {
        setScore((s) => s + scoreToAdd);
      }

      // Списываем жизни строго один раз за кадр
      if (livesToDeduct > 0) {
        livesRef.current -= livesToDeduct;
        const currentLives = livesRef.current;
        setVisualLives(currentLives);

        if (currentLives <= 0) {
          setGameState("gameover");
          return [];
        }
      }
      return updated;
    });

    requestRef.current = requestAnimationFrame(gameLoop);
  };

  useEffect(() => {
    if (gameState === "playing") {
      requestRef.current = requestAnimationFrame(gameLoop);
    }
    return () => cancelAnimationFrame(requestRef.current);
  }, [gameState, score]);

  // НАЧАЛО ВЗАИМОДЕЙСТВИЯ
  const handlePointerDown = (e, bottle) => {
    if (gameState !== "playing") return;
    if (
      processedBottles.current.has(bottle.id) ||
      bottle.isMarkedForDeath ||
      bottle.isMarkedForSuccess
    )
      return;

    e.currentTarget.setPointerCapture(e.pointerId);

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    draggingInfo.current = {
      id: bottle.id,
      offsetX: x - bottle.x,
      offsetY: y - bottle.y,
    };

    setBottles((prev) =>
      prev.map((b) => (b.id === bottle.id ? { ...b, isDragging: true } : b)),
    );
  };

  // ПЕРЕМЕЩЕНИЕ
  const handlePointerMove = (e) => {
    if (gameState !== "playing" || !draggingInfo.current.id) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setBottles((prev) =>
      prev.map((b) => {
        if (b.id === draggingInfo.current.id) {
          return {
            ...b,
            x: x - draggingInfo.current.offsetX,
            y: y - draggingInfo.current.offsetY,
          };
        }
        return b;
      }),
    );
  };

  // ФИКСАЦИЯ СБРОСА
  const handlePointerUp = (e) => {
    if (!draggingInfo.current.id) return;

    const activeId = draggingInfo.current.id;
    draggingInfo.current = { id: null, offsetX: 0, offsetY: 0 };

    if (processedBottles.current.has(activeId)) return;

    setBottles((prev) => {
      const currentBottle = prev.find((b) => b.id === activeId);
      if (!currentBottle) return prev;

      let sortedCorrectly = false;
      let hitAnyShelf = false;

      if (currentBottle.y < 160 && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const totalWidth = rect.width;
        const zoneWidth = totalWidth / 3;

        let targetShelfIndex = Math.floor(currentBottle.x / zoneWidth);
        if (targetShelfIndex < 0) targetShelfIndex = 0;
        if (targetShelfIndex > 2) targetShelfIndex = 2;

        hitAnyShelf = true;
        if (currentBottle.product.shelfIndex === targetShelfIndex) {
          sortedCorrectly = true;
        }
      }

      // Заместо прямого изменения стейтов мы просто выставляем соответствующий флаг.
      // Игровой цикл сам безопасно подхватит событие.
      if (hitAnyShelf && sortedCorrectly) {
        return prev.map((b) =>
          b.id === activeId
            ? { ...b, isDragging: false, isMarkedForSuccess: true }
            : b,
        );
      } else {
        return prev.map((b) =>
          b.id === activeId
            ? { ...b, isDragging: false, isMarkedForDeath: true }
            : b,
        );
      }
    });
  };

  return (
    <Box
      sx={{
        bgcolor: OCHAKOVO_THEME.background,
        minHeight: "100vh",
        py: { xs: 1, sm: 3 },
        px: { xs: 0.5, sm: 2 },
        userSelect: "none",
      }}
    >
      <Container maxWidth="md" disableGutters>
        {/* Шапка */}
        <Paper
          elevation={3}
          sx={{
            p: { xs: 1.5, sm: 2.5 },
            mb: 2,
            textAlign: "center",
            borderTop: `8px solid ${OCHAKOVO_THEME.primary}`,
            borderRadius: 0,
          }}
        >
          <Typography
            variant="h5"
            sx={{
              color: OCHAKOVO_THEME.primary,
              fontWeight: "black",
              letterSpacing: 0.5,
              fontSize: { xs: "1.25rem", sm: "2rem" },
            }}
          >
            ОЧАКОВО: Сортировка
          </Typography>
          <Typography
            variant="caption"
            color="textSecondary"
            sx={{ fontSize: { xs: "0.7rem", sm: "0.85rem" } }}
          >
            Перетаскивайте бутылки пальцем или мышкой прямо с движущейся ленты
            на полки!
          </Typography>
        </Paper>

        {/* Статистика */}
        <Grid container spacing={1} sx={{ mb: 2 }}>
          <Grid xs={6}>
            <Card
              sx={{
                bgcolor: OCHAKOVO_THEME.primary,
                color: "white",
                textAlign: "center",
                borderRadius: 0,
              }}
            >
              <CardContent sx={{ py: "8px !important" }}>
                <Typography
                  sx={{
                    fontWeight: "bold",
                    fontSize: { xs: "0.9rem", sm: "1.25rem" },
                  }}
                >
                  Очки: {score}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid xs={6}>
            <Card
              sx={{
                bgcolor: OCHAKOVO_THEME.secondary,
                color: "#000",
                textAlign: "center",
                borderRadius: 0,
              }}
            >
              <CardContent
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  py: "8px !important",
                  gap: 0.5,
                }}
              >
                <Typography
                  sx={{
                    fontWeight: "bold",
                    fontSize: { xs: "0.9rem", sm: "1.25rem" },
                  }}
                >
                  Ошибки:
                </Typography>
                {[...Array(3)].map((_, i) => (
                  <Favorite
                    key={i}
                    color={i < visualLives ? "error" : "disabled"}
                    sx={{ fontSize: { xs: 18, sm: 26 } }}
                  />
                ))}
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* ИГРОВОЙ ЭКРАН */}
        <Paper
          ref={containerRef}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          elevation={5}
          sx={{
            position: "relative",
            width: "100%",
            height: { xs: 380, sm: 440 },
            bgcolor: "#EAEAEA",
            overflow: "hidden",
            borderRadius: 0,
            border: "3px solid #333",
            touchAction: "none",
          }}
        >
          {/* ГЛАВНОЕ МЕНЮ */}
          {gameState === "menu" && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                gap: 2,
                p: 3,
                textAlign: "center",
                bgcolor: "rgba(253,251,247,0.95)",
                zIndex: 30,
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
              }}
            >
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", color: OCHAKOVO_THEME.primary }}
              >
                Запуск разливочного цеха
              </Typography>
              <Typography
                variant="body2"
                sx={{ maxW: 400, color: "#555", px: 2 }}
              >
                Зажмите бутылку и переместите её наверх в правильный отсек, пока
                она не уплыла за экран.
              </Typography>
              <Button
                variant="contained"
                size="large"
                startIcon={<PlayArrow />}
                onClick={startGame}
                sx={{
                  bgcolor: OCHAKOVO_THEME.primary,
                  "&:hover": { bgcolor: "#660000" },
                  px: 4,
                  py: 1,
                  fontWeight: "bold",
                  borderRadius: 0,
                }}
              >
                Начать работу
              </Button>
            </Box>
          )}

          {/* ИГРОВОЙ ПРОЦЕСС */}
          {gameState === "playing" && (
            <>
              {/* Полки */}
              <Box
                sx={{
                  position: "absolute",
                  top: 15,
                  left: 10,
                  right: 10,
                  height: { xs: 100, sm: 130 },
                  display: "flex",
                  gap: { xs: 1, sm: 2 },
                }}
              >
                {PRODUCTS.map((p) => (
                  <Paper
                    key={p.id}
                    elevation={3}
                    sx={{
                      flex: 1,
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      bgcolor: p.color,
                      borderRadius: 0,
                      border: `2px solid ${OCHAKOVO_THEME.secondary}`,
                      boxShadow: "inset 0 0 15px rgba(0,0,0,0.5)",
                      p: 0.5,
                      boxSizing: "border-box",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "100%",
                        "& svg": { fontSize: { xs: 24, sm: 32 } },
                      }}
                    >
                      {p.icon}
                    </Box>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        color: "white",
                        fontWeight: "bold",
                        textTransform: "uppercase",
                        fontSize: { xs: "0.55rem", sm: "0.75rem" },
                        mt: 0.5,
                        textAlign: "center",
                        width: "100%",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {p.name}
                    </Typography>
                  </Paper>
                ))}
              </Box>

              {/* Стрелочки-подсказки */}
              <Box
                sx={{
                  position: "absolute",
                  top: { xs: 122, sm: 155 },
                  left: 10,
                  right: 10,
                  color: "#777",
                  pointerEvents: "none",
                  display: "flex",
                  gap: { xs: 1, sm: 2 },
                }}
              >
                <Box sx={{ flex: 1, textAlign: "center" }}>
                  <Typography
                    variant="caption"
                    sx={{
                      fontWeight: "bold",
                      fontSize: { xs: "0.6rem", sm: "0.75rem" },
                    }}
                  >
                    ▲ Квас ▲
                  </Typography>
                </Box>
                <Box sx={{ flex: 1, textAlign: "center" }}>
                  <Typography
                    variant="caption"
                    sx={{
                      fontWeight: "bold",
                      fontSize: { xs: "0.6rem", sm: "0.75rem" },
                    }}
                  >
                    ▲ Лимонад ▲
                  </Typography>
                </Box>
                <Box sx={{ flex: 1, textAlign: "center" }}>
                  <Typography
                    variant="caption"
                    sx={{
                      fontWeight: "bold",
                      fontSize: { xs: "0.6rem", sm: "0.75rem" },
                    }}
                  >
                    ▲ Сок ▲
                  </Typography>
                </Box>
              </Box>

              {/* Горизонтальный Конвейер */}
              <Box
                sx={{
                  position: "absolute",
                  bottom: { xs: 50, sm: 70 },
                  left: 0,
                  right: 0,
                  height: 75,
                  bgcolor: OCHAKOVO_THEME.conveyor,
                  borderTop: `6px solid ${OCHAKOVO_THEME.conveyorBorder}`,
                  borderBottom: `6px solid ${OCHAKOVO_THEME.conveyorBorder}`,
                  boxShadow: "0 8px 16px rgba(0,0,0,0.2), inset 0 0 20px #000",
                  pointerEvents: "none",
                }}
              >
                {[...Array(12)].map((_, i) => (
                  <Box
                    key={i}
                    sx={{
                      width: 4,
                      height: "100%",
                      bgcolor: "#333",
                      position: "absolute",
                      left: `${(i * 100) / 11}%`,
                    }}
                  />
                ))}
              </Box>

              {/* Бутылки на конвейере */}
              {bottles.map((bottle) => (
                <Box
                  key={bottle.id}
                  onPointerDown={(e) => handlePointerDown(e, bottle)}
                  sx={{
                    position: "absolute",
                    left: bottle.x,
                    top: bottle.y,
                    transform: "translate(-50%, -50%)",
                    cursor: bottle.isDragging ? "grabbing" : "grab",
                    zIndex: bottle.isDragging ? 100 : 10,
                    touchAction: "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: { xs: 46, sm: 56 },
                    height: { xs: 46, sm: 56 },
                    borderRadius: "50%",
                    bgcolor: bottle.product.color,
                    border: bottle.isDragging
                      ? `3px solid ${OCHAKOVO_THEME.secondary}`
                      : "3px solid #fff",
                    boxShadow: bottle.isDragging
                      ? "0 12px 24px rgba(0,0,0,0.4)"
                      : "0 4px 8px rgba(0,0,0,0.3)",
                    willChange: "left, top",
                    "& svg": { fontSize: { xs: 22, sm: 32 } },
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {bottle.product.icon}
                  </Box>
                </Box>
              ))}
            </>
          )}

          {/* КОНЕЦ ИГРЫ */}
          {gameState === "gameover" && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                gap: 2,
                bgcolor: "rgba(0,0,0,0.88)",
                color: "white",
                zIndex: 50,
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  color: OCHAKOVO_THEME.secondary,
                  fontWeight: "black",
                  fontSize: { xs: "1.8rem", sm: "2.5rem" },
                }}
              >
                Смена Завершена
              </Typography>
              <Typography
                variant="h6"
                sx={{ fontSize: { xs: "1rem", sm: "1.25rem" } }}
              >
                Ваш результат: {score} шт.
              </Typography>
              <Button
                variant="contained"
                startIcon={<Refresh />}
                onClick={startGame}
                sx={{
                  mt: 1,
                  bgcolor: OCHAKOVO_THEME.primary,
                  "&:hover": { bgcolor: "#660000" },
                  px: 4,
                  py: 1.2,
                  fontWeight: "bold",
                  borderRadius: 0,
                }}
              >
                Повторить смену
              </Button>
            </Box>
          )}
        </Paper>
      </Container>
    </Box>
  );
}
