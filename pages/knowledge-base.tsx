import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import {Volleyball, Menu, X, Search, Filter, BookOpen, FileText, Lightbulb, AlertTriangle, ChevronRight } from 'lucide-react';
import Link from 'next/link';

const NAV_ITEMS = [
  { label: 'Главная', href: '/' },
  { label: 'Новости', href: '/news' },
  { label: 'База знаний', href: '/knowledge-base' },
  { label: 'Команда', href: '/#team' },
];

interface KnowledgeBaseItem {
  id: string;
  title: string;
  description: string;
  type: 'guide' | 'template' | 'security' | 'book' | 'checklist';
  readTime: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  tags: string[];
  link: string;
  downloadable: boolean;
}

const knowledgeBaseData: KnowledgeBaseItem[] = [
  {
    id: 'kb1',
    title: 'Инструкция по созданию надежных паролей',
    description: 'Пошаговое руководство по выбору и управлению паролями для защиты ваших аккаунтов и персональных данных в Интернете.',
    type: 'guide',
    readTime: '10 мин',
    difficulty: 'beginner',
    tags: ['пароли', 'безопасность', 'аккаунты'],
    link: '/materials/material_1',
    downloadable: false
  },
  {
    id: 'kb2',
    title: 'Шаблон согласия на обработку персональных данных',
    description: 'Готовый шаблон документа для использования в вашем бизнесе, на веб-сайте или в приложении.',
    type: 'template',
    readTime: '3 мин',
    difficulty: 'intermediate',
    tags: ['GDPR', 'персональные данные', 'согласие'],
    link: '/materials/material_2',
    downloadable: true
  },
    {
    id: 'kb3',
    title: 'Что такое двухфакторная аутентификация?',
    description: 'Объяснение термина и инструкция по активации на популярных сервисах: Google, Яндекс, ВКонтакте и др.',
    type: 'book',
    readTime: '5 мин',
    difficulty: 'advanced',
    tags: ['защита', 'безопасность', 'аутентификация', 'пароль'],
    link: '/materials/material_3',
    downloadable: false
  },
    {
    id: 'kb4',
    title: 'Как защитить свой профиль в "Одноклассниках"?',
    description: 'Простые шаги для безопасности вашей страницы и личных данных в социальной сети.',
    type: 'guide',
    readTime: '8 мин',
    difficulty: 'beginner',
    tags: ['Одноклассники', 'аккаунт', 'настройки'],
    link: '/materials/material_4',
    downloadable: false
  },
];

const types = [
  { value: 'all', label: 'Все типы' },
  { value: 'guide', label: 'Инструкции' },
  { value: 'template', label: 'Шаблоны' },
  { value: 'security', label: 'Нарушения' },
  { value: 'book', label: 'Статьи' },
  { value: 'checklist', label: 'Чек-листы' }
];

const difficulties = [
  { value: 'all', label: 'Все уровни' },
  { value: 'beginner', label: 'Начальный' },
  { value: 'intermediate', label: 'Средний' },
  { value: 'advanced', label: 'Продвинутый' }
];

