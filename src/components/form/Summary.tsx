import React, { useEffect, useState } from 'react';
import { useFormData } from '../contexts/FormContext';
import { SummarySection, SummaryContainer, InputWrapper, SummaryUl, SummaryLi } from '../tw/twStyles';
import TextInput from './TextInput';
import GroupButton from './GroupButton';
import RadioInput from './RadioInput';
import { CarrierIcon, CarrierIconKey } from '../icons/CarrierIcons';
import { parseCurrency, toTitleCase } from '../../utility/utility';

const Summary = () => {
  const { formData, setFormData } = useFormData();
  const [grandTotal, setGrandTotal] = useState<string>('');
  const [americoAmount, setAmericoAmount] = useState<string>('');
  const [mutualAmount, setMutualAmount] = useState<string>('');
  const [eligibleMutualCount, setEligibleMutualCount] = useState<number>(0);
  const [eligibleAmericoCount, setEligibleAmericoCount] = useState<number>(0);

  useEffect(() => {
    const { life_adb_provider } = formData;
    if (!life_adb_provider) return;
    if (life_adb_provider === 'mutual') {
      setFormData({ ...formData, americo_premium: '' });
    }
    if (life_adb_provider === 'americo') {
      setFormData({ ...formData, mutual_quote_gender: '', mutual_face_amount: '' });
    }
  }, [formData.life_adb_provider, formData.americo_premium, formData.mutual_face_amount, formData.mutual_quote_gender]);

  useEffect(() => {
    const eligibleAdditionalInsuredList =
      formData.additional_insured_list?.filter((member) => member.age >= 20 && member.age <= 59) || [];

    const eligibleAmericoCount =
      (formData.age >= 20 && formData.age <= 59 ? 1 : 0) + eligibleAdditionalInsuredList.length;

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
    formData.americo_premium,
    formData.age,
  ]);

  return (
    <SummarySection>
      <SummaryContainer>
        <InputWrapper>
          <TextInput
            id='monthly_health_premium'
            name='monthly_health_premium'
            placeholder='e.g. $8.14'
            type='text'
            labelName='Monthly Health Premium:'
            required={true}
            currency={true}
            defaultKey='monthly_health_premium'
            defaultValue={formData?.monthly_health_premium || ''}
          />
        </InputWrapper>
        <InputWrapper>
          <GroupButton
            id='life_adb_provider'
            labelName='Life ADB Provider:'
            name='life_adb_provider'
            options={[
              { label: 'Americo', value: 'americo' },
              { label: 'Mutual', value: 'mutual' },
            ]}
            defaultOption={formData?.life_adb_provider || 'americo'}
          />
        </InputWrapper>
        {formData.life_adb_provider === 'americo' && (
          <InputWrapper>
            <RadioInput
              id='americo_premium'
              name='americo_premium'
              labelName='Americo Coverage:'
              required={false}
              rowOrCol='col'
              options={[
                { label: '$27 Monthly - $100k ADB', value: '$27' },
                { label: '$35 Monthly - $150k ADB', value: '$35' },
                { label: '$42 Monthly - $200k ADB', value: '$42' },
                { label: '$48 Monthly - $250k ADB', value: '$48' },
              ]}
              defaultOption={formData?.americo_premium || '$48'}
            />
          </InputWrapper>
        )}
        {formData.life_adb_provider === 'mutual' && (
          <InputWrapper>
            <GroupButton
              id='mutual_quote_gender'
              labelName='Gender:'
              name='mutual_quote_gender'
              options={[
                { label: 'Male', value: 'male' },
                { label: 'Female', value: 'female' },
              ]}
              defaultOption={formData?.mutual_quote_gender || ''}
            />
          </InputWrapper>
        )}
        {formData.life_adb_provider === 'mutual' && formData.mutual_quote_gender && (
          <InputWrapper>
            <TextInput
              id='mutual_face_amount'
              name='mutual_face_amount'
              labelName='Mutual Face Amount:'
              placeholder='$50k - $500k'
              type='text'
              currency={true}
              currencyMutual={true}
              defaultKey='mutual_face_amount'
              defaultValue={formData?.mutual_face_amount || ''}
            />
          </InputWrapper>
        )}
        {formData.household_size && <InputWrapper>Household size: {formData.household_size}</InputWrapper>}
        {formData.life_adb_provider === 'americo' && formData.additional_insured && (
          <>
            <InputWrapper>
              {'Applying for coverage: '}
              {formData.applying_for_coverage}
            </InputWrapper>
            {formData.life_adb_provider === 'americo' && eligibleAmericoCount > 0 && (
              <InputWrapper>
                {'Americo sales: '}
                {eligibleAmericoCount.toString()}
              </InputWrapper>
            )}
            <InputWrapper>
              {'Americo amount: $'}
              {americoAmount}
            </InputWrapper>
          </>
        )}
        {formData.life_adb_provider === 'mutual' && formData.additional_insured && (
          <>
            <InputWrapper>
              {'Applying for coverage: '}
              {formData.applying_for_coverage.toString()}
            </InputWrapper>
            {formData.life_adb_provider === 'mutual' && eligibleMutualCount > 0 && (
              <InputWrapper>
                {'Mutual of Omaha sales: '}
                {eligibleMutualCount.toString()}
              </InputWrapper>
            )}
            <InputWrapper>
              {'Mutual of Omaha amount: $'}
              {mutualAmount}
            </InputWrapper>
          </>
        )}
        {formData.life_adb_provider &&
          formData.monthly_health_premium &&
          (eligibleAmericoCount > 0 || eligibleMutualCount > 0) && (
            <InputWrapper>
              {'Monthly Grand Total: $'}
              {grandTotal}
            </InputWrapper>
          )}
        {formData.state && (
          <InputWrapper className='w-full'>
            <div>Preferred carriers for {toTitleCase(formData.state)}:</div>
            <SummaryUl>
              {formData.carriers &&
                formData.carriers.map((carrier, i) => {
                  return (
                    <SummaryLi key={carrier + i} title={carrier}>
                      <CarrierIcon icon={carrier as CarrierIconKey} twClasses='max-w-xs text-white' />
                    </SummaryLi>
                  );
                })}
            </SummaryUl>
          </InputWrapper>
        )}
      </SummaryContainer>
    </SummarySection>
  );
};
export default Summary;
