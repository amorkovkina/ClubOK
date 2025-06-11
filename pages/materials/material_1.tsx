import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import { Volleyball, Menu, X, Tag, Clock, User, ChevronRight, Calendar } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const NAV_ITEMS = [
  { label: 'Главная', href: '/' },
  { label: 'Новости', href: '/news' },
  { label: 'База знаний', href: '/knowledge-base' },
  { label: 'Команда', href: '/#team' },
];

const articleData = {
  title: 'Инструкция по созданию надежных паролей',
  subtitle: 'Пошаговое руководство по выбору и управлению паролями для защиты ваших аккаунтов и персональных данных в Интернете.',
  imageUrl: '/images/material_1.webp',
  author: 'Алина Козловских',
  date: '18 мая 2025',
  readTime: '10 мин',
  categories: ['Безопасность аккаунтов', 'Пароли', 'Начальный уровень'],
  content: `
    <p class="mb-6 text-xl text-slate-700">В современном цифровом мире надежный пароль — это первая и одна из самых важных линий защиты ваших личных данных, финансов и конфиденциальной информации. Слабые или предсказуемые пароли могут легко стать добычей злоумышленников, открывая им доступ к вашим аккаунтам. В этом гайде мы разберем, как создавать и управлять надежными паролями.</p>
    
    <h2 class="text-3xl font-semibold mt-10 mb-6 text-slate-800">Что делает пароль надежным?</h2>
    <p class="mb-6 text-xl text-slate-700">Надежный пароль должен соответствовать нескольким ключевым критериям:</p>
    <ul class="list-disc list-inside mb-6 pl-6 text-xl text-slate-700 space-y-3">
      <li><strong>Длина:</strong> Чем длиннее пароль, тем сложнее его взломать. Рекомендуется использовать пароли длиной не менее 12-16 символов.</li>
      <li><strong>Сложность:</strong> Пароль должен содержать комбинацию заглавных и строчных букв, цифр и специальных символов (например, !, @, #, $, %).</li>
      <li><strong>Уникальность:</strong> Никогда не используйте один и тот же пароль для нескольких аккаунтов. Если один сервис будет взломан, все ваши остальные аккаунты останутся в безопасности.</li>
      <li><strong>Непредсказуемость:</strong> Избегайте использования личной информации (имена, даты рождения), словарных слов, популярных фраз или простых последовательностей (123456, qwerty).</li>
    </ul>

    <h2 class="text-3xl font-semibold mt-10 mb-6 text-slate-800">Как создать надежный пароль?</h2>
    <p class="mb-6 text-xl text-slate-700">Вот несколько методов:</p>
    <ol class="list-decimal list-inside mb-6 pl-6 text-xl text-slate-700 space-y-3">
      <li><strong>Метод фразы-пароля:</strong> Возьмите запоминающуюся фразу и преобразуйте ее. Например, "Мой первый кот был рыжий и звали его Барсик!" может стать "M1k_b_r&z_e_B!".</li>
      <li><strong>Использование менеджера паролей:</strong> Специальные программы (например, LastPass, 1Password, Bitwarden) могут генерировать и безопасно хранить сложные и уникальные пароли для всех ваших аккаунтов.</li>
      <li><strong>Ручная генерация:</strong> Если вы создаете пароль вручную, убедитесь, что он соответствует всем критериям надежности, упомянутым выше.</li>
    </ol>

    <h2 class="text-3xl font-semibold mt-10 mb-6 text-slate-800">Управление паролями</h2>
    <p class="mb-6 text-xl text-slate-700">Создать надежный пароль — это полдела. Важно также правильно им управлять:</p>
    <ul class="list-disc list-inside mb-6 pl-6 text-xl text-slate-700 space-y-3">
      <li><strong>Используйте менеджер паролей:</strong> Это самый безопасный и удобный способ хранить десятки уникальных паролей.</li>
      <li><strong>Включите двухфакторную аутентификацию (2FA):</strong> Это добавляет дополнительный уровень защиты, даже если ваш пароль будет скомпрометирован.</li>
      <li><strong>Регулярно меняйте пароли:</strong> Особенно для критически важных аккаунтов (банкинг, почта).</li>
      <li><strong>Не делитесь паролями:</strong> Никогда и ни с кем не делитесь своими паролями.</li>
    </ul>
    <p class="mt-8 text-xl text-slate-700">Следуя этим простым правилам, вы значительно повысите уровень своей цифровой безопасности и защитите свои данные от несанкционированного доступа.</p>
  `,
};

const KnowledgeBaseArticlePage: React.FC = () => {
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
        <title>{articleData.title} - База знаний КлубОК</title>
        <meta name="description" content={articleData.subtitle} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-slate-100 text-slate-800 flex flex-col" style={{ fontSize: '18px' }}>
        {/* Navbar */}
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
                    className={`block px-4 py-3 rounded-md text-xl font-medium transition-colors ${item.href === '/knowledge-base' ? 'text-blue-600 bg-blue-50' : 'text-slate-600 hover:text-blue-600 hover:bg-slate-100'}`}
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
                    <Link href="/knowledge-base" className="hover:text-blue-600">База знаний</Link>
                    <ChevronRight size={20} className="mx-2" />
                    <span className="text-slate-700 font-medium truncate max-w-xs sm:max-w-sm md:max-w-md">{articleData.title}</span>
                </div>

                {/* Title */}
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-slate-900 leading-tight">
                    {articleData.title}
                </h1>

                {/* Subtitle */}
                <p className="text-2xl text-slate-600 mb-10">
                    {articleData.subtitle}
                </p>

                {/* Meta Info */}
                <div className="flex flex-wrap items-center text-slate-500 text-lg mb-10 border-y border-slate-200 py-6 gap-x-8 gap-y-3">
                    <div className="flex items-center">
                        <User size={24} className="mr-3" />
                        <span>{articleData.author}</span>
                    </div>
                    <div className="flex items-center">
                        <Calendar size={24} className="mr-3" />
                        <span>{articleData.date}</span>
                    </div>
                    <div className="flex items-center">
                        <Clock size={24} className="mr-3" />
                        <span>Читать: {articleData.readTime}</span>
                    </div>
                </div>

                {/* Image */}
                {articleData.imageUrl && (
                  <div className="relative w-full h-96 sm:h-[500px] md:h-[600px] rounded-xl mb-12 overflow-hidden shadow-lg bg-slate-200">
                      <Image
                          src={articleData.imageUrl}
                          alt={articleData.title}
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
                      dangerouslySetInnerHTML={{ __html: articleData.content }}
                  />
                </div>

                {/* Categories/Tags */}
                <div className="mt-14 pt-8 border-t border-slate-200">
                    <h3 className="text-2xl font-semibold mb-6 text-slate-800">Категории и теги:</h3>
                    <div className="flex flex-wrap gap-4">
                        {articleData.categories.map((category, index) => (
                            <span 
                                key={index} 
                                className="inline-flex items-center bg-blue-100 text-blue-800 text-lg font-medium px-4 py-2 rounded-full"
                            >
                                <Tag size={20} className="mr-2" />
                                {category}
                            </span>
                        ))}
                    </div>
                </div>

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

export default KnowledgeBaseArticlePage;