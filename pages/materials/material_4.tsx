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
  title: 'Как защитить свой профиль в "Одноклассниках"?',
  subtitle: 'Простые шаги для безопасности вашей страницы и личных данных в социальной сети.',
  imageUrl: '/images/material_4.webp',
  author: 'Алина Козловских',
  date: '10 июня 2025',
  readTime: '8 мин',
  categories: ['Соцсети', 'Безопасность', 'Одноклассники', 'Для начинающих'],
  content: `
    <p class="mb-6 text-xl text-slate-700">Одноклассники — это место, где мы общаемся с друзьями и родными. Но важно помнить, что мошенники тоже могут увидеть вашу страницу. Давайте разберем, как защитить свой профиль.</p>

    <h2 class="text-3xl font-semibold mt-10 mb-6 text-slate-800">1. Настройки приватности</h2>
    <p class="mb-6 text-xl text-slate-700">Кому видна ваша страница и информация:</p>
    <ol class="list-decimal list-inside mb-8 pl-6 text-xl text-slate-700 space-y-3">
      <li>Нажмите на свою фотографию в правом верхнем углу → "Настройки"</li>
      <li>Выберите "Приватность"</li>
      <li>Установите "Кто видит мою страницу" — "Только друзья"</li>
      <li>Для фото, друзей и других разделов тоже выберите "Только друзья"</li>
    </ol>

    <h2 class="text-3xl font-semibold mt-10 mb-6 text-slate-800">2. Надежный пароль</h2>
    <p class="mb-6 text-xl text-slate-700">Как создать хороший пароль:</p>
    <ul class="list-disc list-inside mb-6 pl-6 text-xl text-slate-700 space-y-3">
      <li>Используйте не менее 8 символов (лучше 10-12)</li>
      <li>Добавьте буквы (большие и маленькие), цифры и знаки: !, ?, %</li>
      <li>Пример хорошего пароля: МамаРома1965!</li>
      <li>Не используйте простые пароли: 123456, qwerty, дату рождения</li>
    </ul>

    <div class="bg-blue-50 p-6 rounded-xl mb-10">
      <p class="list-disc list-inside text-xl text-blue-700 space-y-2">Никому не говорите свой пароль! Даже если звонят "из поддержки Одноклассников" — это мошенники.</p>
    </div>

    <h2 class="text-3xl font-semibold mt-10 mb-6 text-slate-800">3. Двухэтапная проверка</h2>
    <p class="mb-6 text-xl text-slate-700">Дополнительная защита входа:</p>
    <ol class="list-decimal list-inside mb-8 pl-6 text-xl text-slate-700 space-y-3">
      <li>Настройки → "Безопасность"</li>
      <li>Включите "Подтверждение входа по SMS"</li>
      <li>Теперь при входе нужно будет ввести код из SMS</li>
    </ol>

    <h2 class="text-3xl font-semibold mt-10 mb-6 text-slate-800">4. Осторожно с сообщениями</h2>
    <p class="mb-6 text-xl text-slate-700">Как не попасть на удочку мошенников:</p>
    <ul class="list-disc list-inside mb-6 pl-6 text-xl text-slate-700 space-y-3">
      <li>Не переходите по подозрительным ссылкам в сообщениях</li>
      <li>Не скачивайте файлы от незнакомцев</li>
      <li>Если пишут, что вы выиграли приз — это обман</li>
      <li>Не верьте сообщениям "ваш аккаунт взломали, срочно отправьте код"</li>
    </ul>

    <h2 class="text-3xl font-semibold mt-10 mb-6 text-slate-800">5. Что делать, если страницу взломали?</h2>
    <p class="mb-6 text-xl text-slate-700">Пошаговая инструкция:</p>
    <ol class="list-decimal list-inside mb-8 pl-6 text-xl text-slate-700 space-y-3">
      <li>Немедленно сообщите друзьям, что вас взломали</li>
      <li>Попробуйте восстановить доступ через номер телефона</li>
      <li>Если не получается — напишите в поддержку Одноклассников</li>
      <li>После восстановления сразу смените пароль</li>
    </ol>

    <p class="mt-8 text-xl text-slate-700">Раз в 3 месяца проверяйте настройки безопасности и обновляйте пароль.</p>


    <p class="mt-8 text-xl text-slate-700">Теперь ваш профиль в Одноклассниках хорошо защищен. Потратьте 10 минут на эти настройки — и спокойно общайтесь с близкими!</p>
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