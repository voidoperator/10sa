export type FormDataType = {
  google_app_url?: string;
  agent_full_name?: string;
  agent_license_number?: string;
  first_name: string;
  middle_name?: string;
  last_name: string;
  gender: string;
  plan_type: string;
  zip_code: string;
  county: string;
  state: string;
  city: string;
  coverage_reason: string;
  date_of_birth: string;
  country_of_birth: string;
  state_of_birth: string;
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
  medical_history: string;
  preferred_doctors: string;
  preferred_doctors_name: string;
  monthly_budget: string;
  carrier_name: string;
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
  driver_license_number: string;
  driver_license_state: string;
  immigration_status: string;
  health_unsubsidized: string;
  cigna_dental: string;
  death_benefit: string;
  employment_status: string;
  occupation: string;
  carriers: Carrier[];
  beneficiary_full_name: string;
  beneficiary_relationship: string;
  beneficiary_date_of_birth: string;
  account_type: string;
  routing_number: string;
  account_number: string;
  bank_name: string;
  name_of_account_holder: string;
  total_pre_subsidy: string;
  qualified_subsidy: string;
  total_post_subsidy: string;
  life_adb_provider: string;
  life_total_cost: number;
  monthly_grand_total: string;
  monthly_health_premium: string;
  americo_premium: string;
  mutual_face_amount: string;
  mutual_quote_gender: string;
  eligible_americo_count: number;
  eligible_mutual_count: number;
};

export type InsuredList = {
  id: number | string;
  full_name: string;
  relationship_to_primary: string;
  date_of_birth: string;
  age: number;
  ssn: string;
  country_of_birth?: string;
  state_of_birth?: string;
  driver_license_number?: string;
  driver_license_state?: string;
  height?: string;
  weight?: string;
  notes?: string;
  employment_status?: string;
  occupation?: string;
  beneficiary_full_name?: string;
  beneficiary_relationship?: string;
  beneficiary_date_of_birth?: string;
};

export type TextInputProps = {
  id: number | string;
  name: string;
  labelName: string;
  placeholder: string;
  type: string;
  required?: boolean;
  pattern?: string;
  uppercase?: boolean;
  currency?: boolean;
  zip_code?: boolean;
  routingNumber?: boolean;
  accountNumber?: boolean;
  phone?: boolean;
  socialSecurity?: boolean;
  height?: boolean;
  weight?: boolean;
  currencyMutual?: boolean;
  currencyUnsubsidized?: boolean;
  additional?: boolean;
  useDefault?: boolean;
  defaultKey?: string;
  defaultValue?: string;
  externalValue?: string;
};

export type LocalStorageInputProps = {
  id: string;
  name: string;
  labelName: string;
  placeholder: string;
  required?: boolean;
  uppercase?: boolean;
  useDefault?: boolean;
  defaultKey?: string;
  defaultValue?: string;
  externalValue?: string;
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
  useDefault?: boolean;
  defaultKey?: string;
  defaultValue?: string;
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
  useDefault?: boolean;
  defaultKey?: string;
  defaultValue?: string;
};

export type DateValue = {
  startDate: Date | string | null;
  endDate: Date | string | null;
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
  defaultOption?: string | undefined;
};

export type OptionTypes = {
  label: string;
  value: string;
};

export type RoutingNumbers = {
  [key: string]: string;
};

export type BankRoutingNumbers = {
  [key: string]: RoutingNumbers;
};

export type State = OptionTypes['value'];

export type PreferredCarriers = Record<State, Carrier[]>;

export type Carrier =
  | 'None'
  | 'Aetna'
  | 'Ambetter'
  | 'Arizona'
  | 'Avmed'
  | 'BlueCross BlueShield'
  | 'Cigna'
  | 'Florida Blue'
  | 'Friday Health Plans'
  | 'Molina'
  | 'Oscar'
  | 'UnitedHealthcare (UHC)';
