import React, { useState, useEffect } from 'react';
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
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2, fontSize: '1.8rem', color: '#626366' }}>
        Лаборатория вкуса
      </Typography>
      <Typography sx={{ color: '#626366', fontSize: '0.9rem', mb: 4, lineHeight: 1.4, opacity: 0.85 }}>
        Выбери основу и три ингредиента. Получи вкус, которого ещё нет в линейке, — и карточку, которой можно похвастаться.
      </Typography>

      <Typography sx={{ fontWeight: 'bold', fontSize: '0.8rem', color: '#626366', mb: 1.5, letterSpacing: 0.5 }}>
        1. ОСНОВА
      </Typography>
      <Stack direction="row" spacing={1} sx={{ mb: 4, flexWrap: 'wrap', gap: 1 }}>
        {BASES.map((base) => (
          <Chip
            key={base}
            label={base}
            clickable
            onClick={() => setSelectedBase(base)}
            sx={{
              backgroundColor: selectedBase === base ? '#ED1940' : '#f0f0f0',
              color: selectedBase === base ? '#fff' : '#626366',
              fontWeight: 'bold',
              borderRadius: 0,
              fontSize: '0.9rem',
              px: 1,
              '&:hover': { backgroundColor: selectedBase === base ? '#d61236' : '#e4e4e4' }
            }}
          />
        ))}
      </Stack>

      <Typography sx={{ fontWeight: 'bold', fontSize: '0.8rem', color: '#626366', mb: 1.5, letterSpacing: 0.5 }}>
        2. ТРИ ИНГРЕДИЕНТА ({selectedIngredients.length}/3)
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
                backgroundColor: isSelected ? '#ED1940' : '#f0f0f0',
                color: isSelected ? '#fff' : '#626366',
                borderRadius: 0,
                fontSize: '0.9rem',
                px: 0.5,
                '&:hover': { backgroundColor: isSelected ? '#d61236' : '#e4e4e4' }
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
          py: 1.5,
          textTransform: 'none',
          fontWeight: 'bold',
          fontSize: '1rem',
          backgroundColor: '#ED1940',
          boxShadow: 'none',
          '&:hover': { backgroundColor: '#d61236', boxShadow: 'none' },
          '&:disabled': { backgroundColor: '#e4e4e4', color: '#a0a0a0' }
        }}
      >
        Создать вкус
      </Button>
    </Box>
  );
}

function TasteResultCard({ selectedBase, selectedIngredients, stats }) {
  const [batchNumber, setBatchNumber] = useState(162);

  useEffect(() => {
    setBatchNumber(Math.floor(Math.random() * 200) + 100);
  }, []);

  const mainIngredient = selectedIngredients || 'Вкусный';
  const formattedTitle = `${mainIngredient.slice(0, -1) + 'ный'} ${selectedBase.toLowerCase()}`;

  const renderStatRow = (label, value) => (
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
      <Typography sx={{ width: 100, color: '#fff', fontSize: '0.85rem', fontWeight: '500' }}>{label}</Typography>
      <Box sx={{ flexGrow: 1, mr: 2 }}>
        <LinearProgress 
          variant="determinate" 
          value={value * 10} 
          sx={{ 
            height: 6, 
            borderRadius: 0, 
            backgroundColor: 'rgba(255,255,255,0.3)',
            '& .MuiLinearProgress-bar': { backgroundColor: '#ED1940' }
          }}
        />
      </Box>
      <Typography sx={{ color: '#fff', fontSize: '0.85rem', width: 10, textAlign: 'right', fontWeight: 'bold' }}>{value}</Typography>
    </Box>
  );

  return (
    <Box sx={{ 
      background: 'linear-gradient(135deg, #93C019 0%, #769a14 100%)', 
      borderRadius: 0, 
      p: 3, 
      boxShadow: '0 4px 12px rgba(0,0,0,0.08)' 
    }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography sx={{ fontSize: '0.7rem', color: '#fff', letterSpacing: 0.5, opacity: 0.9 }}>
          ЛАБОРАТОРИЯ ВКУСА
        </Typography>
        <Typography sx={{ fontSize: '0.7rem', color: '#fff', fontWeight: 'bold' }}>
          ПАРТИЯ №{batchNumber}
        </Typography>
      </Box>

      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1, textTransform: 'capitalize', color: '#fff' }}>
        {formattedTitle}
      </Typography>

      <Typography sx={{ fontSize: '0.85rem', color: '#fff', mb: 3, lineHeight: 1.4, opacity: 0.95 }}>
        Твой личный вкус на основе «{selectedBase}»: {selectedIngredients.join(' + ')}. 
        Так рождаются новые позиции — от идеи до первой партии.
      </Typography>

      <Stack direction="row" spacing={1} sx={{ mb: 4, flexWrap: 'wrap', gap: 1 }}>
        {selectedIngredients.map(ing => (
          <Box key={ing} sx={{ 
            border: '1px solid #fff', 
            borderRadius: 0, 
            color: '#fff',
            px: 1.5, 
            py: 0.5, 
            fontSize: '0.75rem',
            fontWeight: '500'
          }}>
            {ing}
          </Box>
        ))}
      </Stack>

      <Box sx={{ mb: 4 }}>
        {renderStatRow('Кислинка', stats.sour)}
        {renderStatRow('Сладость', stats.sweet)}
        {renderStatRow('Пряность', stats.spicy)}
        {renderStatRow('Свежесть', stats.fresh)}
      </Box>
    </Box>
  );
}

const INGREDIENTS = [
  { name: 'Облепиха', stats: { sour: 7, sweet: 4, spicy: 2, fresh: 5 } },
  { name: 'Тархун', stats: { sour: 3, sweet: 5, spicy: 4, fresh: 7 } },
  { name: 'Лаванда', stats: { sour: 2, sweet: 3, spicy: 6, fresh: 5 } },
  { name: 'Имбирь', stats: { sour: 4, sweet: 2, spicy: 9, fresh: 4 } },
  { name: 'Чёрная смородина', stats: { sour: 8, sweet: 5, spicy: 1, fresh: 6 } },
  { name: 'Мята', stats: { sour: 1, sweet: 2, spicy: 3, fresh: 9 } },
  { name: 'Вишня', stats: { sour: 6, sweet: 6, spicy: 2, fresh: 4 } },
  { name: 'Кедровый орех', stats: { sour: 1, sweet: 4, spicy: 7, fresh: 2 } },
  { name: 'Апельсин', stats: { sour: 6, sweet: 7, spicy: 2, fresh: 7 } },
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
    <Box sx={{ backgroundColor: '#fafafa', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', p: 2 }}>
      <Paper sx={{ 
        width: '100%', 
        maxWidth: 480, 
        backgroundColor: '#ffffff', 
        borderRadius: 0, 
        p: 3, 
        color: '#626366',
        boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
        border: '1px solid #e4e4e4'
      }}>

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
          />
        )}

      </Paper>
    </Box>
  );
}
