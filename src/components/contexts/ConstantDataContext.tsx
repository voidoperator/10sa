import React, { createContext, useContext, useState, FC, ReactNode, Context, useEffect } from 'react';
import { isBrowser } from '../../utility/utility';
import type { ConstantDataType } from '../../types/constantData';

export const initialLocalStorageState: ConstantDataType = {
  google_app_url: '',
  agent_full_name: '',
  agent_license_number: '',
  show_script: '',
};

let initialLocalStorage: ConstantDataType;
if (isBrowser()) {
  const localStorageFromLocalStorage = localStorage.getItem('constantData');
  if (localStorageFromLocalStorage) {
    try {
      initialLocalStorage = JSON.parse(localStorageFromLocalStorage);
    } catch (error) {
      console.error('Error parsing constantData from localStorage', error);
      initialLocalStorage = initialLocalStorageState;
    }
  } else {
    initialLocalStorage = initialLocalStorageState;
  }
} else {
  initialLocalStorage = initialLocalStorageState;
}

interface ConstantStorageContextData {
  constantData: ConstantDataType;
  setConstantData: (data: ConstantDataType | ((prevData: ConstantDataType) => ConstantDataType)) => void;
}

const ConstantDataContext: Context<ConstantStorageContextData> = createContext<ConstantStorageContextData>({
  constantData: initialLocalStorage,
  setConstantData: () => {},
});

interface ConstantDataProviderProps {
  children: ReactNode;
}

export const ConstantDataProvider: FC<ConstantDataProviderProps> = ({ children }) => {
  const [constantData, setConstantData] = useState<ConstantDataType>(initialLocalStorage);

  const setDataSafe = (data: ConstantDataType | ((prevData: ConstantDataType) => ConstantDataType)) => {
    if (typeof data === 'function') {
      setConstantData(data as (prevData: ConstantDataType) => ConstantDataType);
    } else {
      setConstantData(data);
    }
  };

  return (
    <ConstantDataContext.Provider value={{ constantData, setConstantData: setDataSafe }}>
      {children}
    </ConstantDataContext.Provider>
  );
};

export const useConstantData = () => useContext(ConstantDataContext);
