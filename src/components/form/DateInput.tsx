import React, { useEffect, useState } from 'react';
import { useFormData } from '../contexts/FormContext';
import Datepicker from '../datepicker';
import { calculateAge } from '@/utility/utility';
import type { DateValueType } from '../datepicker/types';
import type { DateInputProps, DateValue, FormDataType } from '@/types/formData';
import {
  ShadowDiv,
  DateInputLabelContainer,
  DateInputLabel,
  RequiredSpan,
  AgeContainer,
} from '@/components/TailwindStyled';

const DateInput: React.FC<DateInputProps> = ({
  id,
  labelName,
  name,
  ageKey,
  showAge = true,
  required = true,
  additional = false,
  useDefault = true,
  defaultKey = '',
  defaultValue = '',
}) => {
  const { formData, setFormData } = useFormData();
  const [userAge, setUserAge] = useState<number | null>(null);
  const [value, setValue] = useState<DateValue>({
    startDate: null,
    endDate: null,
  });

  const formatId = additional && typeof id === 'number' ? name + '_' + (id + 1) : name;

  useEffect(() => {
    if (!additional && useDefault && defaultKey && defaultValue && value.startDate === null && value.endDate === null) {
      const [month = '', day = '', year = ''] = defaultValue.toString().split('-');
      const dateReformat = `${year}-${month}-${day}`;
      let startDate = new Date(dateReformat);
      startDate.setMinutes(startDate.getMinutes() - startDate.getTimezoneOffset());
      setValue({
        startDate: dateReformat,
        endDate: dateReformat,
      });
      const calcAge = calculateAge(startDate);
      const sanatizeAge = calcAge !== null && calcAge < 0 ? null : calcAge;
      setUserAge(calcAge);
      const sanatizeValue = defaultValue === '--' ? '' : defaultValue;
      setFormData((prevState) => ({ ...prevState, [defaultKey]: sanatizeValue, [ageKey]: sanatizeAge }));
    }
    if (
      additional &&
      typeof id === 'number' &&
      useDefault &&
      defaultKey &&
      defaultValue &&
      value.startDate === null &&
      value.endDate === null
    ) {
      const [month = '', day = '', year = ''] = defaultValue.toString().split('-');
      const dateReformat = `${year}-${month}-${day}`;
      const dependentIndex = id;
      let startDate = new Date(dateReformat);
      startDate.setMinutes(startDate.getMinutes() - startDate.getTimezoneOffset());
      setValue({
        startDate: dateReformat,
        endDate: dateReformat,
      });
      const calcAge = calculateAge(startDate);
      const sanatizeAge = calcAge !== null && calcAge < 0 ? null : calcAge;
      setUserAge(calcAge);
      let additionalInsuredList = formData.additional_insured_list || [];
      additionalInsuredList[dependentIndex] = {
        ...additionalInsuredList[dependentIndex],
        [defaultKey]: defaultValue,
        [ageKey]: sanatizeAge,
      };
      setFormData((prevState) => ({ ...prevState, additional_insured_list: additionalInsuredList }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [useDefault, defaultKey, defaultValue, value]);

  const handleValueChange = (newDate: DateValueType, e?: HTMLInputElement | null) => {
    if (newDate === null) {
      setValue({ startDate: null, endDate: null });
      setUserAge(0);
    } else if (typeof newDate === 'object' && newDate.hasOwnProperty('startDate')) {
      setValue(newDate as DateValue);
      const startDate = newDate.startDate ?? '';
      const [year = '', month = '', day = ''] = startDate.toString().split('-');
      const formatDate = `${month}-${day}-${year}`;
      const calcAge = calculateAge(startDate);
      const sanatizeAge = calcAge !== null && calcAge < 0 ? null : calcAge;
      setUserAge(calcAge);
      const sanatizeValue = formatDate === '--' ? '' : formatDate;
      if (additional && typeof id === 'number') {
        const dependentIndex = id;

        let additionalInsuredList = formData.additional_insured_list || [];

        additionalInsuredList[dependentIndex] = {
          ...additionalInsuredList[dependentIndex],
          id: dependentIndex,
          [defaultKey]: sanatizeValue,
          [ageKey]: sanatizeAge,
        };
        setFormData((prevState) => ({ ...prevState, additional_insured_list: additionalInsuredList }));
      } else {
        setFormData((prevState) => ({ ...prevState, [defaultKey]: sanatizeValue, [ageKey]: calcAge }));
      }
    }
  };

  const handleInputChange = (value: string) => {
    if (value === '') {
      if (!additional && (formData.date_of_birth || formData[ageKey as keyof FormDataType])) {
        setFormData((prevState) => ({ ...prevState, date_of_birth: '', [ageKey]: null }));
        setValue({ startDate: null, endDate: null });
        setUserAge(null);
      }
      if (additional && typeof id === 'number') {
        const dependentIndex = id;

        let additionalInsuredList = formData.additional_insured_list || [];

        additionalInsuredList[dependentIndex] = {
          ...additionalInsuredList[dependentIndex],
          id: dependentIndex,
          [defaultKey]: '',
          [ageKey]: null,
        };

        setFormData((prevState) => ({ ...prevState, additional_insured_list: additionalInsuredList }));
        setValue({ startDate: null, endDate: null });
        setUserAge(null);
      }
    }
  };

  return (
    <ShadowDiv>
      <DateInputLabelContainer>
        <DateInputLabel htmlFor={formatId}>
          {labelName}
          {required && <RequiredSpan />}
        </DateInputLabel>
        {value.startDate && userAge !== null && userAge > -1 && showAge && <AgeContainer>Age: {userAge}</AgeContainer>}
        {value.startDate && userAge !== null && userAge < 0 && showAge && <AgeContainer>Invalid Date</AgeContainer>}
      </DateInputLabelContainer>
      <Datepicker
        onValueChange={handleInputChange}
        inputId={formatId}
        showFooter={true}
        maxDate={new Date(Date.now())}
        value={value}
        asSingle={true}
        onChange={handleValueChange}
        popoverDirection='down'
        displayFormat='MM/DD/YYYY'
        placeholder={'Enter or select a date: MM/DD/YYYY'}
        useRange={false}
        i18n='en'
      />
    </ShadowDiv>
  );
};

export default DateInput;
