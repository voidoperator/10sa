/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useFormData, initialDependentState } from './contexts/FormContext';
import { useConstantData } from './contexts/ConstantDataContext';
import TextInput from './form/TextInput';
import RadioInput from './form/RadioInput';
import DropDownInput from './form/DropDownInput';
import TextAreaInput from './form/TextAreaInput';
import DateInput from './form/DateInput';
import DetailConfirmation from './form/DetailConfirmation';
import SelectCreateable from './form/SelectCreateable';
import Script from './form/Script';
import DynamicButton from './form/DynamicButton';
import LocalStorageInput from './local/LocalStorageInput';
import { getZipcodeData, ZipcodeDataType } from '@/utility/getZipcodeData';
import { DoublePlayLogo } from './icons/DoublePlayLogo';
import { MutualOfOmahaIcon } from './icons/MutualOfOmahaIcon';
import { AmericoIcon } from './icons/AmericoIcon';
import { CloseIcon } from './icons/CloseIcon';
import { IneligibleIcon } from './icons/IneligebleIcon';
import {
  AddDependentButton,
  AddDependentContainer,
  AdditionalInsuredContainer,
  Button,
  ButtonContainer,
  Divider,
  EligibilityIconContainer,
  FormTag,
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
  GoogleButtonContainer,
  Break,
} from './TailwindStyled';
import {
  unitedStates,
  countries,
  occupations,
  preferredCarriers,
  employmentOptions,
  banks,
  routingNumbers,
  mockJsonData,
} from '@/utility/staticData';
import {
  toTitleCase,
  sanatizeFormData,
  getNextMonth,
  getDayWithSuffix,
  getRoutingNumbers,
  parseCurrency,
} from '@/utility/utility';
import type { Carrier, FormDataType, OptionTypes } from '@/types/formData';
import Cookies from 'js-cookie';
import { useSetAgency } from '@/hooks/useSetAgency';
import ConfirmLocal from './local/ConfirmLocal';

