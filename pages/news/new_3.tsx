import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import { Volleyball, Menu, X, ChevronRight, Calendar, Tag } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const NAV_ITEMS = [
  { label: 'Главная', href: '/' },
  { label: 'Новости', href: '/news' },
  { label: 'База знаний', href: '/knowledge-base' },
  { label: 'Команда', href: '/#team' },
];

const newsArticleData = {
  title: 'Вебинар: Безопасность в социальных сетях',
  subtitle: 'Присоединяйтесь к нашему бесплатному вебинару и научитесь защищать свои аккаунты.',
  imageUrl: '/images/new_3.png',
  date: '5 июня 2025',
  category: 'Мероприятие',
  content: `
    <p class="mb-6 text-xl text-slate-700">Дорогие друзья! Мы приглашаем вас на полезный вебинар, где простыми словами объясним, как безопасно пользоваться соцсетями и защитить свои страницы от взлома.</p>
    
    <h2 class="text-3xl font-semibold mt-10 mb-6 text-slate-800">Что вы узнаете на вебинаре?</h2>
    <ul class="list-disc list-inside mb-6 pl-6 text-xl text-slate-700 space-y-3">
      <li>Как придумать надежный пароль, который не взломают</li>
      <li>Какие ссылки нельзя открывать в сообщениях</li>
      <li>Как проверить, кто может видеть ваши фото и записи</li>
      <li>Что делать, если вас пытаются обмануть</li>
    </ul>

    <h2 class="text-3xl font-semibold mt-10 mb-6 text-slate-800">Как участвовать?</h2>
    <p class="mb-6 text-xl text-slate-700">Вебинар пройдет 20 мая в 18:00. Для участия:</p>
    <ol class="list-decimal list-inside mb-6 pl-6 text-xl text-slate-700 space-y-3">
      <li>Зарегистрируйтесь по <a href="#register" class="text-blue-600 underline">этой ссылке</a></li>
      <li>За день до вебинара мы пришлем вам напоминание</li>
      <li>В назначенное время перейдите по ссылке из письма</li>
    </ol>

    <div class="bg-blue-50 p-6 rounded-xl mb-10">
      <p class="list-disc list-inside text-xl text-blue-700 space-y-2">Вебинар абсолютно бесплатный и подойдет для любого возраста. Можно задавать вопросы в чате. Запись будет доступна после мероприятия.</p>
    </div>

    <p class="mt-8 text-xl text-slate-700">Не упустите возможность научиться безопасному общению в интернете! Ждем вас 20 мая.</p>
  `,
};

const NewsArticlePage: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  return (
    <>
      <Head>
        <title>{newsArticleData.title} - Новости КлубОК</title>
        <meta name="description" content={newsArticleData.subtitle} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-slate-100 text-slate-800 flex flex-col" style={{ fontSize: '18px' }}>
        {/* Navbar - остаётся без изменений */}
        <nav className="bg-white/80 backdrop-blur-md shadow-md sticky top-0 z-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-24">
              <Link href="/" className="flex items-center space-x-3 text-blue-600 hover:text-blue-700 transition-colors">
                <Volleyball size={40} />
                <span className="font-bold text-3xl">КлубОК</span>
              </Link>
              <div className="hidden md:flex space-x-8">
                {NAV_ITEMS.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="px-4 py-3 rounded-md text-xl font-medium text-slate-600 hover:text-blue-600 transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
              <div className="md:hidden">
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  aria-label="Toggle menu"
                  className="text-slate-600 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 p-3 rounded-md"
                >
                  {isMobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
                </button>
              </div>
            </div>
          </div>
          {isMobileMenuOpen && (
            <div className="md:hidden absolute top-24 left-0 right-0 bg-white shadow-lg z-40 pb-6">
              <div className="px-4 pt-4 pb-5 space-y-2">
                {NAV_ITEMS.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block px-4 py-3 rounded-md text-xl font-medium transition-colors ${item.href === '/news' ? 'text-blue-600 bg-blue-50' : 'text-slate-600 hover:text-blue-600 hover:bg-slate-100'}`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </nav>

        <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
            <div className="max-w-6xl mx-auto bg-white p-8 sm:p-12 rounded-2xl shadow-xl">
                
                {/* Breadcrumbs */}
                <div className="mb-8 text-lg text-slate-500 flex items-center">
                    <Link href="/" className="hover:text-blue-600">Главная</Link>
                    <ChevronRight size={20} className="mx-2" />
                    <Link href="/news" className="hover:text-blue-600">Новости</Link>
                    <ChevronRight size={20} className="mx-2" />
                    <span className="text-slate-700 font-medium truncate max-w-xs sm:max-w-sm md:max-w-md">{newsArticleData.title}</span>
                </div>

                {/* Title */}
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-slate-900 leading-tight">
                    {newsArticleData.title}
                </h1>

                {/* Subtitle */}
                <p className="text-2xl text-slate-600 mb-10">
                    {newsArticleData.subtitle}
                </p>

                {/* Meta Info */}
                <div className="flex flex-wrap items-center text-slate-500 text-lg mb-10 border-y border-slate-200 py-6 gap-x-8 gap-y-3">
                    <div className="flex items-center">
                        <Calendar size={24} className="mr-3" />
                        <span>{newsArticleData.date}</span>
                    </div>
                </div>

                {/* Image */}
                {newsArticleData.imageUrl && (
                  <div className="relative w-full h-96 sm:h-[500px] md:h-[600px] rounded-xl mb-12 overflow-hidden shadow-lg bg-slate-200">
                      <Image
                          src={newsArticleData.imageUrl}
                          alt={newsArticleData.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 1000px"
                          priority
                      />
                  </div>
                )}

                {/* Content */}
                <div className="max-w-5xl mx-auto">
                  <div 
                      className="prose prose-xl max-w-none prose-slate prose-headings:text-slate-800 prose-a:text-blue-600 hover:prose-a:text-blue-700 prose-li:marker:text-blue-600"
                      dangerouslySetInnerHTML={{ __html: newsArticleData.content }}
                  />
                </div>

                <div className="text-center mt-10 space-x-4">
                  <button
                    className="inline-flex items-center justify-center bg-blue-600 text-white font-semibold py-3 px-6 rounded-full text-xl shadow-md hover:bg-blue-700 transition-colors duration-300 disabled:opacity-50 min-w-[240px]"
                  >
                    <Calendar size={18} className="mr-2 group-hover:translate-x-1 transition-transform" />
                    Добавить в календарь
                  </button>
                </div>

                {/* Category */}
                <div className="mt-14 pt-8 border-t border-slate-200">
                    <h3 className="text-2xl font-semibold mb-6 text-slate-800">Категория:</h3>
                    <div className="flex flex-wrap gap-4">
                        <span 
                            className="inline-flex items-center bg-blue-100 text-blue-800 text-lg font-medium px-4 py-2 rounded-full"
                        >
                            <Tag size={20} className="mr-2" />
                            {newsArticleData.category}
                        </span>
                    </div>
                </div>

            </div>
        </main>

        {/* Footer - остаётся без изменений */}
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

export default NewsArticlePage;