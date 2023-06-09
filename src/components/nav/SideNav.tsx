import React from 'react';
import { AmericoSymbol, HealthSherpaSymbol, MutualOfOmahaSymbol } from '../icons/NavIcons';

const SideNav = () => {
  return (
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
  );
};

export default SideNav;
