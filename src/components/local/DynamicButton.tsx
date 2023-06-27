/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Button } from '../../components/TailwindStyled';
import { DynamicButtonProps } from '../../types/formData';

const DynamicButton: React.FC<DynamicButtonProps> = ({ labelNameOptions, id, check, pattern, handleClick }) => {
  const [dynamicLabel, setDynamicLabel] = useState<string>('');
  const [disabled, setDisabled] = useState<boolean>(true);

  useEffect(() => {
    if (check === '') {
      setDynamicLabel(labelNameOptions.empty);
      setDisabled(true);
      return;
    }
    if (pattern.test(check)) {
      setDynamicLabel(labelNameOptions.valid);
      setDisabled(false);
      return;
    } else {
      setDynamicLabel(labelNameOptions.invalid);
      setDisabled(true);
      return;
    }
  }, [check]);

  return (
    <Button id={id} onClick={handleClick} disabled={disabled}>
      {dynamicLabel}
    </Button>
  );
};

export default DynamicButton;
