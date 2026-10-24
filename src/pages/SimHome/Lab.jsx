import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router";
import { 
  Box, 
  Typography, 
  Button, 
  Chip, 
  LinearProgress, 
  Paper, 
  IconButton, 
  Stack 
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const BASES = ['Квас', 'Лимонад', 'Морс'];

function TasteSelector({ 
  ingredientsList, 
  selectedBase, 
  setSelectedBase, 
  selectedIngredients, 
  onIngredientClick, 
  onCalculate 
}) {
  return (
    <Box sx={{ borderRadius: 0 }}>
      <Typography sx={{ color: '#ED1940', fontSize: '0.75rem', fontWeight: '800', letterSpacing: 1.5, mb: 1, textTransform: 'uppercase' }}>
        R&D • ОТДЕЛ РАЗРАБОТКИ
      </Typography>
      <Typography variant="h4" sx={{ fontWeight: '900', mb: 1.5, fontSize: '2rem', color: '#626366', letterSpacing: '-0.5px' }}>
        Лаборатория вкуса
      </Typography>
      <Typography sx={{ color: '#626366', fontSize: '0.9rem', mb: 4, lineHeight: 1.5, opacity: 0.85 }}>
        Спроектируйте уникальный сигнатурный напиток. Выберите базовый экстракт и ровно три активных вкусовых компонента, чтобы рассчитать финальный профиль купажа.
      </Typography>

      <Typography sx={{ fontWeight: '800', fontSize: '0.8rem', color: '#626366', mb: 1.5, letterSpacing: 0.5 }}>
        [01] ВЫБОР БАЗОВОГО ЭКСТРАКТА
      </Typography>
      <Stack direction="row" spacing={1} sx={{ mb: 4, flexWrap: 'wrap', gap: 1 }}>
        {BASES.map((base) => (
          <Chip
            key={base}
            label={base}
            clickable
            onClick={() => setSelectedBase(base)}
            sx={{
              backgroundColor: selectedBase === base ? '#ED1940' : '#ffffff',
              color: selectedBase === base ? '#fff' : '#626366',
              border: `2px solid ${selectedBase === base ? '#ED1940' : '#626366'}`,
              fontWeight: 'bold',
              borderRadius: 0,
              fontSize: '0.9rem',
              px: 1,
              '&:hover': { backgroundColor: selectedBase === base ? '#d61236' : '#f5f5f5' }
            }}
          />
        ))}
      </Stack>

      <Typography sx={{ fontWeight: '800', fontSize: '0.8rem', color: '#626366', mb: 1.5, letterSpacing: 0.5 }}>
        [02] КАЛИБРОВКА РЕЦЕПТУРЫ ({selectedIngredients.length} из 3)
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, mb: 4 }}>
        {ingredientsList.map((ing) => {
          const isSelected = selectedIngredients.includes(ing.name);
          return (
            <Chip
              key={ing.name}
              label={ing.name}
              clickable
              onClick={() => onIngredientClick(ing.name)}
              sx={{
                backgroundColor: isSelected ? '#ED1940' : '#ffffff',
                color: isSelected ? '#fff' : '#626366',
                border: `2px solid ${isSelected ? '#ED1940' : '#e4e4e4'}`,
                borderRadius: 0,
                fontSize: '0.9rem',
                px: 0.5,
                '&:hover': { backgroundColor: isSelected ? '#d61236' : '#f5f5f5' }
              }}
            />
          );
        })}
      </Box>

      <Button
        fullWidth
        variant="contained"
        disabled={!selectedBase || selectedIngredients.length !== 3}
        onClick={onCalculate}
        sx={{
          borderRadius: 0,
          py: 2,
          textTransform: 'uppercase',
          fontWeight: '800',
          fontSize: '0.95rem',
          backgroundColor: '#ED1940',
          boxShadow: 'none',
          letterSpacing: 1,
          '&:hover': { backgroundColor: '#d61236', boxShadow: 'none' },
          '&:disabled': { backgroundColor: '#ffffff', color: '#a0a0a0', border: '2px solid #e4e4e4' }
        }}
      >
        Запустить синтез вкуса
      </Button>
    </Box>
  );
}

