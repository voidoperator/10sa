import React, { useEffect, useState } from 'react';
import { useFormData } from '../contexts/FormContext';
import type { FormDataType, ScriptToggleProps } from '../../types/formData';
import { ToggleWrapper, ToggleButton, ToggleLabel } from '../tw/twStyles';

const ScriptToggle: React.FC<ScriptToggleProps> = ({ id, defaultOption }) => {
  const { formData, setFormData } = useFormData();
  const [isChecked, setIsChecked] = useState(defaultOption);

  useEffect(() => {
    if (id === 'show_script') {
      const showScript = localStorage.getItem('show_script');
      if (showScript) {
        setFormData((prevState) => ({ ...prevState, show_script: showScript }));
        setIsChecked(showScript);
        return;
      }
    }
  }, []);

  useEffect(() => {
    if (defaultOption && !formData[id as keyof FormDataType]) {
      setFormData((prevState) => ({ ...prevState, [id]: defaultOption }));
    }
  }, [defaultOption, formData, id, setFormData]);

  useEffect(() => {
    setFormData({
      ...formData,
      [id]: isChecked,
    });
  }, [isChecked]);

  useEffect(() => {
    if (formData.show_script) {
      localStorage.setItem('show_script', formData.show_script);
    } else {
      localStorage.removeItem('show_script');
    }
  }, [formData.show_script]);

  const handleToggle = () => {
    const newState = isChecked === 'on' ? 'off' : 'on';
    setIsChecked(newState);
  };

  return (
    <ToggleWrapper>
      <ToggleLabel>
        <input
          name='script-toggle'
          type='checkbox'
          value={isChecked}
          checked={isChecked === 'on'}
          className='peer sr-only'
          onChange={handleToggle}
        />
        <ToggleButton />
      </ToggleLabel>
    </ToggleWrapper>
  );
};

export default ScriptToggle;
