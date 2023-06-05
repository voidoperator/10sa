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
        <form className='space-y-6' autoComplete='off' autoCapitalize='on'>
          <>
            <h5 className='text-xl font-medium text-gray-900 dark:text-white'>Customer Details</h5>
            <TextInput labelName='First Name' name='first_name' id='first_name' placeholder='e.g. John' type='text' />
            <TextInput labelName='Last Name' name='last_name' id='last_name' placeholder='e.g. Doe' type='text' />
            <RadioInput
              labelName='Type of Plan'
              name='plan_type'
              id='plan_type'
              options={[
                { label: 'Individual', value: 'individual' },
                { label: 'Family', value: 'family' },
              ]}
            />
            <RadioInput
              labelName='Current insurance?'
              name='current_insurance'
              id='current_insurance'
              options={[
                { label: 'Yes', value: 'yes' },
                { label: 'No', value: 'no' },
              ]}
            />
            <DropDownInput
              labelName='State'
              name='state'
              id='state'
              defaultOption='Please select a state'
              options={states}
            />
            <TextInput
              labelName='Zip Code'
              name='zip_code'
              id='zip_code'
              placeholder='e.g. 12345'
              type='number'
              pattern='/^\d{5}(-\d{4})?$/'
            />
            <TextAreaInput
              labelName='Why are they looking for coverage?'
              name='coverage_reason'
              id='coverage_reason'
              placeholder='Enter reason here'
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
              id='tobacco_use'
              options={[
                { label: 'Yes', value: 'yes' },
                { label: 'No', value: 'no' },
              ]}
            />
            <RadioInput
              labelName='Married?'
              name='married'
              id='married'
              options={[
                { label: 'Yes', value: 'yes' },
                { label: 'No', value: 'no' },
              ]}
            />
            <RadioInput
              labelName='Taxes filing status?'
              name='taxes_filing_status'
              id='taxes_filing_status'
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
              name='household_size'
              id='household_size'
              placeholder='e.g. 4'
              type='number'
              pattern='/^\d{9}$/'
            />
            <RadioInput
              labelName='Additional insured/dependents? (part of household)'
              name='additional_insured'
              id='additional_insured'
              options={[
                { label: 'Yes', value: 'yes' },
                { label: 'No', value: 'no' },
              ]}
            />
            {formData.additional_insured === 'yes' &&
              formData.additional_insured_list?.map((dependent, i) => {
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
                      name='full_name'
                      id={'full_name_' + i}
                      placeholder='e.g. Jane Doe'
                      type='text'
                      additional={true}
                    />
                    <TextInput
                      labelName={`Dependent ${i + 1} Relationship`}
                      name='relationship'
                      id={'relationship_' + i}
                      placeholder='e.g. Son, Daughter, Husband, Wife'
                      type='text'
                      additional={true}
                    />
                    <DateInput labelName={`Dependent ${i + 1} Date of Birth`} name='date_of_birth' additional={true} />
                    <TextInput
                      labelName={`Dependent ${i + 1} Social Security Number`}
                      name='ssn'
                      id={'ssn_' + i}
                      placeholder='e.g. 123-45-6789'
                      type='text'
                      pattern='^\d{3}-\d{2}-\d{4}$'
                      socialSecurity={true}
                      additional={true}
                    />
                    <TextInput
                      labelName={`Dependent ${i + 1} State ID Number`}
                      name='driver_license'
                      id={'driver_license_' + i}
                      placeholder='e.g. L12-123-12-123-0'
                      type='text'
                      pattern='^[A-Za-z]\d{2}-\d{3}-\d{2}-\d{3}-\d$'
                      driverLicense={true}
                      required={false}
                      additional={true}
                    />
                    {formData.additional_insured_list?.[i] && formData.additional_insured_list[i].age >= 18 && (
                      <>
                        <TextInput
                          labelName={`Dependent ${i + 1} Height`}
                          name='height'
                          id={'height_' + i}
                          placeholder="e.g. 5'11"
                          type='text'
                          pattern="^\\d{1,2}'(?:1[0-2]|0?[1-9])$"
                          height={true}
                          additional={true}
                        />
                        <TextInput
                          labelName={`Dependent ${i + 1} Weight`}
                          name='weight'
                          id={'weight_' + i}
                          placeholder='e.g. 150 (lbs.)'
                          type='text'
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
              name='annual_household_income'
              id='annual_household_income'
              placeholder='e.g. $25,000'
              type='text'
              pattern='^\$[0-9]{1,3}(?:,?[0-9]{3})*(?:\.[0-9]{2})?$'
              currency={true}
            />
            <RadioInput
              labelName='Pre-existing conditions?'
              name='pre_existing_conditions'
              id='pre_existing_conditions'
              options={[
                { label: 'Yes', value: 'yes' },
                { label: 'No', value: 'no' },
              ]}
            />
            {formData.pre_existing_conditions === 'yes' && (
              <TextInput
                labelName='Pre-existing conditions?'
                name='pre_existing_conditions_list'
                id='pre_existing_conditions_list'
                placeholder='e.g. Coronary Disease, Cancer, Lupus'
                type='text'
              />
            )}
            <RadioInput
              labelName='Specific medications?'
              name='medications'
              id='medications'
              options={[
                { label: 'Yes', value: 'yes' },
                { label: 'No', value: 'no' },
              ]}
            />
            {formData.medications === 'yes' && (
              <TextInput
                labelName='Specific medications?'
                name='medications_list'
                id='medications_list'
                placeholder='e.g. Benazepril, Moexipril , Prozac'
                type='text'
              />
            )}
            <TextAreaInput
              labelName='History of mental health, COPD, heart procedures, cancer, HIV?'
              name='medical_history'
              id='medical_history'
              placeholder='Enter history here'
              required={false}
            />
            <RadioInput
              labelName='Preferred doctors?'
              name='preferred_doctors'
              id='preferred_doctors'
              options={[
                { label: 'Yes', value: 'yes' },
                { label: 'No', value: 'no' },
              ]}
            />
            {formData.preferred_doctors === 'yes' && (
              <TextInput
                labelName='Doctor Name'
                name='preferred_doctors_name'
                id='preferred_doctors_name'
                placeholder='e.g. Dr. Lino Fernandez'
                type='text'
              />
            )}
            <TextInput
              labelName='Monthly budget?'
              name='monthly_budget'
              id='monthly_budget'
              placeholder='e.g. $150'
              type='text'
              pattern='^\$[0-9]{1,3}(?:,?[0-9]{3})*(?:\.[0-9]{2})?$'
              currency={true}
            />
          </>
          <Divider />
          <>
            <h5 className='text-xl font-medium text-gray-900 dark:text-white'>Quote Breakdown</h5>
            <TextInput
              labelName='Plan Name'
              name='plan_name'
              id='plan_name'
              placeholder='e.g. Florida Blue'
              type='text'
            />
            <TextInput
              labelName='PCP Copay:'
              name='pcp_copay'
              id='pcp_copay'
              placeholder='e.g. $150'
              type='text'
              pattern='^\$[0-9]{1,3}(?:,?[0-9]{3})*(?:\.[0-9]{2})?$'
              currency={true}
            />
            <TextInput
              labelName='Specialist Copay'
              name='specialist_copay'
              id='specialist_copay'
              placeholder='e.g. $150'
              type='text'
              pattern='^\$[0-9]{1,3}(?:,?[0-9]{3})*(?:\.[0-9]{2})?$'
              currency={true}
            />
            <TextInput
              labelName='Generic Meds Copay'
              name='generic_meds_copay'
              id='generic_meds_copay'
              placeholder='e.g. $50'
              type='text'
              pattern='^\$[0-9]{1,3}(?:,?[0-9]{3})*(?:\.[0-9]{2})?$'
              currency={true}
            />
            <TextInput
              labelName='Annual Deductible'
              name='annual_deductible'
              id='annual_deductible'
              placeholder='e.g. $1,500'
              type='text'
              pattern='^\$[0-9]{1,3}(?:,?[0-9]{3})*(?:\.[0-9]{2})?$'
              currency={true}
            />
            <TextInput
              labelName='Max Out of Pocket'
              name='max_out_of_pocket'
              id='max_out_of_pocket'
              placeholder='e.g. $5,000'
              type='text'
              pattern='^\$[0-9]{1,3}(?:,?[0-9]{3})*(?:\.[0-9]{2})?$'
              currency={true}
            />
            <TextInput
              labelName='All Benefits'
              name='all_benefits'
              id='all_benefits'
              placeholder='e.g. $5,000'
              type='text'
              pattern='^\$[0-9]{1,3}(?:,?[0-9]{3})*(?:\.[0-9]{2})?$'
              currency={true}
            />
          </>
          <Divider />
          <>
            <h5 className='text-xl font-medium text-gray-900 dark:text-white'>Closure</h5>
            <TextInput
              labelName='Phone Number'
              name='phone_number'
              id='phone_number'
              placeholder='e.g. 786-305-6789'
              type='tel'
              pattern='^\d{3}-\d{3}-\d{4}$'
              phone={true}
            />
            <DateInput labelName='CONFIRM Date of Birth' name='confirmed_date_of_birth' />
            <TextInput
              labelName='CONFIRM Full Name'
              name='confirmed_full_name'
              id='confirmed_full_name'
              placeholder='e.g. John Doe'
              type='text'
            />
            <TextInput
              labelName='Email'
              name='email'
              id='email'
              placeholder='e.g. johndoe@gmail.com'
              type='email'
              pattern='^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?$'
            />
            <TextInput
              labelName='Street Address (no P.O. boxes)'
              name='street_address'
              id='street_address'
              placeholder='e.g. 12345 NW 1st St, Miami, FL, 33186'
              type='text'
            />
            <TextInput labelName='City' name='city' id='city' placeholder='e.g. Miami' type='text' />
            <TextInput
              labelName='CONFIRM State'
              name='confirmed_state'
              id='confirmed_state'
              placeholder='e.g. Florida'
              type='text'
            />
            <TextInput
              labelName='CONFIRM Zip Code'
              name='confirmed_zip_code'
              id='confirmed_zip_code'
              placeholder='e.g. 33193'
              type='text'
            />
            <TextInput
              labelName='Height'
              name='height'
              id='height'
              placeholder="e.g. 5'11"
              type='text'
              pattern="^\\d{1,2}'(?:1[0-2]|0?[1-9])$"
              height={true}
            />
            <TextInput
              labelName='Weight'
              name='weight'
              id='weight'
              placeholder='e.g. 150 lbs'
              type='text'
              pattern='^\d+(\.\d+)? lbs$'
              weight={true}
            />
            <TextInput
              labelName='Social Security Number'
              name='ssn'
              id='ssn'
              placeholder='e.g. 123-45-6789'
              type='text'
              pattern='^\d{3}-\d{2}-\d{4}$'
              socialSecurity={true}
            />
          </>
          <Divider />
          <>
            <h5 className='text-xl font-medium text-gray-900 dark:text-white'>Disclosure</h5>
            <TextInput
              labelName='Monthly Total'
              name='monthly_total'
              id='monthly_total'
              placeholder='e.g. $100'
              type='text'
              pattern='^\$[0-9]{1,3}(?:,?[0-9]{3})*(?:\.[0-9]{2})?$'
              currency={true}
            />
            <TextInput
              labelName='Health Unsubsidized'
              name='health_unsubsidized'
              id='health_unsubsidized'
              placeholder='e.g. $1,000'
              type='text'
              pattern='^\$[0-9]{1,3}(?:,?[0-9]{3})*(?:\.[0-9]{2})?$'
              currency={true}
            />
            <TextInput
              labelName='CIGNA Dental'
              name='cigna_dental'
              id='cigna_dental'
              placeholder='e.g. $100'
              type='text'
              pattern='^\$[0-9]{1,3}(?:,?[0-9]{3})*(?:\.[0-9]{2})?$'
              required={false}
              currency={true}
            />
            <TextInput
              labelName='Americo Death Benefit'
              name='americo_death_benefit'
              id='americo_death_benefit'
              placeholder='e.g. $50,000'
              type='text'
              pattern='^\$[0-9]{1,3}(?:,?[0-9]{3})*(?:\.[0-9]{2})?$'
              currency={true}
            />
          </>
          <Divider />
          <>
            <h5 className='text-xl font-medium text-gray-900 dark:text-white'>Totals</h5>
            <TextInput
              labelName='Total Pre-Subsidy'
              name='total_pre_subsidy'
              id='total_pre_subsidy'
              placeholder='e.g. $50,000'
              type='text'
              pattern='^\$[0-9]{1,3}(?:,?[0-9]{3})*(?:\.[0-9]{2})?$'
              currency={true}
            />
            <TextInput
              labelName='Qualified Subsidy'
              name='qualified_subsidy'
              id='qualified_subsidy'
              placeholder='e.g. $50,000'
              type='text'
              pattern='^\$[0-9]{1,3}(?:,?[0-9]{3})*(?:\.[0-9]{2})?$'
              currency={true}
            />
            <TextInput
              labelName='Total Post-Subsidy'
              name='total_post_subsidy'
              id='total_post_subsidy'
              placeholder='e.g. $50,000'
              type='text'
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
              id='checking_or_savings'
              options={[
                { label: 'Checking', value: 'checking' },
                { label: 'Savings', value: 'savings' },
              ]}
            />
            <TextInput
              labelName='Routing Number'
              name='routing_number'
              id='routing_number'
              placeholder='e.g. 123456789'
              type='text'
              pattern=''
              routingNumber={true}
            />
            <TextInput
              labelName='Account Number'
              name='account_number'
              id='account_number'
              placeholder='e.g. 123456789012'
              type='text'
              pattern=''
              accountNumber={true}
            />
            <TextInput
              labelName='Name of Account Holder'
              name='name_of_account_holder'
              id='name_of_account_holder'
              placeholder='e.g. John Doe'
              type='text'
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
