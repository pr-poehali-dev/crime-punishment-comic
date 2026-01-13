import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import Icon from '@/components/ui/icon';

interface Character {
  name: string;
  description: string;
  evolution: string;
  role: string;
  image?: string;
}

interface ComicPanel {
  text: string;
  image?: string;
  caption?: string;
}

interface TimelineEvent {
  day: string;
  act: string;
  events: string[];
}

const characters: Character[] = [
  {
    name: 'Родион Раскольников',
    description: 'Бывший студент, живущий в крайней нищете. Создатель теории о "право имеющих".',
    evolution: 'От гордого интеллектуала через преступление к моральному перерождению и покаянию.',
    role: 'Протагонист',
    image: 'https://cdn.poehali.dev/projects/6a48ec6b-89e1-4b0b-b421-5e31a2d4fb1a/files/7b928c24-f2d1-4f1c-9067-c05e3bf32a04.jpg'
  },
  {
    name: 'Соня Мармеладова',
    description: 'Дочь спившегося чиновника, вынужденная заниматься проституцией ради семьи.',
    evolution: 'Символ жертвенности и христианского смирения, ведущая Раскольникова к искуплению.',
    role: 'Спасительница'
  },
  {
    name: 'Порфирий Петрович',
    description: 'Следователь, ведущий дело об убийстве процентщицы.',
    evolution: 'От подозрений через психологическую игру к пониманию истинной природы преступления.',
    role: 'Антагонист'
  },
  {
    name: 'Алёна Ивановна',
    description: 'Старуха-процентщица, жертва преступления Раскольникова.',
    evolution: 'Символ социальной несправедливости, катализатор трагедии.',
    role: 'Жертва'
  },
  {
    name: 'Дмитрий Разумихин',
    description: 'Друг Раскольникова, честный и добрый студент.',
    evolution: 'Воплощение нормальной человеческой доброты и верности.',
    role: 'Друг'
  },
  {
    name: 'Свидригайлов',
    description: 'Развратный помещик с тёмным прошлым.',
    evolution: 'От циничного злодея к осознанию безысходности и самоубийству.',
    role: 'Двойник'
  }
];

const timeline: TimelineEvent[] = [
  {
    day: 'День 1',
    act: 'Пролог',
    events: [
      'Раскольников идёт к процентщице для "пробы"',
      'Встреча с Мармеладовым в трактире',
      'Письмо от матери о замужестве сестры'
    ]
  },
  {
    day: 'День 2',
    act: 'Акт I',
    events: [
      'Раскольников совершает убийство старухи-процентщицы',
      'Непредвиденное убийство Лизаветы',
      'Бегство с места преступления'
    ]
  },
  {
    day: 'День 3-4',
    act: 'Акт II',
    events: [
      'Горячка и бред Раскольникова',
      'Повестка в полицию по долгу',
      'Обморок при разговоре об убийстве'
    ]
  },
  {
    day: 'День 5-7',
    act: 'Акт III',
    events: [
      'Знакомство с Порфирием Петровичем',
      'Встреча с Соней Мармеладовой',
      'Первые психологические поединки со следователем'
    ]
  },
  {
    day: 'День 8-10',
    act: 'Акт IV',
    events: [
      'Признание Соне',
      'Появление Свидригайлова',
      'Смерть Мармеладова под колёсами кареты'
    ]
  },
  {
    day: 'День 11-14',
    act: 'Акт V',
    events: [
      'Финальная встреча с Порфирием',
      'Самоубийство Свидригайлова',
      'Раскольников идёт в полицию с признанием'
    ]
  },
  {
    day: '8 месяцев спустя',
    act: 'Эпилог',
    events: [
      'Раскольников на каторге в Сибири',
      'Приезд Сони',
      'Духовное возрождение через любовь и веру'
    ]
  }
];

