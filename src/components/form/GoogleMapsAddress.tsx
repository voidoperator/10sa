/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';
import { useFormData } from '../contexts/FormContext';
import { MainLabel, RequiredSpan, ShadowDiv, TextField } from '@/components/TailwindStyled';
import { isBrowser, loadScript } from '@/utility/utility';
import type { GoogleMapsAddressProps } from '@/types/formData';

const GoogleMapsAddress: React.FC<GoogleMapsAddressProps> = ({
  id,
  labelName,
  placeholder,
  name,
  pattern,
  required = true,
  additional = false,
  uppercase = true,
  useDefault = true,
  defaultKey = '',
  defaultValue = '',
  externalValue,
}) => {
  const { formData, setFormData } = useFormData();
  const [value, setValue] = useState<string>('');

  const autoCompleteRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isBrowser()) {
      const current = autoCompleteRef.current;
      if (current !== null) {
        loadScript(
          `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`,
          () => setupAutocomplete(current),
        );
      }
    }
  }, []);

  const setupAutocomplete = (input: HTMLInputElement) => {
    const autoComplete = new google.maps.places.Autocomplete(input, {
      types: ['address'],
      componentRestrictions: { country: 'us' },
    });

    autoComplete.addListener('place_changed', () => handlePlaceSelect(autoComplete));

    input.addEventListener('keydown', (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        return;
      }
      if (event.key === 'Tab') {
        google.maps.event.trigger(autoComplete, 'place_changed');
        return;
      }
    });
  };

  const handlePlaceSelect = (autoComplete: google.maps.places.Autocomplete) => {
    const addressObject = autoComplete.getPlace();
    const address = addressObject.address_components;

    if (address) {
      let streetNumber = '';
      let streetName = '';

      address.forEach((component: google.maps.GeocoderAddressComponent) => {
        if (component.types.includes('street_number')) {
          streetNumber = component.long_name;
        } else if (component.types.includes('route')) {
          streetName = component.long_name;
        }
      });

      const query = `${streetNumber} ${streetName}`;
      setValue(query);
      setFormData((prevState) => ({ ...prevState, [name]: query }));
    }
  };

  useEffect(() => {
    if (!additional && useDefault && defaultKey && defaultValue && value === '') {
      setValue(defaultValue);
      setFormData((prevState) => ({ ...prevState, [defaultKey]: defaultValue }));
    }
    if (additional && typeof id === 'number' && useDefault && defaultKey && defaultValue && value === '') {
      setValue(defaultValue);
      const dependentIndex = id;
      let additionalInsuredList = formData.additional_insured_list || [];
      additionalInsuredList[dependentIndex] = {
        ...additionalInsuredList[dependentIndex],
        [defaultKey]: defaultValue,
      };
      setFormData((prevState) => ({ ...prevState, additional_insured_list: additionalInsuredList }));
    }
  }, [useDefault, defaultKey, defaultValue, value]);

  useEffect(() => {
    if (externalValue !== undefined) {
      setValue(externalValue);
    }
  }, [externalValue]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value;

    setValue(value);
    if (additional && typeof id === 'number') {
      const dependentIndex = id;
      let additionalInsuredList = formData.additional_insured_list || [];
      additionalInsuredList[dependentIndex] = {
        ...additionalInsuredList[dependentIndex],
        [name]: value,
      };
      setFormData((prevState) => ({ ...prevState, additional_insured_list: additionalInsuredList }));
    } else {
      setFormData((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    let value = event.target.value;

    setValue(value);
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const formatId = additional && typeof id === 'number' ? name + '_' + (id + 1) : name;

  const additionalClasses = uppercase ? 'capitalize' : 'normal-case';

  return (
    <ShadowDiv>
      <MainLabel htmlFor={formatId}>
        {labelName}
        {required && <RequiredSpan />}
      </MainLabel>
      <TextField
        ref={autoCompleteRef}
        id={formatId}
        pattern={pattern}
        type='text'
        name={name}
        placeholder={placeholder}
        required={required}
        className={additionalClasses}
        onChange={handleChange}
        onBlur={handleBlur}
        autoComplete='no'
        value={value}
      />
    </ShadowDiv>
  );
};

export default GoogleMapsAddress;
