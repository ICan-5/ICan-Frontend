import { create } from 'zustand';

interface MenuState {
  isMenuOpen: boolean;
  toggleMenu: () => void;
}

const useMenuStore = create<MenuState>((set) => ({
  isMenuOpen: false,
  toggleMenu: () => set((state) => ({ isMenuOpen: !state.isMenuOpen })),
}));

export default useMenuStore;
