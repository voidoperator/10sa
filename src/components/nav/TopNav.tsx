import React from 'react';
import { useConstantData } from '../contexts/ConstantDataContext';
import ScriptToggle from '../local/ScriptToggle';
import {
  NavWrapper,
  PhonyAnchor,
  VerticalDivider,
  ToggleContainer,
  TopNavContainer,
} from '../../components/TailwindStyled';

const sections = ['Agent', 'Customer', 'Health', 'Quote', 'Disclosure', 'Closure', 'Beneficiary', 'Payment'];

const TopNav = () => {
  const { constantData } = useConstantData();

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
              <VerticalDivider />
            </React.Fragment>
          );
        })}
        <ToggleContainer>
          <ScriptToggle id='show_script' key='show_script' defaultOption={constantData.show_script || 'off'} />
        </ToggleContainer>
      </NavWrapper>
    </TopNavContainer>
  );
};

export default TopNav;
