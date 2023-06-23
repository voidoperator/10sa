import React from 'react';
import { useFormData } from '../contexts/FormContext';
import tw from 'tailwind-styled-components';
import ScriptToggle from '../form/ScriptToggle';
import { NavWrapper, PhonyAnchor, PhonyDivider, ToggleContainer, TopNavContainer } from '../tw/twStyles';

const sections = ['Agent', 'Customer', 'Health', 'Quote', 'Disclosure', 'Closure', 'Beneficiary', 'Payment'];

const TopNav = () => {
  const { formData, setFormData } = useFormData();

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    const offset = 60;
    const bodyRect = document.body.getBoundingClientRect().top;
    const elementRect = element?.getBoundingClientRect().top || 0;
    const elementPosition = elementRect - bodyRect;
    const offsetPosition = elementPosition - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    });
  };

  return (
    <TopNavContainer>
      <NavWrapper>
        {sections.map((section, index) => {
          return (
            <React.Fragment key={section + index}>
              <PhonyAnchor onClick={() => handleClick(section.toLowerCase())}>{section}</PhonyAnchor>
              <PhonyDivider />
            </React.Fragment>
          );
        })}
        <ToggleContainer>
          <ScriptToggle id='show_script' key='show_script' defaultOption={formData?.show_script || 'off'} />
        </ToggleContainer>
      </NavWrapper>
    </TopNavContainer>
  );
};

export default TopNav;
