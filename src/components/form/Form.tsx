import React, { useState, useEffect } from 'react';
import {
  AddDependentButton,
  AddDependentContainer,
  AdditionalInsuredContainer,
  Button,
  ButtonContainer,
  Divider,
  EligibilityIconContainer,
  FormForm,
  FormSectionContainer,
  H2,
  HeadingSrOnly,
  MainContainer,
  LogoContainer,
  RemoveDependentButton,
  MainWrapper,
  StatusText,
} from '../tw/twStyles';
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
import { unitedStates, countries, occupations, preferredCarriers, employmentOptions } from '../../utility/staticData';
import { toTitleCase, formDataTitleCased, backupAndClearFormData, restoreBackupFormData } from '../../utility/utility';
import { MutualOfOmahaIcon } from '../icons/MutualOfOmahaIcon';
import { AmericoIcon } from '../icons/AmericoIcon';
import { CloseIcon } from '../icons/CloseIcon';
import { IneligibleIcon } from '../icons/IneligebleIcon';
import type { Carrier } from '../../types/formData';

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
    if (googleKeyUrl && !error) {
      setTimeout(() => {
        setFormData({ ...formData, google_app_url: googleKeyUrl });
      }, 1000);
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
    if (!formData.state) return;
    setFormData({
      ...formData,
      carriers: preferredCarriers[formData.state],
    });
  }, [formData.state]);

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
    const formatFormData = formDataTitleCased(formData);
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
    setIsSubmitting(true);
    const formatFormData = formDataTitleCased(formData);
    const baseUrl = formData.google_app_url;
    try {
      const response = await fetch(baseUrl, {
        method: 'POST',
        body: JSON.stringify(formatFormData),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      backupAndClearFormData();
      setIsSubmitting(false);
      setSuccessful(true);
      handleCopyToClipboard();
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error: any) {
      setErrorMessage(error.toString());
      setIsSubmitting(false);
      setError(true);
      setTimeout(() => {
        setErrorMessage('');
        setError(false);
      }, 4000);
    }
  };

  if (isSubmitting)
    return (
      <MainContainer>
        <MainWrapper>
          <StatusText>Posting to Google Sheets...</StatusText>
        </MainWrapper>
      </MainContainer>
    );

  if (successful)
    return (
      <MainContainer>
        <MainWrapper>
          <StatusText>Successfully posted to Google!</StatusText>
        </MainWrapper>
      </MainContainer>
    );

  if (error && errorMessage)
    return (
      <MainContainer>
        <MainWrapper>
          <StatusText>{errorMessage || 'Oh no! There was an error!'}</StatusText>
        </MainWrapper>
      </MainContainer>
    );

  if (!isSubmitting && !successful && !error)
    return (
      <FormSectionContainer>
        <LogoContainer>
          <TenStepsAheadLogo twClasses='w-full 4xl:max-w-4xl 3xl:max-w-3xl 2xl:max-w-3xl xl:max-w-2xl lg:max-w-xl' />
        </LogoContainer>
        <HeadingSrOnly>Lead Form</HeadingSrOnly>
        <Divider />
        <ButtonContainer>
          <Button onClick={backupAndClearFormData}>Clear Form</Button>
          <Button onClick={restoreBackupFormData}>Restore Form</Button>
        </ButtonContainer>
        <Divider />
        {/* {JSON.stringify(formData)
            .split(/,(?!\d)/)
            .join(', ')} */}
        <TextInput
          labelName='Google App URL:'
          name='google_app_url'
          id='google_app_url'
          placeholder='Ex. https://script.google.com/macros/s/...'
          type='text'
          uppercase={false}
          required={true}
          defaultKey='google_app_url'
          defaultValue={formData?.google_app_url || ''}
          externalValue={formData?.google_app_url}
        />
        <Divider />
        <FormForm autoComplete='off' autoCapitalize='on' onSubmit={handleSubmit}>
          <>
            <H2>Customer Details</H2>
            <TextInput
              labelName='First Name'
              name='first_name'
              id='first_name'
              placeholder='Ex. John'
              type='text'
              defaultKey='first_name'
              defaultValue={formData?.first_name || ''}
            />
            <TextInput
              labelName='Middle Name'
              name='middle_name'
              id='middle_name'
              placeholder='Ex. J. or James'
              type='text'
              required={false}
              defaultKey='middle_name'
              defaultValue={formData?.middle_name || ''}
            />
            <TextInput
              labelName='Last Name'
              name='last_name'
              id='last_name'
              placeholder='Ex. Doe'
              type='text'
              defaultKey='last_name'
              defaultValue={formData?.last_name || ''}
            />
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
              placeholder='Ex. 12345'
              type='text'
              pattern='^\d{5}$'
              zip_code={true}
              defaultKey='zip_code'
              defaultValue={formData?.zip_code || ''}
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
              options={unitedStates}
              defaultOption={formData?.state || 'Please select a state'}
            />
            <TextInput
              labelName='City:'
              name='city'
              id='city'
              placeholder='Ex. Miami'
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
              defaultKey='coverage_reason'
              defaultValue={formData?.coverage_reason || ''}
            />
          </>
          <Divider />
          <>
            <H2>Customer Questionare</H2>
            {formData.age !== 0 && (formData.age < 18 || formData.age > 59) && (
              <EligibilityIconContainer>
                <IneligibleIcon twClasses={'h-10'} />
              </EligibilityIconContainer>
            )}
            {(formData.age === 18 || formData.age === 19 || formData.age >= 60) && (
              <EligibilityIconContainer>
                <MutualOfOmahaIcon twClasses={'h-10'} />
              </EligibilityIconContainer>
            )}
            {formData.age >= 20 && formData.age <= 59 && (
              <EligibilityIconContainer>
                <AmericoIcon twClasses={'h-10'} />
              </EligibilityIconContainer>
            )}
            <DateInput
              labelName='Date of Birth:'
              name='date_of_birth'
              id='date_of_birth'
              defaultKey='date_of_birth'
              required={true}
              defaultValue={formData?.date_of_birth || ''}
            />
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
              placeholder='Ex. 4'
              type='number'
              pattern='/^\d{9}$/'
              defaultKey='household_size'
              defaultValue={formData?.household_size || ''}
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
                  <AdditionalInsuredContainer key={`dependent_${i + 1}_info`}>
                    {dependent.age !== 0 && (dependent.age < 18 || dependent.age > 59) && (
                      <EligibilityIconContainer>
                        <IneligibleIcon twClasses={'h-10'} />
                      </EligibilityIconContainer>
                    )}
                    {(dependent.age === 18 || dependent.age === 19) && (
                      <EligibilityIconContainer>
                        <MutualOfOmahaIcon twClasses={'h-10'} />
                      </EligibilityIconContainer>
                    )}
                    {dependent.age >= 20 && dependent.age <= 59 && (
                      <EligibilityIconContainer>
                        <AmericoIcon twClasses={'h-10'} />
                      </EligibilityIconContainer>
                    )}
                    <TextInput
                      id={i}
                      labelName={`Dependent ${i + 1} Full Name:`}
                      name='full_name'
                      placeholder='Ex. Jane Doe'
                      type='text'
                      additional={true}
                      defaultKey='full_name'
                      defaultValue={formData?.additional_insured_list[i].full_name || ''}
                    />
                    <TextInput
                      id={i}
                      labelName={`Dependent ${i + 1} Relationship:`}
                      name='relationship'
                      placeholder='Ex. Son, Daughter, Spouse'
                      type='text'
                      additional={true}
                      defaultKey='relationship'
                      defaultValue={formData?.additional_insured_list[i].relationship || ''}
                    />
                    <DateInput
                      id={i}
                      name='date_of_birth'
                      labelName={`Dependent ${i + 1} Date of Birth:`}
                      additional={true}
                      defaultKey='date_of_birth'
                      defaultValue={formData?.additional_insured_list[i].date_of_birth || ''}
                    />
                    <TextInput
                      id={i}
                      labelName={`Dependent ${i + 1} Social Security Number:`}
                      name='ssn'
                      placeholder='Ex. 123-45-6789'
                      type='text'
                      pattern='^\d{3}-\d{2}-\d{4}$'
                      socialSecurity={true}
                      additional={true}
                      defaultKey='ssn'
                      defaultValue={formData?.additional_insured_list[i].ssn || ''}
                    />
                    {formData.additional_insured_list?.[i] && formData.additional_insured_list[i].age >= 18 && (
                      <>
                        <TextInput
                          id={i}
                          labelName={`Dependent ${i + 1} State ID Number:`}
                          name='driver_license_number'
                          placeholder='Ex. L12312312312'
                          type='text'
                          uppercase={true}
                          additional={true}
                          defaultKey='driver_license_number'
                          defaultValue={formData?.additional_insured_list[i].driver_license_number || ''}
                        />
                        <DropDownInput
                          id={i}
                          labelName={`Dependent ${i + 1} Country of Birth:`}
                          name='country_of_birth'
                          additional={true}
                          options={countries}
                          defaultOption={
                            formData?.additional_insured_list?.[i]?.country_of_birth || 'Please select a country'
                          }
                        />
                        {formData.additional_insured_list[i].country_of_birth === 'United States Of America' && (
                          <DropDownInput
                            id={i}
                            labelName={`Dependent ${i + 1} State of Birth:`}
                            name='state_of_birth'
                            additional={true}
                            options={unitedStates}
                            defaultOption={
                              formData?.additional_insured_list?.[i]?.state_of_birth || 'Please select a state'
                            }
                          />
                        )}
                        <DropDownInput
                          id={i}
                          labelName={`Dependent ${i + 1} Employment Status:`}
                          name='employment_status'
                          additional={true}
                          options={employmentOptions}
                          defaultOption={
                            formData?.additional_insured_list?.[i]?.employment_status ||
                            'Please select an employment status'
                          }
                        />
                        {formData.additional_insured_list[i].employment_status === 'employed' && (
                          <SelectCreateable
                            id={i}
                            labelName='Occupation:'
                            name='occupation'
                            options={occupations}
                            placeholder='Please select an occupation...'
                            additional={true}
                            defaultOption={formData?.additional_insured_list?.[i]?.occupation || ''}
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
                            defaultOption={formData?.additional_insured_list?.[i]?.occupation || ''}
                          />
                        )}
                        <TextInput
                          id={i}
                          labelName={`Dependent ${i + 1} Height:`}
                          name='height'
                          placeholder="Ex. 5'11"
                          type='text'
                          pattern="^(\d{0,1})'(\d{0,2})$"
                          height={true}
                          additional={true}
                          defaultKey='height'
                          defaultValue={formData?.additional_insured_list[i].height || ''}
                        />
                        <TextInput
                          id={i}
                          labelName={`Dependent ${i + 1} Weight:`}
                          name='weight'
                          placeholder='Ex. 150 (Lbs.)'
                          type='text'
                          pattern='^\d{1,3}(?:\.\d)?$'
                          weight={true}
                          additional={true}
                          defaultKey='weight'
                          defaultValue={formData?.additional_insured_list[i].weight || ''}
                        />
                        <TextInput
                          id={i}
                          labelName={`Dependent ${i + 1} Beneficiary:`}
                          name='dependent_beneficiary'
                          placeholder='Ex. John Doe'
                          type='text'
                          additional={true}
                          defaultKey='dependent_beneficiary'
                          defaultValue={formData?.additional_insured_list[i].dependent_beneficiary || ''}
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
                      defaultKey='notes_dependent'
                      defaultValue={formData?.additional_insured_list[i].notes_dependent || ''}
                    />
                    <RemoveDependentButton
                      id='remove-dependent'
                      key={`dependent_${i + 1}_button`}
                      type='button'
                      tabIndex={-1}
                      onClick={() => removeDependent(i)}
                    >
                      <CloseIcon twClasses='text-white fill-white' />
                    </RemoveDependentButton>
                  </AdditionalInsuredContainer>
                );
              })}
            {formData.additional_insured === 'yes' && (
              <AddDependentContainer>
                <AddDependentButton
                  id='add-additional-dependent'
                  disabled={handleHouseholdCheck()}
                  type='button'
                  tabIndex={-1}
                  onClick={addDependent}
                >
                  Add More Dependents
                </AddDependentButton>
              </AddDependentContainer>
            )}
            <DropDownInput
              id='employment_status'
              labelName="Primary's Employment Status:"
              name='employment_status'
              options={employmentOptions}
              defaultOption={formData?.employment_status || 'Please select an employment status'}
            />
            {formData.employment_status === 'employed' && (
              <SelectCreateable
                id='occupation'
                labelName="Primary's Occupation:"
                name='occupation'
                options={occupations}
                placeholder='Please select an occupation...'
                defaultOption={formData?.occupation || ''}
              />
            )}
            {(formData.employment_status === 'retired' || formData.employment_status === 'unemployed') && (
              <SelectCreateable
                id='occupation'
                labelName="Primary's Former occupation:"
                name='occupation'
                options={occupations}
                placeholder='Please select an occupation...'
                defaultOption={formData?.occupation || ''}
              />
            )}
            <TextInput
              labelName='Annual household NET income (after taxes):'
              name='annual_household_income'
              id='annual_household_income'
              placeholder='Ex. $25,000'
              type='text'
              pattern='^\$[0-9]{1,3}(?:,?[0-9]{3})*(?:\.[0-9]{2})?$'
              currency={true}
              defaultKey='annual_household_income'
              defaultValue={formData?.annual_household_income || ''}
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
                placeholder='Ex. Coronary Disease, Cancer, Lupus'
                type='text'
                defaultKey='pre_existing_conditions_list'
                defaultValue={formData?.pre_existing_conditions_list || ''}
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
                placeholder='Ex. Benazepril, Moexipril , Prozac'
                type='text'
                defaultKey='medications_list'
                defaultValue={formData?.medications_list || ''}
              />
            )}
            <TextAreaInput
              labelName='History of mental health, COPD, heart procedures, cancer, HIV?'
              name='medical_history'
              id='medical_history'
              placeholder='Enter history here'
              required={false}
              defaultKey='medical_history'
              defaultValue={formData?.medical_history || ''}
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
                placeholder='Ex. Dr. Lino Fernandez'
                type='text'
                defaultKey='preferred_doctors_name'
                defaultValue={formData?.preferred_doctors_name || ''}
              />
            )}
            <TextInput
              labelName='Monthly budget:'
              name='monthly_budget'
              id='monthly_budget'
              placeholder='Ex. $150'
              type='text'
              pattern='^\$[0-9]{1,3}(?:,?[0-9]{3})*(?:\.[0-9]{2})?$'
              currency={true}
              defaultKey='monthly_budget'
              defaultValue={formData?.monthly_budget || ''}
            />
          </>
          <Divider />
          <>
            <H2>Quote Breakdown</H2>
            <TextInput
              labelName='Plan Name:'
              name='plan_name'
              id='plan_name'
              placeholder='Ex. Florida Blue'
              type='text'
              defaultKey='plan_name'
              defaultValue={formData?.plan_name || ''}
            />
            <TextInput
              labelName='PCP Copay:'
              name='pcp_copay'
              id='pcp_copay'
              placeholder='Ex. $150'
              type='text'
              pattern='^\$[0-9]{1,3}(?:,?[0-9]{3})*(?:\.[0-9]{2})?$'
              currency={true}
              defaultKey='pcp_copay'
              defaultValue={formData?.pcp_copay || ''}
            />
            <TextInput
              labelName='Specialist Copay:'
              name='specialist_copay'
              id='specialist_copay'
              placeholder='Ex. $150'
              type='text'
              pattern='^\$[0-9]{1,3}(?:,?[0-9]{3})*(?:\.[0-9]{2})?$'
              currency={true}
              defaultKey='specialist_copay'
              defaultValue={formData?.specialist_copay || ''}
            />
            <TextInput
              labelName='Generic Meds Copay:'
              name='generic_meds_copay'
              id='generic_meds_copay'
              placeholder='Ex. $50'
              type='text'
              pattern='^\$[0-9]{1,3}(?:,?[0-9]{3})*(?:\.[0-9]{2})?$'
              currency={true}
              defaultKey='generic_meds_copay'
              defaultValue={formData?.generic_meds_copay || ''}
            />
            <TextInput
              labelName='Annual Deductible:'
              name='annual_deductible'
              id='annual_deductible'
              placeholder='Ex. $1,500'
              type='text'
              pattern='^\$[0-9]{1,3}(?:,?[0-9]{3})*(?:\.[0-9]{2})?$'
              currency={true}
              defaultKey='annual_deductible'
              defaultValue={formData?.annual_deductible || ''}
            />
            <TextInput
              labelName='Max Out of Pocket:'
              name='max_out_of_pocket'
              id='max_out_of_pocket'
              placeholder='Ex. $5,000'
              type='text'
              pattern='^\$[0-9]{1,3}(?:,?[0-9]{3})*(?:\.[0-9]{2})?$'
              currency={true}
              defaultKey='max_out_of_pocket'
              defaultValue={formData?.max_out_of_pocket || ''}
            />
            <TextInput
              labelName='All Benefits:'
              name='all_benefits'
              id='all_benefits'
              placeholder='Ex. $5,000'
              type='text'
              pattern='^\$[0-9]{1,3}(?:,?[0-9]{3})*(?:\.[0-9]{2})?$'
              currency={true}
              defaultKey='all_benefits'
              defaultValue={formData?.all_benefits || ''}
            />
          </>
          <Divider />
          <>
            <H2>Closure</H2>
            <TextInput
              labelName='Phone Number:'
              name='phone_number'
              id='phone_number'
              placeholder='Ex. 786-305-6789'
              type='tel'
              pattern='^\d{3}-\d{3}-\d{4}$'
              phone={true}
              defaultKey='phone_number'
              defaultValue={formData?.phone_number || ''}
            />
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
                detail='First or Last Name Missing'
                labelName='First or Last Name Missing'
                id='full_name_missing'
                name='first_name'
                error={true}
              />
            )}
            {formData.date_of_birth ? (
              <DetailConfirmation
                detail={formData.date_of_birth}
                labelName='Confirm Date of Birth'
                id='confirm_date_of_birth'
                name='date_of_birth'
              />
            ) : (
              <DetailConfirmation
                detail='Date of Birth Missing'
                labelName='Date of Birth Missing'
                id='date_of_birth_missing'
                name='date_of_birth'
                error={true}
              />
            )}
            <TextInput
              labelName='Email:'
              name='email'
              id='email'
              placeholder='Ex. johndoe@gmail.com'
              type='email'
              uppercase={false}
              defaultKey='email'
              defaultValue={formData?.email || ''}
            />
            <TextInput
              labelName='Street Address (no P.O. box):'
              name='address'
              id='address'
              placeholder='Ex. 12345 NW 1st St'
              type='text'
              uppercase={false}
              defaultKey='address'
              defaultValue={formData?.address || ''}
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
              labelName="Primary's Height:"
              name='height'
              id='height'
              placeholder="Ex. 5'11"
              type='text'
              pattern="^(\d{0,1})'(\d{0,2})$"
              height={true}
              defaultKey='height'
              defaultValue={formData?.height || ''}
            />
            <TextInput
              labelName="Primary's Weight:"
              name='weight'
              id='weight'
              placeholder='Ex. 150 (Lbs.)'
              type='text'
              pattern='^\d+(\.\d+)?$'
              weight={true}
              defaultKey='weight'
              defaultValue={formData?.weight || ''}
            />
            <TextInput
              labelName="Primary's Social Security Number:"
              name='ssn'
              id='ssn'
              placeholder='Ex. 123-45-6789'
              type='text'
              pattern='^\d{3}-\d{2}-\d{4}$'
              socialSecurity={true}
              defaultKey='ssn'
              defaultValue={formData?.ssn || ''}
            />
            <TextInput
              id='driver_license_number'
              labelName="Primary's Driver License:"
              name='driver_license_number'
              placeholder='Ex. L12312312312'
              type='text'
              uppercase={true}
              required={false}
              defaultKey='driver_license_number'
              defaultValue={formData?.driver_license_number || ''}
            />
            <RadioInput
              labelName='Resident or citizen?'
              name='immigration_status'
              id='immigration_status'
              options={[
                { label: 'Resident', value: 'resident' },
                { label: 'Citizen', value: 'citizen' },
              ]}
            />
          </>
          <Divider />
          <>
            <H2>Beneficiary Information</H2>
            <TextInput
              labelName="Primary's Beneficiary Full Name:"
              name='beneficiary_full_name'
              id='beneficiary_full_name'
              placeholder='Ex. John Doe'
              type='text'
              defaultKey='beneficiary_full_name'
              defaultValue={formData?.beneficiary_full_name || ''}
            />
            <TextInput
              labelName='Beneficiary Relationship:'
              name='beneficiary_relationship'
              id='beneficiary_relationship'
              placeholder='Ex. Son, Daughter, Spouse'
              type='text'
              defaultKey='beneficiary_relationship'
              defaultValue={formData?.beneficiary_relationship || ''}
            />
            <DateInput
              labelName='Beneficiary Date of Birth:'
              name='beneficiary_date_of_birth'
              id='beneficiary_date_of_birth'
              defaultKey='beneficiary_date_of_birth'
              defaultValue={formData?.beneficiary_date_of_birth || ''}
            />
          </>
          <Divider />
          <>
            <H2>Payment Method</H2>
            <RadioInput
              labelName='Checking or savings?'
              name='account_type'
              id='account_type'
              options={[
                { label: 'Savings', value: 'savings' },
                { label: 'Checking', value: 'checking' },
              ]}
            />
            <TextInput
              labelName='Routing Number:'
              name='routing_number'
              id='routing_number'
              placeholder='Ex. 123456789'
              type='text'
              pattern='^\d{9}$'
              routingNumber={true}
              defaultKey='routing_number'
              defaultValue={formData?.routing_number || ''}
            />
            <TextInput
              labelName='Account Number:'
              name='account_number'
              id='account_number'
              placeholder='Ex. 123456789012'
              type='text'
              pattern='^\d{4,17}$'
              accountNumber={true}
              defaultKey='account_number'
              defaultValue={formData?.account_number || ''}
            />
            <TextInput
              labelName='Bank Name:'
              name='bank_name'
              id='bank_name'
              placeholder='Ex. Bank of America'
              type='text'
              defaultKey='bank_name'
              defaultValue={formData?.bank_name || ''}
            />
            <TextInput
              labelName='Name of Account Holder:'
              name='name_of_account_holder'
              id='name_of_account_holder'
              placeholder='Ex. John Doe'
              type='text'
              defaultKey='name_of_account_holder'
              defaultValue={formData?.name_of_account_holder || ''}
            />
          </>
          <Divider />
          <>
            <H2>Disclosure</H2>
            <TextInput
              labelName='Monthly Grand Total:'
              name='monthly_grand_total'
              id='monthly_grand_total'
              placeholder='Ex. $100'
              type='text'
              pattern='^\$[0-9]{1,3}(?:,?[0-9]{3})*(?:\.[0-9]{2})?$'
              currency={true}
              defaultKey='monthly_grand_total'
              defaultValue={formData?.monthly_grand_total || ''}
            />
            <TextInput
              labelName='Health Unsubsidized:'
              name='health_unsubsidized'
              id='health_unsubsidized'
              placeholder='Ex. $1,000'
              type='text'
              pattern='^\$[0-9]{1,3}(?:,?[0-9]{3})*(?:\.[0-9]{2})?$'
              currency={true}
              defaultKey='health_unsubsidized'
              defaultValue={formData?.health_unsubsidized || ''}
            />
            <TextInput
              labelName='CIGNA Dental:'
              name='cigna_dental'
              id='cigna_dental'
              placeholder='Ex. $100'
              type='text'
              pattern='^\$[0-9]{1,3}(?:,?[0-9]{3})*(?:\.[0-9]{2})?$'
              required={false}
              currency={true}
              defaultKey='cigna_dental'
              defaultValue={formData?.cigna_dental || ''}
            />
            <TextInput
              labelName='Death Benefit:'
              name='death_benefit'
              id='death_benefit'
              placeholder='Ex. $250,000'
              type='text'
              pattern='^\$[0-9]{1,3}(?:,?[0-9]{3})*(?:\.[0-9]{2})?$'
              currency={true}
              defaultKey='death_benefit'
              defaultValue={formData?.death_benefit || ''}
            />
          </>
          <Divider />
          <>
            <H2>Totals</H2>
            <TextInput
              labelName='Total Pre-Subsidy'
              name='total_pre_subsidy'
              id='total_pre_subsidy'
              placeholder='Ex. $50,000'
              type='text'
              pattern='^\$[0-9]{1,3}(?:,?[0-9]{3})*(?:\.[0-9]{2})?$'
              currency={true}
              defaultKey='total_pre_subsidy'
              defaultValue={formData?.total_pre_subsidy || ''}
            />
            <TextInput
              labelName='Qualified Subsidy'
              name='qualified_subsidy'
              id='qualified_subsidy'
              placeholder='Ex. $50,000'
              type='text'
              pattern='^\$[0-9]{1,3}(?:,?[0-9]{3})*(?:\.[0-9]{2})?$'
              currency={true}
              defaultKey='qualified_subsidy'
              defaultValue={formData?.qualified_subsidy || ''}
            />
            <TextInput
              labelName='Total Post-Subsidy'
              name='total_post_subsidy'
              id='total_post_subsidy'
              placeholder='Ex. $50,000'
              type='text'
              pattern='^\$[0-9]{1,3}(?:,?[0-9]{3})*(?:\.[0-9]{2})?$'
              currency={true}
              defaultKey='total_post_subsidy'
              defaultValue={formData?.total_post_subsidy || ''}
            />
          </>
          <Divider />
          <ButtonContainer>
            <Button type='submit'>Submit</Button>
            <Button type='button' onClick={handleCopyToClipboard}>
              {copied ? 'Succesfully copied!' : 'Copy for Extension'}
            </Button>
          </ButtonContainer>
        </FormForm>
      </FormSectionContainer>
    );

  return null;
};

export default Form;
