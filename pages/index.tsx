import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import {Menu, X, Newspaper, BookOpen, FileText, Lightbulb, Send, ExternalLink, ChevronRight, Volleyball, ShieldAlert, Mail, Instagram } from 'lucide-react';
import Image from 'next/image';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { useRouter } from 'next/router';
import Link from 'next/link';

const NAV_ITEMS = [
  { label: 'Главная', href: '#hero' },
  { label: 'Новости', href: '/news' },
  { label: 'База знаний', href: '/knowledge-base' },
  { label: 'Команда', href: '#team' },
];

interface NewsItem {
  id: string;
  title: string;
  date: string;
  snippet: string;
  link: string;
}

interface KnowledgeBaseItem {
  id: string;
  title: string;
  description: string;
  type: 'guide' | 'template' | 'security' | 'book';
  link: string;
}

interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
  details?: string;
  university?: string;
  email?: string;
  telegram?: string;
  instagram?: string;
}

interface FormData {
  name: string;
  email: string;
  question: string;
  consent: boolean;
}

const newsData: NewsItem[] = [
  {
    id: '1',
    title: 'Команда нашего проекта успешно защитила проект по ПИвЮ на "10"',
    date: '16 июня 2025',
    snippet: 'Наш веб-сайт КлубОК для пожилых людей получил высшую оценку!',
    link: '/news/new_1',
  },
  {
    id: '2',
    title: 'Рост фишинговых атак: как распознать и защититься',
    date: '10 июня 2025',
    snippet: 'Эксперты делятся советами по выявлению мошеннических писем и сайтов.',
    link: '/news/new_2',
  },
  {
    id: '3',
    title: 'Вебинар: Безопасность в социальных сетях',
    date: '5 июня 2025',
    snippet: 'Присоединяйтесь к нашему бесплатному вебинару и научитесь защищать свои аккаунты.',
    link: '/news/new_3',
  },
];

const knowledgeBaseData: KnowledgeBaseItem[] = [
  {
    id: 'kb1',
    title: 'Инструкция по созданию надежных паролей',
    description: 'Пошаговое руководство по выбору и управлению паролями для защиты ваших аккаунтов и персональных данных в Интернете.',
    type: 'guide',
    link: '/materials/material_1',
  },
  {
    id: 'kb2',
    title: 'Шаблон согласия на обработку персональных данных',
    description: 'Готовый шаблон документа для использования в вашем бизнесе, на веб-сайте или в приложении.',
    type: 'template',
    link: '/materials/material_2',
  },
  {
    id: 'kb3',
    title: 'Что такое двухфакторная аутентификация?',
    description: 'Объяснение термина и инструкция по активации на популярных сервисах: Google, Яндекс, ВКонтакте и др.',
    type: 'book',
    link: '/materials/material_3',
  },
  {
    id: 'kb4',
    title: 'Как защитить свой профиль в "Одноклассниках"?',
    description: 'Простые шаги для безопасности вашей страницы и личных данных в социальной сети.',
    type: 'guide',
    link: '/materials/material_4',
  },
];

