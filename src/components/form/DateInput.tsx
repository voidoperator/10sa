import React, { useState } from 'react';
import Datepicker from 'react-tailwindcss-datepicker';
import type { DateValueType } from 'react-tailwindcss-datepicker/dist/types';

type DateInputProps = {
  labelName: string;
  name: string;
  showAge?: boolean;
  required?: boolean;
};

type DateValue = {
  startDate: Date | null;
  endDate: Date | null;
};

const DateInput: React.FC<DateInputProps> = ({ labelName, name, showAge = false, required = true }) => {
  const [age, setAge] = useState<number | null>(null);
  const [value, setValue] = useState<DateValue>({
    startDate: null,
    endDate: null,
  });

  const handleValueChange = (newDate: DateValueType, e?: HTMLInputElement | null) => {
    if (newDate === null) {
      setValue({ startDate: null, endDate: null });
      setAge(null);
    } else if (typeof newDate === 'object' && newDate.hasOwnProperty('startDate')) {
      setValue(newDate as DateValue);
      // Calculate age
      const { startDate } = newDate;
      const age = calculateAge(startDate as Date);
      setAge(age);
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
        <label
          htmlFor={name}
          className='inline-flex items-center mb-2 text-sm font-medium text-gray-900 dark:text-white'
        >
          {labelName}
          {required && <span className='ml-1 after:content-["*"] after:text-gray-900 after:dark:text-gray-300' />}
        </label>
        {value.startDate && age !== null && showAge && (
          <p className='text-sm text-gray-900 dark:text-white font-bold'>Age: {age}</p>
        )}
      </div>
      <Datepicker
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
          'w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'
        }
      />
    </div>
  );
};

export default DateInput;
