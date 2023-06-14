import React from 'react';
import { AmericoSymbol, HealthSherpaSymbol, MutualOfOmahaSymbol } from '../icons/NavIcons';

const SideNav = () => {
  return (
    <nav className='relative w-[10svw] min-h-screen'>
      <div className='flex flex-col gap-8 shadow-xl fixed top-8 left-8'>
        <a
          className='group bg-10sa-gold transition-all rounded-full p-2 inline-flex items-center relative'
          href='https://www.healthsherpa.com/'
          target='_blank'
        >
          <HealthSherpaSymbol twClasses='w-10' />
          <span
            className='text-white font-semibold absolute transition-all transform -translate-x-full -translate-y-1/2 top-1/2 w-0 overflow-hidden whitespace-nowrap group-hover:translate-x-14 group-hover:w-auto group-hover:opacity-100 opacity-0'
            style={{ transition: 'width 0.5s ease, transform 0.5s ease, opacity 2s ease' }}
          >
            HealthSherpa
          </span>
        </a>
        <a
          className='group bg-10sa-gold transition-all rounded-full p-2 inline-flex items-center relative'
          href='https://tools.americoagent.com/'
          target='_blank'
        >
          <AmericoSymbol twClasses='w-10' />
          <span
            className='text-white font-semibold absolute transition-all transform -translate-x-full -translate-y-1/2 top-1/2 w-0 overflow-hidden whitespace-nowrap group-hover:translate-x-14 group-hover:w-auto group-hover:opacity-100 opacity-0'
            style={{ transition: 'width 0.5s ease, transform 0.5s ease, opacity 2s ease' }}
          >
            Americo
          </span>
        </a>
        <a
          className='group bg-10sa-gold transition-all rounded-full p-2 inline-flex items-center relative'
          href='https://producer.mutualofomaha.com/enterprise/portal/!ut/p/z1/hY7BDoIwEES_hQNXdiMWibdGE1HxLO7FgKkFUygplf6-jXoxEZ3b7ryZDBAUQF05NrK0je5K5e8TJefVhmfzRY6YstkaOe6zlLE4xgOD4z-AvI0T4ujz9ESmGrbJG_jRsQOSSlevubyr4lQCGXEVRpjobvy7trYfliGG6JyLpNZSieii2xC_RWo9WCg-SejbAm9MjTkPgge1lLo5/dz/d5/L2dBISEvZ0FBIS9nQSEh/'
          target='_blank'
        >
          <MutualOfOmahaSymbol twClasses='w-10 fill-mutual' />
          <span
            className='text-white font-semibold absolute transition-all transform -translate-x-full -translate-y-1/2 top-1/2 w-0 overflow-hidden whitespace-nowrap group-hover:translate-x-14 group-hover:w-auto group-hover:opacity-100 opacity-0'
            style={{ transition: 'width 0.5s ease, transform 0.5s ease, opacity 2s ease' }}
          >
            Mutual Of Omaha (Submit)
          </span>
        </a>
        <a
          className='group bg-10sa-gold transition-all rounded-full p-2 inline-flex items-center relative'
          href='https://www3.mutualofomaha.com/mobile-quotes/#/gad'
          target='_blank'
        >
          <MutualOfOmahaSymbol twClasses='w-10 fill-red-900' />
          <span
            className='text-white font-semibold absolute transition-all transform -translate-x-full -translate-y-1/2 top-1/2 w-0 overflow-hidden whitespace-nowrap group-hover:translate-x-14 group-hover:w-auto group-hover:opacity-100 opacity-0'
            style={{ transition: 'width 0.5s ease, transform 0.5s ease, opacity 2s ease' }}
          >
            Mutual Of Omaha (Quote)
          </span>
        </a>
      </div>
    </nav>
  );
};

export default SideNav;