function TasteResultCard({ selectedBase, selectedIngredients, stats, onRestart }) {
  const [batchNumber, setBatchNumber] = useState(162);
  const navigate = useNavigate();
  useEffect(() => {
    setBatchNumber(Math.floor(Math.random() * 900) + 100);
  }, []);

  const mainIngredient = selectedIngredients || 'Вкусный';
  const formattedTitle = `${mainIngredient.slice(0, -1) + 'ный'} ${selectedBase.toLowerCase()}`;

  const renderStatRow = (label, value) => (
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
      <Typography sx={{ width: 110, color: '#626366', fontSize: '0.85rem', fontWeight: 'bold' }}>{label}</Typography>
      <Box sx={{ flexGrow: 1, mr: 2 }}>
        <LinearProgress 
          variant="determinate" 
          value={value * 10} 
          sx={{ 
            height: 8, 
            borderRadius: 0, 
            backgroundColor: '#f0f0f0',
            border: '1px solid #e4e4e4',
            '& .MuiLinearProgress-bar': { backgroundColor: '#93C019' }
          }}
        />
      </Box>
      <Typography sx={{ color: '#626366', fontSize: '0.85rem', width: 20, textAlign: 'right', fontWeight: '900' }}>{value}/10</Typography>
    </Box>
  );

  return (
    <Box sx={{ 
      backgroundColor: '#ffffff',
      border: '2px solid #626366',
      borderRadius: 0, 
      p: 3 
    }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2.5, pb: 1, borderBottom: '1px dashed #e4e4e4' }}>
        <Typography sx={{ fontSize: '0.7rem', color: '#ED1940', letterSpacing: 1, fontWeight: '800' }}>
          ПРОТОКОЛ ИСПЫТАНИЙ
        </Typography>
        <Typography sx={{ fontSize: '0.7rem', color: '#626366', fontWeight: 'bold' }}>
          ТЕСТОВЫЙ КУПАЖ №{batchNumber}
        </Typography>
      </Box>

      <Typography variant="h4" sx={{ fontWeight: '900', mb: 1.5, textTransform: 'uppercase', color: '#626366', fontSize: '1.6rem' }}>
        {formattedTitle}
      </Typography>

      <Typography sx={{ fontSize: '0.85rem', color: '#626366', mb: 4, lineHeight: 1.5, opacity: 0.9 }}>
        Рецептура успешно утверждена. Физико-химический профиль на базе матрицы «{selectedBase}» сформирован с интеграцией экстрактов: {selectedIngredients.join(', ')}. Данная органолептическая позиция готова к мелкосерийному производству.
      </Typography>

      {/* Сенсорный анализ */}
      <Typography sx={{ fontWeight: '800', fontSize: '0.75rem', color: '#626366', mb: 2, letterSpacing: 0.5 }}>
        РЕЗУЛЬТАТЫ СЕНСОРНОГО АНАЛИЗА:
      </Typography>
      <Box sx={{ mb: 4, p: 2, backgroundColor: '#fafafa', border: '1px solid #e4e4e4' }}>
        {renderStatRow('Кислотность', stats.sour)}
        {renderStatRow('Сладость', stats.sweet)}
        {renderStatRow('Пряность', stats.spicy)}
        {renderStatRow('Свежесть', stats.fresh)}
      </Box>

      <Stack spacing={2}>

        <Button 
          fullWidth 
          variant="contained" 
          onClick={onRestart}
          sx={{ 
            backgroundColor: '#ED1940', 
            color: '#fff', 
            borderRadius: 0, 
            textTransform: 'uppercase', 
            fontWeight: '800',
            boxShadow: 'none',
            py: 1.5,
            '&:hover': { backgroundColor: '#d61236', boxShadow: 'none' }
          }}
        >
          Новый эксперимент
        </Button>

        <Button 
          fullWidth 
          variant="contained" 
          onClick={() => navigate("/testques")}
          sx={{ 
            backgroundColor: '#ED1940', 
            color: '#fff', 
            borderRadius: 0, 
            textTransform: 'uppercase', 
            fontWeight: '800',
            boxShadow: 'none',
            py: 1.5,
            '&:hover': { backgroundColor: '#d61236', boxShadow: 'none' }
          }}
        >
          К Анкете
        </Button>
      </Stack>
    </Box>
  );
}

