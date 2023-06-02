import React, { useState, useEffect, useRef } from 'react';
import tw from 'tailwind-styled-components';
import TextInput from './TextInput';
import RadioInput from './RadioInput';
import DropDownInput from './DropDownInput';
import TextAreaInput from './TextAreaInput';
import DateInput from './DateInput';

const states = [
  { label: 'Alabama [AL]', value: 'Alabama [AL]' },
  { label: 'Alaska [AK]', value: 'Alaska [AK]' },
  { label: 'Arizona [AZ]', value: 'Arizona [AZ]' },
  { label: 'Arkansas [AR]', value: 'Arkansas [AR]' },
  { label: 'California [CA]', value: 'California [CA]' },
  { label: 'Colorado [CO]', value: 'Colorado [CO]' },
  { label: 'Connecticut [CT]', value: 'Connecticut [CT]' },
  { label: 'Delaware [DE]', value: 'Delaware [DE]' },
  { label: 'Florida [FL]', value: 'Florida [FL]' },
  { label: 'Georgia [GA]', value: 'Georgia [GA]' },
  { label: 'Hawaii [HI]', value: 'Hawaii [HI]' },
  { label: 'Idaho [ID]', value: 'Idaho [ID]' },
  { label: 'Illinois [IL]', value: 'Illinois [IL]' },
  { label: 'Indiana [IN]', value: 'Indiana [IN]' },
  { label: 'Iowa [IA]', value: 'Iowa [IA]' },
  { label: 'Kansas [KS]', value: 'Kansas [KS]' },
  { label: 'Kentucky [KY]', value: 'Kentucky [KY]' },
  { label: 'Louisiana [LA]', value: 'Louisiana [LA]' },
  { label: 'Maine [ME]', value: 'Maine [ME]' },
  { label: 'Maryland [MD]', value: 'Maryland [MD]' },
  { label: 'Massachusetts [MA]', value: 'Massachusetts [MA]' },
  { label: 'Michigan [MI]', value: 'Michigan [MI]' },
  { label: 'Minnesota [MN]', value: 'Minnesota [MN]' },
  { label: 'Mississippi [MS]', value: 'Mississippi [MS]' },
  { label: 'Missouri [MO]', value: 'Missouri [MO]' },
  { label: 'Montana [MT]', value: 'Montana [MT]' },
  { label: 'Nebraska [NE]', value: 'Nebraska [NE]' },
  { label: 'Nevada [NV]', value: 'Nevada [NV]' },
  { label: 'New Hampshire [NH]', value: 'New Hampshire [NH]' },
  { label: 'New Jersey [NJ]', value: 'New Jersey [NJ]' },
  { label: 'New Mexico [NM]', value: 'New Mexico [NM]' },
  { label: 'New York [NY]', value: 'New York [NY]' },
  { label: 'North Carolina [NC]', value: 'North Carolina [NC]' },
  { label: 'North Dakota [ND]', value: 'North Dakota [ND]' },
  { label: 'Ohio [OH]', value: 'Ohio [OH]' },
  { label: 'Oklahoma [OK]', value: 'Oklahoma [OK]' },
  { label: 'Oregon [OR]', value: 'Oregon [OR]' },
  { label: 'Pennsylvania [PA]', value: 'Pennsylvania [PA]' },
  { label: 'Rhode Island [RI]', value: 'Rhode Island [RI]' },
  { label: 'South Carolina [SC]', value: 'South Carolina [SC]' },
  { label: 'South Dakota [SD]', value: 'South Dakota [SD]' },
  { label: 'Tennessee [TN]', value: 'Tennessee [TN]' },
  { label: 'Texas [TX]', value: 'Texas [TX]' },
  { label: 'Utah [UT]', value: 'Utah [UT]' },
  { label: 'Vermont [VT]', value: 'Vermont [VT]' },
  { label: 'Virginia [VA]', value: 'Virginia [VA]' },
  { label: 'Washington [WA]', value: 'Washington [WA]' },
  { label: 'West Virginia [WV]', value: 'West Virginia [WV]' },
  { label: 'Wisconsin [WI]', value: 'Wisconsin [WI]' },
  { label: 'Wyoming [WY]', value: 'Wyoming [WY]' },
  { label: 'Puerto Rico [PR]', value: 'Puerto Rico [PR]' },
];

const Divider = tw.div`
h-[1px] w-full bg-black/75 dark:bg-white/75 my-0 sm:my-10 hidden sm:block
`;

