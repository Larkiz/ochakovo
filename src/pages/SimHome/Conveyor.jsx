import React, { useState, useEffect, useRef } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  Paper, 
  Grid,
  Card, 
  CardContent 
} from '@mui/material';

// Импортируем иконки напрямую из их файлов
import PlayArrow from '@mui/icons-material/PlayArrow';
import Refresh from '@mui/icons-material/Refresh';
import Favorite from '@mui/icons-material/Favorite';
import SportsBar from '@mui/icons-material/SportsBar';       
import LocalDrink from '@mui/icons-material/LocalDrink';     
import LocalFlorist from '@mui/icons-material/LocalFlorist'; 

// Фирменные цвета комбината "Очаково"
const OCHAKOVO_THEME = {
  primary: '#8B0000',     
  secondary: '#FFD700',   
  background: '#FDFBF7',  
  conveyor: '#222222',    
  conveyorBorder: '#A0522D' 
};

// Продукты Очаково
const PRODUCTS = [
  { id: 'kvas', name: 'Квас Очаковский', color: '#4A2306', icon: <SportsBar sx={{ fontSize: 32, color: '#fff' }} />, shelfIndex: 0 },
  { id: 'lemonade', name: 'Лимонад АХ!', color: '#FF8C00', icon: <LocalDrink sx={{ fontSize: 32, color: '#fff' }} />, shelfIndex: 1 },
  { id: 'goodini', name: 'Сок Goodini', color: '#228B22', icon: <LocalFlorist sx={{ fontSize: 32, color: '#fff' }} />, shelfIndex: 2 }
];

