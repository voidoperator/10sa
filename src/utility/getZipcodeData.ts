import zipcodeHashmap from '../../static/zip_code_database.json';

export type ZipcodeDataType = {
  zip: string;
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
