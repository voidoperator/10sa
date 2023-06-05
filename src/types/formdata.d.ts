export type FormDataType = {
  first_name: string;
  last_name: string;
  plan_type: string;
  state: string;
  zip_code: string;
  coverage_reason: string;
  date_of_birth: string;
  age: number;
  tobacco_use: string;
  married: string;
  taxes_filing_status: string;
  household_size: string;
  additional_insured: string;
  additional_insured_list: InsuredList[];
  annual_household_income: string;
  pre_existing_conditions: string;
  pre_existing_conditions_list: string;
  medications: string;
  medications_list: string;
  medical_history?: string;
  preferred_doctors: string;
  preferred_doctors_name: string;
  monthly_budget: string;
  plan_name: string;
  pcp_copay: string;
  specialist_copay: string;
  generic_meds_copay: string;
  annual_deductible: string;
  max_out_of_pocket: string;
  all_benefits: string;
  phone_number: string;
  confirmed_date_of_birth: string;
  confirmed_first_name: string;
  confirmed_last_name: string;
  email: string;
  address: string;
  height: string;
  weight: string;
  ssn: string;
  monthly_total: string;
  health_unsubsidized: string;
  cigna_dental: string;
  americo_death_benefit: string;
};

export type InsuredList = {
  id: number;
  full_name: string;
  relationship: string;
  date_of_birth: string;
  age: number;
  ssn: string;
  driver_license_number?: string;
  height?: string;
  weight?: string;
};

export type TextInputProps = {
  labelName: string;
  placeholder: string;
  type: string;
  name: string;
  required?: boolean;
  pattern?: string;
  currency?: boolean;
  phone?: boolean;
  socialSecurity?: boolean;
  driverLicense?: boolean;
  height?: boolean;
  weight?: boolean;
  additional?: boolean;
};

export type RadioInputProps = {
  labelName: string;
  name: string;
  options: { label: string; value: string }[];
  required?: boolean;
  rowOrCol?: string;
  value?: string;
};

export type TextAreaProps = {
  labelName: string;
  placeholder: string;
  name: string;
  required?: boolean;
  rows?: number;
};

export type DropDownInputProps = {
  labelName: string;
  name: string;
  defaultOption: string;
  options: { label: string; value: string }[];
  required?: boolean;
};

export type DateInputProps = {
  labelName: string;
  name: string;
  showAge?: boolean;
  required?: boolean;
  additional?: boolean;
};

export type DateValue = {
  startDate: Date | null;
  endDate: Date | null;
};
