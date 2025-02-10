import { create } from 'zustand';

interface ListMenuStore {
  todoItemIndex: number | null;
  doneItemIndex: number | null;
  toggleMenu: (index: number, type: 'todo' | 'done') => void;
}

const useListMenuStore = create<ListMenuStore>((set) => ({
  todoItemIndex: null,
  doneItemIndex: null,
  toggleMenu: (index: number, type: 'todo' | 'done') =>
    set((state) => ({
      ...(type === 'todo'
        ? { todoItemIndex: state.todoItemIndex === index ? null : index }
        : { doneItemIndex: state.doneItemIndex === index ? null : index }),
    })),
}));

export default useListMenuStore;
