import React, { createContext, useContext, useState, FC, ReactNode, Context } from 'react';
import { isBrowser } from '../../utility/utility';
import type { FormDataType, InsuredList } from '../../types/formData';

export const initialDependentState: InsuredList = {
  id: 0,
  full_name: '',
  relationship_to_primary: '',
  date_of_birth: '',
  age: null,
  dependent_gender: '',
  ssn: '',
  country_of_birth: '',
  state_of_birth: '',
  employment_status: '',
  occupation: '',
  height: '',
  weight: '',
  beneficiary_full_name: '',
  beneficiary_relationship: '',
  beneficiary_date_of_birth: '',
  beneficiary_age: null,
  notes: '',
};

export const initialFormData: FormDataType = {
  first_name: '',
  middle_name: '',
  last_name: '',
  gender: '',
  date_of_birth: '',
  age: null,
  phone_number: '',
  ssn: '',
  email: '',
  address: '',
  state: '',
  zip_code: '',
  city: '',
  county: '',
  height: '',
  weight: '',
  country_of_birth: '',
  state_of_birth: '',
  employment_status: '',
  occupation: '',
  married: '',
  taxes_filing_status: '',
  household_size: '',
  immigration_status: '',
  bank_name: '',
  account_type: '',
  routing_number: '',
  account_number: '',
  beneficiary_full_name: '',
  beneficiary_relationship: '',
  beneficiary_date_of_birth: '',
  beneficiary_age: null,
  name_of_account_holder: '',
  current_insurance: '',
  coverage_reason: '',
  plan_type: '',
  tobacco_use: '',
  additional_insured: '',
  additional_insured_list: [],
  annual_household_income: '',
  monthly_budget: '',
  carrier_name: '',
  plan_name: '',
  monthly_health_premium: '',
  pcp_copay: '',
  specialist_copay: '',
  generic_meds_copay: '',
  annual_deductible: '',
  max_out_of_pocket: '',
  health_unsubsidized: '',
  death_benefit: '',
  qualified_subsidy: '',
  life_adb_provider: '',
  life_total_cost: 0,
  life_health_unsubsidized: '',
  monthly_grand_total: '',
  applying_for_coverage: 0,
  pre_existing_conditions: '',
  pre_existing_conditions_list: '',
  medications: '',
  medications_list: '',
  medical_history: '',
  preferred_doctors: '',
  preferred_doctors_name: '',
  americo_premium: '',
  mutual_face_amount: '',
  mutual_quote_gender: '',
  eligible_americo_count: 0,
  eligible_mutual_count: 0,
  claims_dependents: '',
  carriers: [],
  plan_summary_pdf: '',
  is_agent_licensed_in_state: '',
};

let initialFormDataFromLocalStorage: FormDataType;
if (isBrowser()) {
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
