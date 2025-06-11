import Head from 'next/head';
import React, { useState, useEffect, useMemo } from 'react';
import { Menu, X, Newspaper, Volleyball, Search, ChevronLeft, ChevronRight, Calendar, ExternalLink } from 'lucide-react';
import Link from 'next/link';

// --- ТИПЫ ДАННЫХ ---
interface NewsItem {
  id: string;
  title: string;
  date: string;
  snippet: string;
  content?: string; // для полного содержимого новости
}

// Реальные данные новостей
const allNewsData: NewsItem[] = [
    {
    id: 'new_1',
    title: 'Команда нашего проекта успешно защитила проект по ПИвЮ на "10"',
    date: '2025-06-16',
    snippet: 'Наш веб-сайт КлубОК для пожилых людей получил высшую оценку!',
    link: '/news/new_1',
  },
  {
    id: 'new_2',
    title: 'Рост фишинговых атак: как распознать и защититься',
    date: '2025-06-10',
    snippet: 'Эксперты делятся советами по выявлению мошеннических писем и сайтов.',
    link: '/news/new_2',
  },
  {
    id: 'new_3',
    title: 'Вебинар: Безопасность в социальных сетях',
    date: '2025-06-05',
    snippet: 'Присоединяйтесь к нашему бесплатному вебинару и научитесь защищать свои аккаунты.',
    link: '/news/new_3',
  },
].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()); // Сортировка по дате (новые выше)

const NAV_ITEMS = [
  { label: 'Главная', href: '/' },
  { label: 'Новости', href: '/news' },
  { label: 'База знаний', href: '/knowledge-base' },
  { label: 'Команда', href: '/#team' },
];

const ITEMS_PER_PAGE = 8; // Уменьшил количество элементов на странице для увеличенного размера

// --- КОМПОНЕНТ СТРАНИЦЫ НОВОСТЕЙ ---
const NewsPage: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

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

  const filteredNews = useMemo(() => {
    if (!searchQuery) {
      return allNewsData;
    }
    return allNewsData.filter(item =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.snippet.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const totalPages = Math.ceil(filteredNews.length / ITEMS_PER_PAGE);
  const currentItems = filteredNews.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      scrollToTop();
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      scrollToTop();
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    scrollToTop();
  };

  return (
    <>
      <Head>
        <title>Новости - КлубОК</title>
        <meta name="description" content="Последние новости и обновления от проекта КлубОК по цифровой безопасности и юридической помощи." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-slate-100 text-slate-800 flex flex-col" style={{ fontSize: '18px' }}>
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
          {isMobileMenuOpen && (
            <div className="md:hidden absolute top-24 left-0 right-0 bg-white shadow-lg z-40 pb-6"> {/* Увеличил отступы */}
              <div className="px-4 pt-4 pb-5 space-y-2"> {/* Увеличил отступы */}
                {NAV_ITEMS.map((item) => (
                   <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block px-4 py-3 rounded-md text-xl font-medium transition-colors ${item.href === '/news' ? 'text-blue-600 bg-blue-50' : 'text-slate-600 hover:text-blue-600 hover:bg-slate-100'}`}> {/* Увеличил размер текста и отступы */}
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </nav>

        <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20"> {/* Увеличил вертикальные отступы */}
          <div className="max-w-4xl mx-auto">
            {/* Заголовок и поиск */}
            <div className="text-center mb-12 md:mb-16"> {/* Увеличил отступы */}
              <h1 className="text-5xl sm:text-6xl font-bold text-slate-900 mb-6">Новости</h1> {/* Увеличил размер заголовка */}
              <p className="text-2xl text-slate-600 max-w-2xl mx-auto">Будьте в курсе актуальных событий, обновлений и угроз в сфере цифровой безопасности.</p> {/* Увеличил размер текста */}
            </div>

            <div className="relative mb-12"> {/* Увеличил отступ */}
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Поиск по новостям..."
                className="w-full pl-14 pr-6 py-4 text-xl border-2 border-slate-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" /* Увеличил размер поля и текста */
                style={{ fontSize: '1.25rem' }}
              />
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={28} /> {/* Увеличил размер иконки */}
            </div>

            {/* Список новостей */}
            <div className="space-y-8"> {/* Увеличил расстояние между элементами */}
              {currentItems.length > 0 ? (
                currentItems.map(item => (
                  <div key={item.id} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col sm:flex-row items-start gap-8"> {/* Увеличил отступы */}
                    <div className="bg-blue-100 text-blue-600 p-5 rounded-lg"> {/* Увеличил отступы */}
                        <Newspaper size={40} /> {/* Увеличил размер иконки */}
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-semibold text-slate-800 mb-4">{item.title}</h2> {/* Увеличил размер текста */}
                      <div className="flex items-center text-lg text-slate-500 mb-4 space-x-3"> {/* Увеличил размер текста */}
                        <Calendar size={20} /> {/* Увеличил размер иконки */}
                        <span>{new Date(item.date).toLocaleDateString('ru-RU', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                      </div>
                      <p className="text-xl text-slate-600 mb-6">{item.snippet}</p> {/* Увеличил размер текста */}
                      <Link
                        href={item.id ? `/news/${item.id}` : '/news'}
                        className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium group mt-auto text-xl" /* Увеличил размер текста */
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Читать далее <ExternalLink size={20} className="ml-2 group-hover:translate-x-1 transition-transform" /> {/* Увеличил размер иконки */}
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-20 bg-white rounded-xl shadow-lg"> {/* Увеличил отступы */}
                    <Search size={56} className="mx-auto text-slate-400 mb-6"/> {/* Увеличил размер иконки */}
                    <h3 className="text-3xl font-semibold text-slate-700 mb-4">Ничего не найдено</h3> {/* Увеличил размер текста */}
                    <p className="text-xl text-slate-500">Попробуйте изменить ваш поисковый запрос.</p> {/* Увеличил размер текста */}
                </div>
              )}
            </div>

            {/* Пагинация */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center mt-16 space-x-4"> {/* Увеличил отступы и расстояние */}
                <button
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                  className="p-3 rounded-md bg-white border border-slate-300 text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors" /* Увеличил размер кнопки */
                  aria-label="Предыдущая страница"
                >
                  <ChevronLeft size={28} /> {/* Увеличил размер иконки */}
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`w-12 h-12 rounded-md flex items-center justify-center text-xl ${ /* Увеличил размер кнопки и текста */
                      currentPage === page
                        ? 'bg-blue-600 text-white'
                        : 'bg-white border border-slate-300 text-slate-600 hover:bg-slate-50'
                    } transition-colors`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className="p-3 rounded-md bg-white border border-slate-300 text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors" /* Увеличил размер кнопки */
                  aria-label="Следующая страница"
                >
                  <ChevronRight size={28} /> {/* Увеличил размер иконки */}
                </button>
              </div>
            )}
          </div>
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

export default NewsPage;