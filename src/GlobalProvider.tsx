import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the shape of a package
interface Package {
  customerName: string;
  idNumber: string;
  category: string;
  description: string;
  date: string;
  status: string;}

// Define the shape of your global state.
interface GlobalState {
  user: null | { name: string; password: string };
  theme: 'light' | 'dark';
  role: string;
  packageData: Package[];
}

// Define the context value shape.
interface GlobalContextValue {
  globalState: GlobalState;
  login: (user: { name: string; password: string }) => void;
  logout: () => void;
  toggleTheme: () => void;
  updateRole: (role: string) => void;
  updatePackageData: (data: Package[]) => void;
  packagesByStatus: (status: 'Not Started' | 'In Progress' | 'Completed') => Package[];
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
    role: '',
    packageData: [
      {
        customerName: 'Free package',
        idNumber: 'RSH 2883',
        category: 'Electronics',
        description: 'Outdated Wires',
        date: `Jan 13,2023`,
        status: 'Not Started',
      },
      {
        customerName: 'Free package',
        idNumber: 'Blender 2355',
        category: 'Machinery',
        description: 'Flat Truck Tire',
        date: `Jan 16,2023`,
        status: 'In Progress',
      },
      {
        customerName: 'Premium Package',
        idNumber: 'XYZ 5678',
        category: 'Appliances',
        description: 'Refrigerator Repair',
        date: `Feb 2,2023`,
        status: 'Completed',
      },
    ],
  });

  const login = (user: { name: string; password: string }) => {
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

  const updatePackageData = (data: Package[]) => {
    setGlobalState((prevState) => ({
      ...prevState,
      packageData: data,
    }));
  };

  // Function to filter packages based on status
  const packagesByStatus = (status: 'Not Started' | 'In Progress' | 'Completed'): Package[] => {
    return globalState.packageData.filter((pkg) => pkg.status === status);
  };

  return (
    <GlobalContext.Provider
      value={{ globalState, login, logout, toggleTheme, updateRole, updatePackageData, packagesByStatus }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
