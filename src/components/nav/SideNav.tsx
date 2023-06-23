import React, { useEffect, useState } from 'react';
import { useFormData } from '../contexts/FormContext';
import { AmericoSymbol, HealthSherpaSymbol, MutualOfOmahaSymbol } from '../icons/NavIcons';
import { SideNavContainer, SymbolContainer, Anchor, AnchorSpan, AutoSymbolContainer } from '../tw/twStyles';
import { statesAbbreviation } from '../../utility/staticData';
import { parseCurrency } from '../../utility/utility';

const SideNav = () => {
  const { formData, setFormData } = useFormData();
  const [customLink, setCustomLink] = useState('https://www.healthsherpa.com/marketplace/');

  useEffect(() => {
    const healthSherpaBaseLink = 'https://www.healthsherpa.com/marketplace/';
    const healthSherpaParams = `health?zip_code=${formData.zip_code}&state=${
      statesAbbreviation[formData.state]
    }&applicants[][age]=${
      formData.age
    }&applicants[][age_format]=years&applicants[][relationship]=primary&applicants[][gender]=${
      formData.gender
    }&applicants[][utilization]=medium&dependents_count=0&household_size=${
      formData.household_size
    }&household_income=${parseCurrency(
      formData.annual_household_income,
    )}&apply_for_subsidy=true&utilization=medium&sep_reason=eligibility_changed`;

    let concatDependentString = '';
    if (
      formData.applying_for_coverage > 1 &&
      formData.additional_insured_list &&
      formData.additional_insured_list.length > 0
    ) {
      for (let i = 0; i < formData.applying_for_coverage; i++) {
        if (formData.additional_insured_list[i]) {
          console.log('if passed');
          let additionalAge = '';
          let additionalGender = '';
          let additionalRelationship = '';
          if (formData.additional_insured_list[i].age !== null) {
            additionalAge += formData.additional_insured_list[i].age;
          }
          if (formData.additional_insured_list[i].dependent_gender !== '') {
            additionalGender += formData.additional_insured_list[i].dependent_gender;
          }
          if (formData.additional_insured_list[i].relationship_to_primary !== '') {
            additionalRelationship += formData.additional_insured_list[i].relationship_to_primary.toLowerCase();
          }
          if (additionalAge !== '' && additionalGender !== '' && additionalRelationship !== '') {
            concatDependentString += `&applicants[][age]=${additionalAge}&applicants[][age_format]=years&applicants[][relationship]=${additionalRelationship}&applicants[][gender]=${additionalGender}`;
          }
          console.log('additionalAge', additionalAge);
          console.log('additionalGender', additionalGender);
          console.log('additionalRelationship', additionalRelationship);
        }
      }
    }
    const healthSherpaCustomLink = `${healthSherpaBaseLink}${healthSherpaParams}${concatDependentString}&page=1&per_page=20`;
    console.log(healthSherpaCustomLink);
    setCustomLink(healthSherpaCustomLink);
  }, [
    formData.zip_code,
    formData.state,
    formData.gender,
    formData.annual_household_income,
    formData.household_size,
    formData.age,
    JSON.stringify(formData.additional_insured_list),
  ]);
  useEffect(() => {
    console.log('customLink ', customLink);
  }, []);
  return (
    <SideNavContainer>
      <SymbolContainer>
        <Anchor href='https://www.healthsherpa.com/' target='_blank'>
          <HealthSherpaSymbol twClasses='z-10 w-10 bg-10sa-gold rounded-full' />
          <AnchorSpan style={{ transition: 'width 0.5s ease, transform 0.5s ease, opacity 2s ease' }}>
            HealthSherpa
          </AnchorSpan>
        </Anchor>
        <Anchor href='https://tools.americoagent.com/' target='_blank'>
          <AmericoSymbol twClasses='z-10 w-10 bg-10sa-gold rounded-full' />
          <AnchorSpan style={{ transition: 'width 0.5s ease, transform 0.5s ease, opacity 2s ease' }}>
            Americo
          </AnchorSpan>
        </Anchor>
        <Anchor
          href='https://producer.mutualofomaha.com/enterprise/portal/!ut/p/z1/hY7BDoIwEES_hQNXdiMWibdGE1HxLO7FgKkFUygplf6-jXoxEZ3b7ryZDBAUQF05NrK0je5K5e8TJefVhmfzRY6YstkaOe6zlLE4xgOD4z-AvI0T4ujz9ESmGrbJG_jRsQOSSlevubyr4lQCGXEVRpjobvy7trYfliGG6JyLpNZSieii2xC_RWo9WCg-SejbAm9MjTkPgge1lLo5/dz/d5/L2dBISEvZ0FBIS9nQSEh/'
          target='_blank'
        >
          <MutualOfOmahaSymbol twClasses='z-10 w-10 bg-10sa-gold rounded-full fill-mutual' />
          <AnchorSpan style={{ transition: 'width 0.5s ease, transform 0.5s ease, opacity 2s ease' }}>
            Mutual (Submit)
          </AnchorSpan>
        </Anchor>
        <Anchor href='https://www3.mutualofomaha.com/mobile-quotes/#/gad' target='_blank'>
          <MutualOfOmahaSymbol twClasses='z-10 w-10 bg-10sa-gold rounded-full fill-red-900' />
          <AnchorSpan style={{ transition: 'width 0.5s ease, transform 0.5s ease, opacity 2s ease' }}>
            Mutual (Quote)
          </AnchorSpan>
        </Anchor>
      </SymbolContainer>
      {formData.zip_code &&
        formData.state &&
        formData.gender &&
        formData.annual_household_income &&
        formData.household_size &&
        formData.age !== null &&
        formData.age > -1 && (
          <AutoSymbolContainer>
            <Anchor href={customLink} target='_blank' className='rounded-xl bottom-0 bg-white'>
              <HealthSherpaSymbol twClasses='z-10 w-10 bg-white rounded-full' />
              <AnchorSpan style={{ transition: 'width 0.5s ease, transform 0.5s ease, opacity 2s ease' }}>
                AutoSherpa
              </AnchorSpan>
            </Anchor>
          </AutoSymbolContainer>
        )}
    </SideNavContainer>
  );
};

export default SideNav;
