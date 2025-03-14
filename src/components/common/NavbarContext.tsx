'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from 'react';

interface Props {
  isFolded: boolean;
  toggleNavbar: () => void;
  closeNavbar: () => void;
}

const NavbarContext = createContext<Props | undefined>(undefined);
export function NavbarProvider({ children }: { children: React.ReactNode }) {
  const [isFolded, setIsFolded] = useState(false);

  useEffect(() => {
    setIsFolded(window.innerWidth <= 768);
  }, []);

  const toggleNavbar = useCallback(() => {
    setIsFolded((prev) => !prev);
  }, []);

  const closeNavbar = useCallback(() => {
    setIsFolded(true);
  }, []);

  const contextValue = useMemo(
    () => ({ isFolded, toggleNavbar, closeNavbar }),
    [isFolded, toggleNavbar, closeNavbar],
  );

  return (
    <NavbarContext.Provider value={contextValue}>
      {children}
    </NavbarContext.Provider>
  );
}

export function useNavbar() {
  const context = useContext(NavbarContext);
  if (!context) {
    throw new Error('useNavbar must be used within a NavbarProvider');
  }
  return context;
}