const acts = [
  {
    title: 'Пролог',
    description: 'Зарождение идеи',
    panels: [
      { text: 'Раскольников в своей каморке размышляет о "праве"', image: 'https://cdn.poehali.dev/projects/6a48ec6b-89e1-4b0b-b421-5e31a2d4fb1a/files/7b928c24-f2d1-4f1c-9067-c05e3bf32a04.jpg' },
      { text: 'Разговор с Мармеладовым о судьбе и страдании' },
      { text: 'Письмо матери — последняя капля перед решением' }
    ]
  },
  {
    title: 'Акт I',
    description: 'Преступление',
    panels: [
      { text: 'Раскольников крадётся к квартире процентщицы' },
      { text: 'Удар топором — убийство Алёны Ивановны', image: 'https://cdn.poehali.dev/projects/6a48ec6b-89e1-4b0b-b421-5e31a2d4fb1a/files/616229b5-f1f6-4310-b367-1d22edae650e.jpg', caption: 'Момент преступления' },
      { text: 'Неожиданное появление Лизаветы — второе убийство' },
      { text: 'Бегство через чёрный ход с награбленным' }
    ]
  },
  {
    title: 'Акт II',
    description: 'Наказание начинается',
    panels: [
      { text: 'Раскольников в горячке, кошмары и видения' },
      { text: 'Повестка в контору — первый страх разоблачения' },
      { text: 'Обморок при слове "убийство"' }
    ]
  },
  {
    title: 'Акт III',
    description: 'Психологическая дуэль',
    panels: [
      { text: 'Кабинет Порфирия — игра в кошки-мышки' },
      { text: 'Раскольников защищает свою статью о "праве"' },
      { text: 'Встреча с Соней — первый луч надежды' }
    ]
  },
  {
    title: 'Акт IV',
    description: 'Признание и отражения',
    panels: [
      { text: 'Раскольников читает Соне Евангелие о Лазаре', image: 'https://cdn.poehali.dev/projects/6a48ec6b-89e1-4b0b-b421-5e31a2d4fb1a/files/a04d29a0-616e-48b2-bbb0-933a659d239f.jpg', caption: 'Чтение о воскресении Лазаря' },
      { text: 'Признание Соне: "Я убил..."' },
      { text: 'Свидригайлов — тёмное зеркало Раскольникова' },
      { text: 'Смерть Мармеладова — цена греха' }
    ]
  },
  {
    title: 'Акт V',
    description: 'Развязка',
    panels: [
      { text: 'Последний разговор с Порфирием о совести' },
      { text: 'Свидригайлов у дверей вечности — выстрел' },
      { text: 'Путь к Сенной площади через крестный ход' },
      { text: 'Раскольников целует землю и признаётся народу' }
    ]
  },
  {
    title: 'Эпилог',
    description: 'Воскресение',
    panels: [
      { text: 'Раскольников на каторге среди осуждённых' },
      { text: 'Соня приезжает в Сибирь — верность и любовь' },
      { text: 'Сон о моровой язве — символ старой теории' },
      { text: 'Евангелие под подушкой — начало новой жизни' }
    ]
  }
];

