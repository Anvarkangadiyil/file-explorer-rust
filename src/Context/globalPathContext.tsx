// MyContext.tsx
import React, {
  createContext,
  useContext,
  ReactNode,
  Dispatch,
  SetStateAction,
  useState,
} from "react";
import { FileDetailModel } from "../model/model";

type MyContextType = {
  globalState: string; 
  setGlobalState: Dispatch<SetStateAction<string>>;
  globalSearchState: FileDetailModel[]; 
  setGlobalSearchState: React.Dispatch<React.SetStateAction<FileDetailModel[]>>;
  copyPath:string;
  setCopyPath:Dispatch<SetStateAction<string>>;
};



const MyContext = createContext<MyContextType | undefined>(undefined);



export const MyContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [globalState, setGlobalState] = React.useState<string>(" ");

  const [globalSearchState, setGlobalSearchState] = React.useState<FileDetailModel[]>([
    
  ]);
  const[copyPath,setCopyPath]=React.useState(" ");

  return (
    <MyContext.Provider
      value={{
        globalState,
        setGlobalState,
        globalSearchState,
        setGlobalSearchState,
        copyPath,
        setCopyPath
      }}
    >
      {children}
    </MyContext.Provider>
  );
};


//hook to manage state of the search List 
export const useMyContext = () => {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error("Context Error");
  }
  return context;
};
