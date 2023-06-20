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
  AgentInfoBox,
  ExternalAnchorButton,
} from '../tw/twStyles';
import TextInput from './TextInput';
import RadioInput from './RadioInput';
import DropDownInput from './DropDownInput';
import TextAreaInput from './TextAreaInput';
import DateInput from './DateInput';
import DetailConfirmation from './DetailConfirmation';
import SelectCreateable from './SelectCreateable';
import LocalStorageInput from './LocalStorageInput';
import { useFormData, initialDependentState } from '../contexts/FormContext';
import { TenStepsAheadLogo } from '../icons/TenStepsAheadLogo';
import { getZipcodeData, ZipcodeDataType } from '../../utility/getZipcodeData';
import {
  unitedStates,
  countries,
  occupations,
  preferredCarriers,
  employmentOptions,
  banks,
  routingNumbers,
} from '../../utility/staticData';
import {
  toTitleCase,
  formDataTitleCased,
  backupAndClearFormData,
  restoreBackupFormData,
  getDraftDate,
  getRoutingNumbers,
  parseCurrency,
} from '../../utility/utility';
import { MutualOfOmahaIcon } from '../icons/MutualOfOmahaIcon';
import { AmericoIcon } from '../icons/AmericoIcon';
import { CloseIcon } from '../icons/CloseIcon';
import { IneligibleIcon } from '../icons/IneligebleIcon';
import type { Carrier, OptionTypes } from '../../types/formData';

