import React, { useState, useEffect, useRef } from 'react';
import tw from 'tailwind-styled-components';
import TextInput from './TextInput';
import RadioInput from './RadioInput';
import DropDownInput from './DropDownInput';
import TextAreaInput from './TextAreaInput';
import DateInput from './DateInput';
import { useFormData } from '../contexts/FormContext';
import { states } from '../../utility/utility';
import { MutualOfOmahaIcon } from '../icons/MutualOfOmahaIcon';
import { AmericoIcon } from '../icons/AmericoIcon';
import { CloseIcon } from '../icons/CloseIcon';

const Divider = tw.div`
  h-[1px] w-full bg-black/75 dark:bg-white/75 my-0 sm:my-10 hidden sm:block
`;

const initialDependentState = {
  id: 0,
  full_name: '',
  date_of_birth: '',
  relationship: '',
  age: 0,
  ssn: '',
};

const Form = () => {
  const { formData, setFormData } = useFormData();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (formData.married === 'no') {
      setFormData({ ...formData, taxes_filing_status: 'single' });
    }
  }, [formData.married, setFormData]);

  useEffect(() => {
    if (
      formData.additional_insured === 'yes' &&
      (!formData.additional_insured_list || formData.additional_insured_list.length === 0)
    ) {
      setFormData({
        ...formData,
        additional_insured_list: [initialDependentState],
      });
    }
  }, [formData.additional_insured]);

  const handleHouseholdCheck = () => {
    const { household_size } = formData;
    if (Number(household_size) <= (formData.additional_insured_list?.length ?? 0) + 1) {
      return true;
    }
    return false;
  };

  const addDependent = () => {
    if (!handleHouseholdCheck()) {
      const newDependent = { ...initialDependentState, id: formData.additional_insured_list.length };
      setFormData({
        ...formData,
        additional_insured_list: [...formData.additional_insured_list, newDependent],
      });
    }
  };

  const removeDependent = (index: number) => {
    setFormData({
      ...formData,
      additional_insured_list: formData.additional_insured_list.filter((_, i) => i !== index),
    });
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
        {JSON.stringify(formData)}
        <br />
        <br />
        <form className='space-y-6'>
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
            <RadioInput
              labelName='Current insurance?'
              name='current_insurance'
              options={[
                { label: 'Yes', value: 'yes' },
                { label: 'No', value: 'no' },
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
              required={false}
            />
          </>
          <Divider />
          <>
            <h5 className='text-xl font-medium text-gray-900 dark:text-white'>Customer Questionare</h5>
            <DateInput labelName='Date of Birth' name='date_of_birth' />
            <RadioInput
              labelName='Tobacco User?'
              name='tobacco_use'
              options={[
                { label: 'Yes', value: 'yes' },
                { label: 'No', value: 'no' },
              ]}
            />
            <RadioInput
              labelName='Married?'
              name='married'
              options={[
                { label: 'Yes', value: 'yes' },
                { label: 'No', value: 'no' },
              ]}
            />
            <RadioInput
              labelName='Taxes filing status?'
              name='taxes_filing_status'
              rowOrCol='col'
              value={formData.taxes_filing_status}
              options={[
                { label: 'Single', value: 'single' },
                { label: 'Married filing jointly', value: 'married_filing_jointly' },
                { label: 'Married filing separately', value: 'married_filing_separately' },
                { label: 'Head of household', value: 'head_of_household' },
                {
                  label: 'Qualifying widow(er) with dependent child',
                  value: 'qualifying_widow(er)_with_dependent_child',
                },
              ]}
            />
            <TextInput
              labelName='Household size?'
              placeholder='e.g. 4'
              type='number'
              name='household_size'
              pattern='/^\d{9}$/'
            />
            <RadioInput
              labelName='Additional insured/dependents? (part of household)'
              name='additional_insured'
              options={[
                { label: 'Yes', value: 'yes' },
                { label: 'No', value: 'no' },
              ]}
            />
            {formData.additional_insured === 'yes' &&
              formData.additional_insured_list?.map((dependent, i) => {
                console.log(dependent.age);
                return (
                  <div
                    key={`dependent_${i + 1}_info`}
                    className='flex relative flex-col gap-4 px-6 py-5 border rounded-xl border-black/10 dark:border-white/10 w-full h-full'
                  >
                    {dependent.age >= 18 && dependent.age <= 19 && (
                      <div className='flex items-center justify-center text-black dark:text-white'>
                        <MutualOfOmahaIcon twClasses={'h-10'} />
                      </div>
                    )}
                    {dependent.age >= 20 && (
                      <div className='flex items-center justify-center text-black dark:text-white'>
                        <AmericoIcon twClasses={'h-10'} />
                      </div>
                    )}
                    <TextInput
                      labelName={`Dependent ${i + 1} Full Name`}
                      placeholder='e.g. Jane Doe'
                      type='text'
                      name='full_name'
                      additional={true}
                    />
                    <TextInput
                      labelName={`Dependent ${i + 1} Relationship`}
                      placeholder='e.g. Son, Daughter, Husband, Wife'
                      type='text'
                      name='relationship'
                      additional={true}
                    />
                    <DateInput labelName={`Dependent ${i + 1} Date of Birth`} name='date_of_birth' additional={true} />
                    <TextInput
                      labelName={`Dependent ${i + 1} Social Security Number`}
                      placeholder='e.g. 123-45-6789'
                      type='text'
                      name='ssn'
                      pattern='^\d{3}-\d{2}-\d{4}$'
                      socialSecurity={true}
                      additional={true}
                    />
                    <TextInput
                      labelName={`Dependent ${i + 1} State ID Number`}
                      placeholder='e.g. L12-123-12-123-0'
                      type='text'
                      name='ssn'
                      pattern='^[A-Za-z]\d{2}-\d{3}-\d{2}-\d{3}-\d$'
                      driverLicense={true}
                      required={false}
                      additional={true}
                    />
                    {formData.additional_insured_list?.[i] && formData.additional_insured_list[i].age >= 18 && (
                      <>
                        <TextInput
                          labelName={`Dependent ${i + 1} Height`}
                          placeholder="e.g. 5'11"
                          type='text'
                          name='height'
                          pattern="^\\d{1,2}'(?:1[0-2]|0?[1-9])$"
                          height={true}
                          additional={true}
                        />
                        <TextInput
                          labelName={`Dependent ${i + 1} Weight`}
                          placeholder='e.g. 150 (lbs.)'
                          type='text'
                          name='weight'
                          pattern='^\d{1,3}(?:\.\d)?$'
                          weight={true}
                          additional={true}
                        />
                      </>
                    )}
                    <button
                      key={`dependent_${i + 1}_button`}
                      type='button'
                      className='w-6 absolute top-2 right-2  opacity-70 hover:opacity-100 transition-all'
                      onClick={() => removeDependent(i)}
                    >
                      <CloseIcon twClasses='text-black fill-black dark:text-white dark:fill-white' />
                    </button>
                  </div>
                );
              })}
            {formData.additional_insured === 'yes' && (
              <div className='flex items-center justify-center gap-6'>
                <button
                  disabled={handleHouseholdCheck()}
                  type='button'
                  onClick={addDependent}
                  className='mx-6 w-1/2 transition-all text-white disabled:bg-gray-400 disabled:hover:bg-gray-400 disabled:cursor-not-allowed bg-blue-700 shadow-xl hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                >
                  Add More Dependents
                </button>
              </div>
            )}
            <TextInput
              labelName='Annual household NET income? (after taxes)'
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
                { label: 'Yes', value: 'yes' },
                { label: 'No', value: 'no' },
              ]}
            />
            {formData.pre_existing_conditions === 'yes' && (
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
                { label: 'Yes', value: 'yes' },
                { label: 'No', value: 'no' },
              ]}
            />
            {formData.medications === 'yes' && (
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
                { label: 'Yes', value: 'yes' },
                { label: 'No', value: 'no' },
              ]}
            />
            {formData.preferred_doctors === 'yes' && (
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
              placeholder='e.g. 786-305-6789'
              type='tel'
              name='phone_number'
              pattern='^\d{3}-\d{3}-\d{4}$'
              phone={true}
            />
            <DateInput labelName='Date of Birth' name='confirmed_date_of_birth' />
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
          <>
            <h5 className='text-xl font-medium text-gray-900 dark:text-white'>Payment Method</h5>
            <RadioInput
              labelName='Checking or savings?'
              name='checking_or_savings'
              options={[
                { label: 'Checking', value: 'checking' },
                { label: 'Savings', value: 'savings' },
              ]}
            />
            <TextInput
              labelName='Routing Number'
              placeholder='e.g. 123456789'
              type='text'
              name='routing_number'
              pattern=''
              routingNumber={true}
            />
            <TextInput
              labelName='Account Number'
              placeholder='e.g. 123456789012'
              type='text'
              name='account_number'
              pattern=''
              accountNumber={true}
            />
            <TextInput
              labelName='Name of Account Holder'
              placeholder='e.g. John Doe'
              type='text'
              name='name_of_account_holder'
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
