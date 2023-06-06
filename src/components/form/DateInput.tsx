import React, { useState } from 'react';
import Datepicker from 'react-tailwindcss-datepicker';
import { useFormData } from '../contexts/FormContext';
import type { DateValueType } from 'react-tailwindcss-datepicker/dist/types';
import type { DateInputProps, DateValue } from '../../types/formData';

const DateInput: React.FC<DateInputProps> = ({
  labelName,
  name,
  id,
  showAge = true,
  required = true,
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

      if (additional) {
        const dependentIndex = parseInt(labelName.split(' ')[1]) - 1;

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

  return (
    <div>
      <div className='inline-flex justify-between w-full'>
        <label htmlFor={id} className='inline-flex items-center mb-2 text-sm font-medium text-gray-900 dark:text-white'>
          {labelName}
          {required && <span className='ml-1 after:content-["*"] after:text-gray-900 after:dark:text-gray-300' />}
        </label>
        {value.startDate && userAge !== null && showAge && (
          <p className='text-sm text-gray-900 dark:text-white font-bold'>Age: {userAge}</p>
        )}
      </div>
      <Datepicker
        inputId={id}
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
          'w-full border text-sm rounded-lg bg-[#503158] border-[#bda472]/40 placeholder-gray-400 text-white'
        }
      />
    </div>
  );
};

export default DateInput;
