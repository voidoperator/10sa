import type { FormDataType, RoutingNumbers, OptionTypes } from '../types/formData';

export const isBrowser = () => typeof window !== 'undefined';

export const getNextMonth = (): string => {
  const today = new Date();
  let nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);

  return nextMonth.toLocaleString('default', { month: 'long' });
};

export const getDayWithSuffix = (): string => {
  const date = new Date();
  const day = date.getDate();
  let suffix = '';

  if (day >= 11 && day <= 13) {
    suffix = 'th';
  } else {
    switch (day % 10) {
      case 1:
        suffix = 'st';
        break;
      case 2:
        suffix = 'nd';
        break;
      case 3:
        suffix = 'rd';
        break;
      default:
        suffix = 'th';
        break;
    }
  }

  return day.toString() + suffix;
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

export const sanatizeFormData = (form: FormDataType) => {
  const fieldsToTitleCase = [
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
  const insuredFieldsToIgnoreValue = [
    'age',
    'date_of_birth',
    'ssn',
    'dependent_gender',
    'employment_status',
    'occupation',
    'height',
    'weight',
    'beneficiary_date_of_birth',
    'beneficiary_age',
    'notes',
  ];
  const fieldsToIgnore = ['is_agent_licensed_in_state', 'eligible_americo_count', 'eligible_mutual_count'];
  return Object.entries(form).reduce((accum, [key, value]) => {
    if (key === 'additional_insured_list' && Array.isArray(value)) {
      const insuredArray = value;
      const updatedInsuredArray = insuredArray.map((insuredItem) => {
        const updatedInsuredItem: Record<string, string> = {};
        for (const [innerKey, innerValue] of Object.entries(insuredItem)) {
          if (!innerValue || innerKey === 'id') continue;
          let newKey = toTitleCase(innerKey);
          if (insuredFieldsToIgnoreValue.includes(innerKey)) {
            let newValue = typeof innerValue !== 'string' ? innerValue.toString() : innerValue;
            if (innerKey === 'ssn') {
              newKey = 'SSN';
            } else if (innerKey === 'dependent_gender') {
              newKey = 'Gender';
              newValue = toTitleCase(newValue);
            } else if (innerKey === 'weight') {
              newValue = newValue + ' lb';
            } else if (innerKey === 'age') {
              newValue = newValue.toString();
            }
            updatedInsuredItem[newKey] = newValue;
            continue;
          }
          const newValue = typeof innerValue === 'string' ? toTitleCase(innerValue) : innerValue.toString();
          updatedInsuredItem[newKey] = newValue;
        }
        return updatedInsuredItem;
      });
      return { ...accum, [key]: updatedInsuredArray };
    }
    if (value === null || value === '' || key === 'carriers' || fieldsToIgnore.includes(key)) {
      return { ...accum };
    }
    if (key === 'weight') {
      const weightUnits = `${value} lb`;
      return { ...accum, [key]: weightUnits };
    }
    if (key === 'life_total_cost') {
      const costFormat = `$${value}`;
      return { ...accum, [key]: costFormat };
    }
    if (key === 'applying_for_coverage' || key === 'age') {
      return { ...accum, [key]: value.toString() };
    }
    if (fieldsToTitleCase.includes(key) && typeof value === 'string') {
      return { ...accum, [key]: toTitleCase(value) };
    }
    return { ...accum, [key]: value };
  }, {});
};

export const backupAndClearFormData = () => {
  const currentFormData = localStorage.getItem('formData') || '';
  if (currentFormData) {
    localStorage.setItem('backupFormData', localStorage.getItem('formData') || '');
    localStorage.removeItem('formData');
    window.location.reload();
  }
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
