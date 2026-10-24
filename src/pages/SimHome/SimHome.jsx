import React from 'react';
import { 
  Box, 
  Grid, 
  Card, 
  CardContent, 
  CardActionArea, 
  Typography, 
  Container 
} from '@mui/material';
import { BottlingShopIcon } from "@/pages/Index/ui/BottlingShopIcon";
import { TechWorkshopIcon } from "@/pages/Index/ui/TechWorkshopIcon";
import { LaboratoryIcon } from "@/pages/Index/ui/LaboratoryIcon";

const cardsData = [
  {
    id: 'lad',
    category: 'Лаборатория вкуса',
    title: 'R&D ОТДЕЛ РАЗРАБОТКИ"',
    description: 'Спроектируйте уникальный сигнатурный напиток.',
    footerText: 'Роль: Лаборант',
    isFooterBold: true,
    icon: LaboratoryIcon, 
  },
  {
    id: 'conveyor',
    category: 'Инженерия & АСУ ТП',
    title: 'Управление конвейером',
    description: 'Настрой скорость линии розлива, откалибруй датчики и устрани сбой в работе роботов-упаковщиков.',
    footerText: 'Роль: Инженер-наладчик',
    isFooterBold: false,
    icon: BottlingShopIcon,
  },
  {
    id: 'brew',
    category: 'Лаборатория & R&D',
    title: 'Варка кваса',
    description: 'Скомпонуй идеальные натуральные ингредиенты, выдержи температурный режим и создай рецепт кваса.',
    footerText: 'Роль: Химик-технолог',
    isFooterBold: false,
    icon: TechWorkshopIcon,
  }
];

export function SimHome() {
  
  const handleCardClick = (cardId) => {
    console.log(`Кликнули по карточке: ${cardId}`);
  };

  return (
    <Box sx={{ bgcolor: '#fdfdfd', py: 6, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Container maxWidth="lg" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
        {/* Заголовок секции по центру */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography 
            variant="h4" 
            component="h2" 
            sx={{ 
              fontWeight: 800, 
              color: '#212121', 
              textTransform: 'uppercase', 
              mb: 1 
            }}
          >
            НЕ ПРОСТО <span style={{ color: '#E30613' }}>КВАС</span>.<br />
            ТВОЙ КАРЬЕРНЫЙ СТАРТ В ОЧАКОВО
          </Typography>
          <Typography variant="body1" sx={{ color: '#666', maxWidth: 600, mx: 'auto', mt: 2 }}>
            Современное производство и технологии! Пройди мини-игры, набери баллы за точность и скорость, и получи прямой оффер на стажировку или фирменный мерч.
          </Typography>
        </Box>

        {/* Сетка с карточками, центрированная по горизонтали */}
        <Grid 
          container 
          spacing={4} 
          justifyContent="center" 
          alignItems="stretch"
          sx={{ maxWidth: '100%', mx: 'auto' }}
        >
          {cardsData.map((card) => (
            <Grid 
              item 
              xs={12} 
              sm={6} 
              md={4} 
              key={card.id} 
              sx={{ display: 'flex', justifyContent: 'center' }} // Центрирует саму карточку внутри своей колонки
            >
              <Card 
                elevation={0}
                sx={{ 
                  width: '100%',
                  maxWidth: 360, // Ограничение максимальной ширины карточки для красивого баланса по центру
                  borderRadius: 4, 
                  bgcolor: '#f5f5f5', 
                  transition: 'transform 0.2s, boxShadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.06)'
                  }
                }}
              >
                <CardActionArea 
                  onClick={() => handleCardClick(card.id)}
                  sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'stretch',
                    justifyContent: 'flex-start',
                    p: 3
                  }}
                >
                  {/* Контейнер для изображения */}
                  <Box 
                    sx={{ 
                      height: 120, 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      mb: 2
                    }}
                  >
                    <img 
                      src={card.image} 
                      alt={card.title} 
                      style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} 
                    />
                  </Box>

                  {/* Текстовый контент карточки */}
                  <CardContent sx={{ p: 0, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <Typography 
                      variant="caption" 
                      sx={{ color: '#888', fontWeight: 500, mb: 0.5 }}
                    >
                      {card.category}
                    </Typography>
                    
                    <Typography 
                      variant="h6" 
                      component="h3" 
                      sx={{ fontWeight: 700, color: '#212121', mb: 1.5 }}
                    >
                      {card.title}
                    </Typography>
                    
                    <Typography 
                      variant="body2" 
                      sx={{ color: '#555', lineHeight: 1.6, mb: 3, flexGrow: 1 }}
                    >
                      {card.description}
                    </Typography>

                    {/* Нижняя строка (Награда / Роль) */}
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: '#212121', 
                        fontWeight: card.isFooterBold ? 700 : 600,
                        mt: 'auto' 
                      }}
                    >
                      {card.footerText}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
