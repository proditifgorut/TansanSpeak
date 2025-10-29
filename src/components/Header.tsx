import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Home, BookOpen, User, Flame, Trophy } from 'lucide-react';
import { UserProgress } from '../types';
import LanguageSwitcher from './LanguageSwitcher';

interface HeaderProps {
  userProgress: UserProgress;
}

const Header: React.FC<HeaderProps> = ({ userProgress }) => {
  const { t } = useTranslation();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">T</span>
            </div>
            <span className="text-2xl font-bold gradient-text hidden sm:block">
              {t('header.appName')}
            </span>
          </Link>

          <div className="flex items-center space-x-2 md:space-x-4">
            <div className="hidden md:flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-orange-50 px-3 py-1.5 rounded-full">
                <Flame className="w-5 h-5 text-orange-500" />
                <span className="font-semibold text-orange-600">{userProgress.streak}</span>
              </div>
              <div className="flex items-center space-x-2 bg-purple-50 px-3 py-1.5 rounded-full">
                <Trophy className="w-5 h-5 text-purple-500" />
                <span className="font-semibold text-purple-600">{userProgress.totalXP} {t('header.xp')}</span>
              </div>
            </div>

            <nav className="flex items-center space-x-1 sm:space-x-2">
              <Link
                to="/"
                className={`p-2 rounded-lg transition-colors ${
                  isActive('/')
                    ? 'bg-blue-100 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
                aria-label={t('header.home')}
              >
                <Home className="w-6 h-6" />
              </Link>
              <Link
                to="/scenarios"
                className={`p-2 rounded-lg transition-colors ${
                  isActive('/scenarios')
                    ? 'bg-blue-100 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
                 aria-label={t('header.scenarios')}
              >
                <BookOpen className="w-6 h-6" />
              </Link>
              <Link
                to="/profile"
                className={`p-2 rounded-lg transition-colors ${
                  isActive('/profile')
                    ? 'bg-blue-100 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
                 aria-label={t('header.profile')}
              >
                <User className="w-6 h-6" />
              </Link>
            </nav>
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
