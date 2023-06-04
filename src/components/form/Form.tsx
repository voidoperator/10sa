import React, { useState, useEffect, useRef } from 'react';
import tw from 'tailwind-styled-components';
import TextInput from './TextInput';
import RadioInput from './RadioInput';
import DropDownInput from './DropDownInput';
import TextAreaInput from './TextAreaInput';
import DateInput from './DateInput';
import { useFormData } from '../contexts/FormContext';
import { states } from '../../utility/utility';
// import type { FormDataType } from '../../types/formdata';

const Divider = tw.div`
  h-[1px] w-full bg-black/75 dark:bg-white/75 my-0 sm:my-10 hidden sm:block
`;

const Form = () => {
  const { formData } = useFormData();
  const [isLoading, setIsLoading] = useState(true);
  const [dependents, setDependents] = useState([{ name: '', dob: '' }]);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // console.log(formData);
  };

  const addDependent = () => {
    setDependents([...dependents, { name: '', dob: '' }]);
  };

  const removeDependent = (index: number) => {
    setDependents(dependents.filter((_, i) => i !== index));
  };

  if (isLoading)
    return (
      <div className='flex items-center justify-center min-h-screen py-20'>
        <div className='flex w-full max-w-4xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 items-center justify-center'>
          <div className='text-xl'>Loading...</div>
        </div>
      </div>
    );

  return (
    <div className='flex items-center justify-center min-h-screen py-20'>
      <div className='w-full max-w-4xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700'>
        {/* {JSON.stringify(formData)} */}
        <form className='space-y-6' onSubmit={(e) => handleSubmit(e)}>
          <>
            <h5 className='text-xl font-medium text-gray-900 dark:text-white'>Customer Details</h5>
            <TextInput labelName='First Name' placeholder='e.g. John' type='text' name='first_name' />
            <TextInput labelName='Last Name' placeholder='e.g. Doe' type='text' name='last_name' />
            <RadioInput
              labelName='Type of Plan'
              name='plan_type'
              options={[
                { label: 'Individual', value: 'individual' },
                { label: 'Family', value: 'family' },
              ]}
            />
            <DropDownInput labelName='State' name='state' defaultOption='Please select a state' options={states} />
            <TextInput
              labelName='Zip Code'
              placeholder='e.g. 12345'
              type='number'
              name='zip_code'
              pattern='/^\d{5}(-\d{4})?$/'
            />
            <TextAreaInput
              labelName='Why are they looking for coverage?'
              placeholder='Enter reason here'
              name='coverage_reason'
            />
          </>
          <Divider />
          <>
            <h5 className='text-xl font-medium text-gray-900 dark:text-white'>Customer Questionare</h5>
            <DateInput labelName='Date of Birth' name='date_of_birth' showAge={true} />
            <RadioInput
              labelName='Tobacco User?'
              name='tobacco_use'
              options={[
                { label: 'Yes', value: 'Yes' },
                { label: 'No', value: 'No' },
              ]}
            />
            <RadioInput
              labelName='Married?'
              name='married'
              options={[
                { label: 'Yes', value: 'Yes' },
                { label: 'No', value: 'No' },
              ]}
            />
            {formData.married === 'Yes' && (
              <>
                <div className='flex flex-col gap-4 px-6 py-5 border rounded-xl border-black/10 dark:border-white/10 w-full h-full'>
                  <TextInput
                    labelName='Spouse Full Name'
                    placeholder='e.g. Jane Doe'
                    type='text'
                    name='spouse_full_name'
                  />
                  <DateInput labelName="Spouse's Date of Birth" name='spouse_date_of_birth' showAge={true} />
                </div>
              </>
            )}
            <RadioInput
              labelName='Dependents? (declared on taxes)'
              name='dependents'
              options={[
                { label: 'Yes', value: 'Yes' },
                { label: 'No', value: 'No' },
              ]}
            />
            {formData.dependents === 'Yes' &&
              dependents.map((_, i) => (
                <div
                  key={`dependent_${i + 1}_info`}
                  className='flex relative flex-col gap-4 px-6 py-5 border rounded-xl border-black/10 dark:border-white/10 w-full h-full'
                >
                  <TextInput
                    labelName={`Dependent ${i + 1} Full Name`}
                    placeholder='e.g. Jane Doe'
                    type='text'
                    name={`dependent_${i + 1}_full_name`}
                  />
                  <DateInput
                    labelName={`Dependent ${i + 1} Date of Birth`}
                    name={`dependent_${i + 1}_date_of_birth`}
                    showAge={true}
                  />
                  <button
                    key={`dependent_${i + 1}_button`}
                    type='button'
                    className='w-6 absolute top-2 right-2 text-white fill-black dark:fill-white opacity-70 hover:opacity-100 transition-all'
                    onClick={() => removeDependent(i)}
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      clipRule='evenodd'
                      fillRule='evenodd'
                      strokeLinejoin='round'
                      strokeMiterlimit='2'
                      viewBox='0 0 24 24'
                    >
                      <path
                        xmlns='http://www.w3.org/2000/svg'
                        d='m12.002 2.005c5.518 0 9.998 4.48 9.998 9.997 0 5.518-4.48 9.998-9.998 9.998-5.517 0-9.997-4.48-9.997-9.998 0-5.517 4.48-9.997 9.997-9.997zm0 8.933-2.721-2.722c-.146-.146-.339-.219-.531-.219-.404 0-.75.324-.75.749 0 .193.073.384.219.531l2.722 2.722-2.728 2.728c-.147.147-.22.34-.22.531 0 .427.35.75.751.75.192 0 .384-.073.53-.219l2.728-2.728 2.729 2.728c.146.146.338.219.53.219.401 0 .75-.323.75-.75 0-.191-.073-.384-.22-.531l-2.727-2.728 2.717-2.717c.146-.147.219-.338.219-.531 0-.425-.346-.75-.75-.75-.192 0-.385.073-.531.22z'
                        fillRule='nonzero'
                      />
                    </svg>
                  </button>
                </div>
              ))}
            {formData.dependents === 'Yes' && (
              <div className='flex items-center justify-center gap-6'>
                <button
                  type='button'
                  onClick={addDependent}
                  className='mx-6 w-1/2 transition-all text-white bg-blue-700 shadow-xl hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                >
                  Add More Dependents
                </button>
              </div>
            )}
            <TextInput
              labelName='Annual household income'
              placeholder='e.g. $25,000'
              type='text'
              name='annual_household_income'
              pattern='^\$[0-9]{1,3}(?:,?[0-9]{3})*(?:\.[0-9]{2})?$'
              currency={true}
            />
            <RadioInput
              labelName='Pre-existing conditions?'
              name='pre_existing_conditions'
              options={[
                { label: 'Yes', value: 'Yes' },
                { label: 'No', value: 'No' },
              ]}
            />
            {formData.pre_existing_conditions === 'Yes' && (
              <TextInput
                labelName='Pre-existing conditions?'
                placeholder='e.g. Coronary Disease, Cancer, Lupus'
                type='text'
                name='pre_existing_conditions_list'
              />
            )}
            <RadioInput
              labelName='Specific medications?'
              name='medications'
              options={[
                { label: 'Yes', value: 'Yes' },
                { label: 'No', value: 'No' },
              ]}
            />
            {formData.medications === 'Yes' && (
              <TextInput
                labelName='Specific medications?'
                placeholder='e.g. Benazepril, Moexipril , Prozac'
                type='text'
                name='medications_list'
              />
            )}
            <TextAreaInput
              labelName='History of mental health, COPD, heart procedures, cancer, HIV?'
              placeholder='Enter history here'
              name='medical_history'
              required={false}
            />
            <RadioInput
              labelName='Preferred doctors?'
              name='preferred_doctors'
              options={[
                { label: 'Yes', value: 'Yes' },
                { label: 'No', value: 'No' },
              ]}
            />
            {formData.preferred_doctors === 'Yes' && (
              <TextInput
                labelName='Doctor Name'
                placeholder='e.g. Dr. Lino Fernandez'
                type='text'
                name='preferred_doctors_name'
              />
            )}
            <TextInput
              labelName='Monthly budget?'
              placeholder='e.g. $150'
              type='text'
              name='monthly_budget'
              pattern='^\$[0-9]{1,3}(?:,?[0-9]{3})*(?:\.[0-9]{2})?$'
              currency={true}
            />
          </>
          <Divider />
          <>
            <h5 className='text-xl font-medium text-gray-900 dark:text-white'>Quote Breakdown</h5>
            <TextInput labelName='Plan Name' placeholder='e.g. John' type='text' name='first_name' />
            <TextInput
              labelName='PCP Copay:'
              placeholder='e.g. $150'
              type='text'
              name='pcp_copay'
              pattern='^\$[0-9]{1,3}(?:,?[0-9]{3})*(?:\.[0-9]{2})?$'
              currency={true}
            />
            <TextInput
              labelName='Specialist Copay'
              placeholder='e.g. $150'
              type='text'
              name='specialist_copay'
              pattern='^\$[0-9]{1,3}(?:,?[0-9]{3})*(?:\.[0-9]{2})?$'
              currency={true}
            />
            <TextInput
              labelName='Generic Meds Copay'
              placeholder='e.g. $50'
              type='text'
              name='generic_meds_copay'
              pattern='^\$[0-9]{1,3}(?:,?[0-9]{3})*(?:\.[0-9]{2})?$'
              currency={true}
            />
            <TextInput
              labelName='Annual Deductible'
              placeholder='e.g. $1,500'
              type='text'
              name='annual_deductible'
              pattern='^\$[0-9]{1,3}(?:,?[0-9]{3})*(?:\.[0-9]{2})?$'
              currency={true}
            />
            <TextInput
              labelName='Max Out of Pocket'
              placeholder='e.g. $5,000'
              type='text'
              name='max_out_of_pocket'
              pattern='^\$[0-9]{1,3}(?:,?[0-9]{3})*(?:\.[0-9]{2})?$'
              currency={true}
            />
            <TextInput
              labelName='All Benefits'
              placeholder='e.g. $5,000'
              type='text'
              name='all_benefits'
              pattern='^\$[0-9]{1,3}(?:,?[0-9]{3})*(?:\.[0-9]{2})?$'
              currency={true}
            />
          </>
          <Divider />
          <>
            <h5 className='text-xl font-medium text-gray-900 dark:text-white'>Closure</h5>
            <TextInput
              labelName='Phone Number'
              placeholder='e.g. (786) 305-6789'
              type='tel'
              name='phone_number'
              pattern='^\(\d{3}\) \d{3}-\d{4}$'
              phone={true}
            />
            <DateInput labelName='Date of Birth' name='confirmed_date_of_birth' showAge={true} />
            <TextInput labelName='First Name' placeholder='e.g. John Doe' type='text' name='confirmed_full_name' />
            <TextInput
              labelName='Email'
              placeholder='e.g. johndoe@gmail.com'
              type='email'
              name='email'
              pattern='^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?$'
            />
            <TextInput
              labelName='Full Address'
              placeholder='e.g. 12345 NW 1st St, Miami, FL, 33186'
              type='text'
              name='address'
            />
            <TextInput
              labelName='Height'
              placeholder="e.g. 5'11"
              type='text'
              name='height'
              pattern="^\\d{1,2}'(?:1[0-2]|0?[1-9])$"
              height={true}
            />
            <TextInput
              labelName='Weight'
              placeholder='e.g. 150 lbs'
              type='text'
              name='weight'
              pattern='^\d+(\.\d+)? lbs$'
              weight={true}
            />
            <TextInput
              labelName='Social Security Number'
              placeholder='e.g. 123-45-6789'
              type='text'
              name='ssn'
              pattern='^\d{3}-\d{2}-\d{4}$'
              socialSecurity={true}
            />
          </>
          <Divider />
          <>
            <h5 className='text-xl font-medium text-gray-900 dark:text-white'>Disclosure</h5>
            <TextInput
              labelName='Monthly Total'
              placeholder='e.g. $100'
              type='text'
              name='monthly_total'
              pattern='^\$[0-9]{1,3}(?:,?[0-9]{3})*(?:\.[0-9]{2})?$'
              currency={true}
            />
            <TextInput
              labelName='Health Unsubsidized'
              placeholder='e.g. $1,000'
              type='text'
              name='health_unsubsidized'
              pattern='^\$[0-9]{1,3}(?:,?[0-9]{3})*(?:\.[0-9]{2})?$'
              currency={true}
            />
            <TextInput
              labelName='CIGNA Dental'
              placeholder='e.g. $100'
              type='text'
              name='cigna_dental'
              pattern='^\$[0-9]{1,3}(?:,?[0-9]{3})*(?:\.[0-9]{2})?$'
              required={false}
              currency={true}
            />
            <TextInput
              labelName='Americo Death Benefit'
              placeholder='e.g. $50,000'
              type='text'
              name='americo_death_benefit'
              pattern='^\$[0-9]{1,3}(?:,?[0-9]{3})*(?:\.[0-9]{2})?$'
              currency={true}
            />
          </>
          <Divider />
          <>
            <h5 className='text-xl font-medium text-gray-900 dark:text-white'>Totals</h5>
            <TextInput
              labelName='Total Pre-Subsidy'
              placeholder='e.g. $50,000'
              type='text'
              name='total_pre_subsidy'
              pattern='^\$[0-9]{1,3}(?:,?[0-9]{3})*(?:\.[0-9]{2})?$'
              currency={true}
            />
            <TextInput
              labelName='Qualified Subsidy'
              placeholder='e.g. $50,000'
              type='text'
              name='qualified_subsidy'
              pattern='^\$[0-9]{1,3}(?:,?[0-9]{3})*(?:\.[0-9]{2})?$'
              currency={true}
            />
            <TextInput
              labelName='Total Post-Subsidy'
              placeholder='e.g. $50,000'
              type='text'
              name='total_post_subsidy'
              pattern='^\$[0-9]{1,3}(?:,?[0-9]{3})*(?:\.[0-9]{2})?$'
              currency={true}
            />
          </>
          <Divider />
          <button
            type='submit'
            className='w-full transition-all text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;
