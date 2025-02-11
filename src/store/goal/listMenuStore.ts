import { create } from 'zustand';

interface ListMenuStore {
  todoItemIndex: number | null;
  doneItemIndex: number | null;
  toggleListMenu: (index: number, type: 'todo' | 'done') => void;
  closeListMenu: () => void;
}

const useListMenuStore = create<ListMenuStore>((set) => ({
  todoItemIndex: null,
  doneItemIndex: null,
  toggleListMenu: (index: number, type: 'todo' | 'done') =>
    set((state) => ({
      ...(type === 'todo'
        ? { todoItemIndex: state.todoItemIndex === index ? null : index }
        : { doneItemIndex: state.doneItemIndex === index ? null : index }),
    })),
  closeListMenu: () => set({ todoItemIndex: null, doneItemIndex: null }),
}));

export default useListMenuStore;
