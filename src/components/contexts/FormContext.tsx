import React, { createContext, useContext, useState, FC, ReactNode, Context } from 'react';
import type { FormDataType } from '../../types/formdata';

interface FormContextData {
  formData: FormDataType;
  setFormData: (data: FormDataType) => void;
}

const FormContext: Context<FormContextData> = createContext<FormContextData>({
  formData: {} as FormDataType,
  setFormData: () => {},
});

interface FormProviderProps {
  children: ReactNode;
}

export const FormProvider: FC<FormProviderProps> = ({ children }) => {
  const [formData, setFormData] = useState<FormDataType>({} as FormDataType);

  return <FormContext.Provider value={{ formData, setFormData }}>{children}</FormContext.Provider>;
};

export const useFormData = () => useContext(FormContext);
