export interface UserProgress {
  totalXP: number;
  streak: number;
  level: number;
  completedScenarios: string[];
  achievements: string[];
  dailyGoal: number;
  todayXP: number;
}

export interface Scenario {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  xpReward: number;
  icon: string;
  conversations: Conversation[];
}

export interface Conversation {
  id: number;
  speaker: 'ai' | 'user';
  text: string;
  options?: string[];
  correctOption?: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
}