export function Conveyor() {
  const [gameState, setGameState] = useState('menu'); 
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [bottles, setBottles] = useState([]); 
  
  const containerRef = useRef(null);
  const requestRef = useRef(null);
  const lastSpawnTime = useRef(0);
  const bottleIdCounter = useRef(0);
  
  // Храним ID активной бутылки и смещение курсора
  const draggingInfo = useRef({ id: null, offsetX: 0, offsetY: 0 });

  const startGame = () => {
    setScore(0);
    setLives(3);
    setBottles([]);
    bottleIdCounter.current = 0;
    lastSpawnTime.current = performance.now();
    setGameState('playing');
  };

  // Главный игровой цикл
  const gameLoop = (time) => {
    if (gameState !== 'playing') return;

    // Спавн бутылок
    const currentSpawnInterval = Math.max(800, 2000 - score * 50);
    if (time - lastSpawnTime.current > currentSpawnInterval) {
      const randomProduct = PRODUCTS[Math.floor(Math.random() * PRODUCTS.length)];
      bottleIdCounter.current += 1;
      
      setBottles(prev => [...prev, {
        id: bottleIdCounter.current,
        product: randomProduct,
        x: -40, 
        y: 280, 
        isDragging: false
      }]);
      lastSpawnTime.current = time;
    }

    // Скорость конвейера
    const currentSpeed = 2.0 + Math.floor(score / 5) * 0.5;

    setBottles(prevBottles => {
      let updated = [];
      let missedABottle = false;

      for (let i = 0; i < prevBottles.length; i++) {
        const bottle = prevBottles[i];
        if (bottle.isDragging) {
          updated.push(bottle); 
        } else {
          const newX = bottle.x + currentSpeed;
          const maxRight = containerRef.current ? containerRef.current.getBoundingClientRect().width + 40 : 850;
          if (newX > maxRight) {
            missedABottle = true; 
          } else {
            updated.push({ ...bottle, x: newX });
          }
        }
      }

      if (missedABottle) {
        setLives(l => {
          const nextLives = l - 1;
          if (nextLives <= 0) setGameState('gameover');
          return nextLives;
        });
      }
      return updated;
    });

    requestRef.current = requestAnimationFrame(gameLoop);
  };

  useEffect(() => {
    if (gameState === 'playing') {
      requestRef.current = requestAnimationFrame(gameLoop);
    }
    return () => cancelAnimationFrame(requestRef.current);
  }, [gameState, score]);

  // Зажатие мышки
  const handleMouseDown = (e, bottle) => {
    if (gameState !== 'playing') return;
    e.preventDefault();
    
    const rect = containerRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    draggingInfo.current = {
      id: bottle.id,
      offsetX: mouseX - bottle.x,
      offsetY: mouseY - bottle.y
    };

    setBottles(prev => prev.map(b => b.id === bottle.id ? { ...b, isDragging: true } : b));
  };

  // Движение мышки
  const handleMouseMove = (e) => {
    if (gameState !== 'playing' || !draggingInfo.current.id) return;

    const rect = containerRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    setBottles(prev => prev.map(b => {
      if (b.id === draggingInfo.current.id) {
        return {
          ...b,
          x: mouseX - draggingInfo.current.offsetX,
          y: mouseY - draggingInfo.current.offsetY
        };
      }
      return b;
    }));
  };

  // Отпускание мышки
  const handleMouseUp = () => {
    if (gameState !== 'playing' || !draggingInfo.current.id) return;

    const activeId = draggingInfo.current.id;
    draggingInfo.current = { id: null, offsetX: 0, offsetY: 0 };

    setBottles(prev => {
      const currentBottle = prev.find(b => b.id === activeId);
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

      if (hitAnyShelf && sortedCorrectly) {
        setScore(s => s + 1);
      } else {
        setLives(l => {
          const nextLives = l - 1;
          if (nextLives <= 0) setGameState('gameover');
          return nextLives;
        });
      }

      return prev.filter(b => b.id !== activeId);
    });
  };

    return (
    <Box sx={{ bgcolor: OCHAKOVO_THEME.background, minHeight: '100vh', py: 3, userSelect: 'none' }}>
      <Container maxWidth="md">
        
        {/* Шапка */}
        <Paper elevation={3} sx={{ p: 2.5, mb: 3, textAlign: 'center', borderTop: `8px solid ${OCHAKOVO_THEME.primary}`, borderRadius: 0 }}>
          <Typography variant="h4" sx={{ color: OCHAKOVO_THEME.primary, fontWeight: 'black', letterSpacing: 1 }}>
            ОЧАКОВО: Конвейер Сортировки
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mt: 0.5 }}>
            Перетаскивайте бутылки мышкой прямо с движущейся ленты на правильные полки!
          </Typography>
        </Paper>

        {/* Статистика */}
        <Grid container spacing={2} sx={{ mb: 2.5 }}>
          <Grid item xs={6}>
            <Card sx={{ bgcolor: OCHAKOVO_THEME.primary, color: 'white', textAlign: 'center', borderRadius: 0 }}>
              <CardContent sx={{ py: '10px !important' }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Сортировано: {score}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6}>
            <Card sx={{ bgcolor: OCHAKOVO_THEME.secondary, color: '#000', textAlign: 'center', borderRadius: 0 }}>
              <CardContent sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: '10px !important', gap: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Ошибки:</Typography>
                {[...Array(3)].map((_, i) => (
                  <Favorite key={i} color={i < lives ? "error" : "disabled"} sx={{ fontSize: 26 }} />
                ))}
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* ИГРОВОЙ ЭКРАН */}
        <Paper 
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          elevation={5} 
          sx={{ 
            position: 'relative', 
            width: '100%', 
            height: 440, 
            bgcolor: '#EAEAEA', 
            overflow: 'hidden', 
            borderRadius: 0, // Убрали скругление экрана
            border: '3px solid #333',
            cursor: draggingInfo.current.id ? 'grabbing' : 'default'
          }}
        >
          {/* ГЛАВНОЕ МЕНЮ */}
          {gameState === 'menu' && (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: 2, p: 4, textAlign: 'center', bgcolor: 'rgba(253,251,247,0.95)', zIndex: 30, position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
              <Typography variant="h5" sx={{ fontWeight: 'bold', color: OCHAKOVO_THEME.primary }}>
                Запуск разливочного цеха
              </Typography>
              <Typography variant="body1" sx={{ maxW: 460, color: '#555' }}>
                Зажмите бутылку левой кнопкой мыши и переместите её наверх в правильный отсек, пока она не уплыла за экран.
              </Typography>
              <Button variant="contained" size="large" startIcon={<PlayArrow />} onClick={startGame} sx={{ bgcolor: OCHAKOVO_THEME.primary, '&:hover': { bgcolor: '#660000' }, px: 5, py: 1.5, fontSize: '1.1rem', fontWeight: 'bold', borderRadius: 0 }}>
                Начать работу
              </Button>
            </Box>
          )}

          {/* ИГРОВОЙ ПРОЦЕСС */}
          {gameState === 'playing' && (
            <>
              {/* Полки */}
              <Box sx={{ position: 'absolute', top: 15, left: 15, right: 15, height: 130, display: 'flex', gap: 2 }}>
                {PRODUCTS.map((p) => (
                  <Paper 
                    key={p.id}
                    elevation={3} 
                    sx={{ 
                      flex: 1, 
                      height: '100%', 
                      display: 'flex', 
                      flexDirection: 'column', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      bgcolor: p.color, 
                      borderRadius: 0, // Убрали скругление полок
                      border: `3px solid ${OCHAKOVO_THEME.secondary}`,
                      boxShadow: 'inset 0 0 15px rgba(0,0,0,0.5)',
                      p: 1,
                      boxSizing: 'border-box'
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', minHeight: 40 }}>
                      {p.icon}
                    </Box>
                    <Typography variant="subtitle2" sx={{ color: 'white', fontWeight: 'bold', textTransform: 'uppercase', fontSize: '0.75rem', mt: 0.5, textAlign: 'center', width: '100%' }}>
                      {p.name}
                    </Typography>
                  </Paper>
                ))}
              </Box>

              {/* Стрелочки-подсказки */}
              <Box sx={{ position: 'absolute', top: 155, left: 15, right: 15, color: '#777', pointerEvents: 'none', display: 'flex', gap: 2 }}>
                <Box sx={{ flex: 1, textAlign: 'center' }}>
                  <Typography variant="caption" sx={{ fontWeight: 'bold', fontSize: '0.75rem' }}>▲ Квас сюда ▲</Typography>
                </Box>
                <Box sx={{ flex: 1, textAlign: 'center' }}>
                  <Typography variant="caption" sx={{ fontWeight: 'bold', fontSize: '0.75rem' }}>▲ Лимонад сюда ▲</Typography>
                </Box>
                <Box sx={{ flex: 1, textAlign: 'center' }}>
                  <Typography variant="caption" sx={{ fontWeight: 'bold', fontSize: '0.75rem' }}>▲ Сок сюда ▲</Typography>
                </Box>
              </Box>

              {/* Горизонтальный Конвейер */}
              <Box 
                sx={{ 
                  position: 'absolute', 
                  bottom: 70, 
                  left: 0, 
                  right: 0, 
                  height: 75, 
                  bgcolor: OCHAKOVO_THEME.conveyor, 
                  borderTop: `6px solid ${OCHAKOVO_THEME.conveyorBorder}`,
                  borderBottom: `6px solid ${OCHAKOVO_THEME.conveyorBorder}`,
                  boxShadow: '0 8px 16px rgba(0,0,0,0.2), inset 0 0 20px #000',
                  pointerEvents: 'none'
                }}
              >
                {[...Array(12)].map((_, i) => (
                  <Box key={i} sx={{ width: 4, height: '100%', bgcolor: '#333', position: 'absolute', left: `${(i * 100) / 11}%` }} />
                ))}
              </Box>

              {/* Бутылки на конвейере */}
              {bottles.map((bottle) => (
                <Box
                  key={bottle.id}
                  onMouseDown={(e) => handleMouseDown(e, bottle)}
                  sx={{
                    position: 'absolute',
                    left: bottle.x,
                    top: bottle.y,
                    transform: 'translate(-50%, -50%)',
                    cursor: bottle.isDragging ? 'grabbing' : 'grab',
                    zIndex: bottle.isDragging ? 100 : 10,
                    touchAction: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 56,
                    height: 56,
                    borderRadius: '50%', // Сами бутылки оставляем круглыми для удобства
                    bgcolor: bottle.product.color,
                    border: bottle.isDragging ? `3px solid ${OCHAKOVO_THEME.secondary}` : '3px solid #fff',
                    boxShadow: bottle.isDragging ? '0 12px 24px rgba(0,0,0,0.4)' : '0 4px 8px rgba(0,0,0,0.3)',
                    willChange: 'left, top' 
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {bottle.product.icon}
                  </Box>
                </Box>
              ))}
            </>
          )}

          {/* КОНЕЦ ИГРЫ */}
          {gameState === 'gameover' && (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: 2, bgcolor: 'rgba(0,0,0,0.88)', color: 'white', zIndex: 50, position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
              <Typography variant="h3" sx={{ color: OCHAKOVO_THEME.secondary, fontWeight: 'black' }}>
                Смена Завершена
              </Typography>
              <Typography variant="h5">Ваш результат: {score} шт.</Typography>
              <Button variant="contained" startIcon={<Refresh />} onClick={startGame} sx={{ mt: 1, bgcolor: OCHAKOVO_THEME.primary, '&:hover': { bgcolor: '#660000' }, px: 4, py: 1.2, fontWeight: 'bold', borderRadius: 0 }}>
                Повторить смену
              </Button>
            </Box>
          )}
        </Paper>

      </Container>
    </Box>
  );
}
