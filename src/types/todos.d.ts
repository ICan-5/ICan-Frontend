export interface Goal {
  id: number;
  title: string;
  color: string;
}

export interface TodoType {
  id: number;
  title: string;
  date: string;
  goal: Goal | null;
  done: boolean;
}

export interface BasketType {
  id: number;
  title: string;
  goal: Goal | null;
}
