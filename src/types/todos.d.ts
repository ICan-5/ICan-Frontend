import { Goal } from './goals';

export interface Todo {
  todoId: number;
  noteId: number | null;
  date: string;
  createdAt: string;
  title: string;
  done: boolean;
  goal: Goal | null;
}

export interface Basket {
  id: number;
  title: string;
  goal: Goal | null;
}

export { Goal };