export default function Index() {
  const [selectedAct, setSelectedAct] = useState(0);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <header className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold text-primary mb-4">
            Преступление и Наказание
          </h1>
          <p className="text-xl text-muted-foreground">
            Графический роман по произведению Ф.М. Достоевского
          </p>
          <div className="flex items-center justify-center gap-4 mt-6">
            <Badge variant="outline" className="text-lg px-4 py-2">
              <Icon name="Calendar" size={16} className="mr-2" />
              1866 год
            </Badge>
            <Badge variant="outline" className="text-lg px-4 py-2">
              <Icon name="MapPin" size={16} className="mr-2" />
              Санкт-Петербург
            </Badge>
          </div>
        </header>

        <Tabs defaultValue="acts" className="space-y-8">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="acts" className="text-base">
              <Icon name="BookOpen" size={18} className="mr-2" />
              Акты
            </TabsTrigger>
            <TabsTrigger value="characters" className="text-base">
              <Icon name="Users" size={18} className="mr-2" />
              Персонажи
            </TabsTrigger>
            <TabsTrigger value="timeline" className="text-base">
              <Icon name="Clock" size={18} className="mr-2" />
              Хронология
            </TabsTrigger>
          </TabsList>

          <TabsContent value="acts" className="space-y-6 animate-fade-in">
            <div className="grid md:grid-cols-4 gap-4 mb-8">
              {acts.map((act, index) => (
                <Card
                  key={index}
                  className={`cursor-pointer transition-all hover:scale-105 ${
                    selectedAct === index ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => setSelectedAct(index)}
                >
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">{act.title}</CardTitle>
                    <CardDescription className="text-sm">
                      {act.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>

            <Card className="animate-scale-in">
              <CardHeader>
                <CardTitle className="text-3xl flex items-center gap-3">
                  <Icon name="Drama" size={32} className="text-primary" />
                  {acts[selectedAct].title}
                </CardTitle>
                <CardDescription className="text-lg">
                  {acts[selectedAct].description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  {acts[selectedAct].panels.map((panel, index) => (
                    <div
                      key={index}
                      className="bg-muted/50 rounded-lg overflow-hidden border-l-4 border-primary hover:bg-muted/70 transition-all hover:shadow-xl"
                    >
                      {panel.image && (
                        <div className="relative h-64 md:h-96 overflow-hidden">
                          <img 
                            src={panel.image} 
                            alt={panel.text}
                            className="w-full h-full object-cover"
                          />
                          {panel.caption && (
                            <div className="absolute bottom-0 left-0 right-0 bg-black/70 backdrop-blur-sm p-3">
                              <p className="text-sm text-white/90 italic">{panel.caption}</p>
                            </div>
                          )}
                        </div>
                      )}
                      <div className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="bg-primary text-primary-foreground rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">
                            {index + 1}
                          </div>
                          <p className="text-lg leading-relaxed pt-1">{panel.text}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="characters" className="animate-fade-in">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {characters.map((character, index) => (
                <Card key={index} className="hover-scale overflow-hidden">
                  {character.image && (
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={character.image} 
                        alt={character.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                      <Badge 
                        variant="secondary" 
                        className="absolute top-3 right-3 backdrop-blur-sm"
                      >
                        {character.role}
                      </Badge>
                    </div>
                  )}
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <CardTitle className="text-2xl">{character.name}</CardTitle>
                      {!character.image && <Badge variant="secondary">{character.role}</Badge>}
                    </div>
                    <CardDescription className="text-base">
                      {character.description}
                    </CardDescription>
                  </CardHeader>
                  <Separator />
                  <CardContent className="pt-6">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Icon name="TrendingUp" size={16} className="text-primary" />
                        <span className="font-semibold">Эволюция:</span>
                      </div>
                      <p className="text-sm leading-relaxed pl-6">
                        {character.evolution}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="timeline" className="animate-fade-in">
            <Card>
              <CardHeader>
                <CardTitle className="text-3xl flex items-center gap-3">
                  <Icon name="Timer" size={32} className="text-primary" />
                  Временная шкала событий
                </CardTitle>
                <CardDescription className="text-base">
                  Полная хронология романа с ключевыми моментами
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[600px] pr-4">
                  <div className="relative space-y-8">
                    <div className="absolute left-[19px] top-0 bottom-0 w-0.5 bg-primary/30" />
                    {timeline.map((event, index) => (
                      <div key={index} className="relative pl-12">
                        <div className="absolute left-0 top-1 w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                          {index + 1}
                        </div>
                        <Card className="hover:shadow-lg transition-shadow">
                          <CardHeader>
                            <div className="flex items-center gap-3 mb-2">
                              <Badge variant="outline" className="text-sm">
                                {event.day}
                              </Badge>
                              <Badge className="text-sm">{event.act}</Badge>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <ul className="space-y-3">
                              {event.events.map((e, i) => (
                                <li key={i} className="flex items-start gap-3">
                                  <Icon
                                    name="ChevronRight"
                                    size={16}
                                    className="text-primary mt-1 flex-shrink-0"
                                  />
                                  <span className="leading-relaxed">{e}</span>
                                </li>
                              ))}
                            </ul>
                          </CardContent>
                        </Card>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <footer className="mt-16 text-center text-muted-foreground">
          <Separator className="mb-8" />
          <p className="text-sm">
            Интерактивный комикс по роману Ф.М. Достоевского "Преступление и наказание"
          </p>
          <p className="text-xs mt-2">
            Классический стиль графических романов с детальной прорисовкой персонажей
          </p>
        </footer>
      </div>
    </div>
  );
}