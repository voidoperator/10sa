import React from 'react';
import { ErrorLabelContainer, ErrorText, ErrorLabelArrow } from '../TailwindStyled';
import type { ErrorLabelProps } from '@/types/firebaseData';

const ErrorLabel: React.FC<ErrorLabelProps> = ({ errorMessage }) => {
  return (
    <ErrorLabelContainer>
      <ErrorText>
        {errorMessage}
        <ErrorLabelArrow />
      </ErrorText>
    </ErrorLabelContainer>
  );
};

export default ErrorLabel;
