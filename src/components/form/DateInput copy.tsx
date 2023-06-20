import React, { useEffect, useState } from 'react';
import { useFormData } from '../contexts/FormContext';
import Datepicker from 'react-tw-datepicker';
import type { DateValueType } from 'react-tw-datepicker/dist/types';
import type { DateInputProps, DateValue } from '../../types/formData';
import { ShadowDiv, DateInputLabelContainer, DateInputLabel, RequiredSpan, AgeContainer } from '../tw/twStyles';

const datePickerInputClasses =
  'form-input w-full border text-sm rounded-lg bg-10sa-deep-purple border-10sa-gold/40 placeholder-gray-400 text-white';

const DateInput: React.FC<DateInputProps> = ({
  id,
  labelName,
  name,
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

  const calculateAge = (birthdate: string | Date) => {
    let birthDate = new Date(birthdate);
  
    if (isNaN(birthDate.getTime())) {
      return null;
    }
  
    let ageDifMs = Date.now() - birthDate.getTime();
    let ageDate = new Date(ageDifMs);
    return ageDate.getUTCFullYear() - 1970;
  };

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
      setUserAge(calcAge);
      if (defaultKey === 'date_of_birth') {
        const sanatizeValue = defaultValue === '--' ? '' : defaultValue;
        setFormData((prevState) => ({ ...prevState, [defaultKey]: sanatizeValue, age: userAge }));
      } else {
        const sanatizeValue = defaultValue === '--' ? '' : defaultValue;
        setFormData((prevState) => ({ ...prevState, [defaultKey]: sanatizeValue }));
      }
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
      const calcAge = Number(calculateAge(startDate));
      setUserAge(calcAge);
      let additionalInsuredList = formData.additional_insured_list || [];
      if (defaultKey === 'date_of_birth') {
        additionalInsuredList[dependentIndex] = {
          ...additionalInsuredList[dependentIndex],
          [defaultKey]: dateReformat, // saving dateReformat
          age: calcAge, // saving calcAge
        };
      }
      setFormData((prevState) => ({ ...prevState, additional_insured_list: additionalInsuredList }));

  }, []);

  const handleValueChange = (newDate: DateValueType, e?: HTMLInputElement | null) => {

      const [year = '', month = '', day = ''] = startDate.toString().split('-');
      const formatDate = `${month}-${day}-${year}`;
      const calcAge = calculateAge(startDate);
      setUserAge(calcAge);

      if (additional && typeof id === 'number') {
        const dependentIndex = id;
        let additionalInsuredList = formData.additional_insured_list || [];
        additionalInsuredList[dependentIndex] = {
          ...additionalInsuredList[dependentIndex],
          [defaultKey]: '', // Empty string when date is deleted
          age: null, // Null age when date is deleted
        };
        setFormData((prevState) => ({ ...prevState, additional_insured_list: additionalInsuredList }));
      } else {
        if (defaultKey === 'date_of_birth') {
          setFormData((prevState) => ({ ...prevState, [name]: '', age: null })); // Empty string and null age when date is deleted
        } else {
          setFormData((prevState) => ({ ...prevState, [name]: '' })); // Empty string when date is deleted
        }
      }
    }
  };

  const formatId = additional && typeof id === 'number' ? name + '_' + (id + 1) : name;

  return (
    <ShadowDiv>
      <DateInputLabelContainer>
        <DateInputLabel htmlFor={formatId} className=''>
          {labelName}
          {required && <RequiredSpan />}
        </DateInputLabel>
        {value.startDate && userAge !== null && userAge > -1 && showAge && <AgeContainer>Age: {userAge}</AgeContainer>}
        {value.startDate && userAge !== null && userAge < 0 && showAge && <AgeContainer>Invalid Date</AgeContainer>}
      </DateInputLabelContainer>
      <Datepicker
        inputId={formatId}
        showFooter={true}
        maxDate={new Date(Date.now())}
        value={value}
        asSingle={true}
        onChange={handleValueChange}
        displayFormat='MM/DD/YYYY'
        popoverDirection='down'
        useRange={false}
        placeholder={'Enter or select a date: MM/DD/YYYY'}
        inputClassName={datePickerInputClasses}
      />
    </ShadowDiv>
  );
};

export default DateInput;
