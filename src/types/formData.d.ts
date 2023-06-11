export type FormDataType = {
  google_app_url?: string;
  first_name: string;
  middle_name?: string;
  last_name: string;
  plan_type: string;
  zip_code: string;
  county: string;
  state: string;
  city: string;
  coverage_reason: string;
  date_of_birth: string;
  age: number;
  tobacco_use: string;
  married: string;
  taxes_filing_status: string;
  household_size: string;
  additional_insured: string;
  additional_insured_list: InsuredList[];
  applying_for_coverage: number;
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
  email: string;
  address: string;
  height: string;
  weight: string;
  ssn: string;
  driver_license_number?: string;
  resident_or_citizen: string;
  monthly_grand_total: string;
  health_unsubsidized: string;
  cigna_dental?: string;
  life_adb_provider: string;
  monthly_health_premium: string;
  americo_premium?: string;
  americo_death_benefit?: string;
  mutual_face_amount?: string;
  mutual_quote_gender?: string;
  employment_status: string;
  occupation: string;
};

export type InsuredList = {
  id: number | string;
  full_name: string;
  relationship: string;
  date_of_birth: string;
  age: number;
  ssn: string;
  country_of_birth?: string;
  state_of_birth?: string;
  driver_license_number?: string;
  height?: string;
  weight?: string;
  notes_dependent?: string;
  employment_status?: string;
  occupation?: string;
};

export type TextInputProps = {
  id: number | string;
  name: string;
  labelName: string;
  placeholder: string;
  type: string;
  required?: boolean;
  pattern?: string;
  currency?: boolean;
  zip_code?: boolean;
  routingNumber?: boolean;
  accountNumber?: boolean;
  phone?: boolean;
  socialSecurity?: boolean;
  driverLicense?: boolean;
  height?: boolean;
  weight?: boolean;
  currencyMutual?: boolean;
  additional?: boolean;
  useDefault?: boolean;
  defaultKey?: string;
  defaultValue?: string;
};

export type RadioInputProps = {
  id: number | string;
  labelName: string;
  name: string;
  options: { label: string; value: string }[];
  required?: boolean;
  additional?: boolean;
  defaultOption?: string;
  rowOrCol?: string;
};

export type TextAreaProps = {
  id: number | string;
  labelName: string;
  name: string;
  placeholder: string;
  required?: boolean;
  rows?: number;
  additional?: boolean;
};

export type DropDownInputProps = {
  id: number | string;
  labelName: string;
  name: string;
  defaultOption: string;
  options: { label: string; value: string }[];
  required?: boolean;
  additional?: boolean;
};

export type DateInputProps = {
  id: number | string;
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

export type DetailConfirmationProps = {
  id: number | string;
  detail: string;
  labelName: string;
  name?: string;
  error?: boolean;
  additional?: boolean;
};

export type GroupButtonProps = {
  id: number | string;
  labelName: string;
  defaultOption?: string;
  required?: boolean;
  name: string;
  options: { label: string; value: string }[];
};

export type SelectCreateableProps = {
  id: number | string;
  labelName: string;
  name: string;
  placeholder: string;
  options: { label: string; value: string }[];
  required?: boolean;
  additional?: boolean;
};

export type OptionTypes = {
  label: string;
  value: string;
};
