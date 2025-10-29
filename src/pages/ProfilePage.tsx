import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { UserProgress } from '../types';
import { Trophy, Flame, Star, Target, TrendingUp, Award } from 'lucide-react';
import { scenarios } from '../data/scenarios';

interface ProfilePageProps {
  userProgress: UserProgress;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ userProgress }) => {
  const { t } = useTranslation();
  const completionRate = Math.round(
    (userProgress.completedScenarios.length / scenarios.length) * 100
  );

  const dailyGoalProgress = Math.min(
    (userProgress.todayXP / userProgress.dailyGoal) * 100,
    100
  );

  const stats = [
    {
      icon: <Trophy className="w-6 h-6" />,
      label: t('profilePage.totalXP'),
      value: userProgress.totalXP,
      color: 'from-purple-500 to-blue-500',
    },
    {
      icon: <Flame className="w-6 h-6" />,
      label: t('profilePage.dayStreak'),
      value: userProgress.streak,
      color: 'from-orange-500 to-red-500',
    },
    {
      icon: <Star className="w-6 h-6" />,
      label: t('profilePage.level'),
      value: userProgress.level,
      color: 'from-yellow-500 to-orange-500',
    },
    {
      icon: <Award className="w-6 h-6" />,
      label: t('profilePage.completed'),
      value: userProgress.completedScenarios.length,
      color: 'from-green-500 to-teal-500',
    },
  ];

  const recentAchievements = [
    {
      title: t('profilePage.achievements.firstSteps.title'),
      description: t('profilePage.achievements.firstSteps.description'),
      unlocked: userProgress.completedScenarios.length >= 1,
    },
    {
      title: t('profilePage.achievements.conversationMaster.title'),
      description: t('profilePage.achievements.conversationMaster.description'),
      unlocked: userProgress.completedScenarios.length >= 5,
    },
    {
      title: t('profilePage.achievements.streakChampion.title'),
      description: t('profilePage.achievements.streakChampion.description'),
      unlocked: userProgress.streak >= 7,
    },
    {
      title: t('profilePage.achievements.xpCollector.title'),
      description: t('profilePage.achievements.xpCollector.description'),
      unlocked: userProgress.totalXP >= 1000,
    },
  ];

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-4xl font-bold text-white">
              {userProgress.level}
            </span>
          </div>
          <h1 className="text-4xl font-bold mb-2 gradient-text">{t('profilePage.title')}</h1>
          <p className="text-xl text-gray-600">{t('profilePage.subtitle')}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <div
                className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center text-white mb-4`}
              >
                {stat.icon}
              </div>
              <div className="text-3xl font-bold text-gray-800 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-2xl shadow-lg p-8"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                <Target className="w-6 h-6 mr-2 text-blue-600" />
                {t('profilePage.dailyGoal.title')}
              </h2>
              <span className="text-sm font-semibold text-blue-600">
                {userProgress.todayXP} / {userProgress.dailyGoal} {t('profilePage.dailyGoal.xp')}
              </span>
            </div>
            <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${dailyGoalProgress}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
              />
            </div>
            <p className="text-sm text-gray-600 mt-4">
              {dailyGoalProgress >= 100
                ? t('profilePage.dailyGoal.achieved')
                : t('profilePage.dailyGoal.toGo', { count: userProgress.dailyGoal - userProgress.todayXP })}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-2xl shadow-lg p-8"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                <TrendingUp className="w-6 h-6 mr-2 text-green-600" />
                {t('profilePage.completionRate.title')}
              </h2>
              <span className="text-sm font-semibold text-green-600">
                {userProgress.completedScenarios.length} / {scenarios.length}
              </span>
            </div>
            <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${completionRate}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-green-500 to-teal-500 rounded-full"
              />
            </div>
            <p className="text-sm text-gray-600 mt-4">
              {t('profilePage.completionRate.description', { rate: completionRate })}
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg p-8"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <Award className="w-6 h-6 mr-2 text-yellow-600" />
            {t('profilePage.achievements.title')}
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {recentAchievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className={`p-4 rounded-xl border-2 transition-all ${
                  achievement.unlocked
                    ? 'bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-300'
                    : 'bg-gray-50 border-gray-200 opacity-60'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-800 mb-1">{achievement.title}</h3>
                    <p className="text-sm text-gray-600">{achievement.description}</p>
                  </div>
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ml-4 ${
                      achievement.unlocked
                        ? 'bg-gradient-to-br from-yellow-400 to-orange-500'
                        : 'bg-gray-300'
                    }`}
                  >
                    {achievement.unlocked ? (
                      <Trophy className="w-6 h-6 text-white" />
                    ) : (
                      <Trophy className="w-6 h-6 text-gray-500" />
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProfilePage;
