import { create } from 'zustand';

interface GoalState {
  todoItems: string[];
  doneItems: string[];
  moveToDone: (index: number) => void;
  moveToTodo: (index: number) => void;
}

const useGoalStore = create<GoalState>((set) => ({
  todoItems: [
    '자바스크립트 기초 챕터1 듣기',
    '자바스크립트 기초 챕터2 듣기',
    '자바스크립트 기초 챕터3 듣기',
  ],
  doneItems: ['자바스크립트 기초 챕터4 듣기'],
  moveToDone: (index) =>
    set((state) => {
      const todoItems = [...state.todoItems];
      const doneItem = todoItems.splice(index, 1)[0];
      return {
        todoItems,
        doneItems: [...state.doneItems, doneItem],
      };
    }),
  moveToTodo: (index) =>
    set((state) => {
      const doneItems = [...state.doneItems];
      const todoItem = doneItems.splice(index, 1)[0];
      return {
        todoItems: [...state.todoItems, todoItem],
        doneItems,
      };
    }),
}));

export default useGoalStore;
