export type Goal = {
  id: number;
  name: string;
  description: string;
  weekly_target_minutes: number;
  start_date: string;
  end_date: string;
  status: string;
};

export type GoalProps ={
  open: boolean;
  onClose: () => void;
  goal: Goal;
}
