// MyContext.tsx
import React, { createContext, useContext, ReactNode, Dispatch, SetStateAction } from 'react';

type MyContextType = {
  globalState: string; // Change the type according to your data
  setGlobalState: Dispatch<SetStateAction<string>>; // Change the type accordingly
};

const MyContext = createContext<MyContextType | undefined>(undefined);

export const MyContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [globalState, setGlobalState] = React.useState<string>(" ");

  return (
    <MyContext.Provider value={{ globalState, setGlobalState }}>
      {children}
    </MyContext.Provider>
  );
};

export const useMyContext = () => {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error('useMyContext must be used within a MyContextProvider');
  }
  return context;
};