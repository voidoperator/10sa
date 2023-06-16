import React from 'react';
import { AmericoSymbol, HealthSherpaSymbol, MutualOfOmahaSymbol } from '../icons/NavIcons';
import { Nav, SymbolContainer, Anchor, AnchorSpan } from '../tw/twStyles';

const SideNav = () => {
  return (
    <Nav>
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
    </Nav>
  );
};

export default SideNav;
