import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  Box,
  Typography,
  Button,
  Card,
  Chip,
  GlobalStyles,
} from '@mui/material';

export function Index() {
  const navigate = useNavigate();
  const userEmail = localStorage.getItem('ochakovo_user_email');
  const [selectedRole, setSelectedRole] = useState(0);

  const handleLogout = () => {
    localStorage.removeItem('ochakovo_user_email');
    window.location.reload();
  };

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const roles = [
    {
      title: 'МАШИНИСТ ОБОРУДОВАНИЯ',
      salary: 'от 70.000 ₽',
      dept: 'Цех розлива',
      desc: 'Управление автоматическими линиями розлива KHS и Sidel. Контроль параметров выдува бутылок, укупорки и этикетировки.',
      icon: '⚙️',
    },
    {
      title: 'ОПЕРАТОР ВАРОЧНОГО ЦЕХА',
      salary: 'от 70.000 ₽',
      dept: 'Цех варки сусла',
      desc: 'Ведение технологического процесса варки квасного сусла и контроль непрерывного естественного брожения в танках.',
      icon: '🏭',
    },
    {
      title: 'ЛАБОРАНТ КОНТРОЛЯ КАЧЕСТВА',
      salary: 'от 60.000 ₽',
      dept: 'R&D Лаборатория',
      desc: 'Входной контроль натурального зернового сырья и физико-химический экспресс-анализ готовой продукции по ГОСТ.',
      icon: '🔬',
    },
  ];

  return (
    <Box
      id="ochakovo-landing"
      sx={{
        width: '100%',
        minHeight: '100vh',
        pb: 12,
        color: '#18181B',
        fontFamily: '"Montserrat", "Roboto", "Helvetica", sans-serif',
      }}
    >
      {/* Скрываем дубликаты хедера из внешних слоев */}
      <GlobalStyles
        styles={{
          'div:has(+ #ochakovo-landing)': { display: 'none !important' },
          'header': { display: 'none !important' },
        }}
      />

      {/* ================= 1. ХЕДЕР ТОЧНО КАК В ФИГМЕ ================= */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          mb: { xs: 5, md: 8 },
          pt: 0,
        }}
      >
        {/* ЛОГОТИП СЛЕВА */}
        <Box
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          sx={{ display: 'flex', alignItems: 'baseline', gap: 0.8, cursor: 'pointer', pt: 2 }}
        >
          <Typography
            sx={{
              color: '#D7001E',
              fontWeight: 900,
              fontSize: { xs: '20px', md: '24px' },
              letterSpacing: '-0.5px',
            }}
          >
            ОЧАКОВО
          </Typography>
          <Typography
            sx={{
              color: '#D7001E',
              fontWeight: 700,
              fontSize: { xs: '15px', md: '18px' },
            }}
          >
            карьера
          </Typography>
        </Box>

        {/* ЦЕНТРАЛЬНАЯ КРАСНАЯ ПЛАШКА ВЕРХНЕГО КРАЯ */}
        <Box
          sx={{
            background: '#D7001E',
            px: { xs: 3, md: 6 },
            py: 1.4,
            borderRadius: '0 0 16px 16px',
            boxShadow: '0 4px 14px rgba(215, 0, 30, 0.25)',
            display: { xs: 'none', sm: 'flex' },
            gap: { xs: 2.5, md: 4.5 },
            alignItems: 'center',
          }}
        >
          <Typography
            onClick={() => scrollTo('history')}
            sx={{
              color: '#FFFFFF',
              fontWeight: 800,
              fontSize: '15px',
              cursor: 'pointer',
              '&:hover': { opacity: 0.85 },
            }}
          >
            История
          </Typography>
          <Typography
            onClick={() => scrollTo('roles')}
            sx={{
              color: '#FFFFFF',
              fontWeight: 800,
              fontSize: '15px',
              cursor: 'pointer',
              '&:hover': { opacity: 0.85 },
            }}
          >
            Вакансии
          </Typography>
          <Typography
            onClick={() => scrollTo('benefits')}
            sx={{
              color: '#FFFFFF',
              fontWeight: 800,
              fontSize: '15px',
              cursor: 'pointer',
              '&:hover': { opacity: 0.85 },
            }}
          >
            О компании
          </Typography>
        </Box>

        {/* КНОПКА ВОЙТИ СПРАВА */}
        <Box sx={{ pt: 1.8 }}>
          {userEmail ? (
            <Button
              onClick={handleLogout}
              sx={{
                fontSize: '12px',
                fontWeight: 800,
                px: 2.2,
                py: 0.8,
                borderRadius: '9999px',
                color: '#EF4444',
                background: '#FEF2F2',
                border: '1px solid #FEE2E2',
                '&:hover': { background: '#FEE2E2' },
              }}
            >
              Выйти
            </Button>
          ) : (
            <Button
              onClick={() => navigate('/')}
              sx={{
                background: '#09090B',
                color: '#FFFFFF',
                borderRadius: '9999px',
                px: { xs: 3.5, md: 4.5 },
                py: 1.1,
                fontSize: '14px',
                fontWeight: 900,
                letterSpacing: '0.5px',
                textTransform: 'uppercase',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                '&:hover': { background: '#27272A' },
              }}
            >
              ВОЙТИ
            </Button>
          )}
        </Box>
      </Box>

      {/* ================= 2. HERO + 3 ЗДАНИЯ ТРЕУГОЛЬНИКОМ ================= */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', lg: 'row' },
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: { xs: 5, lg: 4 },
          mb: { xs: 8, md: 12 },
        }}
      >
        {/* Текстовая колонка слева */}
        <Box sx={{ maxWidth: { xs: '100%', lg: 580 } }}>
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              backgroundColor: '#FCE8E9',
              borderRadius: '3px',
              borderLeft: '4px solid #E30613',
              pl: 1,
              pr: 1.5,
              py: 0.4,
              mb: 2.5,
            }}
          >
            <Typography sx={{ fontWeight: 900, color: '#E30613', fontSize: '12px', letterSpacing: '0.05em' }}>
              #ОЧАКОВО_КАРЬЕРА
            </Typography>
          </Box>

          <Typography
            sx={{
              color: '#18181B',
              fontWeight: 900,
              fontSize: { xs: '32px', sm: '44px', md: '52px' },
              lineHeight: 1.12,
              mb: 3,
              textTransform: 'uppercase',
              letterSpacing: '-0.5px',
            }}
          >
            НЕ ПРОСТО{' '}
            <Box component="span" sx={{ textDecoration: 'underline', textUnderlineOffset: '6px' }}>
              КВАС.
            </Box>
            <br />
            ТВОЙ КАРЬЕРНЫЙ СТАРТ
            <br />В ОЧАКОВО
          </Typography>

          <Typography sx={{ fontSize: '15px', color: '#3F3F46', lineHeight: 1.6, mb: 4, maxWidth: 520 }}>
            Узнай, какое{' '}
            <Box component="span" sx={{ color: '#65A30D', fontWeight: 700 }}>
              направление
            </Box>{' '}
            на производстве подходит тебе больше всего.
            <br /><br />
            Пройди{' '}
            <Box component="span" sx={{ color: '#65A30D', fontWeight: 700 }}>
              интерактивный тест
            </Box>
            , изучи{' '}
            <Box component="span" sx={{ color: '#65A30D', fontWeight: 700 }}>
              карьерные возможности
            </Box>{' '}
            и получи приглашение на{' '}
            <Box component="span" sx={{ color: '#65A30D', fontWeight: 700 }}>
              стажировку
            </Box>{' '}
            в Очаково.
          </Typography>

          <Button
            onClick={() => scrollTo('game-center')}
            sx={{
              background: '#D7001E',
              color: '#FFFFFF',
              px: 3.8,
              py: 1.4,
              fontSize: '15px',
              fontWeight: 800,
              borderRadius: '6px',
              textTransform: 'none',
              boxShadow: '0 8px 20px rgba(215, 0, 30, 0.3)',
              '&:hover': { background: '#B00018' },
            }}
          >
            Присоединиться к команде
          </Button>
        </Box>

        {/* 3 ЗДАНИЯ ИЗ ФИГМЫ В ТОЧНОЙ РАСКЛАДКЕ (БЕЗ КПП) */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: { xs: 2.5, sm: 3 },
            alignItems: 'center',
            justifyItems: 'center',
            width: '100%',
            maxWidth: 440,
          }}
        >
          {/* Пустая ячейка (1,1) для смещения Лаборатории вправо */}
          <Box sx={{ display: { xs: 'none', sm: 'block' } }} />

          {/* 1. Верхнее правое: ЛАБОРАТОРИЯ */}
          <Box
            onClick={() => navigate('/brew')}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              cursor: 'pointer',
              transition: 'transform 0.25s ease',
              '&:hover': {
                transform: 'translateY(-6px)',
                '& .b-text': { color: '#E30613' },
              },
            }}
          >
            <Box
              component="img"
              src="/image (1) 3.png"
              alt="Лаборатория"
              sx={{ width: { xs: 120, md: 150 }, imageRendering: 'pixelated' }}
            />
            <Typography
              className="b-text"
              sx={{
                mt: 1,
                fontSize: '13px',
                fontWeight: 800,
                color: '#18181B',
                textAlign: 'center',
                transition: 'color 0.2s',
              }}
            >
              Лаборатория
            </Typography>
          </Box>

          {/* 2. Посередине левое: ТЕХНОЛОГИЧЕСКИЙ ЦЕХ */}
          <Box
            onClick={() => scrollTo('roles')}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              cursor: 'pointer',
              transition: 'transform 0.25s ease',
              '&:hover': {
                transform: 'translateY(-6px)',
                '& .b-text': { color: '#E30613' },
              },
            }}
          >
            <Box
              component="img"
              src="/image (1) 2.png"
              alt="Технологический цех"
              sx={{ width: { xs: 120, md: 150 }, imageRendering: 'pixelated' }}
            />
            <Typography
              className="b-text"
              sx={{
                mt: 1,
                fontSize: '13px',
                fontWeight: 800,
                color: '#18181B',
                textAlign: 'center',
                lineHeight: 1.25,
                transition: 'color 0.2s',
              }}
            >
              Технологичес<br />кий цех
            </Typography>
          </Box>

          {/* Пустая ячейка (2,2) */}
          <Box sx={{ display: { xs: 'none', sm: 'block' } }} />

          {/* Пустая ячейка (3,1) */}
          <Box sx={{ display: { xs: 'none', sm: 'block' } }} />

          {/* 3. Нижнее правое: ЦЕХ РОЗЛИВА */}
          <Box
            onClick={() => navigate('/conveyor')}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              cursor: 'pointer',
              transition: 'transform 0.25s ease',
              '&:hover': {
                transform: 'translateY(-6px)',
                '& .b-text': { color: '#E30613' },
              },
            }}
          >
            <Box
              component="img"
              src="/image (1) 1.png"
              alt="Цех розлива"
              sx={{ width: { xs: 120, md: 150 }, imageRendering: 'pixelated' }}
            />
            <Typography
              className="b-text"
              sx={{
                mt: 1,
                fontSize: '13px',
                fontWeight: 800,
                color: '#18181B',
                textAlign: 'center',
                transition: 'color 0.2s',
              }}
            >
              Цех розлива
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* ================= 3. КАРЬЕРНЫЙ ГЕЙМ-ЦЕНТР ================= */}
      <Box
        id="game-center"
        sx={{
          background: '#FFFFFF',
          border: '1px solid #E2E8F0',
          borderRadius: '32px',
          p: { xs: 3, md: 6 },
          mb: { xs: 8, md: 12 },
          boxShadow: '0 14px 35px rgba(0,0,0,0.04)',
        }}
      >
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography sx={{ color: '#4B5563', fontSize: '13px', fontWeight: 800, mb: 1.5, letterSpacing: '0.5px' }}>
            🎮 Карьерный гейм-центр
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: '22px', md: '32px' },
              fontWeight: 900,
              color: '#111827',
              mb: 1.5,
              letterSpacing: '-0.5px',
              lineHeight: 1.2,
            }}
          >
            ПОПРОБУЙ СЕБЯ В ДЕЛЕ ДО ПОДАЧИ
            <br />
            ЗАЯВКИ
          </Typography>
          <Typography sx={{ color: '#64748B', fontSize: '14px', maxWidth: 640, margin: '0 auto', lineHeight: 1.5 }}>
            Пройди симуляторы реальных задач «Очаково», набери баллы за точность и скорость, и получи прямой оффер на стажировку или фирменный мерч!
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
            gap: 3.5,
            mb: 5,
          }}
        >
          {/* Игра 1 */}
          <Card
            sx={{
              background: '#FFFFFF',
              border: '1px solid #E5E7EB',
              borderRadius: '20px',
              p: 3.5,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: 'none',
              transition: 'all 0.25s ease',
              '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 12px 24px rgba(0,0,0,0.06)' },
            }}
          >
            <Box>
              <Box sx={{ width: 48, height: 48, borderRadius: '14px', background: '#FEF9C3', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', mb: 2 }}>
                🧪
              </Box>
              <Typography sx={{ fontSize: '11px', fontWeight: 800, color: '#9CA3AF', letterSpacing: '0.5px', mb: 0.8 }}>
                ЛАБОРАТОРИЯ & R&D
              </Typography>
              <Typography sx={{ fontSize: '19px', fontWeight: 900, color: '#111827', mb: 1.2 }}>
                Варка Кваса
              </Typography>
              <Typography sx={{ fontSize: '13px', color: '#64748B', lineHeight: 1.5, mb: 3 }}>
                Скомпонуй идеальные натуральные ингредиенты, выдержи температурный режим и создай рецепт кваса.
              </Typography>
            </Box>

            <Box>
              <Box sx={{ background: '#F3F4F6', px: 2, py: 1, borderRadius: '8px', mb: 2.5 }}>
                <Typography sx={{ fontSize: '12px', fontWeight: 700, color: '#374151' }}>
                  🍧 Роль: Химик-технолог
                </Typography>
              </Box>
              <Button
                fullWidth
                onClick={() => navigate('/brew')}
                sx={{
                  background: '#09090B',
                  color: '#FFF',
                  borderRadius: '10px',
                  py: 1.2,
                  fontSize: '13.5px',
                  fontWeight: 800,
                  textTransform: 'none',
                  '&:hover': { background: '#27272A' },
                }}
              >
                Запустить симулятор
              </Button>
            </Box>
          </Card>

          {/* Игра 2 */}
          <Card
            sx={{
              background: '#FFFFFF',
              border: '1px solid #E5E7EB',
              borderRadius: '20px',
              p: 3.5,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: 'none',
              transition: 'all 0.25s ease',
              '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 12px 24px rgba(0,0,0,0.06)' },
            }}
          >
            <Box>
              <Box sx={{ width: 48, height: 48, borderRadius: '14px', background: '#F3E8FF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', mb: 2 }}>
                ⚙️
              </Box>
              <Typography sx={{ fontSize: '11px', fontWeight: 800, color: '#9CA3AF', letterSpacing: '0.5px', mb: 0.8 }}>
                ИНЖЕНЕРИЯ & АСУ ТП
              </Typography>
              <Typography sx={{ fontSize: '19px', fontWeight: 900, color: '#111827', mb: 1.2 }}>
                Управление конвейером
              </Typography>
              <Typography sx={{ fontSize: '13px', color: '#64748B', lineHeight: 1.5, mb: 3 }}>
                Настрой скорость линии розлива, откалибруй датчики и устрани сбои в работе роботов-упаковщиков.
              </Typography>
            </Box>

            <Box>
              <Box sx={{ background: '#F3F4F6', px: 2, py: 1, borderRadius: '8px', mb: 2.5 }}>
                <Typography sx={{ fontSize: '12px', fontWeight: 700, color: '#374151' }}>
                  ⚡ Роль: Инженер-наладчик
                </Typography>
              </Box>
              <Button
                fullWidth
                onClick={() => navigate('/conveyor')}
                sx={{
                  background: '#09090B',
                  color: '#FFF',
                  borderRadius: '10px',
                  py: 1.2,
                  fontSize: '13.5px',
                  fontWeight: 800,
                  textTransform: 'none',
                  '&:hover': { background: '#27272A' },
                }}
              >
                Управлять линией
              </Button>
            </Box>
          </Card>

          {/* Игра 3 */}
          <Card
            sx={{
              background: '#FFFFFF',
              border: '1px solid #E5E7EB',
              borderRadius: '20px',
              p: 3.5,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: 'none',
              transition: 'all 0.25s ease',
              '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 12px 24px rgba(0,0,0,0.06)' },
            }}
          >
            <Box>
              <Box sx={{ width: 48, height: 48, borderRadius: '14px', background: '#E0F2FE', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', mb: 2 }}>
                🏆
              </Box>
              <Typography sx={{ fontSize: '11px', fontWeight: 800, color: '#9CA3AF', letterSpacing: '0.5px', mb: 0.8 }}>
                ИСТОРИЯ & БРЕНДЫ
              </Typography>
              <Typography sx={{ fontSize: '19px', fontWeight: 900, color: '#111827', mb: 1.2 }}>
                Квиз «Очаково»
              </Typography>
              <Typography sx={{ fontSize: '13px', color: '#64748B', lineHeight: 1.5, mb: 3 }}>
                Ответь на 5 быстрых вопросов об истории, эко-технологиях и секретах производства компании.
              </Typography>
            </Box>

            <Box>
              <Box sx={{ background: '#F3F4F6', px: 2, py: 1, borderRadius: '8px', mb: 2.5 }}>
                <Typography sx={{ fontSize: '12px', fontWeight: 700, color: '#374151' }}>
                  🎁 Награда: Мерч + Экскурсия
                </Typography>
              </Box>
              <Button
                fullWidth
                onClick={() => navigate('/quiz')}
                sx={{
                  background: '#09090B',
                  color: '#FFF',
                  borderRadius: '10px',
                  py: 1.2,
                  fontSize: '13.5px',
                  fontWeight: 800,
                  textTransform: 'none',
                  '&:hover': { background: '#27272A' },
                }}
              >
                Пройти квиз (2 мин)
              </Button>
            </Box>
          </Card>
        </Box>

        {/* Плашка быстрой заявки */}
        <Box
          sx={{
            background: '#18181B',
            borderRadius: '16px',
            p: { xs: 2.5, md: 3.5 },
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2.5,
          }}
        >
          <Box>
            <Typography sx={{ color: '#FFFFFF', fontSize: '16px', fontWeight: 800, mb: 0.5 }}>
              Уже знаешь, в чем ты силен?
            </Typography>
            <Typography sx={{ color: '#9CA3AF', fontSize: '13.5px' }}>
              Подай упрощенную заявку без резюме — мы подберем направление под твой профиль и курс колледжа или вуза.
            </Typography>
          </Box>
          <Button
            onClick={() => scrollTo('roles')}
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
            Подать заявку в 1 клик 🚀
          </Button>
        </Box>
      </Box>

      {/* ================= 4. ЧТО ТЫ ПОЛУЧИШЬ РАБОТАЯ У НАС ================= */}
      <Box id="benefits" sx={{ mb: { xs: 8, md: 12 } }}>
        <Typography sx={{ fontSize: { xs: '22px', md: '30px' }, fontWeight: 900, mb: 4, letterSpacing: '-0.5px' }}>
          ЧТО ТЫ ПОЛУЧИШЬ РАБОТАЯ У НАС?
        </Typography>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' },
            gap: 2.5,
          }}
        >
          <Box
            sx={{
              background: '#E2E8F0',
              borderRadius: '20px',
              p: 3.5,
              minHeight: 140,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <Typography sx={{ fontSize: '20px', fontWeight: 900, color: '#0F172A', lineHeight: 1.2 }}>
              Наставник с первого дня
            </Typography>
            <Typography sx={{ fontSize: '13px', color: '#475569', fontWeight: 600 }}>
              Опытный куратор ведёт за руку и помогает быстро освоить оборудование цеха.
            </Typography>
          </Box>

          <Box
            sx={{
              background: '#0F172A',
              color: '#FFFFFF',
              borderRadius: '20px',
              p: 3.5,
              minHeight: 140,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 8px 24px rgba(15, 23, 42, 0.15)',
            }}
          >
            <Typography sx={{ fontSize: '20px', fontWeight: 900, lineHeight: 1.2 }}>
              Официальный стаж
            </Typography>
            <Typography sx={{ fontSize: '13px', color: '#94A3B8', fontWeight: 600 }}>
              Срочный трудовой договор по ТК РФ, «белая» зарплата и зачёт студенческой практики.
            </Typography>
          </Box>

          <Box
            sx={{
              background: '#E2E8F0',
              borderRadius: '20px',
              p: 3.5,
              minHeight: 140,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <Typography sx={{ fontSize: '20px', fontWeight: 900, color: '#0F172A', lineHeight: 1.2 }}>
              Общежитие рядом с заводом
            </Typography>
            <Typography sx={{ fontSize: '13px', color: '#475569', fontWeight: 600 }}>
              Комфортное жильё на Рябиновой за 3 400 ₽/мес в пешей доступности от проходной[cite: 3].
            </Typography>
          </Box>

          <Box
            sx={{
              gridColumn: { md: '1 / span 3' },
              background: '#F8FAFC',
              border: '1.5px solid #E2E8F0',
              borderRadius: '20px',
              p: 3,
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: { sm: 'center' },
              justifyContent: 'space-between',
              gap: 2,
            }}
          >
            <Box>
              <Typography sx={{ fontSize: '19px', fontWeight: 900, color: '#0F172A', mb: 0.5 }}>
                100% Российское производство
              </Typography>
              <Typography sx={{ fontSize: '13px', color: '#64748B', fontWeight: 600 }}>
                Собственные сельхозугодья, натуральное зерновое сырьё и независимость от внешних поставок.
              </Typography>
            </Box>
            <Chip
              label="Эко-стандарт"
              sx={{ background: '#DCFCE7', color: '#166534', fontWeight: 800, fontSize: '12px' }}
            />
          </Box>
        </Box>
      </Box>

      {/* ================= 5. ВЫБЕРИ СВОЮ РОЛЬ ================= */}
      <Box id="roles" sx={{ mb: 6 }}>
        <Typography sx={{ fontSize: { xs: '22px', md: '30px' }, fontWeight: 900, mb: 3.5, letterSpacing: '-0.5px' }}>
          Выбери свою роль
        </Typography>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
            gap: 3,
          }}
        >
          {roles.map((role, idx) => {
            const isSelected = selectedRole === idx;
            return (
              <Box
                key={idx}
                onClick={() => setSelectedRole(idx)}
                sx={{
                  background: '#FFFFFF',
                  borderRadius: '20px',
                  p: 3.5,
                  cursor: 'pointer',
                  border: isSelected ? '2px solid #E30613' : '1.5px solid #E5E7EB',
                  boxShadow: isSelected ? '0 10px 25px rgba(227, 6, 19, 0.12)' : 'none',
                  transition: 'all 0.25s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  minHeight: 220,
                  position: 'relative',
                  overflow: 'hidden',
                  '&:hover': {
                    borderColor: '#E30613',
                    transform: 'translateY(-4px)',
                  },
                }}
              >
                <Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Box sx={{ fontSize: '28px' }}>{role.icon}</Box>
                    <Chip
                      label={role.salary}
                      sx={{
                        background: '#FEE2E2',
                        color: '#DC2626',
                        fontWeight: 900,
                        fontSize: '13px',
                      }}
                    />
                  </Box>
                  <Typography sx={{ fontSize: '17px', fontWeight: 900, color: '#0F172A', mb: 1, lineHeight: 1.25 }}>
                    {role.title}
                  </Typography>
                  <Typography sx={{ fontSize: '13px', color: '#64748B', lineHeight: 1.5, mb: 3 }}>
                    {role.desc}
                  </Typography>
                </Box>

                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    alert(`Отклик на направление: ${role.title}. Скоро свяжемся!`);
                  }}
                  sx={{
                    color: '#E30613',
                    fontWeight: 900,
                    fontSize: '13px',
                    p: 0,
                    justifyContent: 'flex-start',
                    letterSpacing: '0.5px',
                    '&:hover': { background: 'transparent', color: '#991B1B' },
                  }}
                >
                  ПОДРОБНЕЕ —›
                </Button>
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
}