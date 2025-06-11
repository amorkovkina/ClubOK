import Head from 'next/head';
import React, { useState } from 'react';
import { Volleyball, Menu, X, Download, FileText, User, Calendar, ChevronRight } from 'lucide-react';
import Link from 'next/link';

const NAV_ITEMS = [
  { label: 'Главная', href: '/' },
  { label: 'Новости', href: '/news' },
  { label: 'База знаний', href: '/knowledge-base' },
  { label: 'Команда', href: '/#team' },
];

const PersonalDataProcessingTemplatePage: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [address, setAddress] = useState('');

  const formattedBirthDate = birthDate ? new Date(birthDate).toLocaleDateString('ru-RU') : '[ДАТА РОЖДЕНИЯ]';
  const currentDate = new Date().toLocaleDateString('ru-RU');

  const template = `
СОГЛАСИЕ НА ОБРАБОТКУ ПЕРСОНАЛЬНЫХ ДАННЫХ

Я, ${name || '[ИМЯ]'},
проживающий по адресу: ${address || '[АДРЕС]'}, 
родившийся ${formattedBirthDate},
настоящим подтверждаю свое согласие на обработку моих персональных данных.

1. Перечень персональных данных:
   - Фамилия, имя, отчество
   - Дата рождения
   - Адрес
   - Контактные данные (телефон, email)

2. Цели обработки персональных данных:
   - Предоставление услуг и исполнение обязательств перед субъектом персональных данных

3. Обработка персональных данных будет осуществляться путем:
   - сбора, записи, систематизации, накопления, хранения, уточнения (обновления, изменения), извлечения, использования, передачи (распространения, предоставления, доступа), обезличивания, блокирования, удаления, уничтожения.

4. Срок действия согласия: бессрочно.

5. Настоящее согласие может быть отозвано мной в любой момент путем направления письменного заявления.

Дата: ${currentDate}
Подпись: ________________________ (${name || '[ИМЯ]'})
`;

  const handleDownload = () => {
    const blob = new Blob([template], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `Согласие_${name || 'ИМЯ'}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <Head>
        <title>Шаблон согласия на обработку персональных данных - КлубОК</title>
        <meta name="description" content="Шаблон согласия на обработку персональных данных" />
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
              <span className="text-slate-700 font-medium">Шаблон согласия на обработку персональных данных</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-slate-900 leading-tight">
              Шаблон согласия на обработку персональных данных
            </h1>

            <p className="text-2xl text-slate-600 mb-10">
              Готовый шаблон документа для использования в вашем бизнесе, на веб-сайте или в приложении.
            </p>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center text-slate-500 text-lg mb-10 border-y border-slate-200 py-6 gap-x-8 gap-y-3">
              <div className="flex items-center">
                <User size={24} className="mr-3" />
                <span>Алина Козловских</span>
              </div>
              <div className="flex items-center">
                <Calendar size={24} className="mr-3" />
                <span>23 мая 2025</span>
              </div>
            </div>

            <p className="text-xl text-slate-600 mb-10">
              Вы можете скачать готовый шаблон или использовать конструктор ниже, чтобы персонализировать его.
            </p>

            <div className="flex justify-center mb-12">
              <button
                onClick={handleDownload}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg flex items-center transition-colors text-xl"
              >
                <Download size={24} className="mr-3" />
                Скачать шаблон
              </button>
            </div>

            <div className="bg-slate-100 p-6 rounded-xl mb-12">
              <h2 className="text-2xl font-semibold mb-6 text-slate-800">Конструктор документа</h2>
              <div className="mb-6">
                <label className="block text-xl font-medium text-slate-700 mb-3">Ваше имя</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="block w-full p-3 border border-slate-300 rounded-full focus:ring-blue-500 focus:border-blue-500 text-lg"
                  placeholder="Иванов Иван Иванович"
                />
              </div>
              <div className="mb-6">
                <label className="block text-xl font-medium text-slate-700 mb-3">Ваша дата рождения</label>
                <input
                  type="date"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  className="block w-full p-3 border border-slate-300 rounded-full focus:ring-blue-500 focus:border-blue-500 text-lg"
                />
              </div>
              <div className="mb-6">
                <label className="block text-xl font-medium text-slate-700 mb-3">Ваш адрес</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="block w-full p-3 border border-slate-300 rounded-full focus:ring-blue-500 focus:border-blue-500 text-lg"
                  placeholder="00179, г. Москва, ул. Примерная, д. 1, кв. 1"
                />
              </div>
              <div className="bg-white p-6 rounded-xl border border-slate-200 whitespace-pre-wrap font-mono text-lg text-slate-700">
                <h3 className="text-2xl font-medium mb-4 text-slate-800 flex items-center">
                  <FileText size={24} className="mr-3" />
                  Предварительный просмотр
                </h3>
                {template}
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

export default PersonalDataProcessingTemplatePage;