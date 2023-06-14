import type { FormDataType } from '../types/formData';

export const isBrowser = () => typeof window !== 'undefined';

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
    'plan_type',
    'current_insurance',
    'state',
    'tobacco_use',
    'married',
    'taxes_filing_status',
    'additional_insured',
    'pre_existing_conditions',
    'pre_existing_conditions_list',
    'medications',
    'medications_list',
    'preferred_doctors',
    'preferred_doctors_name',
    'plan_name',
    'immigration_status',
    'life_adb_provider',
    'employment_status',
    'beneficiary_full_name',
    'beneficiary_relationship',
    'account_type',
    'bank_name',
    'name_of_account_holder',
    'driver_license_number',
  ];
  return Object.entries(form).reduce((accum, [key, value]) => {
    if (fieldsToTransform.includes(key) && typeof value === 'string') {
      return { ...accum, [key]: toTitleCase(value) };
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
