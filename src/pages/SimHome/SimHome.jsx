import React from 'react';
import { useNavigate } from 'react-router';
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  Typography,
  Container,
  Button
} from '@mui/material';


const cardsData = [
  {
    id: 'lab',
    category: 'Лаборатория вкуса',
    title: 'R&D ОТДЕЛ РАЗРАБОТКИ',
    description: 'Спроектируйте уникальный сигнатурный напиток.',
    footerText: 'Роль: Лаборант',
    isFooterBold: true,
    path: '/Lab', // Роут на конструктор напитка из App.jsx
    image: '/image (1) 3.png', // Лаборатория с танками
  },
  {
    id: 'conveyor',
    category: 'Инженерия & АСУ ТП',
    title: 'Управление конвейером',
    description: 'Настрой скорость линии розлива, откалибруй датчики и устрани сбой в работе роботов-упаковщиков.',
    footerText: 'Роль: Инженер-наладчик',
    isFooterBold: false,
    path: '/conveyor', // Роут на сортировку бутылок
    image: '/image (1) 1.png', // Цех с трубами
  },
  {
    id: 'brew',
    category: 'Лаборатория & R&D',
    title: 'Варка кваса',
    description: 'Скомпонуй идеальные натуральные ингредиенты, выдержи температурный режим и создай рецепт кваса.',
    footerText: 'Роль: Химик-технолог',
    isFooterBold: false,
    path: '/brew', // Роут на варку кваса с температурой
    image: '/image (1) 2.png', // Технологический корпус Очаково
  }
];


export function SimHome() {
  const navigate = useNavigate();


  return (
    <Box
      sx={{
        minHeight: '100vh',
        py: { xs: 4, md: 7 },
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        // Инженерная миллиметровая сетка
        backgroundImage: `
          linear-gradient(to right, rgba(0, 0, 0, 0.05) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(0, 0, 0, 0.05) 1px, transparent 1px)
        `,
        backgroundSize: '24px 24px',
      }}
    >
      <Container maxWidth="lg" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
       
        {/* Заголовок секции по центру */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            variant="h4"
            component="h2"
            sx={{
              fontWeight: 900,
              color: '#18181B',
              textTransform: 'uppercase',
              fontSize: { xs: '24px', sm: '32px', md: '40px' },
              lineHeight: 1.15,
              letterSpacing: '-0.5px',
              mb: 1.5
            }}
          >
            НЕ ПРОСТО <span style={{ color: '#E30613' }}>КВАС</span>.<br />
            ТВОЙ КАРЬЕРНЫЙ СТАРТ В ОЧАКОВО
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: '#52525B',
              maxWidth: 620,
              mx: 'auto',
              fontSize: { xs: '14px', md: '15px' },
              lineHeight: 1.6
            }}
          >
            Современное производство и технологии! Пройди мини-игры, набери баллы за точность и скорость, и получи прямой оффер на стажировку или фирменный мерч.
          </Typography>
        </Box>


        {/* Сетка с 3 карточками */}
        <Grid
          container
          spacing={3.5}
          justifyContent="center"
          alignItems="stretch"
          sx={{ maxWidth: '100%', mx: 'auto', mb: 8 }}
        >
          {cardsData.map((card) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={card.id}
              sx={{ display: 'flex', justifyContent: 'center' }}
            >
              <Card
                elevation={0}
                sx={{
                  width: '100%',
                  maxWidth: 360,
                  borderRadius: '24px',
                  bgcolor: '#F4F4F5',
                  border: '1.5px solid #E4E4E7',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.25s ease',
                  '&:hover': {
                    bgcolor: '#FFFFFF',
                    borderColor: '#E30613',
                    transform: 'translateY(-6px)',
                    boxShadow: '0 16px 32px rgba(227, 6, 19, 0.08)'
                  }
                }}
              >
                <CardActionArea
                  onClick={() => navigate(card.path)}
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'stretch',
                    justifyContent: 'flex-start',
                    p: 3
                  }}
                >
                  {/* Иконка пальца/клика из Фигмы */}
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 16,
                      right: 16,
                      fontSize: '18px',
                      opacity: 0.5,
                      userSelect: 'none',
                    }}
                  >
                    👆
                  </Box>


                  {/* Контейнер для картинки здания */}
                  <Box
                    sx={{
                      height: 130,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 2.5
                    }}
                  >
                    <Box
                      component="img"
                      src={card.image}
                      alt={card.title}
                      sx={{
                        maxHeight: '100%',
                        maxWidth: '100%',
                        objectFit: 'contain',
                        imageRendering: 'pixelated',
                        filter: 'drop-shadow(0 6px 12px rgba(0,0,0,0.12))',
                        transition: 'transform 0.25s ease',
                        '.MuiCardActionArea-root:hover &': {
                          transform: 'scale(1.06)',
                        }
                      }}
                    />
                  </Box>


                  {/* Текстовый контент карточки */}
                  <CardContent sx={{ p: 0, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <Typography
                      variant="caption"
                      sx={{
                        color: '#71717A',
                        fontWeight: 700,
                        fontSize: '11px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        mb: 0.5
                      }}
                    >
                      {card.category}
                    </Typography>
                   
                    <Typography
                      variant="h6"
                      component="h3"
                      sx={{
                        fontWeight: 900,
                        color: '#18181B',
                        fontSize: '18px',
                        lineHeight: 1.25,
                        mb: 1.5
                      }}
                    >
                      {card.title}
                    </Typography>
                   
                    <Typography
                      variant="body2"
                      sx={{
                        color: '#52525B',
                        lineHeight: 1.55,
                        fontSize: '13px',
                        mb: 3,
                        flexGrow: 1
                      }}
                    >
                      {card.description}
                    </Typography>


                    {/* Нижняя строка роли */}
                    <Box sx={{ pt: 1.5, borderTop: '1px solid #E4E4E7' }}>
                      <Typography
                        variant="body2"
                        sx={{
                          color: '#18181B',
                          fontWeight: card.isFooterBold ? 800 : 700,
                          fontSize: '13px'
                        }}
                      >
                        {card.footerText}
                      </Typography>
                    </Box>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>


        {/* Нижний черный баннер заявки из Фигмы */}
        <Box
          sx={{
            width: '100%',
            maxWidth: 1100,
            background: '#18181B',
            borderRadius: '20px',
            p: { xs: 3, md: 3.5 },
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2.5,
            boxShadow: '0 16px 36px rgba(0,0,0,0.16)',
          }}
        >
          <Box>
            <Typography sx={{ color: '#FFFFFF', fontSize: '18px', fontWeight: 800, mb: 0.5 }}>
              Уже знаешь, кем хочешь быть?
            </Typography>
            <Typography sx={{ color: '#A1A1AA', fontSize: '13.5px' }}>
              Подай упрощенную заявку без резюме — мы подберем направление под твой профиль и курс колледжа или вуза.
            </Typography>
          </Box>
          <Button
            onClick={() => navigate('/students')}
            sx={{
              background: '#D7001E',
              color: '#FFFFFF',
              px: 3.5,
              py: 1.3,
              borderRadius: '10px',
              fontSize: '14px',
              fontWeight: 800,
              textTransform: 'none',
              flexShrink: 0,
              boxShadow: '0 4px 14px rgba(215, 0, 30, 0.4)',
              '&:hover': { background: '#B00018' },
            }}
          >
            Подать заявку
          </Button>
        </Box>


      </Container>
    </Box>
  );
}

