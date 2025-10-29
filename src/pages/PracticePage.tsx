import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { scenarios } from '../data/scenarios';
import { Conversation } from '../types';
import { Check, X, ArrowRight, RotateCcw, Trophy, Star } from 'lucide-react';

interface PracticePageProps {
  addXP: (xp: number) => void;
  completeScenario: (scenarioId: string) => void;
}

const PracticePage: React.FC<PracticePageProps> = ({ addXP, completeScenario }) => {
  const { t } = useTranslation();
  const { scenarioId } = useParams<{ scenarioId: string }>();
  const navigate = useNavigate();
  const scenario = scenarios.find((s) => s.id === scenarioId);

  const [currentStep, setCurrentStep] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [conversationHistory, setConversationHistory] = useState<Conversation[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    if (scenario && scenario.conversations.length > 0) {
      setConversationHistory([scenario.conversations[0]]);
    }
  }, [scenario]);

  if (!scenario) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('practicePage.scenarioNotFound')}</h2>
          <button
            onClick={() => navigate('/scenarios')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            {t('practicePage.backToScenarios')}
          </button>
        </div>
      </div>
    );
  }

  const currentConversation = scenario.conversations[currentStep];

  const handleOptionSelect = (optionIndex: number) => {
    if (showFeedback) return;

    setSelectedOption(optionIndex);
    setShowFeedback(true);

    const isCorrect = optionIndex === currentConversation.correctOption;
    if (isCorrect) {
      setScore(score + 1);
    }

    setTimeout(() => {
      const userResponse = {
        ...currentConversation,
        text: currentConversation.options![optionIndex],
      };
      setConversationHistory([...conversationHistory, userResponse]);

      if (currentStep < scenario.conversations.length - 1) {
        setCurrentStep(currentStep + 1);
        setConversationHistory((prev) => [...prev, scenario.conversations[currentStep + 1]]);
        setSelectedOption(null);
        setShowFeedback(false);
      } else {
        const earnedXP = Math.round((score / scenario.conversations.filter((c) => c.options).length) * scenario.xpReward);
        addXP(earnedXP);
        completeScenario(scenario.id);
        setIsCompleted(true);
      }
    }, 2000);
  };

  const handleRestart = () => {
    setCurrentStep(0);
    setSelectedOption(null);
    setShowFeedback(false);
    setScore(0);
    setConversationHistory([scenario.conversations[0]]);
    setIsCompleted(false);
  };

  if (isCompleted) {
    const totalQuestions = scenario.conversations.filter((c) => c.options).length;
    const percentage = Math.round((score / totalQuestions) * 100);
    const earnedXP = Math.round((score / totalQuestions) * scenario.xpReward);

    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-12">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-w-2xl w-full text-center"
        >
          <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Trophy className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-4xl font-bold mb-4 gradient-text">{t('practicePage.completion.title')}</h2>
          <p className="text-xl text-gray-600 mb-8">{t(scenario.title)}</p>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-blue-50 rounded-2xl p-6">
              <div className="text-3xl font-bold text-blue-600 mb-2">{percentage}%</div>
              <div className="text-sm text-gray-600">{t('practicePage.completion.accuracy')}</div>
            </div>
            <div className="bg-purple-50 rounded-2xl p-6">
              <div className="text-3xl font-bold text-purple-600 mb-2 flex items-center justify-center">
                <Star className="w-8 h-8 fill-purple-600 mr-1" />
                {earnedXP}
              </div>
              <div className="text-sm text-gray-600">{t('practicePage.completion.xpEarned')}</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleRestart}
              className="px-8 py-4 bg-gray-100 text-gray-800 rounded-xl font-semibold hover:bg-gray-200 transition-all flex items-center justify-center"
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              {t('practicePage.completion.tryAgain')}
            </button>
            <button
              onClick={() => navigate('/scenarios')}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-xl transition-all flex items-center justify-center"
            >
              {t('practicePage.completion.moreScenarios')}
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 flex items-center">
              <span className="text-4xl mr-3">{scenario.icon}</span>
              {t(scenario.title)}
            </h1>
            <p className="text-gray-600 mt-1">{t(scenario.description)}</p>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500">{t('practicePage.progress')}</div>
            <div className="text-2xl font-bold text-blue-600">
              {currentStep + 1} / {scenario.conversations.length}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-6">
          <div className="space-y-4 mb-6">
            <AnimatePresence mode="popLayout">
              {conversationHistory.map((conv, index) => (
                <motion.div
                  key={`${conv.id}-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${conv.speaker === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start space-x-3 max-w-[80%] ${conv.speaker === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                        conv.speaker === 'ai'
                          ? 'bg-blue-100'
                          : 'bg-gradient-to-br from-purple-500 to-blue-500'
                      }`}
                    >
                      <span
                        className={`font-semibold text-sm ${
                          conv.speaker === 'ai' ? 'text-blue-600' : 'text-white'
                        }`}
                      >
                        {conv.speaker === 'ai' ? t('landingPage.demo.ai') : t('landingPage.demo.you')}
                      </span>
                    </div>
                    <div
                      className={`rounded-2xl px-4 py-3 ${
                        conv.speaker === 'ai'
                          ? 'bg-gray-100 rounded-tl-none'
                          : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-tr-none'
                      }`}
                    >
                      <p className={conv.speaker === 'ai' ? 'text-gray-800' : 'text-white'}>
                        {t(conv.text)}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {currentConversation.speaker === 'user' && currentConversation.options && (
            <div className="space-y-3">
              <p className="text-sm font-semibold text-gray-600 mb-3">{t('practicePage.chooseResponse')}</p>
              {currentConversation.options.map((option, index) => {
                const isSelected = selectedOption === index;
                const isCorrect = index === currentConversation.correctOption;
                const showCorrectness = showFeedback && isSelected;

                return (
                  <motion.button
                    key={index}
                    onClick={() => handleOptionSelect(index)}
                    disabled={showFeedback}
                    whileHover={{ scale: showFeedback ? 1 : 1.02 }}
                    whileTap={{ scale: showFeedback ? 1 : 0.98 }}
                    className={`w-full p-4 rounded-xl text-left transition-all font-medium ${
                      showCorrectness
                        ? isCorrect
                          ? 'bg-green-100 border-2 border-green-500 text-green-800'
                          : 'bg-red-100 border-2 border-red-500 text-red-800'
                        : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent hover:border-blue-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{t(option)}</span>
                      {showCorrectness && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                        >
                          {isCorrect ? (
                            <Check className="w-6 h-6 text-green-600" />
                          ) : (
                            <X className="w-6 h-6 text-red-600" />
                          )}
                        </motion.div>
                      )}
                    </div>
                  </motion.button>
                );
              })}
            </div>
          )}
        </div>

        <div className="flex justify-between items-center">
          <button
            onClick={() => navigate('/scenarios')}
            className="px-6 py-3 text-gray-600 hover:text-gray-800 font-medium"
          >
            ← {t('practicePage.backToScenarios')}
          </button>
          <div className="flex items-center space-x-2 bg-white rounded-full px-4 py-2 shadow-md">
            <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
            <span className="font-semibold text-gray-800">{t('practicePage.score')}: {score}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PracticePage;
