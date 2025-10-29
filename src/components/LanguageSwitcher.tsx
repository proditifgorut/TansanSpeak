import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'id', name: 'Indonesian' },
  ];

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-10 h-10 rounded-full text-gray-600 hover:bg-gray-100 hover:text-blue-600 transition-colors"
        aria-label="Change language"
      >
        <Globe className="w-6 h-6" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl z-50 overflow-hidden"
          >
            <ul>
              {languages.map((lang) => (
                <li key={lang.code}>
                  <button
                    onClick={() => changeLanguage(lang.code)}
                    className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 flex items-center justify-between"
                  >
                    <span>{lang.name}</span>
                    {i18n.language === lang.code && (
                      <Check className="w-4 h-4 text-blue-600" />
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSwitcher;
