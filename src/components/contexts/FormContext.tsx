import React, { createContext, useContext, useState, FC, ReactNode, Context } from 'react';
import type { FormDataType } from '../../types/formData';

const initialFormData: FormDataType = {
  first_name: '',
  last_name: '',
  plan_type: '',
  state: '',
  zip_code: '',
  coverage_reason: '',
  date_of_birth: '',
  age: 0,
  tobacco_use: '',
  married: '',
  taxes_filing_status: '',
  household_size: '',
  additional_insured: '',
  additional_insured_list: [],
  annual_household_income: '',
  pre_existing_conditions: '',
  pre_existing_conditions_list: '',
  medications: '',
  medications_list: '',
  medical_history: '',
  preferred_doctors: '',
  preferred_doctors_name: '',
  monthly_budget: '',
  plan_name: '',
  pcp_copay: '',
  specialist_copay: '',
  generic_meds_copay: '',
  annual_deductible: '',
  max_out_of_pocket: '',
  all_benefits: '',
  phone_number: '',
  confirmed_date_of_birth: '',
  confirmed_first_name: '',
  confirmed_last_name: '',
  email: '',
  address: '',
  height: '',
  weight: '',
  ssn: '',
  monthly_total: '',
  health_unsubsidized: '',
  cigna_dental: '',
  americo_death_benefit: '',
  monthly_health_premium: '',
};

interface FormContextData {
  formData: FormDataType;
  setFormData: (data: FormDataType) => void;
}

const FormContext: Context<FormContextData> = createContext<FormContextData>({
  formData: initialFormData,
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
