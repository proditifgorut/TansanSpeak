import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { scenarios } from '../data/scenarios';
import { UserProgress } from '../types';
import { Check, Lock, Star, ArrowRight } from 'lucide-react';

interface ScenariosPageProps {
  userProgress: UserProgress;
}

const ScenariosPage: React.FC<ScenariosPageProps> = ({ userProgress }) => {
  const { t } = useTranslation();
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const difficulties = ['all', 'beginner', 'intermediate', 'advanced'];
  const categoriesRaw = ['all', ...Array.from(new Set(scenarios.map((s) => s.category)))];
  const categories = categoriesRaw.map(c => ({
    key: c,
    name: t(`scenariosPage.${c.toLowerCase().replace(' ', '')}`)
  }));


  const filteredScenarios = scenarios.filter((scenario) => {
    const difficultyMatch = selectedDifficulty === 'all' || scenario.difficulty === selectedDifficulty;
    const categoryMatch = selectedCategory === 'all' || scenario.category === selectedCategory;
    return difficultyMatch && categoryMatch;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-100 text-green-700';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-700';
      case 'advanced':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const isScenarioCompleted = (scenarioId: string) => {
    return userProgress.completedScenarios.includes(scenarioId);
  };

  const isScenarioLocked = (difficulty: string) => {
    return difficulty === 'advanced' && userProgress.level < 3;
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold mb-4 gradient-text">{t('scenariosPage.title')}</h1>
          <p className="text-xl text-gray-600">
            {t('scenariosPage.subtitle')}
          </p>
        </motion.div>

        <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-sm font-semibold text-gray-600 mr-2">{t('scenariosPage.filterDifficulty')}</span>
            {difficulties.map((difficulty) => (
              <button
                key={difficulty}
                onClick={() => setSelectedDifficulty(difficulty)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedDifficulty === difficulty
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
              >
                {t(`scenariosPage.${difficulty}`)}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-sm font-semibold text-gray-600 mr-2">{t('scenariosPage.filterCategory')}</span>
            {categories.map((category) => (
              <button
                key={category.key}
                onClick={() => setSelectedCategory(category.key)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category.key
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredScenarios.map((scenario, index) => {
            const isCompleted = isScenarioCompleted(scenario.id);
            const isLocked = isScenarioLocked(scenario.difficulty);

            return (
              <motion.div
                key={scenario.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={isLocked ? '#' : `/practice/${scenario.id}`}
                  className={`block bg-white rounded-2xl shadow-lg overflow-hidden h-full flex flex-col ${
                    isLocked ? 'opacity-60 cursor-not-allowed' : 'card-hover'
                  }`}
                  onClick={(e) => isLocked && e.preventDefault()}
                >
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-start justify-between mb-4">
                      <div className="text-5xl">{scenario.icon}</div>
                      {isCompleted ? (
                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <Check className="w-5 h-5 text-white" />
                        </div>
                      ) : isLocked ? (
                        <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center flex-shrink-0">
                          <Lock className="w-5 h-5 text-white" />
                        </div>
                      ) : (
                        <div className="flex items-center space-x-1 bg-yellow-50 px-2 py-1 rounded-full flex-shrink-0">
                          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                          <span className="text-sm font-semibold text-yellow-700">
                            +{scenario.xpReward} XP
                          </span>
                        </div>
                      )}
                    </div>

                    <h3 className="text-xl font-bold mb-2 text-gray-800">{t(scenario.title)}</h3>
                    <p className="text-gray-600 mb-4 text-sm flex-grow">{t(scenario.description)}</p>

                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(
                            scenario.difficulty
                          )}`}
                        >
                          {t(`scenariosPage.${scenario.difficulty}`)}
                        </span>
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
                           {t(`scenariosPage.${scenario.category.toLowerCase().replace(' ', '')}`)}
                        </span>
                      </div>
                      {!isLocked && (
                        <ArrowRight className="w-5 h-5 text-blue-600 flex-shrink-0" />
                      )}
                    </div>

                    {isLocked && (
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <p className="text-sm text-gray-500 flex items-center">
                          <Lock className="w-4 h-4 mr-1" />
                          {t('scenariosPage.unlockPrompt')}
                        </p>
                      </div>
                    )}
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {filteredScenarios.length === 0 && (
          <div className="text-center py-20">
            <p className="text-xl text-gray-500">{t('scenariosPage.noScenarios')}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScenariosPage;