const teamData: TeamMember[] = [
  /*{
    id: 'tm1',
    name: 'Алина Козловских',
    role: 'Дизайнер/разработчик',
    bio: 'Отвечает за создание прототипа проекта. Решает, что будет написано в описании других участников команды',
    imageUrl: '/team/tm4.jpg',
    details: 'Алина — многопрофильный специалист. Умеет работать в Figme, создавать веб-сайты и размещать их на бесплатных хостингах. Работает в ЦКИСП НИУ ВШЭ и профессионально изучает проекты, направленные на пожилых людей.',
    university: 'НИУ ВШЭ',
    email: 'aakozlovskikh@edu.hse.ru',
    telegram: 'https://t.me/alllllina_k',
    instagram: '',
  },
  {
    id: 'tm2',
    name: 'Лидия Сергеева',
    role: 'Бизнес-аналитик',
    bio: 'Отвечает за написание требований к проекту и постановку стратегических целей.',
    imageUrl: '/team/tm22.jpg',
    details: 'Лидия - специалист по анализу данных и оптимизации процессов. Выявляет тенденции и закономерности для улучшения стратегии команды и достижения измеримых результатов. Работает в ПУЛАП НИУ ВШЭ',
    university: 'НИУ ВШЭ',
    email: 'lnsergeeva@edu.hse.ru',
    telegram: '',
    instagram: '',
  },
  {
    id: 'tm3',
    name: 'Анастасия Голубева',
    role: 'Менеджер проекта',
    bio: 'Отвечает за организацию проекта, бюджет и методологию разработки. Собирает команду, ищет инвесторов для проекта.',
    imageUrl: '/team/tm33.jpg',
    details: 'Анастасия — менеджер проекта, многопрофильный специалист. Сопровождает проект на всех этапах от задумки до выхода проекта для конечного потребителя. Не боится работать в Excel.',
    university: 'НИУ ВШЭ',
    email: 'aogolubeva@edu.hse.ru',
    telegram: '',
    instagram: '',
  },*/

    {
    id: 'tm1',
    name: 'Иван Петров',
    role: 'CEO',
    bio: 'Основатель и руководитель проекта',
    imageUrl: '/team/tm4.jpg',
    details: 'Иван имеет более 15 лет опыта в IT и управлении проектами. Основал КлубОК в 2020 году с целью сделать цифровой мир безопаснее для всех поколений.',
    university: 'МГУ',
    email: 'ceo@clubok.ru',
    telegram: 'https://t.me/ivan_petrov',
  },
  {
    id: 'tm2',
    name: 'Александра Смирнова',
    role: 'Эксперт по безопасности',
    bio: 'Специалист по кибербезопасности',
    imageUrl: '/team/tm22.jpg',
    details: 'Александра - сертифицированный специалист по информационной безопасности с 10-летним опытом работы в крупных IT-компаниях.',
    university: 'МИФИ',
    email: 'security@clubok.ru',
  },
  {
    id: 'tm3',
    name: 'Дмитрий Иванов',
    role: 'Эксперт по праву',
    bio: 'Юрист в области цифрового права',
    imageUrl: '/team/expert2.jpg',
    details: 'Дмитрий специализируется на правовых аспектах цифровой безопасности и защите персональных данных.',
    university: 'МГЮА',
    email: 'law@clubok.ru',
  },
  {
    id: 'tm4',
    name: 'Елена Кузнецова',
    role: 'Эксперт по обучению',
    bio: 'Методист образовательных программ',
    imageUrl: '/team/expert3.jpg',
    details: 'Елена разрабатывает обучающие программы и методики для разных возрастных групп.',
    university: 'ВШЭ',
    email: 'education@clubok.ru',
  },
  {
    id: 'tm5',
    name: 'Ольга Васильева',
    role: 'Маркетолог',
    bio: 'Специалист по продвижению и PR',
    imageUrl: '/team/marketer.jpg',
    details: 'Ольга отвечает за коммуникацию с аудиторией и продвижение проекта.',
    university: 'РГГУ',
    email: 'marketing@clubok.ru',
    instagram: 'https://instagram.com/olga_marketer',
  },
  {
    id: 'tm6',
    name: 'Сергей Лебедев',
    role: 'IT-специалист',
    bio: 'Full-stack разработчик',
    imageUrl: '/team/it1.jpg',
    details: 'Сергей разрабатывает и поддерживает техническую инфраструктуру проекта.',
    university: 'МФТИ',
    email: 'dev1@clubok.ru',
  },
  {
    id: 'tm7',
    name: 'Анна Морозова',
    role: 'IT-специалист',
    bio: 'UX/UI дизайнер',
    imageUrl: '/team/it2.jpg',
    details: 'Анна создает удобные и доступные интерфейсы для нашей платформы.',
    university: 'Строгановка',
    email: 'design@clubok.ru',
  },
];

const pieData = [
  { name: 'Пользуются интернетом', value: 55 },
  { name: 'Не пользуются', value: 45 },
];

const COLORS = ['#2563EB', '#D1D5DB']; // Blue-600 and Gray-300

