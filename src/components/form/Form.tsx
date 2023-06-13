import React, { useState, useEffect, useRef } from 'react';
import tw from 'tailwind-styled-components';
import TextInput from './TextInput';
import RadioInput from './RadioInput';
import DropDownInput from './DropDownInput';
import TextAreaInput from './TextAreaInput';
import DateInput from './DateInput';
import DetailConfirmation from './DetailConfirmation';
import SelectCreateable from './SelectCreateable';
import { useFormData } from '../contexts/FormContext';
import { TenStepsAheadLogo } from '../icons/TenStepsAheadLogo';
import { getZipcodeData, ZipcodeDataType } from '../../utility/getZipcodeData';
import { unitedStates, countries, occupations, preferredCarriers } from '../../utility/staticData';
import { toTitleCase } from '../../utility/utility';
import { MutualOfOmahaIcon } from '../icons/MutualOfOmahaIcon';
import { AmericoIcon } from '../icons/AmericoIcon';
import { CloseIcon } from '../icons/CloseIcon';
import { IneligibleIcon } from '../icons/IneligebleIcon';
import { Carrier, PreferredCarriers } from '../../types/formData';

const Divider = tw.div`
  h-[1px] w-full bg-10sa-gold/75 my-0 sm:my-10 hidden sm:block
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
  const [formDataBackup, setFormDataBackup] = useState({ ...formData });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [successful, setSuccessful] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [carriersData, setCarriersData] = useState<Carrier[]>([]);
  const [zipcodeData, setZipcodeData] = useState<ZipcodeDataType | undefined>(undefined);

  useEffect(() => {
    const savedFormData = localStorage.getItem('formData');
    const googleKeyUrl = localStorage.getItem('google_app_url');
    if (savedFormData) {
      setFormData(JSON.parse(savedFormData));
    }
    if (googleKeyUrl) {
      setTimeout(() => {
        setFormData({ ...formData, google_app_url: googleKeyUrl });
      }, 500);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('formData', JSON.stringify(formData));
  }, [formData]);

  useEffect(() => {
    if (formData.google_app_url) {
      localStorage.setItem('google_app_url', formData.google_app_url);
    }
  }, [formData.google_app_url]);

  useEffect(() => {
    const applyingForCoverage =
      1 + (formData.additional_insured_list?.length ? formData.additional_insured_list.length : 0);
    setFormData({ ...formData, applying_for_coverage: applyingForCoverage });
  }, [formData.additional_insured, formData.additional_insured_list]);

  useEffect(() => {
    if (formData.married === 'no') {
      setFormData({ ...formData, taxes_filing_status: 'single' });
    }
  }, [formData.married]);

  useEffect(() => {
    if (
      formData.additional_insured === 'yes' &&
      (!formData.additional_insured_list || formData.additional_insured_list.length === 0)
    ) {
      setFormData({
        ...formData,
        additional_insured_list: [initialDependentState],
      });
    } else {
      setFormData({ ...formData, additional_insured_list: [] });
    }
  }, [formData.additional_insured]);

  useEffect(() => {
    const { zip_code } = formData;
    if (!zip_code || zip_code.length < 5) return;
    if (zip_code && zip_code.length === 5) {
      const zipcodeLookupData = getZipcodeData(zip_code);
      if (zipcodeLookupData) {
        setZipcodeData(zipcodeLookupData);
        setCarriersData(preferredCarriers[zipcodeLookupData.state]);
      }
    }
  }, [formData.zip_code]);

  useEffect(() => {
    if (!zipcodeData || !carriersData) return;
    setFormData({
      ...formData,
      county: zipcodeData.county,
      state: zipcodeData.state,
      city: zipcodeData.primary_city,
      carriers: carriersData,
    });
  }, [zipcodeData, carriersData]);

  useEffect(() => {
    const { life_adb_provider } = formData;
    if (!life_adb_provider) return;
    if (life_adb_provider === 'mutual') {
      const newFormData = { ...formData };
      delete newFormData.americo_premium;
      setFormData({ ...newFormData });
    }
    if (life_adb_provider === 'americo') {
      const newFormData = { ...formData };
      delete newFormData.mutual_quote_gender;
      delete newFormData.mutual_face_amount;
      setFormData({ ...newFormData });
    }
  }, [formData.life_adb_provider, formData.americo_premium, formData.mutual_face_amount, formData.mutual_quote_gender]);

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

  const handleCopyToClipboard = () => {
    if (!formData) return;
    const formatFormData = { ...formData };
    delete formatFormData.google_app_url;
    delete formatFormData.carriers;
    navigator.clipboard
      .writeText(JSON.stringify(formatFormData))
      .then(() => {
        console.log('Copied form data to clipboard');
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
        }, 4000);
      })
      .catch((err) => console.log(`Could not copy text: ${err}`));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.google_app_url) return;
    setFormDataBackup({ ...formData });
    setIsSubmitting(true);
    const baseUrl = formData.google_app_url;
    const formatFormData = { ...formData };
    delete formatFormData.google_app_url;
    delete formatFormData.carriers;
    try {
      const response = await fetch(baseUrl, {
        method: 'POST',
        body: JSON.stringify(formatFormData),
      });
      if (response.ok) {
        setIsSubmitting(false);
        setSuccessful(true);
        handleCopyToClipboard();
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    } catch (error: any) {
      setErrorMessage(error);
      setIsSubmitting(false);
      setError(true);
      setTimeout(() => {
        setErrorMessage('');
        setError(false);
      }, 2000);
      setFormData({ ...formDataBackup });
    }
  };

  if (isSubmitting)
    return (
      <div className='flex items-center justify-center min-h-screen py-20'>
        <div className='flex w-full max-w-4xl p-4 border rounded-lg shadow sm:p-6 md:p-8 bg-10sa-purple border-10sa-gold/40 items-center justify-center'>
          <div className='text-xl'>Posting to Google Sheets...</div>
        </div>
      </div>
    );

  if (successful)
    return (
      <div className='flex items-center justify-center min-h-screen py-20'>
        <div className='flex w-full max-w-4xl p-4 border rounded-lg shadow sm:p-6 md:p-8 bg-10sa-purple border-10sa-gold/40 items-center justify-center'>
          <div className='text-xl'>Successfully posted to Google!</div>
        </div>
      </div>
    );

  if (error && errorMessage)
    return (
      <div className='flex items-center justify-center min-h-screen py-20'>
        <div className='flex w-full max-w-4xl p-4 border rounded-lg shadow sm:p-6 md:p-8 bg-10sa-purple border-10sa-gold/40 items-center justify-center'>
          <div className='text-xl'>There was an error:</div>
          <div className='text-xl'>{error}</div>
        </div>
      </div>
    );

  if (!isSubmitting && !successful && !error)
    return (
      <>
        <section className='4xl:max-w-4xl 3xl:max-w-3xl xl:max-w-xl lg:max-w-lg w-full p-4 bg-10sa-purple border border-10sa-gold/25 rounded-lg shadow sm:p-6 md:p-8 my-20'>
          <div className='flex items-center justify-center '>
            <TenStepsAheadLogo twClasses='w-full 4xl:max-w-4xl 3xl:max-w-3xl 2xl:max-w-3xl xl:max-w-2xl lg:max-w-xl' />
          </div>
          <h1 className='cursor-default text-2xl font-medium text-white text-center sr-only'>Lead Form</h1>
          <Divider />
          {/* {JSON.stringify(formData)
            .split(/,(?!\d)/)
            .join(', ')} */}
          <TextInput
            labelName='Google App URL:'
            name='google_app_url'
            id='google_app_url'
            placeholder='e.g. https://script.google.com/macros/s/...'
            type='text'
            required={true}
            useDefault={true}
            defaultKey='google_app_url'
            defaultValue={formData?.google_app_url || ''}
            externalValue={formData?.google_app_url}
          />
          <Divider />
          <form className='space-y-6' autoComplete='off' autoCapitalize='on' onSubmit={handleSubmit}>
            <>
              <h2 className='cursor-default text-xl font-medium text-white'>Customer Details</h2>
              <TextInput labelName='First Name' name='first_name' id='first_name' placeholder='e.g. John' type='text' />
              <TextInput
                labelName='Middle Name'
                name='middle_name'
                id='middle_name'
                placeholder='e.g. J. or James'
                type='text'
                required={false}
              />
              <TextInput labelName='Last Name' name='last_name' id='last_name' placeholder='e.g. Doe' type='text' />
              <RadioInput
                labelName='Type of Plan:'
                name='plan_type'
                id='plan_type'
                options={[
                  { label: 'Family', value: 'family' },
                  { label: 'Individual', value: 'individual' },
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
              <TextInput
                labelName='Zip Code:'
                name='zip_code'
                id='zip_code'
                placeholder='e.g. 12345'
                type='text'
                pattern='^\d{5}$'
                zip_code={true}
              />
              {zipcodeData && !zipcodeData.decommissioned && zipcodeData.type === 'STANDARD' && (
                <DetailConfirmation labelName='County:' detail={zipcodeData.county} id='county' />
              )}
              {zipcodeData && zipcodeData.decommissioned && (
                <DetailConfirmation
                  labelName='County:'
                  detail={`${zipcodeData.county} - (Decommissioned)`}
                  id='county'
                  error={true}
                />
              )}
              {zipcodeData && zipcodeData.type === 'PO BOX' && (
                <DetailConfirmation
                  labelName='County:'
                  detail={`${zipcodeData.county} - (P.O. Box)`}
                  id='county'
                  error={true}
                />
              )}
              <DropDownInput
                labelName='State:'
                name='state'
                id='state'
                defaultOption='Please select a state'
                options={unitedStates}
              />
              <TextInput
                labelName='City:'
                name='city'
                id='city'
                placeholder='e.g. Miami'
                type='text'
                useDefault={true}
                defaultKey='city'
                defaultValue={zipcodeData?.primary_city || ''}
                externalValue={zipcodeData?.primary_city}
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
              <h2 className='cursor-default text-xl font-medium text-white'>Customer Questionare</h2>
              {formData.age !== 0 && (formData.age < 18 || formData.age > 59) && (
                <div className='flex items-center justify-center text-white'>
                  <IneligibleIcon twClasses={'h-10'} />
                </div>
              )}
              {(formData.age === 18 || formData.age === 19 || formData.age >= 60) && (
                <div className='flex items-center justify-center text-white'>
                  <MutualOfOmahaIcon twClasses={'h-10'} />
                </div>
              )}
              {formData.age >= 20 && formData.age <= 59 && (
                <div className='flex items-center justify-center text-white'>
                  <AmericoIcon twClasses={'h-10'} />
                </div>
              )}
              <DateInput labelName='Date of Birth:' name='date_of_birth' id='date_of_birth' />
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
                labelName='Taxes filing status:'
                name='taxes_filing_status'
                id='taxes_filing_status'
                rowOrCol='col'
                defaultOption={formData.taxes_filing_status}
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
                labelName='Household size:'
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
                      className='flex relative flex-col gap-4 px-6 py-5 border rounded-xl border-white/10 w-full h-full'
                    >
                      {dependent.age !== 0 && (dependent.age < 18 || dependent.age > 59) && (
                        <div className='flex items-center justify-center text-white'>
                          <IneligibleIcon twClasses={'h-10'} />
                        </div>
                      )}
                      {(dependent.age === 18 || dependent.age === 19) && (
                        <div className='flex items-center justify-center text-white'>
                          <MutualOfOmahaIcon twClasses={'h-10'} />
                        </div>
                      )}
                      {dependent.age >= 20 && dependent.age <= 59 && (
                        <div className='flex items-center justify-center text-white'>
                          <AmericoIcon twClasses={'h-10'} />
                        </div>
                      )}
                      <TextInput
                        id={i}
                        labelName={`Dependent ${i + 1} Full Name:`}
                        name={'full_name'}
                        placeholder='e.g. Jane Doe'
                        type='text'
                        additional={true}
                      />
                      <TextInput
                        id={i}
                        labelName={`Dependent ${i + 1} Relationship:`}
                        name={'relationship'}
                        placeholder='e.g. Son, Daughter, Spouse'
                        type='text'
                        additional={true}
                      />
                      <DateInput
                        id={i}
                        name={'date_of_birth'}
                        labelName={`Dependent ${i + 1} Date of Birth:`}
                        additional={true}
                      />
                      <TextInput
                        id={i}
                        labelName={`Dependent ${i + 1} Social Security Number:`}
                        name={'ssn'}
                        placeholder='e.g. 123-45-6789'
                        type='text'
                        pattern='^\d{3}-\d{2}-\d{4}$'
                        socialSecurity={true}
                        additional={true}
                      />
                      {formData.additional_insured_list?.[i] && formData.additional_insured_list[i].age >= 18 && (
                        <>
                          <TextInput
                            id={i}
                            labelName={`Dependent ${i + 1} State ID Number:`}
                            name={'driver_license_number'}
                            placeholder='e.g. L12312312312'
                            type='text'
                            additional={true}
                          />
                          <DropDownInput
                            id={i}
                            labelName={`Dependent ${i + 1} Country of Birth:`}
                            name={'country_of_birth'}
                            defaultOption='Please select a country'
                            options={countries}
                            additional={true}
                          />
                          {formData.additional_insured_list[i].country_of_birth === 'United States Of America' && (
                            <DropDownInput
                              id={i}
                              labelName={`Dependent ${i + 1} State of Birth:`}
                              name={'state_of_birth'}
                              defaultOption='Please select a state'
                              options={unitedStates}
                              additional={true}
                            />
                          )}
                          <DropDownInput
                            id={i}
                            labelName={`Dependent ${i + 1} Employment Status:`}
                            name={'employment_status'}
                            defaultOption='Please select an employment status'
                            options={[
                              {
                                label: 'Employed',
                                value: 'employed',
                              },
                              {
                                label: 'Unemployed',
                                value: 'unemployed',
                              },
                              {
                                label: 'Student',
                                value: 'student',
                              },
                              {
                                label: 'Retired',
                                value: 'retired',
                              },
                              {
                                label: 'Disabled',
                                value: 'disabled',
                              },
                              {
                                label: 'Stay-at-home-person',
                                value: 'stay-at-home-person',
                              },
                            ]}
                            additional={true}
                          />
                          {formData.additional_insured_list[i].employment_status === 'employed' && (
                            <SelectCreateable
                              id={i}
                              labelName='Occupation:'
                              name='occupation'
                              options={occupations}
                              placeholder='Please select an occupation...'
                              additional={true}
                            />
                          )}
                          {(formData.additional_insured_list[i].employment_status === 'retired' ||
                            formData.additional_insured_list[i].employment_status === 'unemployed') && (
                            <SelectCreateable
                              id={i}
                              labelName='Former occupation:'
                              name='occupation'
                              options={occupations}
                              placeholder='Please select an occupation...'
                              additional={true}
                            />
                          )}
                          <TextInput
                            id={i}
                            labelName={`Dependent ${i + 1} Height:`}
                            name={'height'}
                            placeholder="e.g. 5'11"
                            type='text'
                            pattern="^(\d{0,1})'(\d{0,2})$"
                            height={true}
                            additional={true}
                          />
                          <TextInput
                            id={i}
                            labelName={`Dependent ${i + 1} Weight:`}
                            name={'weight'}
                            placeholder='e.g. 150 (lbs.)'
                            type='text'
                            pattern='^\d{1,3}(?:\.\d)?$'
                            weight={true}
                            additional={true}
                          />
                          <TextInput
                            id={i}
                            labelName={`Dependent ${i + 1} Beneficiary:`}
                            name={'dependent_beneficiary'}
                            placeholder='e.g. John Doe'
                            type='text'
                            additional={true}
                          />
                        </>
                      )}
                      <TextAreaInput
                        id={i}
                        labelName='Notes:'
                        name='notes_dependent'
                        placeholder='Enter notes here'
                        additional={true}
                        required={false}
                      />
                      <button
                        id='remove-dependent'
                        key={`dependent_${i + 1}_button`}
                        type='button'
                        tabIndex={-1}
                        className='w-6 absolute top-2 right-2 opacity-70 hover:opacity-100 transition-all'
                        onClick={() => removeDependent(i)}
                      >
                        <CloseIcon twClasses='text-white fill-white' />
                      </button>
                    </div>
                  );
                })}
              {formData.additional_insured === 'yes' && (
                <div className='flex items-center justify-center gap-6'>
                  <button
                    id='add-additional-dependent'
                    disabled={handleHouseholdCheck()}
                    type='button'
                    tabIndex={-1}
                    onClick={addDependent}
                    className='bg-10sa-gold/60 hover:bg-10sa-gold mx-6 w-1/2 transition-all text-white disabled:bg-gray-400 disabled:hover:bg-gray-400 disabled:cursor-not-allowed shadow-xl focus:ring-4 focus:outline-none font-medium rounded-full text-sm py-2.5 text-center focus:ring-blue-800'
                  >
                    Add More Dependents
                  </button>
                </div>
              )}
              <DropDownInput
                id='employment_status'
                labelName="Primary's Employment Status:"
                name={'employment_status'}
                defaultOption='Please select an employment status'
                options={[
                  {
                    label: 'Employed',
                    value: 'employed',
                  },
                  {
                    label: 'Disabled',
                    value: 'disabled',
                  },
                  {
                    label: 'Student',
                    value: 'student',
                  },
                  {
                    label: 'Retired',
                    value: 'retired',
                  },
                  {
                    label: 'Stay-at-home-person',
                    value: 'stay-at-home-person',
                  },
                  {
                    label: 'Unemployed',
                    value: 'unemployed',
                  },
                ]}
                additional={true}
              />
              {formData.employment_status === 'employed' && (
                <SelectCreateable
                  id='occupation'
                  labelName="Primary's Occupation:"
                  name='occupation'
                  options={occupations}
                  placeholder='Please select an occupation...'
                  additional={true}
                />
              )}
              {(formData.employment_status === 'retired' || formData.employment_status === 'unemployed') && (
                <SelectCreateable
                  id='occupation'
                  labelName="Primary's Former occupation:"
                  name='occupation'
                  options={occupations}
                  placeholder='Please select an occupation...'
                  additional={true}
                />
              )}
              <TextInput
                labelName='Annual household NET income (after taxes):'
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
                  labelName='Pre-existing conditions:'
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
                  labelName='Specific medications:'
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
                  labelName='Doctor Name:'
                  name='preferred_doctors_name'
                  id='preferred_doctors_name'
                  placeholder='e.g. Dr. Lino Fernandez'
                  type='text'
                />
              )}
              <TextInput
                labelName='Monthly budget:'
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
              <h2 className='cursor-default text-xl font-medium text-white'>Quote Breakdown</h2>
              <TextInput
                labelName='Plan Name:'
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
                labelName='Specialist Copay:'
                name='specialist_copay'
                id='specialist_copay'
                placeholder='e.g. $150'
                type='text'
                pattern='^\$[0-9]{1,3}(?:,?[0-9]{3})*(?:\.[0-9]{2})?$'
                currency={true}
              />
              <TextInput
                labelName='Generic Meds Copay:'
                name='generic_meds_copay'
                id='generic_meds_copay'
                placeholder='e.g. $50'
                type='text'
                pattern='^\$[0-9]{1,3}(?:,?[0-9]{3})*(?:\.[0-9]{2})?$'
                currency={true}
              />
              <TextInput
                labelName='Annual Deductible:'
                name='annual_deductible'
                id='annual_deductible'
                placeholder='e.g. $1,500'
                type='text'
                pattern='^\$[0-9]{1,3}(?:,?[0-9]{3})*(?:\.[0-9]{2})?$'
                currency={true}
              />
              <TextInput
                labelName='Max Out of Pocket:'
                name='max_out_of_pocket'
                id='max_out_of_pocket'
                placeholder='e.g. $5,000'
                type='text'
                pattern='^\$[0-9]{1,3}(?:,?[0-9]{3})*(?:\.[0-9]{2})?$'
                currency={true}
              />
              <TextInput
                labelName='All Benefits:'
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
              <h2 className='cursor-default text-xl font-medium text-white'>Closure</h2>
              <TextInput
                labelName='Phone Number:'
                name='phone_number'
                id='phone_number'
                placeholder='e.g. 786-305-6789'
                type='tel'
                pattern='^\d{3}-\d{3}-\d{4}$'
                phone={true}
              />
              {formData.date_of_birth && (
                <DetailConfirmation
                  detail={formData.date_of_birth}
                  labelName='Confirm Date of Birth'
                  id='confirm_date_of_birth'
                />
              )}
              {formData.first_name && formData.last_name ? (
                <DetailConfirmation
                  labelName='Confirm Full Name:'
                  id='confirm_full_name'
                  detail={`${toTitleCase(formData.first_name)} ${
                    formData.middle_name ? toTitleCase(formData.middle_name) + ' ' : ' '
                  }${toTitleCase(formData.last_name)}`}
                />
              ) : (
                <DetailConfirmation
                  detail={'First or Last Name Missing'}
                  labelName='First or Last Name Missing'
                  id='full_name_missing'
                  name='first_name'
                  error={true}
                />
              )}
              <TextInput labelName='Email:' name='email' id='email' placeholder='e.g. johndoe@gmail.com' type='email' />
              <TextInput
                labelName='Street Address (no P.O. box):'
                name='address'
                id='address'
                placeholder='e.g. 12345 NW 1st St'
                type='text'
              />
              {formData.city ? (
                <DetailConfirmation detail={formData.city} labelName='Confirm City:' id='confirm_city' />
              ) : (
                <DetailConfirmation
                  detail='City Missing'
                  labelName='City Missing'
                  id='city_missing'
                  name='city'
                  error={true}
                />
              )}
              {formData.state ? (
                <DetailConfirmation
                  detail={toTitleCase(formData.state)}
                  labelName='Confirm State:'
                  id='confirm_state'
                />
              ) : (
                <DetailConfirmation
                  detail={'State Missing'}
                  labelName='State Missing'
                  id='state_missing'
                  name='state'
                  error={true}
                />
              )}
              {formData.zip_code ? (
                <DetailConfirmation detail={formData.zip_code} labelName='Confirm Zip Code:' id='confirm_zip_code' />
              ) : (
                <DetailConfirmation
                  detail='Zip Code Missing'
                  labelName='Zip Code Missing'
                  id='zip_code_missing'
                  name='zip_code'
                  error={true}
                />
              )}
              <TextInput
                labelName="Primary's Height:"
                name='height'
                id='height'
                placeholder="e.g. 5'11"
                type='text'
                pattern="^(\d{0,1})'(\d{0,2})$"
                height={true}
              />
              <TextInput
                labelName="Primary's Weight:"
                name='weight'
                id='weight'
                placeholder='e.g. 150 (lbs.)'
                type='text'
                pattern='^\d+(\.\d+)?$'
                weight={true}
              />
              <TextInput
                labelName="Primary's Social Security Number:"
                name='ssn'
                id='ssn'
                placeholder='e.g. 123-45-6789'
                type='text'
                pattern='^\d{3}-\d{2}-\d{4}$'
                socialSecurity={true}
              />
              <TextInput
                id='driver_license_number'
                labelName="Primary's Driver License:"
                name='driver_license_number'
                placeholder='e.g. L12312312312'
                type='text'
                required={false}
              />
              <RadioInput
                labelName='Resident or citizen?'
                name='resident_or_citizen'
                id='resident_or_citizen'
                options={[
                  { label: 'Resident', value: 'resident' },
                  { label: 'Citizen', value: 'citizen' },
                ]}
              />
            </>
            <Divider />
            <>
              <h2 className='cursor-default text-xl font-medium text-white'>Beneficiary Information</h2>
              <TextInput
                labelName="Primary's Beneficiary Full Name:"
                name='beneficiary_full_name'
                id='beneficiary_full_name'
                placeholder='e.g. John Doe'
                type='text'
              />
              <TextInput
                labelName='Beneficiary Relationship:'
                name='relationship'
                id='relationship'
                placeholder='e.g. Son, Daughter, Spouse'
                type='text'
              />
              <DateInput
                labelName='Beneficiary Date of Birth:'
                name='beneficiary_date_of_birth'
                id='beneficiary_date_of_birth'
              />
            </>
            <Divider />
            <>
              <h2 className='cursor-default text-xl font-medium text-white'>Payment Method</h2>
              <RadioInput
                labelName='Checking or savings?'
                name='checking_or_savings'
                id='checking_or_savings'
                options={[
                  { label: 'Savings', value: 'savings' },
                  { label: 'Checking', value: 'checking' },
                ]}
              />
              <TextInput
                labelName='Routing Number'
                name='routing_number'
                id='routing_number'
                placeholder='e.g. 123456789'
                type='text'
                pattern='^\d{9}$'
                routingNumber={true}
              />
              <TextInput
                labelName='Account Number'
                name='account_number'
                id='account_number'
                placeholder='e.g. 123456789012'
                type='text'
                pattern='^\d{4,17}$'
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
            <>
              <h2 className='cursor-default text-xl font-medium text-white'>Disclosure</h2>
              <TextInput
                labelName='Monthly Grand Total:'
                name='monthly_grand_total'
                id='monthly_grand_total'
                placeholder='e.g. $100'
                type='text'
                pattern='^\$[0-9]{1,3}(?:,?[0-9]{3})*(?:\.[0-9]{2})?$'
                currency={true}
              />
              <TextInput
                labelName='Health Unsubsidized:'
                name='health_unsubsidized'
                id='health_unsubsidized'
                placeholder='e.g. $1,000'
                type='text'
                pattern='^\$[0-9]{1,3}(?:,?[0-9]{3})*(?:\.[0-9]{2})?$'
                currency={true}
              />
              <TextInput
                labelName='CIGNA Dental:'
                name='cigna_dental'
                id='cigna_dental'
                placeholder='e.g. $100'
                type='text'
                pattern='^\$[0-9]{1,3}(?:,?[0-9]{3})*(?:\.[0-9]{2})?$'
                required={false}
                currency={true}
              />
              <TextInput
                labelName='Americo Death Benefit:'
                name='americo_death_benefit'
                id='americo_death_benefit'
                placeholder='e.g. $250,000'
                type='text'
                pattern='^\$[0-9]{1,3}(?:,?[0-9]{3})*(?:\.[0-9]{2})?$'
                currency={true}
              />
            </>
            <Divider />
            <>
              <h2 className='cursor-default text-xl font-medium text-white'>Totals</h2>
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
            <div className='w-full inline-flex gap-4'>
              <button
                type='submit'
                className='hover:bg-10sa-gold/60 bg-purple-800 border border-10sa-gold/25 active:bg-10sa-gold/100 w-full transition-all text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center focus:ring-blue-800'
              >
                Submit
              </button>
              <button
                type='button'
                className='hover:bg-10sa-gold/60 bg-purple-800 border border-10sa-gold/25 active:bg-10sa-gold/100 w-full transition-all text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center focus:ring-blue-800'
                onClick={handleCopyToClipboard}
              >
                {copied ? 'Succesfully copied!' : 'Copy for Extension'}
              </button>
            </div>
          </form>
        </section>
      </>
    );

  return null;
};

export default Form;