const Form = () => {
  return (
    <div className='flex items-center justify-center min-h-screen py-20'>
      <div className='w-full max-w-4xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700'>
        <form className='space-y-6'>
          <h5 className='text-xl font-medium text-gray-900 dark:text-white'>Customer Details</h5>
          <TextInput labelName='First Name' placeholder='e.g. John' type='text' name='first_name' />
          <TextInput labelName='Last Name' placeholder='e.g. Doe' type='text' name='last_name' />
          <RadioInput
            labelName='Type of Plan'
            name='plan_type'
            options={[
              { label: 'Individual', value: 'individual' },
              { label: 'Family', value: 'family' },
            ]}
          />
          <DropDownInput labelName='State' name='state' defaultOption='Please select a state' options={states} />
          <TextInput
            labelName='Zip Code'
            placeholder='e.g. 12345'
            type='number'
            name='zip_code'
            pattern='/^\d{5}(-\d{4})?$/'
          />
          <TextAreaInput
            labelName='Why are they looking for coverage?'
            placeholder='Enter reason here'
            name='coverage_reason'
          />

          <Divider />

          <h5 className='text-xl font-medium text-gray-900 dark:text-white'>Customer Questionare</h5>
          <DateInput labelName='Date of Birth' name='date_of_birth' showAge={true} />
          <RadioInput
            labelName='Tobacco User?'
            name='tobacco_use'
            options={[
              { label: 'Yes', value: 'Yes' },
              { label: 'No', value: 'No' },
            ]}
          />
          <RadioInput
            labelName='Married?'
            name='married'
            options={[
              { label: 'Yes', value: 'Yes' },
              { label: 'No', value: 'No' },
            ]}
          />
          <RadioInput
            labelName='Dependent on taxes?'
            name='dependents'
            options={[
              { label: 'Yes', value: 'Yes' },
              { label: 'No', value: 'No' },
            ]}
          />
          <TextInput
            labelName='Household annual income'
            placeholder='e.g. $25,000'
            type='text'
            name='household_annual_income'
            pattern='^\$[0-9]{1,3}(?:,?[0-9]{3})*(?:\.[0-9]{2})?$'
            currency={true}
          />
          <TextInput
            labelName='Pre-existing conditions'
            placeholder='e.g. Coronary Disease, Cancer, Lupus'
            type='text'
            name='preexisting_conditions'
            required={false}
          />
          <TextInput
            labelName='Medications'
            placeholder='e.g. Benazepril, Moexipril , Prozac'
            type='text'
            name='medications'
            required={false}
          />
          <TextAreaInput
            labelName='History of mental health, COPD, heart procedures, cancer, HIV?'
            placeholder='Enter history here'
            name='medical_history'
            required={false}
          />
          <RadioInput
            labelName='Any regular doctors?'
            name='preferred_doctors'
            options={[
              { label: 'Yes', value: 'Yes' },
              { label: 'No', value: 'No' },
            ]}
          />
          <TextInput labelName='Doctor Name' placeholder='e.g. Dr. Lino Fernandez' type='text' name='doctor_name' />
          <TextInput
            labelName='Monthly budget?'
            placeholder='e.g. $150'
            type='text'
            name='monthly_budget'
            pattern='^\$[0-9]{1,3}(?:,?[0-9]{3})*(?:\.[0-9]{2})?$'
            currency={true}
          />

          <Divider />
          <h5 className='text-xl font-medium text-gray-900 dark:text-white'>Quote Breakdown</h5>
          <TextInput labelName='Plan Name' placeholder='e.g. John' type='text' name='first_name' />
          <TextInput
            labelName='PCP Copay:'
            placeholder='e.g. $150'
            type='text'
            name='pcp_copay'
            pattern='^\$[0-9]{1,3}(?:,?[0-9]{3})*(?:\.[0-9]{2})?$'
            currency={true}
          />
          <TextInput
            labelName='Specialist Copay'
            placeholder='e.g. $150'
            type='text'
            name='specialist_copay'
            pattern='^\$[0-9]{1,3}(?:,?[0-9]{3})*(?:\.[0-9]{2})?$'
            currency={true}
          />
          <TextInput
            labelName='Generic Meds Copay'
            placeholder='e.g. $50'
            type='text'
            name='generic_meds_copay'
            pattern='^\$[0-9]{1,3}(?:,?[0-9]{3})*(?:\.[0-9]{2})?$'
            currency={true}
          />
          <TextInput
            labelName='Annual Deductible'
            placeholder='e.g. $1,500'
            type='text'
            name='annual_deductible'
            pattern='^\$[0-9]{1,3}(?:,?[0-9]{3})*(?:\.[0-9]{2})?$'
            currency={true}
          />
          <TextInput
            labelName='Max Out of Pocket'
            placeholder='e.g. $5,000'
            type='text'
            name='max_out_of_pocket'
            pattern='^\$[0-9]{1,3}(?:,?[0-9]{3})*(?:\.[0-9]{2})?$'
            currency={true}
          />
          <TextInput
            labelName='All Benefits'
            placeholder='e.g. $5,000'
            type='text'
            name='all_benefits'
            pattern='^\$[0-9]{1,3}(?:,?[0-9]{3})*(?:\.[0-9]{2})?$'
            currency={true}
          />

          <Divider />
          <h5 className='text-xl font-medium text-gray-900 dark:text-white'>Closure</h5>
          <TextInput
            labelName='Phone Number'
            placeholder='e.g. (786) 305-6789'
            type='tel'
            name='phone_number'
            pattern='^\(\d{3}\) \d{3}-\d{4}$'
            phone={true}
          />
          <DateInput labelName='Date of Birth' name='confirmed_date_of_birth' showAge={true} />
          <TextInput labelName='First Name' placeholder='e.g. John' type='text' name='confirmed_first_name' />
          <TextInput labelName='Last Name' placeholder='e.g. Doe' type='text' name='confirmed_last_name' />
          <TextInput
            labelName='Email'
            placeholder='e.g. johndoe@gmail.com'
            type='email'
            name='email'
            pattern='^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?$'
          />
          <TextInput
            labelName='Full Address'
            placeholder='e.g. 12345 NW 1st St, Miami, FL, 33186'
            type='text'
            name='address'
          />
          <TextInput
            labelName='Height'
            placeholder="e.g. 5'11"
            type='text'
            name='height'
            pattern="^\\d{1,2}'(?:1[0-2]|0?[1-9])$"
            height={true}
          />

          <TextInput
            labelName='Weight'
            placeholder='e.g. 150lbs'
            type='text'
            name='weight'
            pattern='^\d+(\.\d+)? lbs$'
            weight={true}
          />
          <TextInput
            labelName='Social Security Number'
            placeholder='e.g. 123-45-6789'
            type='text'
            name='ssn'
            pattern='^\d{3}-\d{2}-\d{4}$'
            socialSecurity={true}
          />

          <button
            type='submit'
            className='w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;
