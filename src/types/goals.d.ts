export interface Goal {
  goalId: number;
  title: string;
  color: GoalColor;
  createdAt: string;
}

export type GoalColor =
  | 'goal01'
  | 'goal02'
  | 'goal03'
  | 'goal04'
  | 'goal05'
  | 'default';
