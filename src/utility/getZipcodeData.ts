import zipcodeHashmap from './zip_code_database.json';

export type ZipcodeDataType = {
  type: string;
  decommissioned: boolean;
  primary_city: string;
  state: string;
  county: string;
};

type ZipcodeDatabase = { [zip: string]: ZipcodeDataType };

const zipcodeDatabase: ZipcodeDatabase = zipcodeHashmap as ZipcodeDatabase;

export const getZipcodeData = (zipcode: string) => {
  return zipcodeDatabase[zipcode];
};
