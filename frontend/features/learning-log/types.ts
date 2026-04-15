export type LearningLog = {
  id: number | null;
  goal_id: number;
  study_date: string;
  study_minutes: number;
  result: string;
  reflection: string;
};

export type LearningLogProps = {
  open: boolean;
  onClose: () => void;
  learningLog : LearningLog;
};
