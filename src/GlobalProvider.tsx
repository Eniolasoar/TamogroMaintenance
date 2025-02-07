import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the shape of a package
interface Package {
  customerName: string;
  idNumber: string;
  category: string;
  description: string;
  date: string;
  status: string;}
interface Employee {
  fullname: string;
  staffId: string;
  username: string;
  phoneNumber: string;
  email: string;
  role: string;}

// Define the shape of your global state.
interface GlobalState {
  user: null | { name: string; password: string,fullname:string };
  theme: 'light' | 'dark';
  role: string;
  packageData: Package[];
}
interface GlobalEmployeeState {

  packageData: Employee[];
}

// Define the context value shape.
interface GlobalContextValue {
  globalState: GlobalState;
  globalEmployeeState: GlobalEmployeeState
  login: (user: { name: string; password: string,fullname:string  }) => void;
  logout: () => void;
  toggleTheme: () => void;
  updateRole: (role: string) => void;
  updatePackageData: (data: Package[]) => void;
  updateEmployeeData:(data:Employee[])=>void;
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
  const [globalEmployeeState, setGlobalEmployeeState] = useState<GlobalEmployeeState>({
    packageData: [
      {
        fullname: 'Anishe Eniola',
        staffId: '2345',
        username: 'EniMonei',
        phoneNumber: '07060866513',
        email: 'eniolanishe@gmail.com',
        role: 'Technician'
      },
      {
        fullname: 'Jeremiah Abu',
        staffId: '1224',
        username: 'Jerry',
        phoneNumber: '07089866513',
        email: 'jeremiah@gmail.com',
        role: 'CS Personnel'
      },
      {
        fullname: 'Kelvin Yashim',
        staffId: '221',
        username: 'kyzamani',
        phoneNumber: '07011266513',
        email: 'kyzamani@gmail.com',
        role: 'Technician'
      },
      {
        fullname: 'James Brent',
        staffId: '9930',
        username: 'Jamey',
        phoneNumber: '07060006513',
        email: 'james@gmail.com',
        role: 'CS Personnel'
      },
      
    ],
  });

  const login = (user: { name: string; password: string,fullname:string  }) => {
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
  const updateEmployeeData = (data: Employee[]) => {
    setGlobalEmployeeState((prevState) => ({
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
      value={{ globalState, globalEmployeeState,login, logout, toggleTheme, updateRole, updatePackageData,updateEmployeeData, packagesByStatus }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
