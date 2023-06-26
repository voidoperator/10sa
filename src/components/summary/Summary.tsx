import React from 'react';
import { useFormData } from '../contexts/FormContext';
import { SummarySection, SummaryContainer, SummaryUl, SummaryLi, ShadowDiv } from '../../components/TailwindStyled';
import GroupButton from './GroupButton';
import TextInput from '../form/TextInput';
import RadioInput from '../form/RadioInput';
import { CarrierIcon, CarrierIconKey } from '../icons/CarrierIcons';
import { toTitleCase } from '../../utility/utility';

const Summary = () => {
  const { formData } = useFormData();

  return (
    <SummarySection>
      <SummaryContainer>
        <>
          <div className='pt-[50px]'>
            <TextInput
              key='monthly_health_premium'
              id='monthly_health_premium'
              name='monthly_health_premium'
              placeholder='Ex. $8.14'
              type='text'
              labelName='Monthly Health Premium:'
              required={true}
              currency={true}
              uppercase={false}
              defaultKey='monthly_health_premium'
              defaultValue={formData?.monthly_health_premium || ''}
            />
          </div>
        </>
        <>
          <GroupButton
            key='life_adb_provider'
            id='life_adb_provider'
            labelName='Life ADB Provider:'
            name='life_adb_provider'
            options={[
              { label: 'Americo', value: 'americo' },
              { label: 'Mutual', value: 'mutual' },
            ]}
            defaultOption={formData?.life_adb_provider || 'americo'}
          />
        </>
        {formData.life_adb_provider === 'americo' && (
          <>
            <RadioInput
              key='americo_premium'
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
          </>
        )}
        {formData.life_adb_provider === 'mutual' && (
          <>
            <GroupButton
              key='mutual_quote_gender'
              id='mutual_quote_gender'
              labelName='Gender:'
              name='mutual_quote_gender'
              options={[
                { label: 'Male', value: 'male' },
                { label: 'Female', value: 'female' },
              ]}
              defaultOption={formData?.mutual_quote_gender || ''}
            />
          </>
        )}
        {formData.life_adb_provider === 'mutual' && formData.mutual_quote_gender && (
          <>
            <TextInput
              key='mutual_face_amount'
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
          </>
        )}
        {formData.household_size && <ShadowDiv>Household size: {formData.household_size}</ShadowDiv>}
        {formData.additional_insured && (formData.eligible_americo_count > 0 || formData.eligible_mutual_count > 0) && (
          <>
            <ShadowDiv>
              {'Applying for coverage: '}
              {formData.applying_for_coverage}
            </ShadowDiv>
            {formData.life_adb_provider === 'americo' && (
              <>
                <ShadowDiv>
                  {'Americo sales: '}
                  {formData.eligible_americo_count}
                </ShadowDiv>
                <ShadowDiv>
                  {'Americo amount: $'}
                  {formData.life_total_cost.toFixed(2)}
                </ShadowDiv>
              </>
            )}
            {formData.life_adb_provider === 'mutual' && (
              <>
                <ShadowDiv>
                  {'Mutual of Omaha sales: '}
                  {formData.eligible_mutual_count}
                </ShadowDiv>
                <ShadowDiv>
                  {'Mutual of Omaha amount: $'}
                  {formData.life_total_cost.toFixed(2)}
                </ShadowDiv>
              </>
            )}
          </>
        )}
        {formData.life_adb_provider &&
          formData.household_size &&
          formData.monthly_health_premium &&
          formData.monthly_grand_total &&
          formData.additional_insured &&
          (formData.eligible_americo_count > 0 || formData.eligible_mutual_count > 0) && (
            <ShadowDiv>
              {'Monthly Grand Total: '}
              {formData.monthly_grand_total}
            </ShadowDiv>
          )}
        {formData.state && (
          <ShadowDiv className='w-full'>
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
          </ShadowDiv>
        )}
      </SummaryContainer>
    </SummarySection>
  );
};
export default Summary;
