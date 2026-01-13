import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface ComicPage {
  chapter: number;
  title: string;
  subtitle: string;
  panels: {
    image: string;
    dialogue: string[];
    narration?: string;
  }[];
}

const comicPages: ComicPage[] = [
  {
    chapter: 1,
    title: 'ПРОЛОГ',
    subtitle: 'Петербург. Июль 1865 года.',
    panels: [
      {
        image: 'https://cdn.poehali.dev/projects/6a48ec6b-89e1-4b0b-b421-5e31a2d4fb1a/files/1fca9a8d-61a3-4cfe-a840-ce4018580a9b.jpg',
        narration: 'В начале июля, в чрезвычайно жаркое время, под вечер, один молодой человек вышел из своей каморки...',
        dialogue: [
          'Раскольников: Тварь ли я дрожащая или право имею?',
          'Раскольников: Старуха — просто вошь... никому не нужна...'
        ]
      },
      {
        image: 'https://cdn.poehali.dev/projects/6a48ec6b-89e1-4b0b-b421-5e31a2d4fb1a/files/424baf25-4de2-4e2f-ad1d-d2bc81dfd568.jpg',
        narration: 'Раскольников идёт к старухе-процентщице. Это репетиция...',
        dialogue: [
          'Алёна Ивановна: Что принёс, батюшка?',
          'Раскольников: Вещицу заложить...'
        ]
      }
    ]
  },
  {
    chapter: 2,
    title: 'ЧАСТЬ I',
    subtitle: 'Преступление',
    panels: [
      {
        image: 'https://cdn.poehali.dev/projects/6a48ec6b-89e1-4b0b-b421-5e31a2d4fb1a/files/424baf25-4de2-4e2f-ad1d-d2bc81dfd568.jpg',
        narration: 'На следующий день, ровно в семь часов вечера...',
        dialogue: [
          'Раскольников: Топор... взять топор...',
          'Раскольников: Сейчас или никогда!'
        ]
      },
      {
        image: 'https://cdn.poehali.dev/projects/6a48ec6b-89e1-4b0b-b421-5e31a2d4fb1a/files/424baf25-4de2-4e2f-ad1d-d2bc81dfd568.jpg',
        narration: 'Он вынул топор совсем, взмахнул его обеими руками...',
        dialogue: [
          'Алёна Ивановна: Ты... что же ты...',
          'Раскольников: ...'
        ]
      }
    ]
  },
  {
    chapter: 3,
    title: 'ЧАСТЬ II',
    subtitle: 'Начало наказания',
    panels: [
      {
        image: 'https://cdn.poehali.dev/projects/6a48ec6b-89e1-4b0b-b421-5e31a2d4fb1a/files/1fca9a8d-61a3-4cfe-a840-ce4018580a9b.jpg',
        narration: 'Раскольников проснулся в горячке. Три дня он пролежал в бреду...',
        dialogue: [
          'Разумихин: Родя! Очнись! Ты болен!',
          'Раскольников: Убийство... кровь... старуха...'
        ]
      }
    ]
  },
  {
    chapter: 4,
    title: 'ЧАСТЬ III-IV',
    subtitle: 'Соня и признание',
    panels: [
      {
        image: 'https://cdn.poehali.dev/projects/6a48ec6b-89e1-4b0b-b421-5e31a2d4fb1a/files/08a0308f-2292-4a97-9254-6caa7ba3801e.jpg',
        narration: 'Раскольников пришёл к Соне Мармеладовой...',
        dialogue: [
          'Соня: Прочитать тебе про Лазаря?',
          'Раскольников: Соня... я убил...',
          'Соня: Что ты над собой сделал!'
        ]
      }
    ]
  },
  {
    chapter: 5,
    title: 'ЧАСТЬ V-VI',
    subtitle: 'Явка с повинной',
    panels: [
      {
        image: 'https://cdn.poehali.dev/projects/6a48ec6b-89e1-4b0b-b421-5e31a2d4fb1a/files/1fca9a8d-61a3-4cfe-a840-ce4018580a9b.jpg',
        narration: 'Раскольников идёт на Сенную площадь...',
        dialogue: [
          'Соня: Встань! Поклонись народу, поцелуй землю!',
          'Раскольников: Это я убил старуху-чиновницу и её сестру...'
        ]
      }
    ]
  },
  {
    chapter: 6,
    title: 'ЭПИЛОГ',
    subtitle: 'Сибирь. Воскресение.',
    panels: [
      {
        image: 'https://cdn.poehali.dev/projects/6a48ec6b-89e1-4b0b-b421-5e31a2d4fb1a/files/08a0308f-2292-4a97-9254-6caa7ba3801e.jpg',
        narration: 'Прошло восемь месяцев. Раскольников на каторге...',
        dialogue: [
          'Раскольников: Соня... ты пришла...',
          'Соня: Я не оставлю тебя. Никогда.',
          'Раскольников: Теперь я понимаю... жизнь начинается заново.'
        ]
      }
    ]
  }
];

