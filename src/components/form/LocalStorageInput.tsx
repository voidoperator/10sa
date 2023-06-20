import React, { useEffect, useState } from 'react';
import { useFormData } from '../contexts/FormContext';
import { MainLabel, RequiredSpan, ShadowDiv, TextField } from '../tw/twStyles';
import type { LocalStorageInputProps } from '../../types/formData';

const LocalStorageInput: React.FC<LocalStorageInputProps> = ({
  id,
  labelName,
  placeholder,
  name,
  required = true,
  uppercase = true,
  useDefault = true,
  defaultKey = '',
  defaultValue = '',
  externalValue,
}) => {
  const { formData, setFormData } = useFormData();
  const [value, setValue] = useState<string>('');

  useEffect(() => {
    if (defaultKey === 'google_app_url') {
      const googleKeyUrl = localStorage.getItem('google_app_url');
      if (googleKeyUrl) {
        setValue(googleKeyUrl);
        setFormData((prevState) => ({ ...prevState, google_app_url: googleKeyUrl }));
        return;
      }
    }

    if (defaultKey === 'agent_full_name') {
      const agentFullName = localStorage.getItem('agent_full_name');
      if (agentFullName) {
        setValue(agentFullName);
        setFormData((prevState) => ({ ...prevState, agent_full_name: agentFullName }));
        return;
      }
    }
    if (defaultKey === 'agent_license_number') {
      const agentLicenseNumber = localStorage.getItem('agent_license_number');
      if (agentLicenseNumber) {
        setValue(agentLicenseNumber);
        setFormData((prevState) => ({ ...prevState, agent_license_number: agentLicenseNumber }));
        return;
      }
    }
  }, []);

  useEffect(() => {
    if (externalValue !== undefined) {
      setValue(externalValue);
    }
  }, [externalValue]);

  useEffect(() => {
    if (useDefault && defaultKey && defaultValue && value === '') {
      setValue(defaultValue);
      setFormData((prevState) => ({ ...prevState, [defaultKey]: defaultValue }));
    }
  }, [useDefault, defaultKey, defaultValue, value]);

  useEffect(() => {
    if (formData.google_app_url) {
      localStorage.setItem('google_app_url', formData.google_app_url);
    } else {
      localStorage.removeItem('google_app_url');
    }

    if (formData.agent_full_name) {
      localStorage.setItem('agent_full_name', formData.agent_full_name);
    } else {
      localStorage.removeItem('agent_full_name');
    }

    if (formData.agent_license_number) {
      localStorage.setItem('agent_license_number', formData.agent_license_number);
    } else {
      localStorage.removeItem('agent_license_number');
    }
  }, [formData.google_app_url, formData.agent_full_name, formData.agent_license_number]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value;
    setValue(value);
    setFormData((prevState) => ({ ...prevState, [defaultKey]: value }));
  };

  return (
    <div className='flex flex-col gap-1'>
      <MainLabel htmlFor={id}>
        {labelName}
        {required && <RequiredSpan />}
      </MainLabel>
      <TextField
        id={id}
        type='text'
        name={name}
        placeholder={placeholder}
        required={required}
        className={uppercase ? 'capitalize' : 'normal-case'}
        onChange={handleChange}
        autoComplete='no'
        value={value}
      />
    </div>
  );
};

export default LocalStorageInput;
