// 1. Фирменная палитра "Очаково"
const OCHAKOVO_COLORS = {
  primary: '#8B0000',     // Темно-красный / бордовый
  secondary: '#D4AF37',   // Золотой
  text: '#1C1C1C',
  white: '#FFFFFF',
  success: '#2E7D32',     // Зеленый (для верного ответа)
  error: '#D32F2F'        // Красный (для ошибки)
};

// 2. Универсальный стиль для отключения скруглений
const squareStyles = {
  borderRadius: 0,
};

// 3. База вопросов квиза
const quizQuestions = [
  {
    id: 1,
    question: "Когда было запущено первое производство на комбинате «Очаково»?",
    options: ["В 1978 году (к Олимпиаде-80)", "В 1961 году", "В 1985 году", "В 1993 году"],
    correctAnswer: "В 1978 году (к Олимпиаде-80)"
  },
  {
    id: 2,
    question: "Внедрением какой инновационной упаковки компания «Очаково» первой совершила революцию на российском рынке?",
    options: ["Алюминиевые банки увеличенного объема", "ПЭТ-бутылки (пластиковая упаковка)", "Асептический картон (Тетра Пак)", "Стеклянные бутылки с бугельной пробкой"],
    correctAnswer: "ПЭТ-бутылки (пластиковая упаковка)"
  },
  {
    id: 3,
    question: "Почему в белом квасе «Семейный секрет» специально оставляют натуральный дрожжевой осадок?",
    options: ["Это технологическая ошибка, которую превратили в бренд", "Напиток не фильтруют, чтобы сохранить аутентичный деревенский вкус", "Осадок выделяется из-за добавления секретных средиземноморских трав", "Это необходимо для продления срока годности напитка в два раза"],
    correctAnswer: "Напиток не фильтруют, чтобы сохранить аутентичный деревенский вкус"
  },
  {
    id: 4,
    question: "Какой секретный ингредиент используется в линейке овощных соков «Goodini» для создания изысканного вкуса?",
    options: ["Средиземноморские травы и морская соль вместо поваренной", "Экстракт ржаного солода и горный мед", "Перец чили и сок дикого квашеного яблока", "Вытяжка из ягод черной смородины"],
    correctAnswer: "Средиземноморские травы и морская соль вместо поваренной"
  },
  {
    id: 5,
    question: "На какой исторический опыт опирались технологи компании при создании современной колы «CoolCola»?",
    options: ["На рецептуру американской колы начала XX века", "На опыт 1978 года, когда «Очаково» стал официальным производителем Pepsi-Cola в СССР", "На старинные советские ГОСТы для напитка «Байкал»", "На рецепт крафтовой колы, разработанный в Германии"],
    correctAnswer: "На опыт 1978 года, когда «Очаково» стал официальным производителем Pepsi-Cola в СССР"
  }
];

import React, { useState } from 'react';
import { Box, Typography, Button, Radio, RadioGroup, FormControlLabel, FormControl, Paper, Divider } from '@mui/material';

