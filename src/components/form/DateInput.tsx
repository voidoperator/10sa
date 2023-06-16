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
  const [userAge, setUserAge] = useState<number>(0);
  const [value, setValue] = useState<DateValue>({
    startDate: null,
    endDate: null,
  });

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
      const calcAge = Number(calculateAge(startDate));
      setUserAge(calcAge);
      setFormData({ ...formData, [defaultKey]: defaultValue, age: calcAge });
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
      additionalInsuredList[dependentIndex] = {
        ...additionalInsuredList[dependentIndex],
        [defaultKey]: defaultValue,
        age: calcAge,
      };
      setFormData({ ...formData, additional_insured_list: additionalInsuredList });
    }
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
      const calcAge = Number(calculateAge(new Date(startDate)));
      setUserAge(calcAge);

      if (additional && typeof id === 'number') {
        const dependentIndex = id;

        let additionalInsuredList = formData.additional_insured_list || [];

        additionalInsuredList[dependentIndex] = {
          ...additionalInsuredList[dependentIndex],
          id: dependentIndex,
          date_of_birth: formatDate,
          age: calcAge,
        };
        setFormData({ ...formData, additional_insured_list: additionalInsuredList });
      } else {
        setFormData({ ...formData, [name]: formatDate, age: calcAge });
      }
    }
  };

  const calculateAge = (birthdate: string | Date) => {
    let birthDate = new Date(birthdate);

    if (isNaN(birthDate.getTime())) {
      return null;
    }

    let ageDifMs = Date.now() - birthDate.getTime();
    let ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  const formatId = additional && typeof id === 'number' ? name + '_' + (id + 1) : name;

  return (
    <ShadowDiv>
      <DateInputLabelContainer>
        <DateInputLabel htmlFor={formatId} className=''>
          {labelName}
          {required && <RequiredSpan />}
        </DateInputLabel>
        {value.startDate && userAge !== null && showAge && <AgeContainer>Age: {userAge}</AgeContainer>}
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