const INGREDIENTS = [
  { name: 'Брусника', stats: { sour: 8, sweet: 3, spicy: 1, fresh: 5 } },
  { name: 'Чабрец', stats: { sour: 1, sweet: 2, spicy: 6, fresh: 7 } },
  { name: 'Мелисса', stats: { sour: 2, sweet: 4, spicy: 2, fresh: 9 } },
  { name: 'Корица', stats: { sour: 1, sweet: 6, spicy: 8, fresh: 2 } },
  { name: 'Черника', stats: { sour: 4, sweet: 7, spicy: 1, fresh: 4 } },
  { name: 'Базилик', stats: { sour: 3, sweet: 3, spicy: 5, fresh: 7 } },
  { name: 'Клюква', stats: { sour: 9, sweet: 2, spicy: 2, fresh: 6 } },
  { name: 'Лайм', stats: { sour: 8, sweet: 4, spicy: 1, fresh: 8 } },
  { name: 'Малина', stats: { sour: 5, sweet: 8, spicy: 1, fresh: 5 } },
];

export default function Lab() {
  const [selectedBase, setSelectedBase] = useState('');
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [isCreated, setIsCreated] = useState(false);

  const handleIngredientClick = (ingName) => {
    if (selectedIngredients.includes(ingName)) {
      setSelectedIngredients(selectedIngredients.filter(item => item !== ingName));
    } else {
      if (selectedIngredients.length < 3) {
        setSelectedIngredients([...selectedIngredients, ingName]);
      }
    }
  };

  const handleBack = () => {
    setIsCreated(false);
    setSelectedBase('');
    setSelectedIngredients([]);
  };

  const calculateStats = () => {
    const defaultStats = { sour: 4, sweet: 4, spicy: 1, fresh: 4 };
    if (selectedIngredients.length === 0) return defaultStats;

    const totals = selectedIngredients.reduce((acc, ingName) => {
      const ing = INGREDIENTS.find(i => i.name === ingName);
      if (ing) {
        acc.sour += ing.stats.sour;
        acc.sweet += ing.stats.sweet;
        acc.spicy += ing.stats.spicy;
        acc.fresh += ing.stats.fresh;
      }
      return acc;
    }, { sour: 0, sweet: 0, spicy: 0, fresh: 0 });

    return {
      sour: Math.min(10, Math.max(1, Math.round(totals.sour / selectedIngredients.length))),
      sweet: Math.min(10, Math.max(1, Math.round(totals.sweet / selectedIngredients.length))),
      spicy: Math.min(10, Math.max(1, Math.round(totals.spicy / selectedIngredients.length))),
      fresh: Math.min(10, Math.max(1, Math.round(totals.fresh / selectedIngredients.length))),
    };
  };

  return (
    <Box sx={{ backgroundColor: '#f5f5f5', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', p: 2 }}>
      <Paper sx={{ 
        width: '100%', 
        maxWidth: 480, 
        backgroundColor: '#ffffff', 
        borderRadius: 0, 
        p: 4, 
        color: '#626366',
        boxShadow: 'none',
        border: '2px solid #626366'
      }}>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography sx={{ flexGrow: 1, textAlign: 'center', fontWeight: '800', fontSize: '0.85rem', color: '#626366', letterSpacing: 1 }}>
            ИСПЫТАНИЕ 04 / 06
          </Typography>
          <Box sx={{ backgroundColor: '#ffffff', border: '2px solid #ED1940', px: 1.5, py: 0.5, borderRadius: 0, fontWeight: '900', color: '#ED1940', fontSize: '0.85rem' }}>
            СТАТУС: ОК
          </Box>
        </Box>

        {!isCreated ? (
          <TasteSelector 
            ingredientsList={INGREDIENTS}
            selectedBase={selectedBase}
            setSelectedBase={setSelectedBase}
            selectedIngredients={selectedIngredients}
            onIngredientClick={handleIngredientClick}
            onCalculate={() => setIsCreated(true)}
          />
        ) : (
          <TasteResultCard 
            selectedBase={selectedBase}
            selectedIngredients={selectedIngredients}
            stats={calculateStats()}
            onRestart={handleBack}
          />
        )}

      </Paper>
    </Box>
  );
}
