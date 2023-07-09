import React, { useEffect, useState } from 'react';
import { useFormData } from '../contexts/FormContext';
import { Button, FormTag, MainLabel, ShadowDiv, TextArea } from '../TailwindStyled';
import { FormDataType } from '@/types/formData';
import { initialFormData } from '../contexts/FormContext';

type RestoreFromJsonAreaProps = {
  placeholder: string;
  handlePrev: React.Dispatch<React.SetStateAction<string>>;
};

const RestoreFromJsonArea: React.FC<RestoreFromJsonAreaProps> = ({ placeholder, handlePrev }) => {
  const { setFormData } = useFormData();
  const [jsonInput, setJsonInput] = useState<string>('');
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [buttonText, setButtonText] = useState<string>('Import JSON');
  const [validJson, setValidJson] = useState<FormDataType>(initialFormData);

  useEffect(() => {
    if (!jsonInput) return;
    try {
      const data = JSON.parse(jsonInput);
      setValidJson(data);
      setIsDisabled(false);
    } catch (error) {
      setIsDisabled(true);
      setButtonText('Invalid JSON');
      return;
    }
  }, [jsonInput]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handlePrev(validJson.bank_name);
    setFormData(validJson);
    localStorage.setItem('formData', JSON.stringify(validJson));
  };

  return (
    <FormTag onSubmit={handleSubmit}>
      <ShadowDiv>
        <MainLabel>Restore from JSON</MainLabel>
        <TextArea placeholder={placeholder} value={jsonInput} onChange={(e) => setJsonInput(e.target.value)} />
        <Button type='submit' disabled={isDisabled}>
          {buttonText}
        </Button>
      </ShadowDiv>
    </FormTag>
  );
};

export default RestoreFromJsonArea;
