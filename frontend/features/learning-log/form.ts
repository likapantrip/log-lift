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
});
