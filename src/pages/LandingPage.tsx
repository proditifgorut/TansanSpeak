import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { MessageCircle, Zap, Trophy, Globe, ArrowRight } from 'lucide-react';

const LandingPage: React.FC = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: t('landingPage.features.realConversations.title'),
      description: t('landingPage.features.realConversations.description'),
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: t('landingPage.features.instantFeedback.title'),
      description: t('landingPage.features.instantFeedback.description'),
    },
    {
      icon: <Trophy className="w-8 h-8" />,
      title: t('landingPage.features.gamifiedLearning.title'),
      description: t('landingPage.features.gamifiedLearning.description'),
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: t('landingPage.features.diverseScenarios.title'),
      description: t('landingPage.features.diverseScenarios.description'),
    },
  ];

  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="gradient-text">{t('landingPage.title1')}</span>
              <br />
              {t('landingPage.title2')}
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto">
              {t('landingPage.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/scenarios"
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold text-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center"
              >
                {t('landingPage.startLearning')}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                to="/profile"
                className="px-8 py-4 bg-white border-2 border-gray-200 text-gray-800 rounded-xl font-semibold text-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                {t('landingPage.viewProgress')}
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-20 bg-white rounded-2xl shadow-2xl p-8 md:p-12 max-w-4xl mx-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-blue-500 rounded-full"></div>
                <div>
                  <p className="font-semibold text-gray-800">{t('landingPage.demo.scenarioTitle')}</p>
                  <p className="text-sm text-gray-500">{t('landingPage.demo.level')}</p>
                </div>
              </div>
              <span className="text-2xl">☕</span>
            </div>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 font-semibold">{t('landingPage.demo.ai')}</span>
                </div>
                <div className="bg-gray-100 rounded-2xl rounded-tl-none px-4 py-3 flex-1">
                  <p className="text-gray-800">{t('landingPage.demo.aiLine')}</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 justify-end">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl rounded-tr-none px-4 py-3 flex-1 max-w-md">
                  <p className="text-white">{t('landingPage.demo.userLine')}</p>
                </div>
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-purple-600 font-semibold">{t('landingPage.demo.you')}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
              {t('landingPage.features.title')}
            </h2>
            <p className="text-xl text-gray-600">
              {t('landingPage.features.subtitle')}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-2xl card-hover"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white shadow-2xl"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              {t('landingPage.cta.title')}
            </h2>
            <p className="text-xl mb-8 opacity-90">
              {t('landingPage.cta.subtitle')}
            </p>
            <Link
              to="/scenarios"
              className="inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold text-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              {t('landingPage.cta.button')}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
