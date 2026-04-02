export type LearningLog = {
  id: number | null;
  goal_id: number;
  study_date: string;
  study_minutes: number;
  result: string;
  reflection: string;
};

export type learningLogForm = {
  id: string;
  goal_id: string;
  study_date: string;
  study_minutes: string;
  result: string;
  reflection: string;
};

export const emptyLearningLog = (goalId: number) => ({
  id: '',
  goal_id: goalId.toString() ?? '',
  study_date: '',
  study_minutes: '0',
  result: '',
  reflection: '',
})

export type LearningLogProps = {
  open: boolean;
  onClose: () => void;
  learningLog : LearningLog;
};