export default function Index() {
  const [currentPage, setCurrentPage] = useState(0);
  const [currentPanel, setCurrentPanel] = useState(0);

  const page = comicPages[currentPage];
  const panel = page.panels[currentPanel];

  const nextPanel = () => {
    if (currentPanel < page.panels.length - 1) {
      setCurrentPanel(currentPanel + 1);
    } else if (currentPage < comicPages.length - 1) {
      setCurrentPage(currentPage + 1);
      setCurrentPanel(0);
    }
  };

  const prevPanel = () => {
    if (currentPanel > 0) {
      setCurrentPanel(currentPanel - 1);
    } else if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      setCurrentPanel(comicPages[currentPage - 1].panels.length - 1);
    }
  };

  const canGoNext = currentPage < comicPages.length - 1 || currentPanel < page.panels.length - 1;
  const canGoPrev = currentPage > 0 || currentPanel > 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-muted/20 to-background">
      <header className="border-b border-primary/20 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl md:text-4xl font-bold text-primary">
                Преступление и Наказание
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                Графический роман по Ф.М. Достоевскому
              </p>
            </div>
            <Badge variant="outline" className="text-lg px-4 py-2">
              Глава {page.chapter} / {comicPages.length}
            </Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-8 text-center animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-2">{page.title}</h2>
          <p className="text-xl text-muted-foreground italic">{page.subtitle}</p>
        </div>

        <Card className="overflow-hidden shadow-2xl border-2 border-primary/20 animate-scale-in">
          <div className="relative bg-black">
            <img
              src={panel.image}
              alt={`Panel ${currentPanel + 1}`}
              className="w-full h-[50vh] md:h-[70vh] object-cover"
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

            {panel.narration && (
              <div className="absolute top-4 left-4 right-4 bg-primary/90 backdrop-blur-sm p-4 rounded-lg border-2 border-primary">
                <p className="text-sm md:text-base italic text-primary-foreground font-serif leading-relaxed">
                  {panel.narration}
                </p>
              </div>
            )}

            <div className="absolute bottom-4 left-4 right-4 space-y-3">
              {panel.dialogue.map((line, idx) => {
                const [speaker, text] = line.split(': ');
                return (
                  <div
                    key={idx}
                    className="bg-card/95 backdrop-blur-sm p-4 rounded-lg border-2 border-border shadow-lg animate-fade-in"
                    style={{ animationDelay: `${idx * 0.2}s` }}
                  >
                    <p className="font-bold text-primary mb-1">{speaker}</p>
                    <p className="text-foreground leading-relaxed">{text}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <CardContent className="p-6 bg-card">
            <div className="flex items-center justify-between gap-4">
              <Button
                variant="outline"
                size="lg"
                onClick={prevPanel}
                disabled={!canGoPrev}
                className="flex-1"
              >
                <Icon name="ChevronLeft" size={20} className="mr-2" />
                Назад
              </Button>

              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  Панель {currentPanel + 1} из {page.panels.length}
                </p>
                <div className="flex gap-1 mt-2">
                  {page.panels.map((_, idx) => (
                    <div
                      key={idx}
                      className={`h-1.5 w-8 rounded-full transition-colors ${
                        idx === currentPanel ? 'bg-primary' : 'bg-muted'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <Button
                variant="default"
                size="lg"
                onClick={nextPanel}
                disabled={!canGoNext}
                className="flex-1"
              >
                {currentPanel < page.panels.length - 1 ? 'Далее' : 'Следующая глава'}
                <Icon name="ChevronRight" size={20} className="ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 grid grid-cols-3 md:grid-cols-6 gap-3">
          {comicPages.map((p, idx) => (
            <button
              key={idx}
              onClick={() => {
                setCurrentPage(idx);
                setCurrentPanel(0);
              }}
              className={`p-3 rounded-lg border-2 transition-all hover:scale-105 ${
                idx === currentPage
                  ? 'border-primary bg-primary/10'
                  : 'border-border bg-card hover:border-primary/50'
              }`}
            >
              <div className="text-xs font-bold text-center mb-1">Глава {p.chapter}</div>
              <div className="text-xs text-center text-muted-foreground truncate">
                {p.title}
              </div>
            </button>
          ))}
        </div>

        <footer className="mt-12 text-center text-sm text-muted-foreground border-t border-border pt-6">
          <p>Интерактивный графический роман</p>
          <p className="mt-1">© Фёдор Михайлович Достоевский, 1866</p>
        </footer>
      </div>
    </div>
  );
}