const CyberShieldPage: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    question: '',
    consent: false
  });
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (!showModal) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setShowModal(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [showModal]);

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showModal]);

  const openModal = (member: TeamMember) => {
    setSelectedMember(member);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setTimeout(() => setSelectedMember(null), 200);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type } = target;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? target.checked : value
    }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.question.trim()) {
      alert('Пожалуйста, заполните все поля.');
      return;
    }
    if (!formData.consent) {
      alert("Пожалуйста, дайте согласие на обработку персональных данных");
      return;
    }
    setIsFormSubmitting(true);
    // Здесь можно добавить логику отправки данных на сервер или API
    setTimeout(() => {
      setIsFormSubmitting(false);
      setFormSubmitted(true);
      setFormData({ name: '', email: '', question: '',  consent:true});
      setTimeout(() => setFormSubmitted(false), 4000);
    }, 1000);
  };

  return (
    <>
      <style>{`
        @media (max-width: 768px) {
          .desktop-only-image {
            display: none;
          }
        }
      `}</style>
    
      <Head>
        <title>КлубОК - Ваша цифровая безопасность и юридическая помощь</title>
        <meta name="description" content="КлубОК - платформа для защиты ваших цифровых прав, предоставляющая актуальную информацию, ресурсы и юридическую поддержку." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-slate-100 text-slate-800 flex flex-col scroll-smooth" style={{ fontSize: '18px' }}>
        {/* Navbar */}
        <nav className="bg-white/80 backdrop-blur-md shadow-md sticky top-0 z-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-24"> {/* Увеличил высоту навигации */}
              <Link href="/" className="flex items-center space-x-3 text-blue-600 hover:text-blue-700 transition-colors">
                <Volleyball size={40} /> {/* Увеличил размер иконки */}
                <span className="font-bold text-3xl">КлубОК</span> {/* Увеличил размер текста */}
              </Link>
              <div className="hidden md:flex space-x-8"> {/* Увеличил расстояние между пунктами */}
                {NAV_ITEMS.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="px-4 py-3 rounded-md text-xl font-medium text-slate-600 hover:text-blue-600 transition-colors" /* Увеличил размер текста и отступы */
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
              <div className="md:hidden">
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  aria-label="Toggle menu"
                  className="text-slate-600 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 p-3 rounded-md" /* Увеличил размер кнопки */
                >
                  {isMobileMenuOpen ? <X size={32} /> : <Menu size={32} />} {/* Увеличил размер иконки меню */}
                </button>
              </div>
            </div>
          </div>
          {/* Mobile menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden absolute top-24 left-0 right-0 bg-white shadow-lg z-40 pb-6"> {/* Увеличил отступы */}
              <div className="px-4 pt-4 pb-5 space-y-2"> {/* Увеличил отступы */}
                {NAV_ITEMS.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block px-4 py-3 rounded-md text-xl font-medium transition-colors ${item.href === '/knowledge-base' ? 'text-blue-600 bg-blue-50' : 'text-slate-600 hover:text-blue-600 hover:bg-slate-100'}`} /* Увеличил размер текста и отступы */
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </nav>

        <main className="flex-grow">
          {/* Hero Section */}
          <section id="hero" className="pt-12 pb-16 md:py-28 bg-gray-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
                <div className="w-full md:w-1/2">
                  <div className="desktop-only-image">
                    <Image
                      src="/images/hero-bg8.png"
                      alt="Иллюстрация бабушки"
                      className="desktop-only-image" 
                      width={600}
                      height={800}
                      quality={100}
                      priority
                    />
                  </div>
                </div>
                <div className="w-full md:w-1/2 lg:w-1/2 text-center md:text-left text-gray-900">
                  <Volleyball size={80} className="mx-auto md:mx-0 mb-8 text-blue-600" />
                  <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-8">
                    КлубОК
                  </h1>
                  <p className="text-2xl sm:text-2xl md:text-3xl mb-12 text-gray-700">
                    Мы предоставляем инструменты, знания и юридическую поддержку для защиты ваших прав и безопасности в интернете. Наша миссия — сделать цифровое пространство безопасным для каждого.
                  </p>
                  <Link
                    href="#knowledge-base"
                    className="inline-block bg-blue-600 text-white hover:bg-blue-700 font-semibold py-4 px-10 rounded-full text-2xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                  >
                    К материалам
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* Statistics Section */}
          <section id="statistics" className="pt-20 pb-0 md:py-24 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-slate-800">Старшее поколение в сети</h2>
                <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                  По данным Росстата, более 50% пожилых людей в России активно пользуются интернетом для общения, получения информации и услуг.
                </p>
              </div>

              <div className="flex flex-col md:flex-row items-center gap-16 md:gap-20">
                {/* Left Side: Pie Chart */}
                <div className="w-full md:w-1/2 flex flex-col items-center">
                  <div className="w-full h-100 sm:h-96">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={140}
                          fill="#000000"
                          dataKey="value"
                          label={({ cx, cy, midAngle, outerRadius, percent }) => {
                            const RADIAN = Math.PI / 180;
                            
                            // Начальная точка линии (край сектора)
                            const startX = cx + outerRadius * Math.cos(-midAngle * RADIAN);
                            const startY = cy + outerRadius * Math.sin(-midAngle * RADIAN);
                            
                            // Средняя точка (конец диагональной части)
                            const diagonalLength = 30;
                            const midX = cx + (outerRadius + diagonalLength) * Math.cos(-midAngle * RADIAN);
                            const midY = cy + (outerRadius + diagonalLength) * Math.sin(-midAngle * RADIAN);
                            
                            // Конечная точка (конец горизонтальной линии)
                            const isRight = midX > cx;
                            const horizontalLength = 30;
                            const endX = isRight ? midX + horizontalLength : midX - horizontalLength;
                            const endY = midY;
                            
                            // Позиционирование текста
                            const textAnchor = isRight ? 'start' : 'end';
                            const textOffset = isRight ? 5 : -5;

                            return (
                              <g>
                                {/* Линия от сектора к тексту */}
                                <polyline
                                  points={`${startX},${startY} ${midX},${midY} ${endX},${endY}`}
                                  stroke="#000000"
                                  fill="none"
                                  strokeWidth={2}
                                />
                                {/* Текст с процентами */}
                                <text
                                  x={endX + textOffset}
                                  y={endY}
                                  textAnchor={textAnchor}
                                  dominantBaseline="middle"
                                  fill="#000000"
                                  className="font-bold text-4xl"
                                >
                                  {`${(percent * 100).toFixed(0)}%`}
                                </text>
                              </g>
                            );
                          }}
                        >
                          {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value, name) => [`${value}%`, name]} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex justify-center items-center space-x-8 mt-8">
                    <div className="flex items-center">
                      <div className="w-6 h-6 rounded-full bg-blue-600 mr-3"></div>
                      <span className="text-xl text-slate-600">Пользуются</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-6 h-6 rounded-full bg-gray-300 mr-3"></div>
                      <span className="text-xl text-slate-600">Не пользуются</span>
                    </div>
                  </div>
                </div>
                
                {/* Right Side: Illustration */}
                <div className="w-full md:w-1/2 flex justify-center items-center mt-12 md:mt-0">
                  <div className="desktop-only-image">
                    <Image
                      src="/images/hero-bg10.png"
                      alt="Иллюстрация дедушки"
                      width={600}
                      height={800}
                      quality={100}
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* News Section */}
          <section id="news" className="pt-16 md:pt-20 pb-20 md:pb-24 bg-slate-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-4xl sm:text-5xl font-bold text-center mb-6 text-slate-800">Последние Новости</h2>
              <p className="text-xl text-center text-slate-600 mb-16 max-w-3xl mx-auto">Будьте в курсе актуальных событий и угроз в сфере цифровой безопасности.</p>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                {newsData.map((item) => (
                  <div key={item.id} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
                    <Newspaper size={48} className="text-blue-500 mb-6" />
                    <h3 className="text-2xl font-semibold mb-4 text-slate-800">{item.title}</h3>
                    <p className="text-lg text-slate-500 mb-4">{item.date}</p>
                    <p className="text-xl text-slate-600 mb-6 flex-grow">{item.snippet}</p>
                    <a
                      href={item.link}
                      target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium group mt-auto text-xl"
                    >
                      Читать далее <ExternalLink size={24} className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>
                ))}
              </div>
              <div className="text-center mt-24 space-y-4 md:space-y-0 md:space-x-4">
                <button
                  onClick={() => router.push('/news')}
                  className="inline-block border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold py-3 px-8 rounded-full text-xl transition-colors duration-300"
                >
                  Все новости
                </button>
                <button
                  className="inline-flex items-center justify-center bg-blue-600 text-white font-semibold py-3 px-6 rounded-full text-xl shadow-md hover:bg-blue-700 transition-colors duration-300 disabled:opacity-50 min-w-[240px]"
                >
                  <Mail size={18} className="mr-2 group-hover:translate-x-1 transition-transform" />
                  Подписаться на рассылку
                </button>
              </div>
            </div>
          </section>

          {/* Knowledge Base Section */}
          <section id="knowledge-base" className="py-20 md:py-24 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-4xl sm:text-5xl font-bold text-center mb-6 text-slate-800">База Знаний</h2>
              <p className="text-xl text-center text-slate-600 mb-16 max-w-3xl mx-auto">Инструкции, шаблоны документов и полезные ресурсы для вашей цифровой защиты.</p>
              <div className="grid md:grid-cols-2 gap-10">
                {knowledgeBaseData.map((item) => (
                  <div key={item.id} className="bg-slate-50 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex items-start space-x-6">
                    <div className={`p-4 rounded-full ${
                      item.type === 'guide' ? 'bg-sky-100 text-sky-600' :
                      item.type === 'template' ? 'bg-green-100 text-green-600' :
                      item.type === 'security' ? 'bg-red-100 text-red-600' :
                      'bg-yellow-100 text-yellow-600'
                    }`}>
                      {item.type === 'guide' ? <Lightbulb size={32} /> :
                      item.type === 'template' ? <FileText size={32} /> :
                      item.type === 'security' ? <ShieldAlert size={32} /> :
                      <BookOpen size={32} />}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-semibold mb-2 text-slate-800">{item.title}</h3>
                      <p className="text-xl text-slate-600 mb-4">{item.description}</p>
                      <a
                        href={item.link}
                        target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium group text-xl"
                      >
                        {item.type === 'template' ? 'Скачать шаблон' : 'Подробнее'} <ChevronRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-center mt-24">
                <button
                  onClick={() => router.push('/knowledge-base')}
                  className="inline-block border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold py-3 px-8 rounded-full text-xl transition-colors duration-300"
                >
                  Вся база знаний
                </button>
              </div>
            </div>
          </section>

          {/* Team Section */}
          <section id="team" className="py-20 md:py-24 bg-slate-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-4xl sm:text-5xl font-bold text-center mb-6 text-slate-800">Наша Команда</h2>
              <p className="text-xl text-center text-slate-600 mb-16 max-w-3xl mx-auto">
                Познакомьтесь с нашей профессиональной командой, работающей над вашей безопасностью.
              </p>
              
              {/* Первый ряд */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                {/* Блок CEO (занимает 2 строки) */}
                <div className="md:row-span-2 bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center">
                  {teamData[0].imageUrl ? (
                    <div className="w-40 h-40 rounded-full mb-6 overflow-hidden border-2 border-slate-200 flex items-center justify-center bg-gray-200">
                      <Image
                        src={teamData[0].imageUrl}
                        alt={teamData[0].name}
                        className="w-full h-full object-cover"
                        width={160}
                        height={160}
                      />
                    </div>
                  ) : (
                    <div className="w-40 h-40 rounded-full mb-6 bg-gray-200 border-2 border-dashed flex items-center justify-center" />
                  )}
                  <h3 className="text-2xl font-semibold mb-2 text-slate-800">{teamData[0].name}</h3>
                  <p className="text-blue-600 font-medium mb-3 text-lg">{teamData[0].role}</p>
                  <p className="text-lg text-slate-600 flex-grow mb-6">{teamData[0].bio}</p>
                  <button
                    className="inline-block border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold py-3 px-8 rounded-full text-xl transition-colors duration-300"
                    onClick={() => openModal(teamData[0])}
                    type="button"
                  >
                    Подробнее
                  </button>
                </div>
                
                {/* Три эксперта справа */}
                {teamData.slice(1, 4).map((member) => (
                  <div
                    key={member.id}
                    className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center"
                  >
                    {member.imageUrl ? (
                      <div className="w-32 h-32 rounded-full mb-4 overflow-hidden border-2 border-slate-200 flex items-center justify-center bg-gray-200">
                        <Image
                          src={member.imageUrl}
                          alt={member.name}
                          className="w-full h-full object-cover"
                          width={128}
                          height={128}
                        />
                      </div>
                    ) : (
                      <div className="w-32 h-32 rounded-full mb-4 bg-gray-200 border-2 border-dashed flex items-center justify-center" />
                    )}
                    <h3 className="text-xl font-semibold mb-2 text-slate-800">{member.name}</h3>
                    <p className="text-blue-600 font-medium mb-2 text-lg">{member.role}</p>
                    <p className="text-md text-slate-600 flex-grow mb-4">{member.bio}</p>
                    <button
                      className="inline-block border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold py-2 px-6 rounded-full text-lg transition-colors duration-300"
                      onClick={() => openModal(member)}
                      type="button"
                    >
                      Подробнее
                    </button>
                  </div>
                ))}
              </div>
              
              {/* Второй ряд */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:ml-[25%]">
                {/* Маркетолог (занимает 1 колонку) */}
                <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center">
                  {teamData[4].imageUrl ? (
                    <div className="w-32 h-32 rounded-full mb-4 overflow-hidden border-2 border-slate-200 flex items-center justify-center bg-gray-200">
                      <Image
                        src={teamData[4].imageUrl}
                        alt={teamData[4].name}
                        className="w-full h-full object-cover"
                        width={128}
                        height={128}
                      />
                    </div>
                  ) : (
                    <div className="w-32 h-32 rounded-full mb-4 bg-gray-200 border-2 border-dashed flex items-center justify-center" />
                  )}
                  <h3 className="text-xl font-semibold mb-2 text-slate-800">{teamData[4].name}</h3>
                  <p className="text-blue-600 font-medium mb-2 text-lg">{teamData[4].role}</p>
                  <p className="text-md text-slate-600 flex-grow mb-4">{teamData[4].bio}</p>
                  <button
                    className="inline-block border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold py-2 px-6 rounded-full text-lg transition-colors duration-300"
                    onClick={() => openModal(teamData[4])}
                    type="button"
                  >
                    Подробнее
                  </button>
                </div>
                
                {/* Два IT-специалиста */}
                {teamData.slice(5, 7).map((member) => (
                  <div
                    key={member.id}
                    className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center"
                  >
                    {member.imageUrl ? (
                      <div className="w-32 h-32 rounded-full mb-4 overflow-hidden border-2 border-slate-200 flex items-center justify-center bg-gray-200">
                        <Image
                          src={member.imageUrl}
                          alt={member.name}
                          className="w-full h-full object-cover"
                          width={128}
                          height={128}
                        />
                      </div>
                    ) : (
                      <div className="w-32 h-32 rounded-full mb-4 bg-gray-200 border-2 border-dashed flex items-center justify-center" />
                    )}
                    <h3 className="text-xl font-semibold mb-2 text-slate-800">{member.name}</h3>
                    <p className="text-blue-600 font-medium mb-2 text-lg">{member.role}</p>
                    <p className="text-md text-slate-600 flex-grow mb-4">{member.bio}</p>
                    <button
                      className="inline-block border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold py-2 px-6 rounded-full text-lg transition-colors duration-300"
                      onClick={() => openModal(member)}
                      type="button"
                    >
                      Подробнее
                    </button>
                  </div>
                ))}
              </div>
            </div>
            {/* Team Modal */}
            {showModal && selectedMember && (
              <div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
                onClick={closeModal}
                aria-modal="true"
                role="dialog"
              >
                <div
                  className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full mx-4 p-10 relative animate-fadeIn"
                  onClick={e => e.stopPropagation()}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="w-32 h-32 rounded-full mb-6 overflow-hidden border-2 border-slate-200 flex items-center justify-center bg-gray-200">
                      {selectedMember.imageUrl ? (
                        <Image
                          src={selectedMember.imageUrl}
                          alt={selectedMember.name}
                          className="w-full h-full object-cover"
                          width={128}
                          height={128}
                          onError={e => {
                            (e.target as HTMLImageElement).style.display = 'none';
                          }}
                        />
                      ) : (
                        <div className="bg-gray-200 border-2 border-dashed rounded-full w-28 h-28" />
                      )}
                    </div>
                    <h3 className="text-3xl font-bold text-slate-900 mb-2">{selectedMember.name}</h3>
                    <div className="flex justify-center gap-6 mb-6 mt-4">
                      {selectedMember.email && (
                        <a
                          href={`mailto:${selectedMember.email}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-50 hover:bg-blue-100 text-blue-600 hover:text-blue-700 transition-colors shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
                          title="Почта"
                        >
                          <Mail size={28} />
                        </a>
                      )}
                      {selectedMember.telegram && (
                        <a
                          href={selectedMember.telegram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-50 hover:bg-blue-100 text-blue-600 hover:text-blue-700 transition-colors shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
                          title="Telegram"
                        >
                          <Send size={28} />
                        </a>
                      )}
                      {selectedMember.instagram && selectedMember.instagram !== '' && (
                        <a
                          href={selectedMember.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-50 hover:bg-blue-100 text-blue-600 hover:text-blue-700 transition-colors shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
                          title="Instagram"
                        >
                          <Instagram size={28} />
                        </a>
                      )}
                    </div>
                    <div className="w-full text-left mt-4">
                      <div className="mb-6">
                        <div className="text-lg text-slate-500 font-semibold uppercase mb-2">О себе</div>
                        <div className="text-xl text-slate-700">{selectedMember.details || selectedMember.bio}</div>
                      </div>
                      {selectedMember.university && (
                        <div className="mb-6">
                          <div className="text-lg text-slate-500 font-semibold uppercase mb-2">Место учебы</div>
                          <div className="text-xl text-slate-700">{selectedMember.university}</div>
                        </div>
                      )}
                      <div className="mb-4">
                        <div className="text-lg text-slate-500 font-semibold uppercase mb-2">Роль в проекте</div>
                        <div className="text-xl text-slate-700">{selectedMember.role}</div>
                      </div>
                    </div>
                  </div>
                  <button
                    className="absolute top-6 right-6 text-slate-400 hover:text-blue-600 focus:outline-none"
                    onClick={closeModal}
                    aria-label="Закрыть"
                    type="button"
                  >
                    <X size={32} />
                  </button>
                </div>
              </div>
            )}
            <style>{`
              @keyframes fadeIn {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
              }
              .animate-fadeIn {
                animation: fadeIn 0.2s ease;
              }
            `}</style>
          </section>

          {/* Questions Section */}
          <section id="questions" className="py-20 md:py-24 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl bg-slate-50 p-12 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h2 className="text-4xl sm:text-5xl font-bold text-center mb-6 text-slate-800">Есть вопросы?</h2>
              <p className="text-xl text-center text-slate-600 mb-12">
                Если у вас есть вопросы, вы можете задать их нашей команде, заполнив форму ниже.
              </p>
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-xl font-medium text-slate-700 mb-3">
                    Ваше имя
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    className="w-full rounded-full border-2 border-gray-300 px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-xl font-medium text-slate-700 mb-3">
                    Ваша электронная почта для ответа
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    className="w-full rounded-full border-2 border-gray-300 px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="question" className="block text-xl font-medium text-slate-700 mb-3">
                    Ваш вопрос
                  </label>
                  <textarea
                    id="question"
                    name="question"
                    value={formData.question}
                    onChange={handleFormChange}
                    rows={5}
                    className="w-full rounded-md border-2 border-gray-300 px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    required
                  />
                </div>
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="consent"
                      name="consent"
                      type="checkbox"
                      checked={formData.consent}
                      onChange={handleFormChange}
                      className="focus:ring-blue-500 h-6 w-6 text-blue-600 border-2 border-gray-300 rounded"
                      required
                    />
                  </div>
                  <div className="ml-3">
                    <label htmlFor="consent" className="text-lg text-slate-700">
                      Я согласен на обработку персональных данных в соответствии с ФЗ «О персональных данных» №152-ФЗ
                    </label>
                  </div>
                </div>
                <div className="text-center">
                  <button
                    type="submit"
                    disabled={isFormSubmitting}
                    className="inline-block bg-blue-600 text-white font-semibold py-3 px-8 rounded-full text-xl shadow-md hover:bg-blue-700 transition-colors duration-300 disabled:opacity-50"
                  >
                    {isFormSubmitting ? 'Отправка...' : 'Отправить'}
                  </button>
                </div>
                {formSubmitted && (
                  <p className="text-center text-black-600 text-xl font-semibold mt-4">
                    Спасибо! Ваш вопрос отправлен.
                  </p>
                )}
              </form>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-slate-800 text-slate-300 py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex justify-center items-center space-x-2 mb-4">
                <Volleyball size={30} className="text-blue-400"/>
                <p className="text-2xl font-semibold">КлубОК</p>
            </div>
            <p className="text-lg mb-2">
              &copy; {new Date().getFullYear()} КлубОК. Все права защищены.
            </p>
            <p className="text-lg text-slate-400">
              Платформа цифровой безопасности и юридической помощи.
            </p>
            <p className="text-lg text-slate-500 mt-4">
              Важно: Информация на сайте не является юридической консультацией. Для получения помощи обратитесь к специалисту.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default CyberShieldPage;