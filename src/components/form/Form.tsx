import React, { useState, useEffect } from 'react';
import tw from 'tailwind-styled-components';
import TextInput from './TextInput';
import RadioInput from './RadioInput';
import DropDownInput from './DropDownInput';
import TextAreaInput from './TextAreaInput';
import DateInput from './DateInput';
import GroupButton from './GroupButton';
import DetailConfirmation from './DetailConfirmation';
import { useFormData } from '../contexts/FormContext';
import { getZipcodeData, ZipcodeDataType } from '../../utility/getZipcodeData';
import { unitedStates, preferredCarriers, countries, occupations } from '../../utility/staticData';
import { toTitleCase, parseCurrency } from '../../utility/utility';
import { MutualOfOmahaIcon } from '../icons/MutualOfOmahaIcon';
import { AmericoIcon } from '../icons/AmericoIcon';
import { HealthSherpaSymbol, AmericoSymbol, MutualOfOmahaSymbol } from '../icons/NavIcons';
import { CloseIcon } from '../icons/CloseIcon';
import { CarrierIcon, CarrierIconKey } from '../icons/CarrierIcons';
import { IneligibleIcon } from '../icons/IneligebleIcon';
import SelectCreateable from './SelectCreateable';

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
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [carriers, setCarriers] = useState<string[]>([]);
  const [zipcodeData, setZipcodeData] = useState<ZipcodeDataType | undefined>(undefined);
  const [grandTotal, setGrandTotal] = useState<string>('');
  const [americoAmount, setAmericoAmount] = useState<string>('');
  const [mutualAmount, setMutualAmount] = useState<string>('');
  const [eligibleMutualCount, setEligibleMutualCount] = useState<number>(0);
  const [eligibleAmericoCount, setEligibleAmericoCount] = useState<number>(0);

  useEffect(() => {
    const eligibleAdditionalInsuredList =
      formData.additional_insured_list?.filter((member) => member.age >= 20 && member.age <= 59) || [];

    const eligibleAmericoCount =
      (formData.age >= 20 && formData.age <= 59 ? 1 : 0) + eligibleAdditionalInsuredList.length;

    const americoPremium = parseCurrency(formData.americo_coverage) || 48;
    const americoMonthlyAmount = eligibleAmericoCount * americoPremium;

    const monthlyHealthPremium = parseCurrency(formData.monthly_health_premium) || 0;

    let mutual_of_omaha_premium = 0;

    if (formData.mutual_quote_gender && formData.mutual_face_amount) {
      const coverageAmount = parseInt(formData.mutual_face_amount.replace(/[^0-9]/g, ''), 10) || 0;
      const multiplier = (coverageAmount - 50000) / 10000;

      if (formData.mutual_quote_gender === 'male') {
        mutual_of_omaha_premium = 10.29 + multiplier * 1.18;
      } else if (formData.mutual_quote_gender === 'female') {
        mutual_of_omaha_premium = 7.53 + multiplier * 0.63;
      }

      mutual_of_omaha_premium = parseFloat(mutual_of_omaha_premium.toFixed(2));
    }

    const eligibleMutualInsuredList =
      formData.additional_insured_list?.filter((member) => member.age === 18 || member.age === 19) || [];
    const eligibleMutualCount = (formData.age === 18 || formData.age === 19 ? 1 : 0) + eligibleMutualInsuredList.length;
    const mutualMonthlyAmount = eligibleMutualCount * mutual_of_omaha_premium;

    const grandTotal =
      formData.life_adb_provider === 'americo'
        ? americoMonthlyAmount + monthlyHealthPremium
        : mutualMonthlyAmount + monthlyHealthPremium;

    setEligibleAmericoCount(eligibleAmericoCount);
    setEligibleMutualCount(eligibleMutualCount);
    setAmericoAmount(americoMonthlyAmount.toString());
    setMutualAmount(mutualMonthlyAmount.toString());
    setGrandTotal(grandTotal.toFixed(2).toString());
  }, [
    JSON.stringify(formData.additional_insured_list),
    formData.additional_insured,
    formData.monthly_health_premium,
    formData.life_adb_provider,
    formData.mutual_quote_gender,
    formData.mutual_face_amount,
    formData.americo_coverage,
    formData.age,
  ]);

  useEffect(() => {
    const applyingForCoverage =
      1 + (formData.additional_insured_list?.length ? formData.additional_insured_list.length : 0);
    setFormData({ ...formData, applying_for_coverage: applyingForCoverage });
  }, [formData.additional_insured, formData.additional_insured_list]);

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
    } else {
      setFormData({ ...formData, additional_insured_list: [] });
    }
  }, [formData.additional_insured]);

  useEffect(() => {
    const { state } = formData;
    if (state) {
      setCarriers(preferredCarriers[state as keyof typeof preferredCarriers]);
    }
  }, [formData.state]);

  useEffect(() => {
    const { zip_code } = formData;
    if (!zip_code || zip_code.length < 5) return;
    if (zip_code && zip_code.length === 5) {
      const zipcodeLookupData = getZipcodeData(zip_code);
      if (zipcodeLookupData) {
        setZipcodeData(zipcodeLookupData);
        setFormData({
          ...formData,
          county: zipcodeLookupData.county,
          state: zipcodeLookupData.state,
        });
      }
    }
  }, [formData.zip_code]);

  useEffect(() => {
    if (formData.life_adb_provider === 'mutual') {
      const newFormData = { ...formData };
      delete newFormData.americo_coverage;
      setFormData(newFormData);
    }
    if (formData.life_adb_provider === 'americo') {
      const newFormData = { ...formData };
      delete newFormData.mutual_quote_gender;
      delete newFormData.mutual_face_amount;
      setFormData(newFormData);
    }
  }, [formData.life_adb_provider]);

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
        <div className='flex w-full max-w-4xl p-4 border rounded-lg shadow sm:p-6 md:p-8 bg-10sa-purple border-10sa-gold/40 items-center justify-center'>
          <div className='text-xl'>Loading...</div>
        </div>
      </div>
    );

  return (
    <main className='flex items-center justify-center min-h-screen py-20'>
      <nav className='flex flex-col fixed top-8 left-8 gap-8 shadow-xl'>
        <a
          className='bg-10sa-gold hover:blur-sm transition-all rounded-full p-2'
          href='https://www.healthsherpa.com/'
          target='_blank'
          title='HealthSherpa'
        >
          <HealthSherpaSymbol twClasses='w-10' />
        </a>
        <a
          className='bg-10sa-gold hover:blur-sm transition-all rounded-full p-2'
          href='https://tools.americoagent.com/'
          target='_blank'
          title='Americo - Submit'
        >
          <AmericoSymbol twClasses='w-10' />
        </a>
        <a
          className='bg-10sa-gold hover:blur-sm transition-all rounded-full p-2'
          href='https://producer.mutualofomaha.com/enterprise/portal/!ut/p/z1/hY7BDoIwEES_hQNXdiMWibdGE1HxLO7FgKkFUygplf6-jXoxEZ3b7ryZDBAUQF05NrK0je5K5e8TJefVhmfzRY6YstkaOe6zlLE4xgOD4z-AvI0T4ujz9ESmGrbJG_jRsQOSSlevubyr4lQCGXEVRpjobvy7trYfliGG6JyLpNZSieii2xC_RWo9WCg-SejbAm9MjTkPgge1lLo5/dz/d5/L2dBISEvZ0FBIS9nQSEh/'
          target='_blank'
          title='Mutual Of Omaha - Submit'
        >
          <MutualOfOmahaSymbol twClasses='w-10 fill-mutual' />
        </a>
        <a
          className='bg-10sa-gold hover:blur-sm transition-all rounded-full p-2'
          href='https://www3.mutualofomaha.com/mobile-quotes/#/gad'
          target='_blank'
          title='Mutual Of Omaha - Quote'
        >
          <MutualOfOmahaSymbol twClasses='w-10 fill-red-900' />
        </a>
      </nav>
      <section className='fixed top-0 right-0 z-50 w-1/4 h-screen bg-10sa-purple p-8 flex flex-col gap-4 border-l border-10sa-gold/30'>
        <div className='border border-10sa-gold/40 p-4 rounded-xl shadow-xl'>
          <TextInput
            id='monthly_health_premium'
            name='monthly_health_premium'
            placeholder='e.g. $8.14'
            type='text'
            labelName='Monthly Health Premium:'
            required={true}
            currency={true}
          />
        </div>
        <div className='border border-10sa-gold/40 p-4 rounded-xl shadow-xl'>
          <GroupButton
            labelName='Life ADB Provider:'
            name='life_adb_provider'
            id='life_adb_provider'
            options={[
              { label: 'Americo', value: 'americo' },
              { label: 'Mutual', value: 'mutual' },
            ]}
            defaultOption='americo'
          />
        </div>
        {formData.life_adb_provider === 'americo' && (
          <div className='border border-10sa-gold/40 p-4 rounded-xl shadow-xl'>
            <RadioInput
              id='americo_coverage'
              name='americo_coverage'
              labelName='Americo Coverage:'
              required={false}
              rowOrCol='col'
              defaultOption='$48'
              options={[
                { label: '$27 Monthly - $100k ADB', value: '$27' },
                { label: '$35 Monthly - $150k ADB', value: '$35' },
                { label: '$42 Monthly - $200k ADB', value: '$42' },
                { label: '$48 Monthly - $250k ADB', value: '$48' },
              ]}
            />
          </div>
        )}
        {formData.life_adb_provider === 'mutual' && (
          <div className='border border-10sa-gold/40 p-4 rounded-xl shadow-xl'>
            <GroupButton
              id='mutual_quote_gender'
              labelName='Gender:'
              name='mutual_quote_gender'
              options={[
                { label: 'Male', value: 'male' },
                { label: 'Female', value: 'female' },
              ]}
            />
          </div>
        )}
        {formData.life_adb_provider === 'mutual' && formData.mutual_quote_gender && (
          <div className='border border-10sa-gold/40 p-4 rounded-xl shadow-xl'>
            <TextInput
              id='mutual_face_amount'
              name='mutual_face_amount'
              labelName='Mutual Face Amount:'
              placeholder='$50k - $500k'
              type='text'
              currency={true}
              currencyMutual={true}
            />
          </div>
        )}
        {formData.household_size && (
          <div className='border border-10sa-gold/40 p-4 rounded-xl shadow-xl'>
            Household size: {formData.household_size}
          </div>
        )}
        {formData.life_adb_provider === 'americo' && formData.additional_insured && (
          <>
            <div className='border border-10sa-gold/40 p-4 rounded-xl shadow-xl'>
              {'Applying for coverage: '}
              {formData.applying_for_coverage}
            </div>
            {formData.life_adb_provider === 'americo' && eligibleAmericoCount > 0 && (
              <div className='border border-10sa-gold/40 p-4 rounded-xl shadow-xl'>
                {'Americo sales: '}
                {eligibleAmericoCount.toString()}
              </div>
            )}
            <div className='border border-10sa-gold/40 p-4 rounded-xl shadow-xl'>
              {'Americo amount: $'}
              {americoAmount}
            </div>
          </>
        )}
        {formData.life_adb_provider === 'mutual' && formData.additional_insured && (
          <>
            <div className='border border-10sa-gold/40 p-4 rounded-xl shadow-xl'>
              {'Applying for coverage: '}
              {formData.applying_for_coverage.toString()}
            </div>
            {formData.life_adb_provider === 'mutual' && eligibleMutualCount > 0 && (
              <div className='border border-10sa-gold/40 p-4 rounded-xl shadow-xl'>
                {'Mutual of Omaha sales: '}
                {eligibleMutualCount.toString()}
              </div>
            )}
            <div className='border border-10sa-gold/40 p-4 rounded-xl shadow-xl'>
              {'Mutual of Omaha amount: $'}
              {mutualAmount}
            </div>
          </>
        )}
        {formData.life_adb_provider &&
          formData.monthly_health_premium &&
          (eligibleAmericoCount > 0 || eligibleMutualCount > 0) && (
            <div className='border border-10sa-gold/40 p-4 rounded-xl shadow-xl'>
              {'Monthly Grand Total: $'}
              {grandTotal}
            </div>
          )}
        {formData.state && (
          <div className='border border-10sa-gold/40 p-4 rounded-xl shadow-xl w-full'>
            <div>Preferred carriers for {toTitleCase(formData.state)}:</div>
            <ul className='flex flex-wrap gap-2 justify-center pt-3'>
              {carriers &&
                carriers.map((carrier, i) => {
                  return (
                    <li
                      key={carrier + i}
                      title={carrier}
                      className='rounded-full px-3 font-medium text-base w-32 text-white fill-white'
                    >
                      <CarrierIcon icon={carrier as CarrierIconKey} twClasses={`max-w-xs text-white`} />
                    </li>
                  );
                })}
            </ul>
          </div>
        )}
      </section>
      <section className='4xl:max-w-4xl 3xl:max-w-3xl xl:max-w-xl lg:max-w-lg mr-64 w-full p-4 bg-10sa-purple border border-10sa-gold/25 rounded-lg shadow sm:p-6 md:p-8'>
        <h1 className='text-2xl font-medium text-white text-center'>Lead Form</h1>
        <Divider />
        {JSON.stringify(formData)
          .split(/,(?!\d)/)
          .join(', ')}
        <Divider />
        <form className='space-y-6' autoComplete='off' autoCapitalize='on'>
          <>
            <h5 className='text-xl font-medium text-white'>Customer Details</h5>
            <TextInput labelName='First Name' name='first_name' id='first_name' placeholder='e.g. John' type='text' />
            <TextInput labelName='Last Name' name='last_name' id='last_name' placeholder='e.g. Doe' type='text' />
            <RadioInput
              labelName='Type of Plan:'
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
              city={true}
              cityValue={zipcodeData?.primary_city}
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
            <h5 className='text-xl font-medium text-white'>Customer Questionare</h5>
            {formData.age !== 0 && (formData.age < 18 || formData.age > 59) && (
              <div className='flex items-center justify-center text-white'>
                <IneligibleIcon twClasses={'h-10'} />
              </div>
            )}
            {(formData.age === 18 || formData.age === 19) && (
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
                          name={'driver_license'}
                          placeholder='e.g. L12-123-12-123-0'
                          type='text'
                          pattern='^[A-Za-z]\d{2}-\d{3}-\d{2}-\d{3}-\d$'
                          driverLicense={true}
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
                        {/* <DropDownInput
                          id={i}
                          labelName={`Dependent ${i + 1} Occupation:`}
                          name={'occupation'}
                          defaultOption='Please select an occupation'
                          options={unitedStates}
                          additional={true}
                        /> */}
                        <TextInput
                          id={i}
                          labelName={`Dependent ${i + 1} Height:`}
                          name={'height'}
                          placeholder="e.g. 5'11"
                          type='text'
                          pattern="^\\d{1,2}'(?:1[0-2]|0?[1-9])$"
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
                      key={`dependent_${i + 1}_button`}
                      type='button'
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
                  disabled={handleHouseholdCheck()}
                  type='button'
                  onClick={addDependent}
                  className='bg-10sa-gold/60 hover:bg-10sa-gold mx-6 w-1/2 transition-all text-white disabled:bg-gray-400 disabled:hover:bg-gray-400 disabled:cursor-not-allowed shadow-xl focus:ring-4 focus:outline-none font-medium rounded-full text-sm py-2.5 text-center focus:ring-blue-800'
                >
                  Add More Dependents
                </button>
              </div>
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
            <SelectCreateable
              id='occupation'
              labelName='Occupation:'
              name='occupation'
              options={occupations}
              placeholder='Please select an occupation...'
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
            <h5 className='text-xl font-medium text-white'>Quote Breakdown</h5>
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
            <h5 className='text-xl font-medium text-white'>Closure</h5>
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
                detail={toTitleCase(formData.first_name) + ' ' + toTitleCase(formData.last_name)}
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
            <TextInput
              labelName='Email:'
              name='email'
              id='email'
              placeholder='e.g. johndoe@gmail.com'
              type='email'
              pattern='^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?$'
            />
            <TextInput
              labelName='Street Address (no P.O. box):'
              name='street_address'
              id='street_address'
              placeholder='e.g. 12345 NW 1st St, Miami, FL, 33186'
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
              <DetailConfirmation detail={toTitleCase(formData.state)} labelName='Confirm State:' id='confirm_state' />
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
              labelName='Height:'
              name='height'
              id='height'
              placeholder="e.g. 5'11"
              type='text'
              pattern="^\\d{1,2}'(?:1[0-2]|0?[1-9])$"
              height={true}
            />
            <TextInput
              labelName='Weight:'
              name='weight'
              id='weight'
              placeholder='e.g. 150 (lbs.)'
              type='text'
              pattern='^\d+(\.\d+)$'
              weight={true}
            />
            <TextInput
              labelName='Social Security Number:'
              name='ssn'
              id='ssn'
              placeholder='e.g. 123-45-6789'
              type='text'
              pattern='^\d{3}-\d{2}-\d{4}$'
              socialSecurity={true}
            />
            <RadioInput
              labelName='Citizen or resident?'
              name='citizen_or_resident'
              id='citizen_or_resident'
              options={[
                { label: 'Citizen', value: 'citizen' },
                { label: 'Resident', value: 'resident' },
              ]}
            />
          </>
          <Divider />
          <>
            <h5 className='text-xl font-medium text-white'>Beneficiary Information</h5>
            <TextInput
              labelName='Beneficiary Full Name:'
              name='beneficiary_full_name'
              id='beneficiary_full_name'
              placeholder='e.g. John Doe'
              type='text'
            />
            <TextInput
              labelName='Relationship:'
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
            <h5 className='text-xl font-medium text-white'>Payment Method</h5>
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
          <>
            <h5 className='text-xl font-medium text-white'>Disclosure</h5>
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
            <h5 className='text-xl font-medium text-white'>Totals</h5>
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
          <button
            type='submit'
            className='hover:bg-10sa-gold/60 bg-10sa-deep-purple border-10sa-gold/25 active:bg-10sa-gold/100 w-full transition-all text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center focus:ring-blue-800'
          >
            Submit
          </button>
        </form>
      </section>
    </main>
  );
};

export default Form;
