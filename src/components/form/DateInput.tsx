import React, { useState } from 'react';
import Datepicker from 'react-tailwindcss-datepicker';
import { useFormData } from '../contexts/FormContext';
import type { DateValueType } from 'react-tailwindcss-datepicker/dist/types';
import type { DateInputProps, DateValue } from '../../types/formData';

const DateInput: React.FC<DateInputProps> = ({
  id,
  labelName,
  name,
  showAge = true,
  required = false,
  additional = false,
}) => {
  const { formData, setFormData } = useFormData();
  const [userAge, setUserAge] = useState<number>(0);
  const [value, setValue] = useState<DateValue>({
    startDate: null,
    endDate: null,
  });

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
    <div>
      <div className='inline-flex justify-between w-full'>
        <label htmlFor={formatId} className='inline-flex items-center mb-2 text-sm font-medium text-white'>
          {labelName}
          {required && <span className='ml-1 after:content-["*"] after:text-gray-900' />}
        </label>
        {value.startDate && userAge !== null && showAge && (
          <p className='text-sm text-white font-bold'>Age: {userAge}</p>
        )}
      </div>
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
        inputClassName={
          'form-input w-full border text-sm rounded-lg bg-10sa-deep-purple border-10sa-gold/40 placeholder-gray-400 text-white'
        }
      />
    </div>
  );
};

export default DateInput;
