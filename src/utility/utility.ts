import type { FormDataType, RoutingNumbers, OptionTypes } from '../types/formData';

export const isBrowser = () => typeof window !== 'undefined';

const getLastDayOfMonth = (year: number, month: number): number => {
  return new Date(year, month + 1, 0).getDate();
};

export const getDraftDate = (): string => {
  const today = new Date();
  const lastDayOfMonth = getLastDayOfMonth(today.getFullYear(), today.getMonth());
  const daysUntilEndOfMonth = lastDayOfMonth - today.getDate();

  let nextRelevantMonth: Date;
  if (daysUntilEndOfMonth <= 3) {
    nextRelevantMonth = new Date(today.getFullYear(), today.getMonth() + 2, 1);
  } else {
    nextRelevantMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);
  }

  return nextRelevantMonth.toLocaleString('default', { month: 'long' });
};

export const calculateAge = (dob: string | Date) => {
  const dateOfBirth = new Date(dob);

  if (isNaN(dateOfBirth.getTime())) {
    return null;
  }

  const ageDifMs = Date.now() - dateOfBirth.getTime();
  const ageDate = new Date(ageDifMs);
  const calcAge = ageDate.getUTCFullYear() - 1970;
  return calcAge;
};

export const getRoutingNumbers = (routingNumbers: RoutingNumbers): OptionTypes[] => {
  return Object.keys(routingNumbers).map((key) => {
    const titleCaseLabel = toTitleCase(key);
    return {
      label: titleCaseLabel,
      value: routingNumbers[key],
    };
  });
};

export const parseCurrency = (input: string | undefined) => {
  if (typeof input === 'undefined') {
    return 0;
  }
  return parseFloat((input || '0').replace(/[^\d\.]/g, ''));
};

export const toTitleCase = (string: string) => {
  string = string.replace(/_/g, ' ');
  return string.replace(/\w\S*/g, function (text: string) {
    return text.charAt(0).toUpperCase() + text.substring(1).toLowerCase();
  });
};

export const formDataTitleCased = (form: FormDataType) => {
  const fieldsToTransform = [
    'first_name',
    'middle_name',
    'last_name',
    'gender',
    'state',
    'city',
    'married',
    'taxes_filing_status',
    'immigration_status',
    'bank_name',
    'account_type',
    'beneficiary_full_name',
    'beneficiary_relationship',
    'name_of_account_holder',
    'plan_type',
    'tobacco_use',
    'additional_insured',
    'pre_existing_conditions',
    'medications',
    'preferred_doctors',
    'preferred_doctors_name',
    'life_adb_provider',
    'claims_dependents',
    'current_insurance',
    'state_of_birth',
  ];
  const fieldsToIgnore = [
    'google_app_url',
    'agent_full_name',
    'agent_license_number',
    'show_script',
    'is_agent_licensed_in_state',
  ];
  return Object.entries(form).reduce((accum, [key, value]) => {
    if (key === 'carriers') {
      return { ...accum };
    }
    if (fieldsToIgnore.includes(key) && typeof value === 'string') {
      return { ...accum };
    }
    if (fieldsToTransform.includes(key) && typeof value === 'string') {
      return { ...accum, [key]: toTitleCase(value) };
    }
    if (key === 'weight') {
      const weightUnits = `${value}lbs`;
      return { ...accum, [key]: weightUnits };
    }
    if (value === null || value === '') {
      return { ...accum };
    }
    return { ...accum, [key]: value };
  }, {});
};

export const backupAndClearFormData = () => {
  localStorage.setItem('backupFormData', localStorage.getItem('formData') || '');
  localStorage.removeItem('formData');
  window.location.reload();
};

export const restoreBackupFormData = () => {
  const backupData = localStorage.getItem('backupFormData');
  if (backupData) {
    localStorage.setItem('formData', backupData);
    localStorage.removeItem('backupFormData');
    window.location.reload();
  } else {
    console.log('No backup data found');
  }
};
