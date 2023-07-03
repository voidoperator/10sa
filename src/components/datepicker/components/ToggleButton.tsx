import React from 'react';

import { CloseIcon, DateIcon } from './utils';

interface ToggleButtonProps {
  isEmpty: boolean;
}

const ToggleButton: React.FC<ToggleButtonProps> = (e: ToggleButtonProps): JSX.Element => {
  return e.isEmpty ? (
    <DateIcon className='h-5 w-5 stroke-neutral-500/75' />
  ) : (
    <CloseIcon className='h-5 w-5 stroke-neutral-500/75' />
  );
};

export default ToggleButton;
