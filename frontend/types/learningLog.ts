import { LearningLog } from '@/features/learning-log/types';

export type LearningLogProps = {
  open: boolean;
  onClose: () => void;
  learningLog : LearningLog;
};