const Form = () => {
  // State management
  const { formData, setFormData } = useFormData();
  const { constantData } = useConstantData();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSendingEmail, setIsSendingEmail] = useState<boolean>(false);
  const [successful, setSuccessful] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [primaryName, setPrimaryName] = useState('Primary');
  const [beneficiaryName, setBeneficiaryName] = useState('Beneficiary');
  const [carriersData, setCarriersData] = useState<Carrier[]>([]);
  const [zipcodeData, setZipcodeData] = useState<ZipcodeDataType | undefined>(undefined);
  const [bankRoutes, setBankRoutes] = useState<OptionTypes[]>([]);
  const [title, setTitle] = useState<string>('');
  const [nextMonth, setNextMonth] = useState<string>('');
  const [dayWithSuffix, setDayWithSuffix] = useState<string>('');
  const [bankNameKey, setBankNameKey] = useState<number>(0);
  const [prevBankName, setPrevBankName] = useState(formData.bank_name);
  const [googleRoutingUrl, setGoogleRoutingUrl] = useState<string>('');
  const [googlePlanPdf, setGooglePlanPdf] = useState<string>('');
  const { agency, setAgency } = useSetAgency();

  const router = useRouter();

  // Set formData
  useEffect(() => {
    localStorage.setItem('formData', JSON.stringify(formData));
  }, [formData]);

  // Set constantData
  useEffect(() => {
    localStorage.setItem('constantData', JSON.stringify(constantData));
  }, [constantData]);

  // Side effects
  useEffect(() => {
    setNextMonth(getNextMonth());
    setDayWithSuffix(getDayWithSuffix());
  }, []);

  useEffect(() => {
    if (formData.first_name === '') {
      setPrimaryName('Primary');
    } else {
      const formatName = toTitleCase(formData.first_name);
      setPrimaryName(formatName);
    }
  }, [formData.first_name]);

  useEffect(() => {
    if (formData.beneficiary_full_name === '') {
      setBeneficiaryName('Beneficiary');
    } else {
      const formatName = toTitleCase(formData.beneficiary_full_name.split(' ')[0]);
      setBeneficiaryName(formatName);
    }
  }, [formData.beneficiary_full_name]);

  useEffect(() => {
    if (!formData.employment_status) return;
    const init = '';
    if (
      (formData.employment_status === 'Disabled' ||
        formData.employment_status === 'Student' ||
        formData.employment_status === 'Stay-at-home') &&
      formData.occupation !== ''
    ) {
      setFormData((prevState) => ({ ...prevState, occupation: init }));
    }
  }, [formData.employment_status]);

  useEffect(() => {
    if (!formData.date_of_birth || !formData.age === null) return;
    if (formData.date_of_birth === '') {
      setFormData((prevState) => ({ ...prevState, age: null }));
    }
  }, [formData.date_of_birth]);

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
        mutual_of_omaha_premium = 10.289 + multiplier * 1.1811;
      } else if (formData.mutual_quote_gender === 'female') {
        mutual_of_omaha_premium = 7.529 + multiplier * 0.6301;
      }
      mutual_of_omaha_premium = parseFloat(mutual_of_omaha_premium.toFixed(2));
    }

    const eligibleMutualInsuredList =
      formData.additional_insured_list?.filter(
        (member) => member.age !== null && member.age >= 18 && member.age <= 70,
      ) || [];
    const eligibleMutualCount =
      (formData.age !== null && formData.age >= 18 && formData.age <= 70 ? 1 : 0) + eligibleMutualInsuredList.length;
    const mutualMonthlyAmount = eligibleMutualCount * mutual_of_omaha_premium;
    const grandTotal =
      formData.life_adb_provider === 'americo'
        ? americoMonthlyAmount + monthlyHealthPremium
        : mutualMonthlyAmount + monthlyHealthPremium;

    const formatGrandTotal = grandTotal ? `$${grandTotal.toFixed(2).toString()}` : '';

    if (formData.life_adb_provider === 'americo') {
      setFormData((prevState) => ({
        ...prevState,
        monthly_grand_total: formatGrandTotal,
        eligible_americo_count: eligibleAmericoCount,
        eligible_mutual_count: eligibleMutualCount,
        life_total_cost: americoMonthlyAmount,
      }));
    }
    if (formData.life_adb_provider === 'none') {
      const grandTotal = formatGrandTotal ? formatGrandTotal : '$0';
      setFormData((prevState) => ({
        ...prevState,
        monthly_grand_total: grandTotal,
        life_total_cost: 0,
      }));
    }
    if (formData.life_adb_provider === 'mutual') {
      setFormData((prevState) => ({
        ...prevState,
        monthly_grand_total: formatGrandTotal,
        eligible_americo_count: eligibleAmericoCount,
        eligible_mutual_count: eligibleMutualCount,
        life_total_cost: mutualMonthlyAmount,
      }));
    }
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
    if (!formData.americo_premium && !formData.mutual_face_amount) return;
    let deathBenefit: string;
    if (formData.life_adb_provider === 'americo' && formData.americo_premium) {
      switch (formData.americo_premium) {
        case '$27':
          deathBenefit = '$100,000';
          break;
        case '$35':
          deathBenefit = '$150,000';
          break;
        case '$42':
          deathBenefit = '$200,000';
          break;
        case '$48':
          deathBenefit = '$250,000';
          break;
        default:
          break;
      }
      setFormData((prevState) => ({ ...prevState, death_benefit: deathBenefit }));
      return;
    }
    if (formData.life_adb_provider === 'mutual' && formData.mutual_face_amount) {
      deathBenefit = formData.mutual_face_amount;
      setFormData((prevState) => ({ ...prevState, death_benefit: deathBenefit }));
      return;
    }
  }, [formData.americo_premium, formData.mutual_face_amount]);

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
      const bankName = encodeURIComponent(formData.bank_name);
      const state = encodeURIComponent(formData.state);
      setGoogleRoutingUrl(`https://www.google.com/search?q=${bankName}+routing+number+${state}`);
    } else {
      setGoogleRoutingUrl('');
    }

    setBankNameKey((prevKey) => prevKey + 1);
    setPrevBankName(formData.bank_name);
  }, [formData.bank_name, formData.state]);

  useEffect(() => {
    if (!formData.state || !formData.carrier_name || !formData.plan_name) return;
    const carrierName = encodeURIComponent(formData.carrier_name);
    let planName = formData.plan_name.replace(/ *\([^)]*\) */g, ' ');
    planName = encodeURIComponent(planName.trim());
    const state = encodeURIComponent(toTitleCase(formData.state));
    setGooglePlanPdf(`https://www.google.com/search?q=${carrierName}+${planName}+${state}+plan+brochure`);
  }, [formData.state, formData.carrier_name, formData.plan_name]);

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
    if (!formData.married) return;
    if (formData.married === 'no' && !formData.claims_dependents) {
      setFormData((prevState) => ({ ...prevState, taxes_filing_status: 'Single' }));
      return;
    }
    if (formData.married === 'no' && formData.claims_dependents === 'no') {
      setFormData((prevState) => ({ ...prevState, household_size: '1', additional_insured: 'no' }));
      return;
    }
    if (formData.married === 'yes' && formData.claims_dependents === 'no') {
      setFormData((prevState) => ({ ...prevState, household_size: '2' }));
      return;
    }
    if (formData.married === 'yes' && formData.claims_dependents === 'yes' && Number(formData.household_size) <= 1) {
      setFormData((prevState) => ({ ...prevState, household_size: '2', additional_insured: 'no' }));
      return;
    }
  }, [formData.married, formData.claims_dependents]);

  useEffect(() => {
    if (!formData.married || !formData.taxes_filing_status) return;
    let incompatible = false;
    if (
      formData.married === 'yes' &&
      (formData.taxes_filing_status === 'Single' || formData.taxes_filing_status === 'Head of household')
    ) {
      incompatible = true;
    }
    if (
      formData.married === 'no' &&
      formData.taxes_filing_status !== 'Single' &&
      formData.taxes_filing_status !== 'Head of household'
    ) {
      incompatible = true;
    }
    if (incompatible) {
      setFormData((prevState) => ({ ...prevState, taxes_filing_status: '' }));
      return;
    }
  }, [formData.married, formData.taxes_filing_status]);

  useEffect(() => {
    if (!formData.pre_existing_conditions || !formData.pre_existing_conditions_list) return;
    if (formData.pre_existing_conditions === 'no' && formData.pre_existing_conditions_list) {
      setFormData((prevState) => ({ ...prevState, pre_existing_conditions_list: '' }));
    }
  }, [formData.pre_existing_conditions]);

  useEffect(() => {
    if (!formData.medications || !formData.medications_list) return;
    if (formData.medications === 'no' && formData.medications_list) {
      setFormData((prevState) => ({ ...prevState, medications_list: '' }));
    }
  }, [formData.medications]);

  useEffect(() => {
    if (!formData.preferred_doctors || !formData.preferred_doctors_name) return;
    if (formData.preferred_doctors === 'no' && formData.preferred_doctors_name) {
      setFormData((prevState) => ({ ...prevState, preferred_doctors_name: '' }));
    }
  }, [formData.preferred_doctors]);

  useEffect(() => {
    if (formData.country_of_birth === 'United States Of America' && formData.immigration_status !== 'citizen') {
      setFormData((prevState) => ({ ...prevState, immigration_status: 'citizen' }));
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

  // Function handlers
  const handleEmailADBDisableButton = () => {
    const agency = Cookies.get('agency') || localStorage.getItem('agency');
    if (!agency) return true;
    if (
      formData &&
      formData.monthly_grand_total &&
      formData.plan_summary_pdf &&
      formData.email &&
      formData.life_adb_provider &&
      formData.first_name &&
      formData.carrier_name &&
      constantData.agent_email &&
      constantData.agent_full_name &&
      constantData.agent_license_number &&
      constantData.agent_phone_number &&
      agency
    ) {
      return false;
    }
    return true;
  };

  const handleEmailHealthDisableButton = () => {
    const agency = Cookies.get('agency') || localStorage.getItem('agency');
    if (!agency) return true;
    if (
      formData &&
      formData.monthly_grand_total &&
      formData.plan_summary_pdf &&
      formData.email &&
      formData.first_name &&
      formData.carrier_name &&
      constantData.agent_email &&
      constantData.agent_full_name &&
      constantData.agent_license_number &&
      constantData.agent_phone_number &&
      agency
    ) {
      return false;
    }
    return true;
  };

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
    const formatData = sanatizeFormData(formData);
    navigator.clipboard
      .writeText(JSON.stringify(formatData))
      .then(() => {
        console.log('Copied form data to clipboard');
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
        }, 5000);
      })
      .catch((err) => console.log(`Could not copy text: ${err}`));
  };

  const handleEmailCustomerADB = async () => {
    if (isSendingEmail) return;
    setIsSendingEmail(true);

    // Retrieve agency
    const agency = Cookies.get('agency') || localStorage.getItem('agency');

    // Format formData
    const formatData = sanatizeFormData(formData) as FormDataType;

    // Auto send email to client data
    const agentName = toTitleCase(constantData.agent_full_name || '');
    const informationalLink =
      formData.life_adb_provider === 'americo'
        ? 'https://www.10sa.org/AmericoInformational.pdf'
        : 'https://cdn.mutualofomaha.com/mutualofomaha/documents/pdfs/newsroom/mutual-of-omaha-overview-2022.pdf';
    let phonePretty;
    let phoneHref;
    if (constantData.agent_phone_number) {
      let formatPhonePretty = constantData.agent_phone_number.split('-');
      const [area = '', three = '', four = ''] = formatPhonePretty;
      phonePretty = `(${area}) ${three}-${four}`;
      phoneHref = `${area}${three}${four}`;
    }

    // Parse information for email
    const emailData = {
      type: 'adb',
      agency: agency,
      customerEmail: formatData.email,
      customerFirstName: formatData.first_name,
      carrierName: formatData.carrier_name,
      adbProviderName: formatData.life_adb_provider,
      monthlyGrandTotal: formatData.monthly_grand_total,
      planSummaryLink: formatData.plan_summary_pdf,
      adbInformationalLink: informationalLink,
      agentFullName: agentName,
      agentPhoneNumberPretty: phonePretty,
      agentPhoneNumberHref: phoneHref,
      agentEmail: constantData.agent_email,
      agentLicenseNumber: constantData.agent_license_number,
    };

    try {
      const response = await fetch('/api/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData),
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(` emailing client... ${data.error}`);
      }
      setIsSendingEmail(false);
      setSuccessful(true);
      setTimeout(() => {
        setSuccessful(false);
      }, 4000);
    } catch (error: any) {
      setErrorMessage(error.toString());
      setIsSendingEmail(false);
      setError(true);
      setTimeout(() => {
        setErrorMessage('');
        setError(false);
      }, 6000);
    }
  };

  const handleEmailCustomerHealth = async () => {
    if (isSendingEmail) return;
    setIsSendingEmail(true);

    // Retrieve agency
    const agency = Cookies.get('agency') || localStorage.getItem('agency');

    // Format formData
    const formatData = sanatizeFormData(formData) as FormDataType;

    // Auto send email to client data
    const agentName = toTitleCase(constantData.agent_full_name || '');
    let phonePretty;
    let phoneHref;
    if (constantData.agent_phone_number) {
      let formatPhonePretty = constantData.agent_phone_number.split('-');
      const [area = '', three = '', four = ''] = formatPhonePretty;
      phonePretty = `(${area}) ${three}-${four}`;
      phoneHref = `${area}${three}${four}`;
    }

    // Parse information for email
    const emailData = {
      type: 'health',
      agency: agency,
      customerEmail: formatData.email,
      customerFirstName: formatData.first_name,
      carrierName: formatData.carrier_name,
      monthlyGrandTotal: formatData.monthly_grand_total,
      planSummaryLink: formatData.plan_summary_pdf,
      agentFullName: agentName,
      agentPhoneNumberPretty: phonePretty,
      agentPhoneNumberHref: phoneHref,
      agentEmail: constantData.agent_email,
      agentLicenseNumber: constantData.agent_license_number,
    };

    try {
      const response = await fetch('/api/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData),
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(` emailing client... ${data.error}`);
      }
      setIsSendingEmail(false);
      setSuccessful(true);
      setTimeout(() => {
        setSuccessful(false);
      }, 4000);
    } catch (error: any) {
      setErrorMessage(error.toString());
      setIsSendingEmail(false);
      setError(true);
      setTimeout(() => {
        setErrorMessage('');
        setError(false);
      }, 6000);
    }
  };

  const handlePostToGoogle = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!constantData.google_app_url) return;
    setIsSubmitting(true);
    const formatDataJson = sanatizeFormData(formData) as FormDataType;
    const baseUrl = constantData.google_app_url;
    try {
      const response = await fetch(baseUrl, {
        method: 'POST',
        body: JSON.stringify(formatDataJson),
      });
      if (!response.ok) {
        throw new Error(`Error posting to Google: ${response.status}`);
      }
      setIsSubmitting(false);
      setSuccessful(true);
      setTimeout(() => {
        setSuccessful(false);
      }, 4000);
    } catch (error: any) {
      setErrorMessage(error.toString());
      setIsSubmitting(false);
      setError(true);
      setTimeout(() => {
        setErrorMessage('');
        setError(false);
      }, 6000);
    }
  };

  const handleMockGoogleAppPost = async () => {
    if (!constantData.google_app_url) return;
    setIsSubmitting(true);
    const mockFormData = JSON.stringify(mockJsonData);
    const baseUrl = constantData.google_app_url;
    try {
      const response = await fetch(baseUrl, {
        method: 'POST',
        body: mockFormData,
      });
      if (!response.ok) {
        throw new Error(`Error posting to Google: ${response.status}`);
      }
      setIsSubmitting(false);
      setSuccessful(true);
      setTimeout(() => {
        setSuccessful(false);
      }, 4000);
    } catch (error: any) {
      setErrorMessage(error.toString());
      setIsSubmitting(false);
      setError(true);
      setTimeout(() => {
        setErrorMessage('');
        setError(false);
      }, 6000);
    }
  };

  const backupAndClearFormData = async () => {
    const currentFormData = localStorage.getItem('formData') || '';
    if (currentFormData) {
      localStorage.setItem('backupFormData', localStorage.getItem('formData') || '');
      localStorage.removeItem('formData');
      router.reload();
    }
  };

  const restoreBackupFormData = () => {
    const backupData = localStorage.getItem('backupFormData');
    if (backupData) {
      localStorage.setItem('formData', backupData);
      localStorage.removeItem('backupFormData');
      router.reload();
    } else {
      console.log('No backup data found');
    }
  };

  // Form renders
  if (isSubmitting)
    return (
      <MainContainer>
        <MainWrapper>
          <StatusText>Posting to Google Sheets...</StatusText>
        </MainWrapper>
      </MainContainer>
    );

  if (isSendingEmail)
    return (
      <MainContainer>
        <MainWrapper>
          <StatusText>Sending email to customer...</StatusText>
        </MainWrapper>
      </MainContainer>
    );

  if (successful)
    return (
      <MainContainer>
        <MainWrapper>
          <StatusText>Success!</StatusText>
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

  return (
    <FormSectionContainer>
      <LogoContainer>
        <DoublePlayLogo twClasses='w-2/3 4xl:max-w-4xl 3xl:max-w-3xl 2xl:max-w-3xl xl:max-w-2xl lg:max-w-xl hover:opacity-90 transition-all' />
      </LogoContainer>
      {/* Clear | Restore | Test */}
      <>
        <HeadingSrOnly>Lead Form</HeadingSrOnly>
        <Divider />
        <ButtonContainer>
          <Button onClick={backupAndClearFormData}>Clear Form</Button>
          <Button onClick={restoreBackupFormData}>Restore Form</Button>
        </ButtonContainer>
      </>
      {/* Agent */}
      <>
        <Divider />
        <H2 id='agent'>Agent Information</H2>
        <AgentInfoBox>
          <LocalStorageInput
            labelName='Google App URL:'
            name='google_app_url'
            id='google_app_url'
            placeholder='Ex. https://script.google.com/macros/s/...'
            uppercase={false}
            defaultKey='google_app_url'
            defaultValue={constantData?.google_app_url || ''}
            externalValue={constantData?.google_app_url}
          />
          <DynamicButton
            id={'googleTestButton'}
            handleClick={handleMockGoogleAppPost}
            pattern={/^https:\/\/script\.google\.com\/macros\/.*\/exec$/}
            check={constantData.google_app_url || ''}
            labelNameOptions={{
              empty: 'Enter Google App URL',
              invalid: 'Invalid Google App URL',
              valid: 'Test Google App URL',
            }}
          />
          <LocalStorageInput
            labelName='Agent Full Name:'
            name='agent_full_name'
            id='agent_full_name'
            placeholder='Ex. John Doe'
            defaultKey='agent_full_name'
            defaultValue={constantData?.agent_full_name || ''}
            externalValue={constantData?.agent_full_name}
          />
          <LocalStorageInput
            labelName='Agent License Number:'
            name='agent_license_number'
            id='agent_license_number'
            placeholder='Ex. 123456789'
            defaultKey='agent_license_number'
            defaultValue={constantData?.agent_license_number || ''}
            externalValue={constantData?.agent_license_number}
          />
          <LocalStorageInput
            labelName='Agent NPN:'
            name='agent_npn'
            id='agent_npn'
            placeholder='Ex. 123456789'
            defaultKey='agent_npn'
            defaultValue={constantData?.agent_npn || ''}
            externalValue={constantData?.agent_npn}
          />
          <LocalStorageInput
            labelName='Agent Phone Number:'
            name='agent_phone_number'
            id='agent_phone_number'
            placeholder='Ex. 305-786-5555'
            defaultKey='agent_phone_number'
            defaultValue={constantData?.agent_phone_number || ''}
            externalValue={constantData?.agent_phone_number}
            phone={true}
          />
          <LocalStorageInput
            labelName='Agent Email:'
            name='agent_email'
            id='agent_email'
            placeholder='Ex. agent@insurance.com'
            defaultKey='agent_email'
            uppercase={false}
            defaultValue={constantData?.agent_email || ''}
            externalValue={constantData?.agent_email}
          />
          {agency ? (
            <ConfirmLocal detail={toTitleCase(agency)} labelName='Agency:' id='confirm_agency' />
          ) : (
            <ConfirmLocal
              labelName='No Agency Detected'
              detail='Agency Missing: Try logging out and in again'
              id='agency_missing'
              name='agency_missing'
              error={true}
            />
          )}
        </AgentInfoBox>
      </>
      <FormTag autoComplete='off' autoCapitalize='on' onSubmit={handlePostToGoogle}>
        {/* Customer */}
        <>
          <Divider />
          <H2 id='customer'>Customer Details</H2>
          <Script>
            {`Hello, this is ${
              constantData.agent_full_name ? toTitleCase(constantData?.agent_full_name) : '{Agent Full Name}'
            }, your licensed agent.`}
            <Break />
            <Break />
            {`Can I please have your full name?`}
          </Script>
          <TextInput
            labelName='First Name:'
            name='first_name'
            id='first_name'
            placeholder='Ex. John'
            type='text'
            defaultKey='first_name'
            defaultValue={formData?.first_name || ''}
          />
          <TextInput
            labelName='Middle Initial:'
            name='middle_name'
            id='middle_name'
            placeholder='Ex. J. (Optional)'
            type='text'
            required={false}
            defaultKey='middle_name'
            defaultValue={formData?.middle_name || ''}
          />
          <TextInput
            labelName='Last Name:'
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
          <Script>
            {`Thank you. ${title} ${
              toTitleCase(formData?.last_name) || '{Client Name}'
            }, you're looking for health insurance, correct?`}
            <Break />
            <Break />
            {`Great, is this going to be an individual or a family plan?`}
          </Script>
          <RadioInput
            labelName='Type of Plan:'
            name='plan_type'
            id='plan_type'
            options={[
              { label: 'Family', value: 'family' },
              { label: 'Individual', value: 'individual' },
            ]}
          />
          <Script>
            {`And you are aware that this is an Obama Care line, and you're not looking for Medicare or Medicaid, correct?`}
          </Script>
          <Script>{`Okay perfect, and are you currently insured?`}</Script>
          <RadioInput
            labelName='Current insurance?'
            name='current_insurance'
            id='current_insurance'
            options={[
              { label: 'Yes', value: 'yes' },
              { label: 'No', value: 'no' },
            ]}
          />
          {formData.current_insurance === 'yes' && (
            <Script>
              {`In order to qualify for Obama Care you can only have one active insurance at a time. So do you plan to cancel your current insurance?`}
            </Script>
          )}
          <Script>{`Can I please have your zip code so I can see what plans are available in your area?`}</Script>
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
            id='state'
            name='state'
            labelName='State:'
            placeholder='Please select a state...'
            options={unitedStates}
          />
          <TextInput
            labelName='City:'
            name='city'
            id='city'
            placeholder='Ex. Miami'
            type='text'
            useDefault={true}
            defaultKey='city'
            defaultValue={formData?.city || ''}
            externalValue={formData?.city}
          />
          <Script>
            {`Just a disclaimer that you do need a bank account in order to qualify.`}
            <Break />
            <Break />
            {`Do you have an active bank account?`}
          </Script>
          <Script>{`What has you looking for coverage today?`}</Script>
          <TextAreaInput
            labelName='Why are they looking for coverage?'
            name='coverage_reason'
            id='coverage_reason'
            placeholder='Enter reason here... (Optional)'
            required={false}
            defaultKey='coverage_reason'
            defaultValue={formData?.coverage_reason || ''}
          />
        </>
        {/* Health */}
        <>
          <Divider />
          <H2 id='health'>Health Questionnaire</H2>
          <Script>{`Okay, let's go over a little Health Questionnaire to see what options you qualify for.`}</Script>
          <Script>{`${title} ${
            toTitleCase(formData?.last_name) || '{Client Name}'
          }, what is your current employment status?`}</Script>
          <DropDownInput
            id='employment_status'
            name='employment_status'
            labelName={`${primaryName}'s Employment Status:`}
            placeholder='Please select an employment status...'
            options={employmentOptions}
          />
          {formData.employment_status === 'Employed' && <Script>{`And what is your current occupation?`}</Script>}
          {(formData.employment_status === 'Retired' || formData.employment_status === 'Unemployed') && (
            <Script>{`And what was your previous occupation?`}</Script>
          )}
          {(formData.employment_status === 'Employed' ||
            formData.employment_status === 'Retired' ||
            formData.employment_status === 'Unemployed') && (
            <>
              <SelectCreateable
                id='occupation'
                labelName={`${primaryName}'s ${
                  formData.employment_status === 'Employed' ? '' : 'Previous '
                }Occupation:`}
                name='occupation'
                options={occupations}
                placeholder='Please select an occupation...'
                defaultOption={formData?.occupation || ''}
              />
            </>
          )}
          <Script>{`What is your current household annual income AFTER taxes?`}</Script>
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
          <Script>{`Great. Can I please have your date of birth?`}</Script>
          {formData.age !== null && (formData.age < 18 || formData.age > 70) && (
            <EligibilityIconContainer>
              <IneligibleIcon twClasses={'h-10'} />
            </EligibilityIconContainer>
          )}
          {formData.age !== null &&
            (formData.age === 18 || formData.age === 19 || (formData.age >= 60 && formData.age <= 70)) && (
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
          <Script>{`Are you a smoker or non-smoker?`}</Script>
          <RadioInput
            labelName='Tobacco User?'
            name='tobacco_use'
            id='tobacco_use'
            options={[
              { label: 'Yes', value: 'yes' },
              { label: 'No', value: 'no' },
            ]}
          />
          <Script>{`${title} ${toTitleCase(formData?.last_name) || '{Client Name}'}, are you married?`}</Script>
          <RadioInput
            labelName='Married?'
            name='married'
            id='married'
            options={[
              { label: 'Yes', value: 'yes' },
              { label: 'No', value: 'no' },
            ]}
          />
          {formData?.married === 'yes' && (
            <Script>{`Will you be filing taxes jointly or separately for this upcoming tax year?`}</Script>
          )}
          <RadioInput
            labelName='Taxes filing status:'
            name='taxes_filing_status'
            id='taxes_filing_status'
            rowOrCol='col'
            defaultOption={formData.taxes_filing_status}
            options={[
              { label: 'Single', value: 'Single', disabled: formData.married !== 'no' },
              {
                label: 'Married filing jointly',
                value: 'Married Filing Jointly',
                disabled: formData.married !== 'yes',
              },
              {
                label: 'Married filing separately',
                value: 'Married filing separately',
                disabled: formData.married !== 'yes',
              },
              { label: 'Head of household', value: 'Head of household', disabled: formData.married !== 'no' },
              {
                label: 'Qualifying widow(er) with dependent child',
                value: 'Qualifying widow(er) with dependent child',
                disabled: formData.married !== 'yes',
              },
            ]}
          />
          <Script>{`Do you claim any dependents on your taxes?`}</Script>
          <RadioInput
            labelName='Claims dependents on taxes?'
            name='claims_dependents'
            id='claims_dependents'
            options={[
              { label: 'Yes', value: 'yes' },
              { label: 'No', value: 'no' },
            ]}
          />
          {formData.claims_dependents === 'yes' && (
            <>
              <Script>{`And what is your household size?`}</Script>
              <TextInput
                labelName='Household size:'
                name='household_size'
                id='household_size'
                placeholder='Ex. 4'
                type='number'
                pattern='/^\d{9}$/'
                defaultKey='household_size'
                defaultValue={formData?.household_size || ''}
                externalValue={formData?.household_size}
              />
            </>
          )}
          {Number(formData.household_size) > 1 && formData.claims_dependents === 'yes' && (
            <>
              <Script>{`Will ${
                Number(formData.household_size) > 2 ? 'any of them' : 'they'
              } also be getting insured today?`}</Script>
              <RadioInput
                labelName='Additional insured?'
                name='additional_insured'
                id='additional_insured'
                options={[
                  { label: 'Yes', value: 'yes' },
                  { label: 'No', value: 'no' },
                ]}
              />
            </>
          )}
          {Number(formData.household_size) === 2 &&
            formData.claims_dependents === 'no' &&
            formData.married === 'yes' && (
              <>
                <Script>{`Will your spouse also be getting insured today?`}</Script>
                <RadioInput
                  labelName='Additional insured?'
                  name='additional_insured'
                  id='additional_insured'
                  options={[
                    { label: 'Yes', value: 'yes' },
                    { label: 'No', value: 'no' },
                  ]}
                />
              </>
            )}
          {formData.household_size &&
            formData.household_size !== '1' &&
            formData.additional_insured === 'yes' &&
            formData.additional_insured_list?.map((dependent, i) => {
              const dependentFirstName = dependent.full_name
                ? `${toTitleCase(dependent.full_name.split(' ')[0])}`
                : `Dependent ${i + 1}`;
              const beneficiaryFirstName = dependent.beneficiary_full_name
                ? `${toTitleCase(dependent.beneficiary_full_name.split(' ')[0])}`
                : 'Beneficiary';
              const beneficiaryRelationshipLabel = `${
                beneficiaryFirstName + "'s"
              } Relationship to ${dependentFirstName}:`;
              const beneficiaryDOBLabel = `${beneficiaryFirstName + "'s"} Date of Birth (Optional):`;
              return (
                <AdditionalInsuredContainer key={`dependent_${i + 1}_info`}>
                  {dependent.age !== null && dependent.age < 18 && (
                    <EligibilityIconContainer>
                      <IneligibleIcon twClasses={'h-10'} />
                    </EligibilityIconContainer>
                  )}
                  {dependent.age !== null &&
                    (dependent.age === 18 || dependent.age === 19 || dependent.age >= 60 || dependent.age <= 70) && (
                      <EligibilityIconContainer>
                        <MutualOfOmahaIcon twClasses={'h-10'} />
                      </EligibilityIconContainer>
                    )}
                  {dependent.age !== null && dependent.age >= 20 && dependent.age <= 59 && (
                    <EligibilityIconContainer>
                      <AmericoIcon twClasses={'h-10'} />
                    </EligibilityIconContainer>
                  )}
                  <h3 className='text-dp-text-primary font-semibold text-center'>{`Additional Insured #${i + 1}`}</h3>
                  <RemoveDependentButton
                    id='remove-dependent'
                    key={`dependent_${i + 1}_button`}
                    type='button'
                    tabIndex={-1}
                    onClick={() => removeDependent(i)}
                  >
                    <CloseIcon twClasses='text-dp-text-primary/75 fill-dp-text-primary/75' />
                  </RemoveDependentButton>
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
                  <RadioInput
                    id={i}
                    index={i}
                    labelName={`${dependentFirstName + "'s"} Gender:`}
                    name='dependent_gender'
                    additional={true}
                    options={[
                      { label: 'Male', value: 'male' },
                      { label: 'Female', value: 'female' },
                    ]}
                  />
                  <RadioInput
                    id={i}
                    index={i}
                    labelName={`${dependentFirstName + "'s"} Relationship to Primary`}
                    name='relationship_to_primary'
                    additional={true}
                    options={[
                      { label: 'Spouse', value: 'spouse' },
                      { label: 'Dependent', value: 'dependent' },
                    ]}
                  />
                  <DateInput
                    id={i}
                    labelName={`${dependentFirstName + "'s"} Date of Birth:`}
                    name='date_of_birth'
                    additional={true}
                    ageKey='age'
                    defaultKey='date_of_birth'
                    defaultValue={dependent.date_of_birth || ''}
                  />
                  <TextInput
                    id={i}
                    labelName={`${dependentFirstName + "'s"} Social Security Number:`}
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
                      <SelectCreateable
                        id={i}
                        name='country_of_birth'
                        labelName={`${dependentFirstName + "'s"} Country of Birth:`}
                        placeholder='Please select a country...'
                        additional={true}
                        options={countries}
                        defaultOption={dependent.country_of_birth || ''}
                      />
                      {dependent.country_of_birth === 'United States Of America' && (
                        <DropDownInput
                          id={i}
                          name='state_of_birth'
                          labelName={`${dependentFirstName + "'s"} State of Birth:`}
                          placeholder='Please select a state...'
                          additional={true}
                          options={unitedStates}
                        />
                      )}
                      <DropDownInput
                        id={i}
                        labelName={`${dependentFirstName + "'s"} Employment Status:`}
                        name='employment_status'
                        placeholder='Please select an employment status...'
                        additional={true}
                        options={employmentOptions}
                      />
                      {(dependent.employment_status === 'Employed' ||
                        dependent.employment_status === 'Retired' ||
                        dependent.employment_status === 'Unemployed') && (
                        <SelectCreateable
                          id={i}
                          name='occupation'
                          labelName={`${dependent.employment_status === 'Employed' ? 'Current' : 'Former'} Occupation:`}
                          options={occupations}
                          placeholder='Please select an occupation...'
                          additional={true}
                          defaultOption={dependent.occupation || ''}
                        />
                      )}
                      <TextInput
                        id={i}
                        labelName={`${dependentFirstName + "'s"} Weight:`}
                        name='weight'
                        placeholder='Ex. 150 lb'
                        type='text'
                        pattern='^\d{1,3}(?:\.\d)?$'
                        uppercase={false}
                        weight={true}
                        additional={true}
                        defaultKey='weight'
                        defaultValue={dependent.weight || ''}
                      />
                      <TextInput
                        id={i}
                        labelName={`${dependentFirstName + "'s"} Height:`}
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
                        labelName={`Beneficiary's Full Name:`}
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
                        labelName={beneficiaryRelationshipLabel}
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
                        labelName={beneficiaryDOBLabel}
                        additional={true}
                        required={false}
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
                    placeholder='Enter notes here... (Optional)'
                    additional={true}
                    required={false}
                    defaultKey='notes'
                    defaultValue={dependent.notes || ''}
                  />
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
                {formData.additional_insured_list.length === 0 ? `Add Spouse/Dependent` : 'Add More'}
              </AddDependentButton>
            </AddDependentContainer>
          )}
          <Script>{`Do you have any major pre-existing conditions?`}</Script>
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
          <Script>{`Are you currently taking any Medications?`}</Script>
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
              <TextAreaInput
                labelName='Specific medications:'
                name='medications_list'
                id='medications_list'
                placeholder='Ex. Benazepril, Moexipril , Prozac'
                required={true}
                rows={7}
                defaultKey='medications_list'
                defaultValue={formData?.medications_list || ''}
              />
            </>
          )}
          <Script>{`Do you have any history of Mental Health, COPD, Heart Procedure, Cancer or HIV?`}</Script>
          <TextAreaInput
            labelName='History of mental health, COPD, heart procedures, cancer, HIV?'
            name='medical_history'
            id='medical_history'
            placeholder='Enter history here... (Optional)'
            required={false}
            rows={3}
            defaultKey='medical_history'
            defaultValue={formData?.medical_history || ''}
          />
          <Script>{`Are there any doctors you would like me to make sure are covered by the plan or are you open to new doctors?`}</Script>
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
              <TextAreaInput
                labelName='Doctor Name:'
                name='preferred_doctors_name'
                id='preferred_doctors_name'
                placeholder='Ex. Dr. Lino Fernandez'
                // TODO ADD UPPERCASE PROP
                required={true}
                rows={2}
                defaultKey='preferred_doctors_name'
                defaultValue={formData?.preferred_doctors_name || ''}
              />
            </>
          )}
          <Script>
            {`I want to make sure I am able to get something in your ideal price range, so what would be your monthly budget for health insurance?`}
          </Script>
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
          <Script>
            {`Great ${title} ${
              toTitleCase(formData?.last_name) || '{Client Name}'
            }, so now that I have a clear idea of what your needs are, I will be placing you on a brief hold to search the database for you. Once I see all the options you qualify for I will get back on the line to go over your best options. So while you wait, could you please grab a pen and paper so you can take some notes?`}
            <Break />
            <Break />
            {`{Pause for reply...}`}
            <Break />
            <Break />
            {`Thank you, please hold.`}
          </Script>
        </>
        {/* Quote */}
        <>
          <Divider />
          <H2 id='quote'>Quote Breakdown</H2>
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
            placeholder='Ex. $150, 40%, No charge, Full Price'
            type='text'
            uppercase={true}
            defaultKey='pcp_copay'
            defaultValue={formData?.pcp_copay || ''}
          />
          <TextInput
            labelName='Specialist Copay (Specialist Visit):'
            name='specialist_copay'
            id='specialist_copay'
            placeholder='Ex. $150, 40%, No charge, Full Price'
            type='text'
            uppercase={true}
            defaultKey='specialist_copay'
            defaultValue={formData?.specialist_copay || ''}
          />
          <TextInput
            labelName='Generic Meds Copay:'
            name='generic_meds_copay'
            id='generic_meds_copay'
            placeholder='Ex. $150, 40%, No charge, Full Price'
            type='text'
            uppercase={true}
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
            labelName='(FOR AGENT) URL TO PLAN PDF:'
            name='plan_summary_pdf'
            id='plan_summary_pdf'
            placeholder='Ex. http://bcbsfl.com/2129.pdf'
            type='text'
            defaultKey='plan_summary_pdf'
            uppercase={false}
            defaultValue={formData?.plan_summary_pdf || ''}
          />
          {formData.carrier_name && formData.plan_name && !formData.plan_summary_pdf && (
            <GoogleButtonContainer
              title={`Google plan PDF for ${toTitleCase(formData.carrier_name)} in the state of ${toTitleCase(
                formData.state,
              )}`}
            >
              <ExternalAnchorButton href={googlePlanPdf} target='_blank'>
                {`Click here to Google it!`}
              </ExternalAnchorButton>
            </GoogleButtonContainer>
          )}
        </>
        {/* Disclosure */}
        <>
          <Divider />
          <H2 id='disclosure'>Disclosure</H2>
          <Script>
            {`Hello, ${title} ${
              toTitleCase(formData?.last_name) || '{Client Name}'
            }? Thank you for holding, do you have a pen and paper ready?`}
            <Break />
            <Break />
            {`{Pause for reply...}`}
            <Break />
            <Break />
            {`Great, so please go ahead and write down my name and license number, my name is ${
              constantData.agent_full_name ? toTitleCase(constantData?.agent_full_name) : '{Agent Full Name}'
            }, and my license number is ${constantData?.agent_license_number || '{Agent License Number}'}.`}
            <Break />
            <Break />
            {`Were you able to write that down?`}
          </Script>
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
            currency={true}
            defaultKey='health_unsubsidized'
            defaultValue={formData?.health_unsubsidized || ''}
          />
          <TextInput
            labelName={`Qualified Subsidy:`}
            name='qualified_subsidy'
            id='qualified_subsidy'
            placeholder='Ex. $395'
            type='text'
            pattern='^\$[0-9]{1,3}(?:,?[0-9]{3})*(?:\.[0-9]{2})?$'
            currency={true}
            defaultKey='qualified_subsidy'
            defaultValue={formData?.qualified_subsidy || ''}
          />
          {formData?.health_unsubsidized && formData?.life_health_unsubsidized && formData?.monthly_grand_total && (
            <>
              <DetailConfirmation
                detail={formData.life_health_unsubsidized}
                labelName={`Life & Health Unsubsidized (Health: ${
                  formData?.health_unsubsidized
                } + Life: $${formData?.life_total_cost.toFixed(2)}):`}
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
            useDefault={true}
            defaultKey='death_benefit'
            defaultValue={formData?.death_benefit || ''}
            externalValue={formData?.death_benefit}
          />
          <Script>
            {`Congratulations, I have some great news. I was able to apply all your subsidies and reductions. The best plan the system recommends is with ${
              toTitleCase(formData?.carrier_name) || '{Carrier Name}'
            }. And I agree with the system that ${
              toTitleCase(formData?.carrier_name) || '{Carrier Name}'
            } is the best option based on the needs we discussed. ${
              toTitleCase(formData?.carrier_name) || '{Carrier Name}'
            } is Major Medical, which means that it covers any pre-existing or future conditions.`}
            <Break />
            <Break />
            {`Also with ${formData?.carrier_name || '{Carrier Name}'} all Preventative Care is absolutely free!`}
            <Break />
            <Break />
            {`Which means that all your checkups, immunizations, screenings... basically anything to keep you healthy is 100% free of charge. Does that make sense?`}
            <Break />
            <Break />
            {`For your Primary Doctor you have a set copay of ${formData?.pcp_copay || '${PCP Copay}'} per visit.`}
            <Break />
            <Break />
            {`For Specialists you have a set copay of ${
              formData?.specialist_copay || '${Specialist Copay}'
            } per visit.`}
            <Break />
            <Break />
            {`For any Generic Medication you have a set copay of ${
              formData?.generic_meds_copay || '${Generic Meds Copay}'
            } per medication.`}
            <Break />
            <Break />
            {`And most importantly you Annual Deductible is ${
              formData?.annual_deductible || '${Annual Deductible}'
            }. It's the main reason this plan is being recommended. The deductible is what you pay first before being admitted to the hospital or having any surgeries.`}
            <Break />
            <Break />
            {`Also, your Max Out Of Pocket is ${
              formData?.max_out_of_pocket || '${Max Out Of Pocket}'
            }. Think of that as your safety net. God forbid something catastrophic happened to you and you had a medical bill of a hundred thousand dollars... after your max, your insurance will cover the rest for the calendar year. So, it protects you if you were to get something like cancer treatment or something like that. Make sense?`}
          </Script>
          <Script>
            {`Your plan also has a Death Benefit, so god forbid you were to pass away, a beneficiary of your choice would receive a payout to make sure they are financially secure.`}
            <Break />
            <Break />
            {`So ${toTitleCase(formData?.first_name) || '{Client First Name}'}, the plan originally costs ${
              formData?.health_unsubsidized || '${Health Unsubsidized}'
            }. But after applying all your subsidies you will only be paying ${
              formData?.monthly_grand_total || '${Monthly Grand Total}'
            } per month and the good news is you will be able to start using your benefits as of ${nextMonth} 1st. Does ${
              formData?.monthly_grand_total || '${Monthly Grand Total}'
            } per month fit within your monthly budget?`}
          </Script>
        </>
        {/* Closure */}
        <>
          <Divider />
          <H2 id='closure'>Closure</H2>
          <Script>
            {`Awesome ${
              toTitleCase(formData?.first_name) || '{Client First Name}'
            }. Let's go step by step to make sure everything I have is correct.`}
          </Script>
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
          <Script>
            {`Just to confirm, I have your phone number as ${
              formData?.phone_number || '{Client Phone Number}'
            }. Is that right?`}
          </Script>
          <Script>{`I have your Date of Birth as ${
            formData?.date_of_birth || '{Client Date of Birth}'
          }, correct?`}</Script>
          {formData.date_of_birth ? (
            <DetailConfirmation
              detail={formData.date_of_birth}
              labelName='Confirm Date of Birth:'
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
          <Script>{`Can you please verify the spelling of your first and last name?`}</Script>
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
          <Script>{`Awesome, thank you. What is the best email address to send you a confirmation email?`}</Script>
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
          <Script>
            {`Can you please provide me your address, this is where you will be receiving your insurance medical ID ${
              formData?.applying_for_coverage > 1 ? 'cards' : 'card'
            }.`}
          </Script>
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
          {formData.life_adb_provider !== 'none' && (
            <>
              <Script>{`Were you born in the United States?`}</Script>
              <SelectCreateable
                id={'country_of_birth'}
                name='country_of_birth'
                labelName={`${primaryName}'s Country of Birth:`}
                placeholder='Please select a country...'
                options={countries}
                defaultOption={formData?.country_of_birth || ''}
              />
            </>
          )}
          {formData.life_adb_provider !== 'none' && formData.country_of_birth === 'United States Of America' && (
            <>
              <Script>{`What state were you born in?`}</Script>
              <DropDownInput
                id={'state_of_birth'}
                name='state_of_birth'
                labelName={`${primaryName}'s State of Birth:`}
                placeholder='Please select a state...'
                options={unitedStates}
              />
            </>
          )}
          {formData.life_adb_provider !== 'none' && formData.country_of_birth !== 'United States Of America' && (
            <Script>{`Are you a resident or a citizen?`}</Script>
          )}
          {formData.life_adb_provider !== 'none' && (
            <>
              <RadioInput
                labelName='Immigration status:'
                name='immigration_status'
                id='immigration_status'
                options={[
                  { label: 'Resident', value: 'resident' },
                  { label: 'Citizen', value: 'citizen' },
                ]}
              />
              <Script>{`What is your height and weight?`}</Script>
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
                placeholder='Ex. 150 lb'
                type='text'
                pattern='^\d+(\.\d+)?$'
                uppercase={false}
                weight={true}
                defaultKey='weight'
                defaultValue={formData?.weight || ''}
              />
            </>
          )}
          <Script important>
            {`Great thank you.`}
            <Break />
            <Break />
            {`So due to new federal marketplace regulations I'm required to email you a Docusign document that you'll have to sign authorizing us to enroll you in this plan on your behalf.`}
            <Break />
            <Break />
            {`If you could check your email, sign it, and let me know when you're done, we'll be ready to proceed.`}
          </Script>
          <Script>
            {`Okay, so that the Medical Information Bureau can identify your medical records, they will cross check what we have reviewed here to determine your eligibility and approval with ${
              toTitleCase(formData?.carrier_name) || '{Carrier Name}'
            }. In order for them to verify your identity and locate the proper medical records, it is ran through your Social Security Number. Your Information is protected by the HIPAA laws in the state of ${
              toTitleCase(formData?.state) || '{Client State}'
            }. All we need is your verbal consent to apply your Social Security Number in order for this application to be approved. If you agree please state your First and Last name and say "I agree".`}
          </Script>
          <Script>{`Okay perfect, what is your social security number?`}</Script>
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
        {/* Beneficiary */}
        <>
          {formData.life_adb_provider !== 'none' && (
            <>
              <Divider />
              <H2 id='beneficiary'>Beneficiary Information</H2>
              <Script>
                {`As we discussed, one of the benefits you are receiving today is a Death Benefit. God forbid you were to pass away, who would you like to put down as a Beneficiary? It can be a parent, spouse, child or your estate.`}
              </Script>
              <TextInput
                labelName={`${primaryName}'s Beneficiary's Full Name:`}
                name='beneficiary_full_name'
                id='beneficiary_full_name'
                placeholder='Ex. Jane Doe'
                type='text'
                defaultKey='beneficiary_full_name'
                defaultValue={formData?.beneficiary_full_name || ''}
              />
              <TextInput
                labelName={`${beneficiaryName}'s Relationship to ${primaryName}:`}
                name='beneficiary_relationship'
                id='beneficiary_relationship'
                placeholder='Ex. Son, Daughter, Spouse'
                type='text'
                defaultKey='beneficiary_relationship'
                defaultValue={formData?.beneficiary_relationship || ''}
              />
              <Script>
                {`{OPTIONAL}`}
                <Break />
                <Break />
                {`Can I also have their date of birth?`}
              </Script>
              <DateInput
                labelName={`${beneficiaryName}'s Date of Birth (Optional):`}
                name='beneficiary_date_of_birth'
                id='beneficiary_date_of_birth'
                ageKey='beneficiary_age'
                defaultKey='beneficiary_date_of_birth'
                required={false}
                defaultValue={formData?.beneficiary_date_of_birth || ''}
              />
            </>
          )}
        </>
        {/* Payment */}
        <>
          <Divider />
          <H2 id='payment'>Payment Method</H2>
          <Script>
            {`As far as payment method, insurance companies require either a Checking or a Savings account as form of payment, who do you bank with?`}
          </Script>
          <SelectCreateable
            id='bank_name'
            name='bank_name'
            labelName='Bank Name:'
            creatable={true}
            options={banks}
            placeholder='Please select a bank or create one...'
            defaultOption={formData?.bank_name || ''}
          />
          <Script>{`And is the account a checking or a savings?`}</Script>
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
            name='routing_number'
            labelName='Bank Routing Number:'
            creatable={true}
            options={bankRoutes}
            placeholder="Please select the bank's routing state or create one..."
            defaultOption={formData?.routing_number || ''}
          />
          {googleRoutingUrl && (
            <GoogleButtonContainer
              title={`Google Routing Number for ${toTitleCase(formData.bank_name)} in the state of ${toTitleCase(
                formData.state,
              )}`}
            >
              <ExternalAnchorButton href={googleRoutingUrl} target='_blank'>
                {`Click here to Google it!`}
              </ExternalAnchorButton>
            </GoogleButtonContainer>
          )}
          <Script>
            {`Okay perfect, the system is showing that the routing number for ${
              formData?.bank_name || '{Bank Name}'
            } in the State of ${toTitleCase(formData?.state) || '{Client State}'} is ${
              formData?.routing_number || '{Routing Number}'
            }, is that correct?`}
          </Script>
          <Script>
            {`What is your account number?`}
            <Break />
            <Break />
            {`{Write down account number}`}
            <Break />
            <Break />
            {`Can you repeat it a second time to make sure I have it correct?`}
          </Script>
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
          <Script>{`And what is the full name of the account holder?`}</Script>
          <TextInput
            labelName='Name of Account Holder:'
            name='name_of_account_holder'
            id='name_of_account_holder'
            placeholder='Ex. John Doe'
            type='text'
            defaultKey='name_of_account_holder'
            defaultValue={formData?.name_of_account_holder || ''}
          />
          {constantData.show_script === 'on' && (
            <RadioInput
              labelName={`QUESTION FOR AGENT: ARE YOU LICENSED IN ${
                formData?.state.toUpperCase() || '{CLIENT STATE}'
              }?`}
              name='is_agent_licensed_in_state'
              id='is_agent_licensed_in_state'
              options={[
                { label: 'Yes', value: 'yes' },
                { label: 'No', value: 'no' },
              ]}
            />
          )}
          {formData.is_agent_licensed_in_state === 'yes' && (
            <Script>
              {`Alright, now that I have all your information please give me a few minutes to finalize your application.`}
              <Break />
              <Break />
              {`As I'm going through it, you'll be receving a few verification codes and I'm going to need you to read them back to me as you get them, okay? I'll let you know when they're sent.`}
            </Script>
          )}
          <Script>
            {`Great, thank you for all that information. Let me read a legal disclosure to make sure we are on the same page...`}
          </Script>
          <Script>
            {`You understand your total monthly is ${
              formData?.monthly_grand_total || '{Monthly Grand Total}'
            }. You're receving two benefits that are billed separately by benefit.`}
            <Break />
            <Break />
            {`I'm going to go over a quick breakdown before the Health Subsidy is applied, so don't get scared here.`}
            <Break />
            <Break />
            {`${formData?.carrier_name || '{Carrier Name}'} Health portion unsubsidized is ${
              formData?.health_unsubsidized || '{Health Unsubsidized}'
            }. And ${toTitleCase(formData?.life_adb_provider) || '{Life ADB Provider}'} Death benefit portion is ${
              formData?.life_total_cost ? `$${formData?.life_total_cost.toFixed(2)}` : '{Life Total Cost}'
            }.`}
            <Break />
            <Break />
            {`So, your total before the health subsidy is applied is ${
              formData?.life_health_unsubsidized || '{Life + Health Unsubsidized}'
            }. We can qualify you for the health subsidy of ${
              formData?.qualified_subsidy || '{Qualified Subsidy}'
            } to lower monthly payment.`}
            <Break />
            <Break />
            {`So, your total after the health subsidy is applied is only ${
              formData?.monthly_grand_total || '{Monthly Grand Total}'
            } per month! Do you understand?`}
          </Script>
          <Script>
            {`Perfect, you're all set ${
              toTitleCase(formData?.first_name) || '{Client First Name}'
            }. Remember, your first payment is due today and this will cover your first month. Then all the following payments will be drafted on the ${dayWithSuffix} of every month.`}
            <Break />
            <Break />
            {`In the next 48 hours you'll be receiving an email from me, with a summary of everything we've covered today. But also a few emails from the marketplace and you can go ahead and disregard those.`}
            <Break />
            <Break />
            {`From them you'll get one confirming your plan, and another one asking you to "pick your plan", and since we've already picked the best plan for you disregard that. You'll also get one asking you to make your payment, but we already took care of that today so you don't need to worry about that one either.`}
            <Break />
            <Break />
            {`And your Medical ID cards and welcome packet will be in the mail within 7-10 business days.`}
            <Break />
            <Break />
            {`Also just as a reminder, your plan ends December 31st and open enrollment is from November 1st to December 15th.`}
            <Break />
            <Break />
            {`And unless you have any questions... then congratulations! You're all set for the 1st. If you have any friends or family that don't have health insurance, please share my phone number that will be in the email I'm sending you and I can help them as well.`}
            <Break />
            <Break />
            {`Have a great day ${toTitleCase(formData?.first_name) || '{Client First Name}'}. Bye bye!`}
          </Script>
        </>
        {/* Submit | Email | Copy */}
        <>
          <Divider />
          <ButtonContainer>
            <Button type='submit'>Send to Google Sheets</Button>
            {formData.life_adb_provider !== 'none' && (
              <Button type='button' onClick={handleEmailCustomerADB} disabled={handleEmailADBDisableButton()}>
                Email Customer
              </Button>
            )}
            {formData.life_adb_provider === 'none' && (
              <Button type='button' onClick={handleEmailCustomerHealth} disabled={handleEmailHealthDisableButton()}>
                Email Customer w/o ADB
              </Button>
            )}
            <Button type='button' onClick={handleCopyToClipboard} disabled={!formData}>
              {copied ? 'Succesfully copied!' : 'Copy for AutoMerico'}
            </Button>
          </ButtonContainer>
        </>
      </FormTag>
    </FormSectionContainer>
  );
};

export default Form;
