import React, { createContext, useContext, useState, FC, ReactNode, Context } from 'react';
import type { FormDataType, InsuredList } from '../../types/formData';

export const initialDependentState: InsuredList = {
  id: 0,
  full_name: '',
  date_of_birth: '',
  relationship_to_primary: '',
  age: 0,
  ssn: '',
};

export const initialFormData: FormDataType = {
  google_app_url: localStorage.getItem('google_app_url') || '',
  agent_full_name: localStorage.getItem('agent_full_name') || '',
  agent_license_number: localStorage.getItem('agent_license_number') || '',
  first_name: '',
  middle_name: '',
  last_name: '',
  gender: '',
  plan_type: '',
  zip_code: '',
  county: '',
  state: '',
  city: '',
  coverage_reason: '',
  date_of_birth: '',
  country_of_birth: '',
  state_of_birth: '',
  age: 0,
  tobacco_use: '',
  married: '',
  taxes_filing_status: '',
  household_size: '',
  additional_insured: '',
  additional_insured_list: [],
  applying_for_coverage: 0,
  annual_household_income: '',
  pre_existing_conditions: '',
  pre_existing_conditions_list: '',
  medications: '',
  medications_list: '',
  medical_history: '',
  preferred_doctors: '',
  preferred_doctors_name: '',
  monthly_budget: '',
  carrier_name: '',
  plan_name: '',
  pcp_copay: '',
  specialist_copay: '',
  generic_meds_copay: '',
  annual_deductible: '',
  max_out_of_pocket: '',
  all_benefits: '',
  phone_number: '',
  email: '',
  address: '',
  height: '',
  weight: '',
  ssn: '',
  immigration_status: '',
  health_unsubsidized: '',
  cigna_dental: '',
  death_benefit: '',
  employment_status: '',
  occupation: '',
  carriers: [],
  beneficiary_full_name: '',
  beneficiary_relationship: '',
  beneficiary_date_of_birth: '',
  account_type: '',
  routing_number: '',
  account_number: '',
  bank_name: '',
  name_of_account_holder: '',
  total_pre_subsidy: '',
  qualified_subsidy: '',
  total_post_subsidy: '',
  driver_license_number: '',
  driver_license_state: '',
  life_adb_provider: '',
  life_total_cost: 0,
  monthly_grand_total: '',
  monthly_health_premium: '',
  americo_premium: '',
  mutual_face_amount: '',
  mutual_quote_gender: '',
  eligible_americo_count: 0,
  eligible_mutual_count: 0,
  life_health_unsubsidized: '',
};

let initialFormDataFromLocalStorage: FormDataType;
const formDataFromLocalStorage = localStorage.getItem('formData');
if (formDataFromLocalStorage) {
  try {
    initialFormDataFromLocalStorage = JSON.parse(formDataFromLocalStorage);
  } catch (error) {
    console.error('Error parsing formData from localStorage', error);
    initialFormDataFromLocalStorage = initialFormData;
  }
} else {
  initialFormDataFromLocalStorage = initialFormData;
}

interface FormContextData {
  formData: FormDataType;
  setFormData: (data: FormDataType | ((prevData: FormDataType) => FormDataType)) => void;
}

const FormContext: Context<FormContextData> = createContext<FormContextData>({
  formData: initialFormData,
  setFormData: () => {},
});

interface FormProviderProps {
  children: ReactNode;
}

export const FormProvider: FC<FormProviderProps> = ({ children }) => {
  const [formData, setFormData] = useState<FormDataType>(initialFormDataFromLocalStorage);

  const setFormDataSafe = (data: FormDataType | ((prevData: FormDataType) => FormDataType)) => {
    if (typeof data === 'function') {
      setFormData(data as (prevData: FormDataType) => FormDataType);
    } else {
      setFormData(data);
    }
  };

  return <FormContext.Provider value={{ formData, setFormData: setFormDataSafe }}>{children}</FormContext.Provider>;
};

export const useFormData = () => useContext(FormContext);
