export type GoalStatus = 'active' | 'closed' | 'archived';

export type Goal = {
  id: number | null;
  name: string;
  description: string;
  weekly_target_minutes: number;
  start_date: string;
  end_date: string;
  status: GoalStatus;
};

export type GoalProps ={
  open: boolean;
  onClose: () => void;
  goal: Goal | null;
}
