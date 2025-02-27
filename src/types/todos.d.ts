import { Goal } from './goals';

export interface Todo {
  id: number;
  title: string;
  date: string;
  goal: Goal | null;
  done: boolean;
}

export interface Basket {
  id: number;
  title: string;
  goal: Goal | null;
}
