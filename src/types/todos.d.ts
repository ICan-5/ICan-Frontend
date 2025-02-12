export interface Goal {
  id: number;
  title: string;
  color: string;
}

export interface TodoType {
  id: number;
  title: string;
  date: string;
  goal: Goals;
  done: boolean;
}