const KnowledgeBasePage: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [filteredItems, setFilteredItems] = useState(knowledgeBaseData);

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
    let filtered = knowledgeBaseData;

    if (searchQuery) {
      filtered = filtered.filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    if (selectedType !== 'all') {
      filtered = filtered.filter(item => item.type === selectedType);
    }

    if (selectedDifficulty !== 'all') {
      filtered = filtered.filter(item => item.difficulty === selectedDifficulty);
    }

    setFilteredItems(filtered);
  }, [searchQuery, selectedType, selectedDifficulty]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'guide': return <Lightbulb size={32} />; // Увеличил размер иконки
      case 'template': return <FileText size={32} />; // Увеличил размер иконки
      case 'security': return <AlertTriangle size={32} />; // Увеличил размер иконки
      case 'book': return <BookOpen size={32} />; // Увеличил размер иконки
      case 'checklist': return <Filter size={32} />; // Увеличил размер иконки
      default: return <BookOpen size={32} />; // Увеличил размер иконки
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'guide': return 'bg-sky-100 text-sky-600';
      case 'template': return 'bg-green-100 text-green-600';
      case 'security': return 'bg-red-100 text-red-600';
      case 'book': return 'bg-yellow-100 text-yellow-600';
      case 'checklist': return 'bg-purple-100 text-purple-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const getDifficultyBadge = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'Начальный';
      case 'intermediate': return 'Средний';
      case 'advanced': return 'Продвинутый';
      default: return difficulty;
    }
  };

  return (
    <>
      <Head>
        <title>База Знаний - КлубОК</title>
        <meta name="description" content="Полная коллекция материалов по цифровой безопасности: инструкции, шаблоны документов, чек-листы и образовательные ресурсы." />
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

        <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20"> {/* Увеличил вертикальные отступы */}
          {/* Заголовок и описание */}
          <div className="text-center mb-12 md:mb-16"> {/* Увеличил отступы */}
            <h1 className="text-5xl sm:text-6xl font-bold text-slate-900 mb-6">База Знаний</h1> {/* Увеличил размер заголовка */}
            <p className="text-2xl text-slate-600 max-w-2xl mx-auto"> {/* Увеличил размер текста */}
              Инструкции, шаблоны документов и полезные ресурсы для вашей цифровой защиты.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row md:items-center gap-6 mb-12"> {/* Увеличил отступы и расстояние */}
            {/* Поисковая строка */}
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Поиск по материалам..."
                className="w-full pl-14 pr-6 py-4 h-[60px] text-xl border-2 border-slate-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" /* Увеличил размер поля и текста */
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ fontSize: '1.25rem' }}
              />
              <Search 
                className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" 
                size={28} /* Увеличил размер иконки */
              />
            </div>

            {/* Фильтры */}
            <div className="flex flex-col sm:flex-row gap-6 flex-shrink-0"> {/* Увеличил расстояние между фильтрами */}
              <div className="relative">
                <select
                  className="border-2 border-slate-300 rounded-full py-4 pl-5 pr-12 h-[60px] bg-white text-slate-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none w-full text-xl" /* Увеличил размер поля и текста */
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  aria-label="Фильтр по типу материала"
                >
                  {types.map((type) => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
                  <svg className="h-6 w-6 text-slate-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"> {/* Увеличил размер стрелки */}
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>

              <div className="relative">
                <select
                  className="border-2 border-slate-300 rounded-full py-4 pl-5 pr-12 h-[60px] bg-white text-slate-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none w-full text-xl" /* Увеличил размер поля и текста */
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  aria-label="Фильтр по уровню сложности"
                >
                  {difficulties.map((diff) => (
                    <option key={diff.value} value={diff.value}>{diff.label}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
                  <svg className="h-6 w-6 text-slate-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"> {/* Увеличил размер стрелки */}
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Knowledge Base Cards */}
          {filteredItems.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-xl shadow-lg"> {/* Увеличил отступы */}
              <Search size={56} className="mx-auto text-slate-400 mb-6"/> {/* Увеличил размер иконки */}
              <h3 className="text-3xl font-semibold text-slate-700 mb-4">Ничего не найдено</h3> {/* Увеличил размер текста */}
              <p className="text-xl text-slate-500">Попробуйте изменить ваш поисковый запрос или фильтры.</p> {/* Увеличил размер текста */}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"> {/* Увеличил расстояние между карточками */}
              {filteredItems.map(item => (
                <div key={item.id} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col"> {/* Увеличил отступы внутри карточки */}
                  <div className={`p-4 rounded-full w-max mb-6 ${getTypeColor(item.type)}`}>{getTypeIcon(item.type)}</div> {/* Увеличил отступы */}
                  <h3 className="text-2xl font-semibold mb-4 text-slate-800">{item.title}</h3> {/* Увеличил размер текста */}
                  <p className="text-xl text-slate-600 flex-grow mb-6">{item.description}</p> {/* Увеличил размер текста */}
                  <div className="flex flex-wrap items-center justify-between text-lg text-slate-500 mb-6"> {/* Увеличил размер текста */}
                    <span className={`inline-block px-3 py-1 rounded text-base font-semibold ${getDifficultyBadge(item.difficulty)}`}>{getDifficultyLabel(item.difficulty)}</span> {/* Увеличил размер текста */}
                    <span>{item.readTime}</span>
                  </div>
                  <Link
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium mt-auto text-xl" /* Увеличил размер текста */
                  >
                    Подробнее <ChevronRight size={20} className="ml-2" /> {/* Увеличил размер иконки */}
                  </Link>
                </div>
              ))}
            </div>
          )}
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

export default KnowledgeBasePage;