const Form = () => {
  const { formData, setFormData } = useFormData();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [successful, setSuccessful] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [carriersData, setCarriersData] = useState<Carrier[]>([]);
  const [zipcodeData, setZipcodeData] = useState<ZipcodeDataType | undefined>(undefined);
  const [bankRoutes, setBankRoutes] = useState<OptionTypes[]>([]);
  const [title, setTitle] = useState<string>('');
  const [draftDate, setDraftDate] = useState<string>('');
  const [bankNameKey, setBankNameKey] = useState<number>(0);
  const [prevBankName, setPrevBankName] = useState(formData.bank_name);
  const [googleRoutingUrl, setGoogleRoutingUrl] = useState<string>('');

  useEffect(() => {
    setDraftDate(getDraftDate());
    const savedFormData = localStorage.getItem('formData');
    if (savedFormData) {
      setFormData(JSON.parse(savedFormData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('formData', JSON.stringify(formData));
  }, [formData]);

  useEffect(() => {
    if (!formData.life_adb_provider) return;
    const init = '';
    if (formData.life_adb_provider === 'mutual') {
      setFormData((prevState) => ({ ...prevState, americo_premium: init }));
    }
    if (formData.life_adb_provider === 'americo') {
      setFormData((prevState) => ({ ...prevState, mutual_quote_gender: init, mutual_face_amount: init }));
    }
  }, [formData.life_adb_provider]);

  useEffect(() => {
    const eligibleAdditionalInsuredList =
      formData.additional_insured_list?.filter(
        (member) => member.age !== null && member.age >= 20 && member.age <= 59,
      ) || [];
    const eligibleAmericoCount =
      (formData.age !== null && formData.age >= 20 && formData.age <= 59 ? 1 : 0) +
      eligibleAdditionalInsuredList.length;

    const americoPremium = parseCurrency(formData.americo_premium) || 48;
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
      formData.additional_insured_list?.filter(
        (member) => member.age !== null && (member.age === 18 || member.age === 19 || member.age >= 60),
      ) || [];
    const eligibleMutualCount =
      (formData.age !== null && (formData.age === 18 || formData.age === 19 || formData.age >= 60) ? 1 : 0) +
      eligibleMutualInsuredList.length;
    const mutualMonthlyAmount = eligibleMutualCount * mutual_of_omaha_premium;
    const grandTotal =
      formData.life_adb_provider === 'americo'
        ? americoMonthlyAmount + monthlyHealthPremium
        : mutualMonthlyAmount + monthlyHealthPremium;

    const formatGrandTotal = grandTotal ? `$${grandTotal.toFixed(2).toString()}` : '';

    setFormData((prevState) => ({
      ...prevState,
      monthly_grand_total: formatGrandTotal,
      eligible_americo_count: eligibleAmericoCount,
      eligible_mutual_count: eligibleMutualCount,
      life_total_cost: americoMonthlyAmount || mutualMonthlyAmount,
    }));
  }, [
    JSON.stringify(formData.additional_insured_list),
    formData.additional_insured,
    formData.monthly_health_premium,
    formData.life_adb_provider,
    formData.mutual_quote_gender,
    formData.mutual_face_amount,
    formData.americo_premium,
    formData.age,
  ]);

  useEffect(() => {
    if (!formData.bank_name) {
      setBankRoutes([]);
      setFormData((prevState) => ({ ...prevState, routing_number: '' }));
      setGoogleRoutingUrl('');
      setBankNameKey((prevKey) => prevKey + 1);
      setPrevBankName(formData.bank_name);
      return;
    }

    const routingNums = routingNumbers[formData.bank_name];
    const newBankRoutes = routingNums ? getRoutingNumbers(routingNums) : [];
    setBankRoutes(newBankRoutes);

    if (formData.bank_name !== prevBankName) {
      setFormData((prevState) => ({ ...prevState, routing_number: '' }));
    }

    if (!routingNums && formData.state) {
      const bankName = formData.bank_name.split(' ').join('+');
      const state = formData.state.split('_').join('+');
      setGoogleRoutingUrl(`https://www.google.com/search?q=${bankName}+routing+number+${state}`);
    } else {
      setGoogleRoutingUrl('');
    }

    setBankNameKey((prevKey) => prevKey + 1);
    setPrevBankName(formData.bank_name);
  }, [formData.bank_name, formData.state]);

  useEffect(() => {
    if (!formData.gender) return;
    if (formData.gender === 'male') {
      setTitle('Mr.');
    }
    if (formData.gender === 'female') {
      if (formData.married === 'yes') {
        setTitle('Mrs.');
      } else {
        setTitle('Ms.');
      }
    }
  }, [formData.gender, formData.married]);

  useEffect(() => {
    const applyingForCoverage =
      1 + (formData.additional_insured_list?.length ? formData.additional_insured_list.length : 0);
    setFormData((prevState) => ({ ...prevState, applying_for_coverage: applyingForCoverage }));
  }, [formData.additional_insured, formData.additional_insured_list]);

  useEffect(() => {
    if (formData.married === 'no') {
      setFormData((prevState) => ({ ...prevState, taxes_filing_status: 'single' }));
    }
  }, [formData.married]);

  useEffect(() => {
    if (formData.country_of_birth === 'United States Of America') {
      setFormData((prevState) => ({ ...prevState, immigration_status: 'citizen' }));
    } else {
      setFormData((prevState) => ({ ...prevState, immigration_status: '' }));
    }
  }, [formData.country_of_birth]);

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
    if (!formData.state) return;
    setFormData((prevState) => ({
      ...prevState,
      carriers: preferredCarriers[formData.state],
    }));
  }, [formData.state]);

  useEffect(() => {
    if (!zipcodeData || !carriersData) return;
    setFormData((prevState) => ({
      ...prevState,
      county: zipcodeData.county,
      state: zipcodeData.state,
      city: zipcodeData.primary_city,
      carriers: carriersData,
    }));
  }, [zipcodeData, carriersData]);

  useEffect(() => {
    if (!formData.life_total_cost || !formData.health_unsubsidized) return;

    const lifeCost = formData.life_total_cost || 0;
    const healthUnsubCost = parseCurrency(formData.health_unsubsidized);
    const total = lifeCost + healthUnsubCost;
    const formattedValue = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(total);
    if (formattedValue) {
      setFormData((prevState) => ({ ...prevState, life_health_unsubsidized: formattedValue }));
    }
  }, [formData.life_total_cost, formData.health_unsubsidized]);

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
      setFormData((prevState) => ({
        ...prevState,
        additional_insured_list: [...prevState.additional_insured_list, newDependent],
      }));
    }
  };

  const removeDependent = (index: number) => {
    setFormData((prevState) => ({
      ...prevState,
      additional_insured_list: formData.additional_insured_list.filter((_, i) => i !== index),
    }));
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
        {/* Clear | Restore */}
        <>
          <HeadingSrOnly>Lead Form</HeadingSrOnly>
          <Divider />
          <ButtonContainer>
            <Button onClick={backupAndClearFormData}>Clear Form</Button>
            <Button onClick={restoreBackupFormData}>Restore Form</Button>
          </ButtonContainer>
        </>
        {/* Individual Agent Info */}
        <>
          <Divider />
          <AgentInfoBox>
            <LocalStorageInput
              labelName='Google App URL:'
              name='google_app_url'
              id='google_app_url'
              placeholder='Ex. https://script.google.com/macros/s/...'
              uppercase={false}
              defaultKey='google_app_url'
              defaultValue={formData?.google_app_url || ''}
              externalValue={formData?.google_app_url}
            />
            <LocalStorageInput
              labelName='Agent Full Name:'
              name='agent_full_name'
              id='agent_full_name'
              placeholder='Ex. John Doe'
              defaultKey='agent_full_name'
              defaultValue={formData?.agent_full_name || ''}
              externalValue={formData?.agent_full_name}
            />
            <LocalStorageInput
              labelName='Agent License Number:'
              name='agent_license_number'
              id='agent_license_number'
              placeholder='Ex. 123456789'
              defaultKey='agent_license_number'
              defaultValue={formData?.agent_license_number || ''}
              externalValue={formData?.agent_license_number}
            />
          </AgentInfoBox>
        </>
        <FormForm autoComplete='off' autoCapitalize='on' onSubmit={handleSubmit}>
          {/* Customer Details */}
          <>
            <Divider />
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
              labelName='Gender:'
              name='gender'
              id='gender'
              options={[
                { label: 'Male', value: 'male' },
                { label: 'Female', value: 'female' },
              ]}
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
          {/* Health Questionare */}
          <>
            <Divider />
            <H2>Health Questionare</H2>
            <DropDownInput
              id='employment_status'
              labelName="Primary's Employment Status:"
              name='employment_status'
              options={employmentOptions}
              defaultOption={formData?.employment_status || 'Please select an employment status'}
            />
            {formData.employment_status === 'employed' && (
              <>
                <SelectCreateable
                  id='occupation'
                  labelName="Primary's Occupation:"
                  name='occupation'
                  options={occupations}
                  placeholder='Please select an occupation...'
                  defaultOption={formData?.occupation || ''}
                />
              </>
            )}
            {(formData.employment_status === 'retired' || formData.employment_status === 'unemployed') && (
              <>
                <SelectCreateable
                  id='occupation'
                  labelName="Primary's Former occupation:"
                  name='occupation'
                  options={occupations}
                  placeholder='Please select an occupation...'
                  defaultOption={formData?.occupation || ''}
                />
              </>
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
            {formData.age !== null && formData.age < 18 && (
              <EligibilityIconContainer>
                <IneligibleIcon twClasses={'h-10'} />
              </EligibilityIconContainer>
            )}
            {formData.age !== null && (formData.age === 18 || formData.age === 19 || formData.age >= 60) && (
              <EligibilityIconContainer>
                <MutualOfOmahaIcon twClasses={'h-10'} />
              </EligibilityIconContainer>
            )}
            {formData.age !== null && formData.age >= 20 && formData.age <= 59 && (
              <EligibilityIconContainer>
                <AmericoIcon twClasses={'h-10'} />
              </EligibilityIconContainer>
            )}
            <DateInput
              labelName='Date of Birth:'
              name='date_of_birth'
              id='date_of_birth'
              defaultKey='date_of_birth'
              ageKey='age'
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
              formData.household_size &&
              formData.household_size !== '1' &&
              formData.additional_insured_list?.map((dependent, i) => {
                return (
                  <AdditionalInsuredContainer key={`dependent_${i + 1}_info`}>
                    {dependent.age !== null && dependent.age < 18 && (
                      <EligibilityIconContainer>
                        <IneligibleIcon twClasses={'h-10'} />
                      </EligibilityIconContainer>
                    )}
                    {dependent.age !== null &&
                      (dependent.age === 18 || dependent.age === 19 || dependent.age >= 60) && (
                        <EligibilityIconContainer>
                          <MutualOfOmahaIcon twClasses={'h-10'} />
                        </EligibilityIconContainer>
                      )}
                    {dependent.age !== null && dependent.age >= 20 && dependent.age <= 59 && (
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
                      uppercase={true}
                      defaultKey='full_name'
                      defaultValue={dependent.full_name || ''}
                    />
                    <TextInput
                      id={i}
                      labelName={`Dependent ${i + 1} Relationship to Primary:`}
                      name='relationship_to_primary'
                      placeholder='Ex. Son, Daughter, Spouse'
                      type='text'
                      additional={true}
                      uppercase={true}
                      defaultKey='relationship_to_primary'
                      defaultValue={dependent.relationship_to_primary || ''}
                    />
                    <DateInput
                      id={i}
                      name='date_of_birth'
                      labelName={`Dependent ${i + 1} Date of Birth:`}
                      additional={true}
                      ageKey='age'
                      defaultKey='date_of_birth'
                      defaultValue={dependent.date_of_birth || ''}
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
                      defaultValue={dependent.ssn || ''}
                    />
                    {formData.additional_insured_list[i] && dependent.age !== null && dependent.age >= 18 && (
                      <>
                        <DropDownInput
                          id={i}
                          labelName={`Dependent ${i + 1} Country of Birth:`}
                          name='country_of_birth'
                          additional={true}
                          options={countries}
                          defaultOption={dependent.country_of_birth || 'Please select a country'}
                        />
                        {dependent.country_of_birth === 'United States Of America' && (
                          <DropDownInput
                            id={i}
                            labelName={`Dependent ${i + 1} State of Birth:`}
                            name='state_of_birth'
                            additional={true}
                            options={unitedStates}
                            defaultOption={dependent.state_of_birth || 'Please select a state'}
                          />
                        )}
                        <DropDownInput
                          id={i}
                          labelName={`Dependent ${i + 1} Employment Status:`}
                          name='employment_status'
                          additional={true}
                          options={employmentOptions}
                          defaultOption={dependent.employment_status || 'Please select an employment status'}
                        />
                        {dependent.employment_status === 'employed' && (
                          <SelectCreateable
                            id={i}
                            labelName='Occupation:'
                            name='occupation'
                            options={occupations}
                            placeholder='Please select an occupation...'
                            additional={true}
                            defaultOption={dependent.occupation || ''}
                          />
                        )}
                        {(dependent.employment_status === 'retired' ||
                          dependent.employment_status === 'unemployed') && (
                          <SelectCreateable
                            id={i}
                            labelName='Former occupation:'
                            name='occupation'
                            options={occupations}
                            placeholder='Please select an occupation...'
                            additional={true}
                            defaultOption={dependent.occupation || ''}
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
                          defaultValue={dependent.height || ''}
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
                          defaultValue={dependent.weight || ''}
                        />
                        <TextInput
                          id={i}
                          labelName={`Dependent ${i + 1} Beneficiary (Full Name):`}
                          name='beneficiary_full_name'
                          placeholder='Ex. John Doe'
                          type='text'
                          uppercase={true}
                          additional={true}
                          defaultKey='beneficiary_full_name'
                          defaultValue={dependent.beneficiary_full_name || ''}
                        />
                        <TextInput
                          id={i}
                          labelName={`Dependent ${i + 1} Beneficiary (Relationship to Dependent):`}
                          name='beneficiary_relationship'
                          placeholder='Ex. Son, Daughter, Spouse'
                          type='text'
                          uppercase={true}
                          additional={true}
                          defaultKey='beneficiary_relationship'
                          defaultValue={dependent.beneficiary_relationship || ''}
                        />
                        <DateInput
                          id={i}
                          name='beneficiary_date_of_birth'
                          labelName={`Dependent ${i + 1} Beneficiary (Date of Birth):`}
                          additional={true}
                          ageKey='beneficiary_age'
                          defaultKey='beneficiary_date_of_birth'
                          defaultValue={dependent.beneficiary_date_of_birth || ''}
                        />
                      </>
                    )}
                    <TextAreaInput
                      id={i}
                      labelName='Notes:'
                      name='notes'
                      placeholder='Enter notes here'
                      additional={true}
                      required={false}
                      defaultKey='notes'
                      defaultValue={dependent.notes || ''}
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
              <>
                <TextInput
                  labelName='Specific medications:'
                  name='medications_list'
                  id='medications_list'
                  placeholder='Ex. Benazepril, Moexipril , Prozac'
                  type='text'
                  defaultKey='medications_list'
                  defaultValue={formData?.medications_list || ''}
                />
              </>
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
              <>
                <TextInput
                  labelName='Doctor Name:'
                  name='preferred_doctors_name'
                  id='preferred_doctors_name'
                  placeholder='Ex. Dr. Lino Fernandez'
                  type='text'
                  defaultKey='preferred_doctors_name'
                  defaultValue={formData?.preferred_doctors_name || ''}
                />
              </>
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
          {/* Quote Breakdown */}
          <>
            <Divider />
            <H2>Quote Breakdown</H2>
            <TextInput
              labelName='Carrier Name:'
              name='carrier_name'
              id='carrier_name'
              placeholder='Ex. Florida Blue'
              type='text'
              defaultKey='carrier_name'
              defaultValue={formData?.carrier_name || ''}
            />
            <TextInput
              labelName='Plan Name:'
              name='plan_name'
              id='plan_name'
              placeholder='Ex. Elite Bronze'
              type='text'
              defaultKey='plan_name'
              defaultValue={formData?.plan_name || ''}
            />
            <TextInput
              labelName='PCP Copay (Primary Care Visit):'
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
              labelName='Specialist Copay (Specialist Visit):'
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
          </>
          {/* Disclosure */}
          <>
            <Divider />
            <H2>Disclosure</H2>
            <TextInput
              labelName='Monthly Grand Total:'
              name='monthly_grand_total'
              id='monthly_grand_total'
              placeholder='Ex. $100'
              type='text'
              pattern='^\$[0-9]{1,3}(?:,?[0-9]{3})*(?:\.[0-9]{2})?$'
              currency={true}
              useDefault={true}
              defaultKey='monthly_grand_total'
              defaultValue={formData?.monthly_grand_total || ''}
              externalValue={formData?.monthly_grand_total}
            />
            <TextInput
              labelName={`Health Unsubsidized:`}
              name='health_unsubsidized'
              id='health_unsubsidized'
              placeholder='Ex. $305.40'
              type='text'
              pattern='^\$[0-9]{1,3}(?:,?[0-9]{3})*(?:\.[0-9]{2})?$'
              strikeout={true}
              currency={true}
              defaultKey='health_unsubsidized'
              defaultValue={formData?.health_unsubsidized || ''}
            />
            {formData?.health_unsubsidized && formData?.life_health_unsubsidized && formData?.monthly_grand_total && (
              <>
                <DetailConfirmation
                  detail={formData.life_health_unsubsidized}
                  labelName={`Life & Health Unsubsidized (Health: ${formData?.health_unsubsidized} + Life: $${formData?.life_total_cost}):`}
                  id='life_health_unsubsidized'
                  name='life_health_unsubsidized'
                />
              </>
            )}
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
          {/* Closure */}
          <>
            <Divider />
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
              <DetailConfirmation detail={toTitleCase(formData.city)} labelName='Confirm City:' id='confirm_city' />
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
            <DropDownInput
              id={'country_of_birth'}
              labelName={`Primary's Country of Birth:`}
              name='country_of_birth'
              additional={true}
              options={countries}
              defaultOption={formData?.country_of_birth || 'Please select a country'}
            />
            {formData.country_of_birth === 'United States Of America' && (
              <>
                <DropDownInput
                  id={'state_of_birth'}
                  labelName={`Primary's State of Birth:`}
                  name='state_of_birth'
                  additional={true}
                  options={unitedStates}
                  defaultOption={formData?.state_of_birth || 'Please select a state'}
                />
              </>
            )}
            <RadioInput
              labelName='Immigration status:'
              name='immigration_status'
              id='immigration_status'
              defaultOption={formData.immigration_status}
              options={[
                { label: 'Resident', value: 'resident' },
                { label: 'Citizen', value: 'citizen' },
              ]}
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
          </>
          {/* Beneficiary Information */}
          <>
            <Divider />
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
              ageKey='beneficiary_age'
              defaultValue={formData?.beneficiary_date_of_birth || ''}
            />
          </>
          {/* Payment Method */}
          <>
            <Divider />
            <H2>Payment Method</H2>
            <SelectCreateable
              id='bank_name'
              labelName='Bank Name:'
              name='bank_name'
              options={banks}
              placeholder='Please select a bank or create one...'
              defaultOption={formData?.bank_name || ''}
            />
            <RadioInput
              labelName='Account type:'
              name='account_type'
              id='account_type'
              options={[
                { label: 'Savings', value: 'savings' },
                { label: 'Checking', value: 'checking' },
              ]}
            />
            <SelectCreateable
              key={bankNameKey}
              id='routing_number'
              labelName='Bank Routing Number:'
              name='routing_number'
              options={bankRoutes}
              placeholder="Please select the bank's routing state or create one..."
              defaultOption={formData?.routing_number || ''}
            />
            {googleRoutingUrl && (
              <AddDependentContainer
                title={`Google Routing Number for ${toTitleCase(formData.bank_name)} in the state of ${toTitleCase(
                  formData.state,
                )}`}
              >
                <ExternalAnchorButton href={googleRoutingUrl} target='_blank'>
                  {`Click here to Google it!`}
                </ExternalAnchorButton>
              </AddDependentContainer>
            )}
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
              labelName='Name of Account Holder:'
              name='name_of_account_holder'
              id='name_of_account_holder'
              placeholder='Ex. John Doe'
              type='text'
              defaultKey='name_of_account_holder'
              defaultValue={formData?.name_of_account_holder || ''}
            />
          </>
          {/* Submit | Copy */}
          <>
            <Divider />
            <ButtonContainer>
              <Button type='submit'>Submit</Button>
              <Button type='button' onClick={handleCopyToClipboard}>
                {copied ? 'Succesfully copied!' : 'Copy for Extension'}
              </Button>
            </ButtonContainer>
          </>
        </FormForm>
      </FormSectionContainer>
    );

  return null;
};

export default Form;
