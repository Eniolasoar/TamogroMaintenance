// GlobalProvider.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the shape of your global state.
interface GlobalState {
  user: null | { name: string; email: string };
  theme: 'light' | 'dark';
  role:string
}

// Define the context value shape.
interface GlobalContextValue {
  globalState: GlobalState;
  login: (user: { name: string; email: string }) => void;
  logout: () => void;
  toggleTheme: () => void;
  updateRole: (role: string) => void;
}

// Create the context with an initial undefined value.
const GlobalContext = createContext<GlobalContextValue | undefined>(undefined);

// Create a custom hook to use the GlobalContext
export const useGlobalContext = (): GlobalContextValue => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error('useGlobalContext must be used within a GlobalProvider');
  }
  return context;
};

interface GlobalProviderProps {
  children: ReactNode;
}

// Create the provider component.
export const GlobalProvider = ({ children }: GlobalProviderProps) => {
  const [globalState, setGlobalState] = useState<GlobalState>({
    user: null,
    theme: 'light',
    role:''
  });

  const login = (user: { name: string; email: string }) => {
    setGlobalState((prevState) => ({
      ...prevState,
      user,
    }));
  };

  const logout = () => {
    setGlobalState((prevState) => ({
      ...prevState,
      user: null,
    }));
  };

  const updateRole = (role: string) => {
    setGlobalState((prevState) => ({
      ...prevState,
      role,
    }));
  };

  const toggleTheme = () => {
    setGlobalState((prevState) => ({
      ...prevState,
      theme: prevState.theme === 'light' ? 'dark' : 'light',
    }));
  };

  return (
    <GlobalContext.Provider value={{ globalState, login, logout, toggleTheme,updateRole }}>
      {children}
    </GlobalContext.Provider>
  );
};
