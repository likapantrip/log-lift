import { Goal, GoalStatus } from "../features/goal/types";

export type goalForm = {
  id: string;
  name: string;
  description: string;
  weekly_target_minutes: string;
  start_date: string;
  end_date: string;
  status: GoalStatus;
}

export const emptyGoalForm: goalForm = {
  id: '',
  name: '',
  description: '',
  weekly_target_minutes: '0',
  start_date: '',
  end_date: '',
  status: 'active',
};

export type GoalProps ={
  open: boolean;
  onClose: () => void;
  goal: Goal | null;
}
