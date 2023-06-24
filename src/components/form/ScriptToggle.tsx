import React, { useEffect, useState } from 'react';
import { useConstantData } from '../contexts/ConstantDataContext';
import type { ConstantDataType, ScriptToggleProps } from '../../types/constantData';
import { ToggleWrapper, ToggleButton, ToggleLabel } from '../tw/twStyles';

const ScriptToggle: React.FC<ScriptToggleProps> = ({ id, defaultOption }) => {
  const { constantData, setConstantData } = useConstantData();
  const [isChecked, setIsChecked] = useState(defaultOption);

  useEffect(() => {
    if (defaultOption && !constantData[id as keyof ConstantDataType]) {
      setConstantData((prevState) => ({ ...prevState, [id]: defaultOption }));
    }
  }, [defaultOption, constantData.show_script]);

  useEffect(() => {
    setConstantData({
      ...constantData,
      [id]: isChecked,
    });
  }, [isChecked]);

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