export default function OchakovoQuiz() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const currentQuestion = quizQuestions[currentQuestionIndex];

  const handleAnswerChange = (event) => {
    if (!isAnswerChecked) setSelectedAnswer(event.target.value);
  };

  const handleCheckAnswer = () => {
    setIsAnswerChecked(true);
    if (selectedAnswer === currentQuestion.correctAnswer) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    const nextQuestion = currentQuestionIndex + 1;
    if (nextQuestion < quizQuestions.length) {
      setCurrentQuestionIndex(nextQuestion);
      setSelectedAnswer('');
      setIsAnswerChecked(false);
    } else {
      setQuizFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer('');
    setIsAnswerChecked(false);
    setScore(0);
    setQuizFinished(false);
  };

  // Функция мгновенной подсветки правильных/неправильных ответов
  const getOptionStyles = (option) => {
    if (!isAnswerChecked) {
      return {
        borderColor: selectedAnswer === option ? OCHAKOVO_COLORS.primary : '#E0E0E0',
        backgroundColor: selectedAnswer === option ? '#FFF8F8' : 'transparent',
        '&:hover': { borderColor: OCHAKOVO_COLORS.secondary, backgroundColor: '#FFFDF5' }
      };
    }
    if (option === currentQuestion.correctAnswer) {
      return { borderColor: OCHAKOVO_COLORS.success, backgroundColor: '#E8F5E9', borderWidth: '2px' };
    }
    if (selectedAnswer === option && option !== currentQuestion.correctAnswer) {
      return { borderColor: OCHAKOVO_COLORS.error, backgroundColor: '#FFEBEE', borderWidth: '2px' };
    }
    return { borderColor: '#E0E0E0', backgroundColor: 'transparent', opacity: 0.6 };
  };

    // Отрендерить экран результатов, если квиз завершен
  if (quizFinished) {
    return (
      <Paper elevation={3} sx={{ p: 4, maxWidth: 600, mx: 'auto', my: 4, borderTop: `6px solid ${OCHAKOVO_COLORS.secondary}`, backgroundColor: OCHAKOVO_COLORS.white, ...squareStyles }}>
        <Typography variant="h4" component="h2" sx={{ color: OCHAKOVO_COLORS.primary, fontWeight: 'bold', mb: 2 }}>Квиз завершен!</Typography>
        <Divider sx={{ mb: 3 }} />
        <Typography variant="h6" sx={{ color: OCHAKOVO_COLORS.text, mb: 3 }}>
          Ваш результат: <strong>{score}</strong> из <strong>{quizQuestions.length}</strong> правильных ответов.
        </Typography>
        <Button variant="contained" onClick={handleRestart} sx={{ backgroundColor: OCHAKOVO_COLORS.primary, color: OCHAKOVO_COLORS.white, '&:hover': { backgroundColor: '#660000' }, textTransform: 'none', fontSize: '1rem', px: 4, py: 1, ...squareStyles }}>
          Пройти снова
        </Button>
      </Paper>
    );
  }

  // Основной экран вопроса
  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 600, mx: 'auto', my: 4, borderTop: `6px solid ${OCHAKOVO_COLORS.primary}`, backgroundColor: OCHAKOVO_COLORS.white, ...squareStyles }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="subtitle1" sx={{ color: OCHAKOVO_COLORS.secondary, fontWeight: 'bold', letterSpacing: 1 }}>ИСТОРИЯ И СЕКРЕТЫ «ОЧАКОВО»</Typography>
        <Typography variant="body2" sx={{ color: 'gray' }}>Вопрос {currentQuestionIndex + 1} из {quizQuestions.length}</Typography>
      </Box>
      <Divider sx={{ mb: 3 }} />
      <Typography variant="h6" component="h3" sx={{ color: OCHAKOVO_COLORS.text, fontWeight: 500, mb: 3 }}>{currentQuestion.question}</Typography>

      <FormControl component="fieldset" sx={{ width: '100%', mb: 3 }}>
        <RadioGroup value={selectedAnswer} onChange={handleAnswerChange}>
          {currentQuestion.options.map((option, index) => (
            <Box key={index} sx={{ border: '1px solid', mb: 1.5, p: 1, transition: 'all 0.2s ease', cursor: isAnswerChecked ? 'default' : 'pointer', ...getOptionStyles(option), ...squareStyles }}>
              <FormControlLabel value={option} disabled={isAnswerChecked} control={
                <Radio sx={{ color: '#C0C0C0', '&.Mui-checked': { color: option === currentQuestion.correctAnswer && isAnswerChecked ? OCHAKOVO_COLORS.success : OCHAKOVO_COLORS.primary }, '&.Mui-disabled': { color: isAnswerChecked && option === currentQuestion.correctAnswer ? OCHAKOVO_COLORS.success : undefined } }} />
              } label={option} sx={{ width: '100%', margin: 0, '& .MuiFormControlLabel-label': { color: OCHAKOVO_COLORS.text, fontSize: '0.95rem', fontWeight: isAnswerChecked && option === currentQuestion.correctAnswer ? 'bold' : 'normal' }, '&.Mui-disabled .MuiFormControlLabel-label': { color: OCHAKOVO_COLORS.text } }} />
            </Box>
          ))}
        </RadioGroup>
      </FormControl>

      {isAnswerChecked && (
        <Typography variant="body2" sx={{ mb: 2, fontWeight: 'bold', color: selectedAnswer === currentQuestion.correctAnswer ? OCHAKOVO_COLORS.success : OCHAKOVO_COLORS.error }}>
          {selectedAnswer === currentQuestion.correctAnswer ? '✓ Верно!' : '✗ Неверно.'}
        </Typography>
      )}

      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        {!isAnswerChecked ? (
          <Button variant="contained" disabled={!selectedAnswer} onClick={handleCheckAnswer} sx={{ backgroundColor: OCHAKOVO_COLORS.primary, color: OCHAKOVO_COLORS.white, '&:hover': { backgroundColor: '#660000' }, '&:disabled': { backgroundColor: '#E0E0E0', color: '#A0A0A0' }, textTransform: 'none', fontSize: '1rem', px: 4, py: 1, ...squareStyles }}>
            Проверить
          </Button>
        ) : (
          <Button variant="contained" onClick={handleNext} sx={{ backgroundColor: OCHAKOVO_COLORS.secondary, color: '#000000', '&:hover': { backgroundColor: '#B8952E' }, textTransform: 'none', fontSize: '1rem', px: 4, py: 1, ...squareStyles }}>
            {currentQuestionIndex === quizQuestions.length - 1 ? 'Завершить' : 'Далее'}
          </Button>
        )}
      </Box>
    </Paper>
  );
}