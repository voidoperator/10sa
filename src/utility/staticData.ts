import { OptionTypes, PreferredCarriers } from '../types/formData';

export const unitedStates: OptionTypes[] = [
  { label: 'Alabama - AL', value: 'alabama' },
  { label: 'Alaska - AK', value: 'alaska' },
  { label: 'Arizona - AZ', value: 'arizona' },
  { label: 'Arkansas - AR', value: 'arkansas' },
  { label: 'California - CA', value: 'california' },
  { label: 'Colorado - CO', value: 'colorado' },
  { label: 'Connecticut - CT', value: 'connecticut' },
  { label: 'Delaware - DE', value: 'delaware' },
  { label: 'Florida - FL', value: 'florida' },
  { label: 'Georgia - GA', value: 'georgia' },
  { label: 'Hawaii - HI', value: 'hawaii' },
  { label: 'Idaho - ID', value: 'idaho' },
  { label: 'Illinois - IL', value: 'illinois' },
  { label: 'Indiana - IN', value: 'indiana' },
  { label: 'Iowa - IA', value: 'iowa' },
  { label: 'Kansas - KS', value: 'kansas' },
  { label: 'Kentucky - KY', value: 'kentucky' },
  { label: 'Louisiana - LA', value: 'louisiana' },
  { label: 'Maine - ME', value: 'maine' },
  { label: 'Maryland - MD', value: 'maryland' },
  { label: 'Massachusetts - MA', value: 'massachusetts' },
  { label: 'Michigan - MI', value: 'michigan' },
  { label: 'Minnesota - MN', value: 'minnesota' },
  { label: 'Mississippi - MS', value: 'mississippi' },
  { label: 'Missouri - MO', value: 'missouri' },
  { label: 'Montana - MT', value: 'montana' },
  { label: 'Nebraska - NE', value: 'nebraska' },
  { label: 'Nevada - NV', value: 'nevada' },
  { label: 'New Hampshire - NH', value: 'new_hampshire' },
  { label: 'New Jersey - NJ', value: 'new_jersey' },
  { label: 'New Mexico - NM', value: 'new_mexico' },
  { label: 'New York - NY', value: 'new_york' },
  { label: 'North Carolina - NC', value: 'north_Carolina' },
  { label: 'North Dakota - ND', value: 'north_dakota' },
  { label: 'Ohio - OH', value: 'ohio' },
  { label: 'Oklahoma - OK', value: 'oklahoma' },
  { label: 'Oregon - OR', value: 'oregon' },
  { label: 'Pennsylvania - PA', value: 'pennsylvania' },
  { label: 'Rhode Island - RI', value: 'rhode_island' },
  { label: 'South Carolina - SC', value: 'south_carolina' },
  { label: 'South Dakota - SD', value: 'south_dakota' },
  { label: 'Tennessee - TN', value: 'tennessee' },
  { label: 'Texas - TX', value: 'texas' },
  { label: 'Utah - UT', value: 'utah' },
  { label: 'Vermont - VT', value: 'vermont' },
  { label: 'Virginia - VA', value: 'virginia' },
  { label: 'Washington - WA', value: 'washington' },
  { label: 'West Virginia - WV', value: 'west_virginia' },
  { label: 'Wisconsin - WI', value: 'wisconsin' },
  { label: 'Wyoming - WY', value: 'wyoming' },
  { label: 'Puerto Rico - PR', value: 'puerto_rico' },
];

export const preferredCarriers: PreferredCarriers = {
  //   "None",
  //   "Aetna",
  //   "Ambetter",
  //   "Arizona",
  //   "Avmed",
  //   "BlueCross BlueShield",
  //   "Cigna",
  //   "Florida Blue",
  //   "Friday Health Plans",
  //   "Molina",
  //   "Oscar",
  //   "UnitedHealthcare (UHC)"
  alabama: ['Aetna', 'UnitedHealthcare (UHC)'],
  alaska: ['None'],
  arizona: ['Aetna', 'Ambetter', 'Cigna', 'Oscar', 'UnitedHealthcare (UHC)'],
  arkansas: ['None'],
  california: ['Aetna', 'Molina', 'Oscar'],
  colorado: ['Cigna', 'Friday Health Plans', 'Oscar', 'UnitedHealthcare (UHC)'],
  connecticut: ['None'],
  delaware: ['None'],
  florida: ['Aetna', 'Ambetter', 'Avmed', 'Cigna', 'Florida Blue', 'Molina', 'Oscar', 'UnitedHealthcare (UHC)'],
  georgia: ['Ambetter', 'Cigna', 'Friday Health Plans', 'Oscar', 'UnitedHealthcare (UHC)'],
  hawaii: ['None'],
  idaho: ['None'],
  illinois: ['Aetna', 'Ambetter', 'Cigna', 'Molina', 'Oscar', 'UnitedHealthcare (UHC)'],
  indiana: ['Aetna', 'Ambetter'],
  iowa: ['Oscar'],
  kansas: ['Aetna', 'Cigna', 'Oscar'],
  kentucky: ['None'],
  louisiana: ['Ambetter', 'Arizona', 'UnitedHealthcare (UHC)'],
  maine: ['None'],
  maryland: ['UnitedHealthcare (UHC)'],
  massachusetts: ['None'],
  michigan: ['Aetna', 'Ambetter', 'Molina', 'Oscar', 'UnitedHealthcare (UHC)'],
  minnesota: ['None'],
  mississippi: ['Ambetter', 'Cigna', 'Molina', 'UnitedHealthcare (UHC)'],
  missouri: ['Cigna', 'Oscar', 'UnitedHealthcare (UHC)'],
  montana: ['None'],
  nebraska: ['Ambetter', 'Oscar'],
  nevada: ['None'],
  new_hampshire: ['None'],
  new_jersey: ['Aetna', 'Ambetter', 'Oscar', 'UnitedHealthcare (UHC)'],
  new_mexico: ['Aetna', 'Ambetter', 'Friday Health Plans', 'Molina'],
  new_york: ['None'],
  north_Carolina: ['Aetna', 'Ambetter', 'Cigna', 'Friday Health Plans', 'Oscar', 'UnitedHealthcare (UHC)'],
  north_dakota: ['None'],
  ohio: ['Aetna', 'Ambetter', 'Molina', 'Oscar', 'UnitedHealthcare (UHC)'],
  oklahoma: ['Aetna', 'Ambetter', 'Friday Health Plans', 'Oscar', 'UnitedHealthcare (UHC)'],
  oregon: ['None'],
  pennsylvania: ['Cigna', 'Oscar'],
  rhode_island: ['None'],
  south_carolina: ['Aetna', 'Ambetter', 'BlueCross BlueShield', 'Cigna', 'Molina', 'UnitedHealthcare (UHC)'],
  south_dakota: ['None'],
  tennessee: ['Aetna', 'Ambetter', 'Arizona', 'Oscar', 'UnitedHealthcare (UHC)'],
  texas: [
    'Aetna',
    'Ambetter',
    'BlueCross BlueShield',
    'Cigna',
    'Friday Health Plans',
    'Molina',
    'Oscar',
    'UnitedHealthcare (UHC)',
  ],
  utah: ['Aetna', 'Cigna', 'Molina', 'UnitedHealthcare (UHC)'],
  vermont: ['None'],
  virginia: ['Aetna', 'Cigna', 'Oscar', 'UnitedHealthcare (UHC)'],
  washington: ['None'],
  west_virginia: ['None'],
  wisconsin: ['None'],
  wyoming: ['None'],
  puerto_rico: ['None'],
};

export const countries: OptionTypes[] = [
  {
    label: 'United States Of America',
    value: 'United States Of America',
  },
  {
    label: 'Albania',
    value: 'Albania',
  },
  {
    label: 'Algeria',
    value: 'Algeria',
  },
  {
    label: 'Andorra',
    value: 'Andorra',
  },
  {
    label: 'Angola',
    value: 'Angola',
  },
  {
    label: 'Anguilla',
    value: 'Anguilla',
  },
  {
    label: 'Antigua And Barbuda',
    value: 'Antigua And Barbuda',
  },
  {
    label: 'Arab Emirates',
    value: 'Arab Emirates',
  },
  {
    label: 'Argentina',
    value: 'Argentina',
  },
  {
    label: 'Armenia',
    value: 'Armenia',
  },
  {
    label: 'Aruba',
    value: 'Aruba',
  },
  {
    label: 'Australia',
    value: 'Australia',
  },
  {
    label: 'Austria',
    value: 'Austria',
  },
  {
    label: 'Azerbaijan',
    value: 'Azerbaijan',
  },
  {
    label: 'The Bahamas',
    value: 'The Bahamas',
  },
  {
    label: 'Bahrain',
    value: 'Bahrain',
  },
  {
    label: 'Bangladesh',
    value: 'Bangladesh',
  },
  {
    label: 'Barbados',
    value: 'Barbados',
  },
  {
    label: 'Belarus',
    value: 'Belarus',
  },
  {
    label: 'Belgium',
    value: 'Belgium',
  },
  {
    label: 'Belize',
    value: 'Belize',
  },
  {
    label: 'Bermuda',
    value: 'Bermuda',
  },
  {
    label: 'Bolivia',
    value: 'Bolivia',
  },
  {
    label: 'Bosnia And Herzegovina',
    value: 'Bosnia And Herzegovina',
  },
  {
    label: 'Botswana',
    value: 'Botswana',
  },
  {
    label: 'Brazil',
    value: 'Brazil',
  },
  {
    label: 'Brunei',
    value: 'Brunei',
  },
  {
    label: 'Bulgaria',
    value: 'Bulgaria',
  },
  {
    label: 'Cambodia',
    value: 'Cambodia',
  },
  {
    label: 'Cameroon',
    value: 'Cameroon',
  },
  {
    label: 'Canada',
    value: 'Canada',
  },
  {
    label: 'Cayman Islands',
    value: 'Cayman Islands',
  },
  {
    label: 'Chad',
    value: 'Chad',
  },
  {
    label: 'Chile',
    value: 'Chile',
  },
  {
    label: 'China,Hong Kong S.A.R.',
    value: 'China,Hong Kong S.A.R.',
  },
  {
    label: 'China P.Rep.',
    value: 'China P.Rep.',
  },
  {
    label: 'Cocos Islands',
    value: 'Cocos Islands',
  },
  {
    label: 'Colombia',
    value: 'Colombia',
  },
  {
    label: 'Congo, Democratic Republic Of',
    value: 'Congo, Democratic Republic Of',
  },
  {
    label: 'Cook Islands',
    value: 'Cook Islands',
  },
  {
    label: 'Costa Rica',
    value: 'Costa Rica',
  },
  {
    label: 'Croatia',
    value: 'Croatia',
  },
  {
    label: 'Cuba',
    value: 'Cuba',
  },
  {
    label: 'Cyprus',
    value: 'Cyprus',
  },
  {
    label: 'Czech Republic',
    value: 'Czech Republic',
  },
  {
    label: 'Czechoslovakia',
    value: 'Czechoslovakia',
  },
  {
    label: 'Denmark',
    value: 'Denmark',
  },
  {
    label: 'Dominica',
    value: 'Dominica',
  },
  {
    label: 'Dominican Repl.',
    value: 'Dominican Repl.',
  },
  {
    label: 'Ecuador',
    value: 'Ecuador',
  },
  {
    label: 'Egypt',
    value: 'Egypt',
  },
  {
    label: 'El Salvador',
    value: 'El Salvador',
  },
  {
    label: 'Estonia',
    value: 'Estonia',
  },
  {
    label: 'Ethiopia',
    value: 'Ethiopia',
  },
  {
    label: 'Falkland Islands(Malvinas)',
    value: 'Falkland Islands(Malvinas)',
  },
  {
    label: 'Faroe Islands',
    value: 'Faroe Islands',
  },
  {
    label: 'Fiji',
    value: 'Fiji',
  },
  {
    label: 'Finland',
    value: 'Finland',
  },
  {
    label: 'Fr. Polynesia',
    value: 'Fr. Polynesia',
  },
  {
    label: 'French Guiana',
    value: 'French Guiana',
  },
  {
    label: 'France',
    value: 'France',
  },
  {
    label: 'Gambia',
    value: 'Gambia',
  },
  {
    label: 'Gabon',
    value: 'Gabon',
  },
  {
    label: 'Georgia(Republic Of)',
    value: 'Georgia(Republic Of)',
  },
  {
    label: 'Germany',
    value: 'Germany',
  },
  {
    label: 'Ghana',
    value: 'Ghana',
  },
  {
    label: 'Gibraltar',
    value: 'Gibraltar',
  },
  {
    label: 'Greece',
    value: 'Greece',
  },
  {
    label: 'Greenland',
    value: 'Greenland',
  },
  {
    label: 'Grenada',
    value: 'Grenada',
  },
  {
    label: 'Guadeloupe',
    value: 'Guadeloupe',
  },
  {
    label: 'Guatemala',
    value: 'Guatemala',
  },
  {
    label: 'Guinea',
    value: 'Guinea',
  },
  {
    label: 'Guyana',
    value: 'Guyana',
  },
  {
    label: 'Haiti',
    value: 'Haiti',
  },
  {
    label: 'Honduras',
    value: 'Honduras',
  },
  {
    label: 'Hungary',
    value: 'Hungary',
  },
  {
    label: 'Iceland',
    value: 'Iceland',
  },
  {
    label: 'India',
    value: 'India',
  },
  {
    label: 'Indonesia',
    value: 'Indonesia',
  },
  {
    label: 'Iran',
    value: 'Iran',
  },
  {
    label: 'Iraq',
    value: 'Iraq',
  },
  {
    label: 'Ireland',
    value: 'Ireland',
  },
  {
    label: 'Israel',
    value: 'Israel',
  },
  {
    label: 'Italy',
    value: 'Italy',
  },
  {
    label: 'Cote d Ivoire',
    value: 'Cote d Ivoire',
  },
  {
    label: 'Jamaica',
    value: 'Jamaica',
  },
  {
    label: 'Japan',
    value: 'Japan',
  },
  {
    label: 'Jordan',
    value: 'Jordan',
  },
  {
    label: 'Kazakhstan',
    value: 'Kazakhstan',
  },
  {
    label: 'Kenya',
    value: 'Kenya',
  },
  {
    label: 'Kuwait',
    value: 'Kuwait',
  },
  {
    label: 'Kyrgyzstan',
    value: 'Kyrgyzstan',
  },
  {
    label: 'Laos',
    value: 'Laos',
  },
  {
    label: 'Latvia',
    value: 'Latvia',
  },
  {
    label: 'Lebanon',
    value: 'Lebanon',
  },
  {
    label: 'Liberia',
    value: 'Liberia',
  },
  {
    label: 'Libya',
    value: 'Libya',
  },
  {
    label: 'Liechtenstein',
    value: 'Liechtenstein',
  },
  {
    label: 'Lithuania',
    value: 'Lithuania',
  },
  {
    label: 'Luxembourg',
    value: 'Luxembourg',
  },
  {
    label: 'Macau',
    value: 'Macau',
  },
  {
    label: 'Macedonia, Former Yugoslav Rep.',
    value: 'Macedonia, Former Yugoslav Rep.',
  },
  {
    label: 'Madagascar',
    value: 'Madagascar',
  },
  {
    label: 'Malawi',
    value: 'Malawi',
  },
  {
    label: 'Malaysia',
    value: 'Malaysia',
  },
  {
    label: 'Mali',
    value: 'Mali',
  },
  {
    label: 'Malta',
    value: 'Malta',
  },
  {
    label: 'Marshall Islands',
    value: 'Marshall Islands',
  },
  {
    label: 'Martinique',
    value: 'Martinique',
  },
  {
    label: 'Mauritania',
    value: 'Mauritania',
  },
  {
    label: 'Mauritius',
    value: 'Mauritius',
  },
  {
    label: 'Mexico',
    value: 'Mexico',
  },
  {
    label: 'Moldova, Republic Of',
    value: 'Moldova, Republic Of',
  },
  {
    label: 'Monaco',
    value: 'Monaco',
  },
  {
    label: 'Morocco',
    value: 'Morocco',
  },
  {
    label: 'Myanmar',
    value: 'Myanmar',
  },
  {
    label: 'Namibia',
    value: 'Namibia',
  },
  {
    label: 'Nepal',
    value: 'Nepal',
  },
  {
    label: 'Neth. Antilles',
    value: 'Neth. Antilles',
  },
  {
    label: 'Netherlands',
    value: 'Netherlands',
  },
  {
    label: 'New Caledonia',
    value: 'New Caledonia',
  },
  {
    label: 'New Guinea',
    value: 'New Guinea',
  },
  {
    label: 'New Zealand',
    value: 'New Zealand',
  },
  {
    label: 'Nicaragua',
    value: 'Nicaragua',
  },
  {
    label: 'Niger',
    value: 'Niger',
  },
  {
    label: 'Nigeria',
    value: 'Nigeria',
  },
  {
    label: 'Norfolk Island',
    value: 'Norfolk Island',
  },
  {
    label: 'North Korea',
    value: 'North Korea',
  },
  {
    label: 'Norway',
    value: 'Norway',
  },
  {
    label: 'Oman',
    value: 'Oman',
  },
  {
    label: 'Pakistan',
    value: 'Pakistan',
  },
  {
    label: 'Panama',
    value: 'Panama',
  },
  {
    label: 'Paraguay',
    value: 'Paraguay',
  },
  {
    label: 'Peru',
    value: 'Peru',
  },
  {
    label: 'Philippines',
    value: 'Philippines',
  },
  {
    label: 'Poland',
    value: 'Poland',
  },
  {
    label: 'Portugal',
    value: 'Portugal',
  },
  {
    label: 'Palau',
    value: 'Palau',
  },
  {
    label: 'Qatar',
    value: 'Qatar',
  },
  {
    label: 'Romania',
    value: 'Romania',
  },
  {
    label: 'Russian Federation',
    value: 'Russian Federation',
  },
  {
    label: 'Saint Kitts And Nevis',
    value: 'Saint Kitts And Nevis',
  },
  {
    label: 'San Marino',
    value: 'San Marino',
  },
  {
    label: 'Saudi Arabia',
    value: 'Saudi Arabia',
  },
  {
    label: 'Senegal',
    value: 'Senegal',
  },
  {
    label: 'Sierra Leone',
    value: 'Sierra Leone',
  },
  {
    label: 'Singapore',
    value: 'Singapore',
  },
  {
    label: 'Slovakia',
    value: 'Slovakia',
  },
  {
    label: 'Slovenia',
    value: 'Slovenia',
  },
  {
    label: 'Solomon Islands',
    value: 'Solomon Islands',
  },
  {
    label: 'South Africa',
    value: 'South Africa',
  },
  {
    label: 'South Korea',
    value: 'South Korea',
  },
  {
    label: 'Spain',
    value: 'Spain',
  },
  {
    label: 'Sri Lanka',
    value: 'Sri Lanka',
  },
  {
    label: 'St. Lucia',
    value: 'St. Lucia',
  },
  {
    label: 'St. Vincent/Grenadines',
    value: 'St. Vincent/Grenadines',
  },
  {
    label: 'Sudan',
    value: 'Sudan',
  },
  {
    label: 'Suriname',
    value: 'Suriname',
  },
  {
    label: 'Swaziland',
    value: 'Swaziland',
  },
  {
    label: 'Sweden',
    value: 'Sweden',
  },
  {
    label: 'Switzerland',
    value: 'Switzerland',
  },
  {
    label: 'Syria',
    value: 'Syria',
  },
  {
    label: 'Taiwan',
    value: 'Taiwan',
  },
  {
    label: 'Tanzania',
    value: 'Tanzania',
  },
  {
    label: 'Thailand',
    value: 'Thailand',
  },
  {
    label: 'Trinidad/Tobago',
    value: 'Trinidad/Tobago',
  },
  {
    label: 'Tunisia',
    value: 'Tunisia',
  },
  {
    label: 'Turkey',
    value: 'Turkey',
  },
  {
    label: 'Turks And Caicos Islands',
    value: 'Turks And Caicos Islands',
  },
  {
    label: 'Uganda',
    value: 'Uganda',
  },
  {
    label: 'Ukraine',
    value: 'Ukraine',
  },
  {
    label: 'United Kingdom',
    value: 'United Kingdom',
  },
  {
    label: 'Uruguay',
    value: 'Uruguay',
  },
  {
    label: 'Uzbekistan',
    value: 'Uzbekistan',
  },
  {
    label: 'Vanuatu(New Hebrides)',
    value: 'Vanuatu(New Hebrides)',
  },
  {
    label: 'Vatican City State(Holy See)',
    value: 'Vatican City State(Holy See)',
  },
  {
    label: 'Venezuela',
    value: 'Venezuela',
  },
  {
    label: 'Viet Nam',
    value: 'Viet Nam',
  },
  {
    label: 'Virgin(British) Islands',
    value: 'Virgin(British) Islands',
  },
  {
    label: 'Yemen',
    value: 'Yemen',
  },
  {
    label: 'Zambia',
    value: 'Zambia',
  },
  {
    label: 'Zimbabwe',
    value: 'Zimbabwe',
  },
  {
    label: 'Other Alien',
    value: 'Other Alien',
  },
  {
    label: 'Afghanistan',
    value: 'Afghanistan',
  },
  {
    label: 'Åland Islands',
    value: 'Åland Islands',
  },
  {
    label: 'Antarctica',
    value: 'Antarctica',
  },
  {
    label: 'Benin',
    value: 'Benin',
  },
  {
    label: 'Bhutan',
    value: 'Bhutan',
  },
  {
    label: 'Bouvet Island',
    value: 'Bouvet Island',
  },
  {
    label: 'British Indian Ocean Territory',
    value: 'British Indian Ocean Territory',
  },
  {
    label: 'Burkina Faso',
    value: 'Burkina Faso',
  },
  {
    label: 'Burundi',
    value: 'Burundi',
  },
  {
    label: 'Cape Verde',
    value: 'Cape Verde',
  },
  {
    label: 'Central African Republic',
    value: 'Central African Republic',
  },
  {
    label: 'Christmas Island',
    value: 'Christmas Island',
  },
  {
    label: 'Comoros',
    value: 'Comoros',
  },
  {
    label: 'Djibouti',
    value: 'Djibouti',
  },
  {
    label: 'Equatorial Guinea',
    value: 'Equatorial Guinea',
  },
  {
    label: 'Eritrea',
    value: 'Eritrea',
  },
  {
    label: 'French Southern Territories',
    value: 'French Southern Territories',
  },
  {
    label: 'Guernsey',
    value: 'Guernsey',
  },
  {
    label: 'Guinea-Bissau',
    value: 'Guinea-Bissau',
  },
  {
    label: 'Heard and McDonald Islands',
    value: 'Heard and McDonald Islands',
  },
  {
    label: 'Isle of Man',
    value: 'Isle of Man',
  },
  {
    label: 'Jersey',
    value: 'Jersey',
  },
  {
    label: 'Kiribati',
    value: 'Kiribati',
  },
  {
    label: 'Lesotho',
    value: 'Lesotho',
  },
  {
    label: 'Maldives',
    value: 'Maldives',
  },
  {
    label: 'Mayotte',
    value: 'Mayotte',
  },
  {
    label: 'Micronesia, Federated States Of',
    value: 'Micronesia, Federated States Of',
  },
  {
    label: 'Mongolia',
    value: 'Mongolia',
  },
  {
    label: 'Montenegro',
    value: 'Montenegro',
  },
  {
    label: 'Montserrat',
    value: 'Montserrat',
  },
  {
    label: 'Mozambique',
    value: 'Mozambique',
  },
  {
    label: 'Nauru',
    value: 'Nauru',
  },
  {
    label: 'Niue',
    value: 'Niue',
  },
  {
    label: 'Palestinian Territory, Occupied',
    value: 'Palestinian Territory, Occupied',
  },
  {
    label: 'Pitcairn',
    value: 'Pitcairn',
  },
  {
    label: 'Réunion',
    value: 'Réunion',
  },
  {
    label: 'Rwanda',
    value: 'Rwanda',
  },
  {
    label: 'Saint Barthélemy',
    value: 'Saint Barthélemy',
  },
  {
    label: 'Saint Helena, Ascension and Tristan Da Cunha',
    value: 'Saint Helena, Ascension and Tristan Da Cunha',
  },
  {
    label: 'Saint Martin',
    value: 'Saint Martin',
  },
  {
    label: 'Saint Pierre And Miquelon',
    value: 'Saint Pierre And Miquelon',
  },
  {
    label: 'Sao Tome and Principe',
    value: 'Sao Tome and Principe',
  },
  {
    label: 'Serbia',
    value: 'Serbia',
  },
  {
    label: 'Seychelles',
    value: 'Seychelles',
  },
  {
    label: 'Somalia',
    value: 'Somalia',
  },
  {
    label: 'South Georgia and the South Sandwich Islands',
    value: 'South Georgia and the South Sandwich Islands',
  },
  {
    label: 'Svalbard And Jan Mayen',
    value: 'Svalbard And Jan Mayen',
  },
  {
    label: 'Tajikistan',
    value: 'Tajikistan',
  },
  {
    label: 'Timor-Leste',
    value: 'Timor-Leste',
  },
  {
    label: 'Togo',
    value: 'Togo',
  },
  {
    label: 'Tokelau',
    value: 'Tokelau',
  },
  {
    label: 'Tonga',
    value: 'Tonga',
  },
  {
    label: 'Turkmenistan',
    value: 'Turkmenistan',
  },
  {
    label: 'Tuvalu',
    value: 'Tuvalu',
  },
  {
    label: 'United States Minor Outlying Islands',
    value: 'United States Minor Outlying Islands',
  },
  {
    label: 'Wallis and Futuna',
    value: 'Wallis and Futuna',
  },
  {
    label: 'Western Sahara',
    value: 'Western Sahara',
  },
  {
    label: 'Congo',
    value: 'Congo',
  },
  {
    label: 'Curacao',
    value: 'Curacao',
  },
  {
    label: 'SINT MAARTEN(DUTCH PART)',
    value: 'SINT MAARTEN(DUTCH PART)',
  },
  {
    label: 'Samoa',
    value: 'Samoa',
  },
  {
    label: 'Bonaire',
    value: 'Bonaire',
  },
];

export const employmentOptions: OptionTypes[] = [
  {
    label: 'Employed',
    value: 'employed',
  },
  {
    label: 'Disabled',
    value: 'disabled',
  },
  {
    label: 'Student',
    value: 'student',
  },
  {
    label: 'Retired',
    value: 'retired',
  },
  {
    label: 'Stay-at-home-person',
    value: 'stay-at-home-person',
  },
  {
    label: 'Unemployed',
    value: 'unemployed',
  },
];

export const occupations: OptionTypes[] = [
  {
    label: 'Accountant',
    value: 'Accountant',
  },
  {
    label: 'Actor',
    value: 'Actor',
  },
  {
    label: 'Actuary',
    value: 'Actuary',
  },
  {
    label: 'Administrator',
    value: 'Administrator',
  },
  {
    label: 'Administrator or Educational Office',
    value: 'Administrator or Educational Office',
  },
  {
    label: 'Aerobics instructor',
    value: 'Aerobics instructor',
  },
  {
    label: 'Aesthetician',
    value: 'Aesthetician',
  },
  {
    label: 'Agricultural engineer or technician',
    value: 'Agricultural engineer or technician',
  },
  {
    label: 'Agricultural equipment operator',
    value: 'Agricultural equipment operator',
  },
  {
    label: 'Agricultural inspector',
    value: 'Agricultural inspector',
  },
  {
    label: 'Agricultural worker',
    value: 'Agricultural worker',
  },
  {
    label: 'Air Marshal',
    value: 'Air Marshal',
  },
  {
    label: 'Air traffic controller',
    value: 'Air traffic controller',
  },
  {
    label: 'Aircraft mechanic and service technician',
    value: 'Aircraft mechanic and service technician',
  },
  {
    label: 'Aircraft pilot',
    value: 'Aircraft pilot',
  },
  {
    label: 'Aircraft structure assembler',
    value: 'Aircraft structure assembler',
  },
  {
    label: 'Ambulance driver',
    value: 'Ambulance driver',
  },
  {
    label: 'Amusement and recreation attendant',
    value: 'Amusement and recreation attendant',
  },
  {
    label: 'Animal breeder',
    value: 'Animal breeder',
  },
  {
    label: 'Animal Control',
    value: 'Animal Control',
  },
  {
    label: 'Animal control worker',
    value: 'Animal control worker',
  },
  {
    label: 'Animal scientist',
    value: 'Animal scientist',
  },
  {
    label: 'Animal trainer',
    value: 'Animal trainer',
  },
  {
    label: 'Animator',
    value: 'Animator',
  },
  {
    label: 'Announcer',
    value: 'Announcer',
  },
  {
    label: 'Antenna installer and repairer',
    value: 'Antenna installer and repairer',
  },
  {
    label: 'Anthropologist',
    value: 'Anthropologist',
  },
  {
    label: 'Appraiser or estimator',
    value: 'Appraiser or estimator',
  },
  {
    label: 'Arbitrator, mediator, and conciliator',
    value: 'Arbitrator, mediator, and conciliator',
  },
  {
    label: 'Arborist',
    value: 'Arborist',
  },
  {
    label: 'Arcade employee',
    value: 'Arcade employee',
  },
  {
    label: 'Archeologist',
    value: 'Archeologist',
  },
  {
    label: 'Architect',
    value: 'Architect',
  },
  {
    label: 'Archivist, Curator or Museum Technician',
    value: 'Archivist, Curator or Museum Technician',
  },
  {
    label: 'Armored Car Driver',
    value: 'Armored Car Driver',
  },
  {
    label: 'Art director',
    value: 'Art director',
  },
  {
    label: 'Artist or related worker',
    value: 'Artist or related worker',
  },
  {
    label: 'Asbestos, Lead Hazardous materials worker',
    value: 'Asbestos, Lead Hazardous materials worker',
  },
  {
    label: 'Asphalt, Paving equipment worker',
    value: 'Asphalt, Paving equipment worker',
  },
  {
    label: 'Assembler and fabricator',
    value: 'Assembler and fabricator',
  },
  {
    label: 'Astronaut',
    value: 'Astronaut',
  },
  {
    label: 'Astronomer',
    value: 'Astronomer',
  },
  {
    label: 'Athletes and Sports Competitor',
    value: 'Athletes and Sports Competitor',
  },
  {
    label: 'Athletic trainer',
    value: 'Athletic trainer',
  },
  {
    label: 'Audio and video equipment technician',
    value: 'Audio and video equipment technician',
  },
  {
    label: 'Audio Visual Specialist',
    value: 'Audio Visual Specialist',
  },
  {
    label: 'Audiologist',
    value: 'Audiologist',
  },
  {
    label: 'Auditor',
    value: 'Auditor',
  },
  {
    label: 'Author',
    value: 'Author',
  },
  {
    label: 'Auto Sales, New',
    value: 'Auto Sales, New',
  },
  {
    label: 'Auto Sales, Used',
    value: 'Auto Sales, Used',
  },
  {
    label: 'Automobile stunt or speed testing driver',
    value: 'Automobile stunt or speed testing driver',
  },
  {
    label: 'Automotive body painter or repairer',
    value: 'Automotive body painter or repairer',
  },
  {
    label: 'Automotive glass installer and repairer',
    value: 'Automotive glass installer and repairer',
  },
  {
    label: 'Automotive service mechanic',
    value: 'Automotive service mechanic',
  },
  {
    label: 'Avionics technician',
    value: 'Avionics technician',
  },
  {
    label: 'Baggage Handler',
    value: 'Baggage Handler',
  },
  {
    label: 'Baggage porter, bellhop, and concierge',
    value: 'Baggage porter, bellhop, and concierge',
  },
  {
    label: 'Bail bondsman',
    value: 'Bail bondsman',
  },
  {
    label: 'Bailiff or jailer',
    value: 'Bailiff or jailer',
  },
  {
    label: 'Baker',
    value: 'Baker',
  },
  {
    label: 'Bar Manager, Doorman, or Bouncer',
    value: 'Bar Manager, Doorman, or Bouncer',
  },
  {
    label: 'Barber, hairdresser, hairstylist',
    value: 'Barber, hairdresser, hairstylist',
  },
  {
    label: 'Bartender',
    value: 'Bartender',
  },
  {
    label: 'Bicycle repairer',
    value: 'Bicycle repairer',
  },
  {
    label: 'Bill and account collector',
    value: 'Bill and account collector',
  },
  {
    label: 'BioChemist',
    value: 'BioChemist',
  },
  {
    label: 'Biomedical engineer',
    value: 'Biomedical engineer',
  },
  {
    label: 'BioPhysicist',
    value: 'BioPhysicist',
  },
  {
    label: 'Boilermaker',
    value: 'Boilermaker',
  },
  {
    label: 'Bomb Disposal Crew',
    value: 'Bomb Disposal Crew',
  },
  {
    label: 'Bookkeeper',
    value: 'Bookkeeper',
  },
  {
    label: 'Border Patrol',
    value: 'Border Patrol',
  },
  {
    label: 'Brickmason or Stonemason',
    value: 'Brickmason or Stonemason',
  },
  {
    label: 'Bridge Construction worker',
    value: 'Bridge Construction worker',
  },
  {
    label: 'Building maintenance',
    value: 'Building maintenance',
  },
  {
    label: 'Bus and truck mechanic',
    value: 'Bus and truck mechanic',
  },
  {
    label: 'Bus driver, school or special client',
    value: 'Bus driver, school or special client',
  },
  {
    label: 'Bus driver, transit and intercity',
    value: 'Bus driver, transit and intercity',
  },
  {
    label: 'Business manager',
    value: 'Business manager',
  },
  {
    label: 'Butcher and meat cutter',
    value: 'Butcher and meat cutter',
  },
  {
    label: 'Cabinetmaker and bench carpenter',
    value: 'Cabinetmaker and bench carpenter',
  },
  {
    label: 'Camera equipment repairer',
    value: 'Camera equipment repairer',
  },
  {
    label: 'Camera operator, television or video',
    value: 'Camera operator, television or video',
  },
  {
    label: 'Captain or Crew of water vessel',
    value: 'Captain or Crew of water vessel',
  },
  {
    label: 'Car Wash Worker',
    value: 'Car Wash Worker',
  },
  {
    label: 'Cardiovascular technologist or technician',
    value: 'Cardiovascular technologist or technician',
  },
  {
    label: 'Carpenter',
    value: 'Carpenter',
  },
  {
    label: 'Carpet,tile,floor installer',
    value: 'Carpet,tile,floor installer',
  },
  {
    label: 'Cartographer',
    value: 'Cartographer',
  },
  {
    label: 'Cashier',
    value: 'Cashier',
  },
  {
    label: 'Casino, Gaming booth cashier',
    value: 'Casino, Gaming booth cashier',
  },
  {
    label: 'Casino, Gaming cage worker',
    value: 'Casino, Gaming cage worker',
  },
  {
    label: 'Casino, Gaming Security guard',
    value: 'Casino, Gaming Security guard',
  },
  {
    label: 'Caterer',
    value: 'Caterer',
  },
  {
    label: 'Ceiling tile installer',
    value: 'Ceiling tile installer',
  },
  {
    label: 'Cement mason, concrete worker',
    value: 'Cement mason, concrete worker',
  },
  {
    label: 'Cement or dump truck driver',
    value: 'Cement or dump truck driver',
  },
  {
    label: 'Chef',
    value: 'Chef',
  },
  {
    label: 'Chemical & Biological Weaponary Testing',
    value: 'Chemical & Biological Weaponary Testing',
  },
  {
    label: 'Chemical engineer or technician',
    value: 'Chemical engineer or technician',
  },
  {
    label: 'Chemical equipment operator and tender',
    value: 'Chemical equipment operator and tender',
  },
  {
    label: 'Chemical plant and system operator',
    value: 'Chemical plant and system operator',
  },
  {
    label: 'Chemist',
    value: 'Chemist',
  },
  {
    label: 'Chief executive',
    value: 'Chief executive',
  },
  {
    label: 'Childcare worker',
    value: 'Childcare worker',
  },
  {
    label: 'Chiropractor',
    value: 'Chiropractor',
  },
  {
    label: 'Choreographer',
    value: 'Choreographer',
  },
  {
    label: 'Circus or carnival performer or worker',
    value: 'Circus or carnival performer or worker',
  },
  {
    label: 'Civil engineer or technician',
    value: 'Civil engineer or technician',
  },
  {
    label: 'Claims adjuster, examiner',
    value: 'Claims adjuster, examiner',
  },
  {
    label: 'Clerk',
    value: 'Clerk',
  },
  {
    label: 'Club pro, golf, tennis, swimming, fitness',
    value: 'Club pro, golf, tennis, swimming, fitness',
  },
  {
    label: 'Coach, Umpire, or Related worker',
    value: 'Coach, Umpire, or Related worker',
  },
  {
    label: 'Coal Miner',
    value: 'Coal Miner',
  },
  {
    label: 'Coin or vending machine svc or repair',
    value: 'Coin or vending machine svc or repair',
  },
  {
    label: 'Commercial and industrial designer',
    value: 'Commercial and industrial designer',
  },
  {
    label: 'Commercial Fisherman',
    value: 'Commercial Fisherman',
  },
  {
    label: 'Commercial Mover or Packer',
    value: 'Commercial Mover or Packer',
  },
  {
    label: 'Commercial or marine diver',
    value: 'Commercial or marine diver',
  },
  {
    label: 'Commercial pilot',
    value: 'Commercial pilot',
  },
  {
    label: 'Commodities Broker or Day Trader',
    value: 'Commodities Broker or Day Trader',
  },
  {
    label: 'Communications equipment operator',
    value: 'Communications equipment operator',
  },
  {
    label: 'Community health worker',
    value: 'Community health worker',
  },
  {
    label: 'Compliance officer',
    value: 'Compliance officer',
  },
  {
    label: 'Composer',
    value: 'Composer',
  },
  {
    label: 'Computer control programmer and operator',
    value: 'Computer control programmer and operator',
  },
  {
    label: 'Computer hardware engineer',
    value: 'Computer hardware engineer',
  },
  {
    label: 'Computer programmer',
    value: 'Computer programmer',
  },
  {
    label: 'Computer support specialist',
    value: 'Computer support specialist',
  },
  {
    label: 'Computer, ATM or business maching repair',
    value: 'Computer, ATM or business maching repair',
  },
  {
    label: 'Conservation scientist',
    value: 'Conservation scientist',
  },
  {
    label: 'Construction worker',
    value: 'Construction worker',
  },
  {
    label: 'Construction equipment operator',
    value: 'Construction equipment operator',
  },
  {
    label: 'Construction laborer',
    value: 'Construction laborer',
  },
  {
    label: 'Construction or building inspector',
    value: 'Construction or building inspector',
  },
  {
    label: 'Consultant',
    value: 'Consultant',
  },
  {
    label: 'Control and valve installer and repairer',
    value: 'Control and valve installer and repairer',
  },
  {
    label: 'Convenience Store worker',
    value: 'Convenience Store worker',
  },
  {
    label: 'Cook',
    value: 'Cook',
  },
  {
    label: 'Cook, fast food',
    value: 'Cook, fast food',
  },
  {
    label: 'Cook, private household',
    value: 'Cook, private household',
  },
  {
    label: 'Coroner',
    value: 'Coroner',
  },
  {
    label: 'Correctional officer',
    value: 'Correctional officer',
  },
  {
    label: 'Counselor',
    value: 'Counselor',
  },
  {
    label: 'Countertop worker; laminates or wood',
    value: 'Countertop worker; laminates or wood',
  },
  {
    label: 'Countertop worker; stone or cement',
    value: 'Countertop worker; stone or cement',
  },
  {
    label: 'Court reporter',
    value: 'Court reporter',
  },
  {
    label: 'Credit counselor',
    value: 'Credit counselor',
  },
  {
    label: 'Crossing guards',
    value: 'Crossing guards',
  },
  {
    label: 'Customer service representative',
    value: 'Customer service representative',
  },
  {
    label: 'Cutting worker',
    value: 'Cutting worker',
  },
  {
    label: 'Dancer',
    value: 'Dancer',
  },
  {
    label: 'Data entry',
    value: 'Data entry',
  },
  {
    label: 'Database or Network administrator',
    value: 'Database or Network administrator',
  },
  {
    label: 'Day Care or Pre School in residence',
    value: 'Day Care or Pre School in residence',
  },
  {
    label: 'Day Care or Pre School not in residence',
    value: 'Day Care or Pre School not in residence',
  },
  {
    label: 'Demonstrator and product promoter',
    value: 'Demonstrator and product promoter',
  },
  {
    label: 'Dental assistant',
    value: 'Dental assistant',
  },
  {
    label: 'Dental hygienist',
    value: 'Dental hygienist',
  },
  {
    label: 'Dental laboratory technician',
    value: 'Dental laboratory technician',
  },
  {
    label: 'Dentist',
    value: 'Dentist',
  },
  {
    label: 'Derrick or driller oil, gas, or mining',
    value: 'Derrick or driller oil, gas, or mining',
  },
  {
    label: 'Designer',
    value: 'Designer',
  },
  {
    label: 'Detective and criminal investigator',
    value: 'Detective and criminal investigator',
  },
  {
    label: 'Dietitian or nutritionist',
    value: 'Dietitian or nutritionist',
  },
  {
    label: 'Dishwasher',
    value: 'Dishwasher',
  },
  {
    label: 'Dispatcher',
    value: 'Dispatcher',
  },
  {
    label: 'Dock worker or Longshoreman',
    value: 'Dock worker or Longshoreman',
  },
  {
    label: 'Door-to-door sales, news or street vendor',
    value: 'Door-to-door sales, news or street vendor',
  },
  {
    label: 'Drafter',
    value: 'Drafter',
  },
  {
    label: 'Driver/sales worker',
    value: 'Driver/sales worker',
  },
  {
    label: 'Dry Cleaning Worker',
    value: 'Dry Cleaning Worker',
  },
  {
    label: 'Drywall installer',
    value: 'Drywall installer',
  },
  {
    label: 'Earth driller, except oil and gas',
    value: 'Earth driller, except oil and gas',
  },
  {
    label: 'Economist',
    value: 'Economist',
  },
  {
    label: 'Editor',
    value: 'Editor',
  },
  {
    label: 'Electric motor repairer',
    value: 'Electric motor repairer',
  },
  {
    label: 'Electrical mechanic or repairer',
    value: 'Electrical mechanic or repairer',
  },
  {
    label: 'Electrical or Overhead power-line worker',
    value: 'Electrical or Overhead power-line worker',
  },
  {
    label: 'Electrician',
    value: 'Electrician',
  },
  {
    label: 'Elevator installer and repairer',
    value: 'Elevator installer and repairer',
  },
  {
    label: 'Embalmer',
    value: 'Embalmer',
  },
  {
    label: 'Emergency management director',
    value: 'Emergency management director',
  },
  {
    label: 'Emergency med technician or paramedic',
    value: 'Emergency med technician or paramedic',
  },
  {
    label: 'Engine and other machine assembler',
    value: 'Engine and other machine assembler',
  },
  {
    label: 'Engineer or engineering technician',
    value: 'Engineer or engineering technician',
  },
  {
    label: 'Entertainer or performer',
    value: 'Entertainer or performer',
  },
  {
    label: 'Environmental engineer',
    value: 'Environmental engineer',
  },
  {
    label: 'Environmental scientist or geoscientist',
    value: 'Environmental scientist or geoscientist',
  },
  {
    label: 'Epidemiologist',
    value: 'Epidemiologist',
  },
  {
    label: 'Equipment assembler',
    value: 'Equipment assembler',
  },
  {
    label: 'Etcher and engraver',
    value: 'Etcher and engraver',
  },
  {
    label: 'Event planner',
    value: 'Event planner',
  },
  {
    label: 'Exercise physiologist',
    value: 'Exercise physiologist',
  },
  {
    label: 'Explosives blaster or handler',
    value: 'Explosives blaster or handler',
  },
  {
    label: 'Extraction worker',
    value: 'Extraction worker',
  },
  {
    label: 'Fabric and apparel patternmaker',
    value: 'Fabric and apparel patternmaker',
  },
  {
    label: 'Fabric mender, except garment',
    value: 'Fabric mender, except garment',
  },
  {
    label: 'Factory worker',
    value: 'Factory worker',
  },
  {
    label: 'Farm equipment mechanic or technician',
    value: 'Farm equipment mechanic or technician',
  },
  {
    label: 'Farm Labor',
    value: 'Farm Labor',
  },
  {
    label: 'Farm or ranch worker, unskilled',
    value: 'Farm or ranch worker, unskilled',
  },
  {
    label: 'Farmer',
    value: 'Farmer',
  },
  {
    label: 'Fashion designer',
    value: 'Fashion designer',
  },
  {
    label: 'Fast food worker or busboy',
    value: 'Fast food worker or busboy',
  },
  {
    label: 'Fence erector',
    value: 'Fence erector',
  },
  {
    label: 'Fiberglass laminator and fabricator',
    value: 'Fiberglass laminator and fabricator',
  },
  {
    label: 'Film and video editor',
    value: 'Film and video editor',
  },
  {
    label: 'Financial analyst',
    value: 'Financial analyst',
  },
  {
    label: 'Financial Service Agent',
    value: 'Financial Service Agent',
  },
  {
    label: 'Fire inspector',
    value: 'Fire inspector',
  },
  {
    label: 'Firefighter',
    value: 'Firefighter',
  },
  {
    label: 'Fitness or Personal Trainer',
    value: 'Fitness or Personal Trainer',
  },
  {
    label: 'Flagpole or steeplejack workers',
    value: 'Flagpole or steeplejack workers',
  },
  {
    label: 'Flight attendant',
    value: 'Flight attendant',
  },
  {
    label: 'Flight engineer',
    value: 'Flight engineer',
  },
  {
    label: 'Floor sander and finisher',
    value: 'Floor sander and finisher',
  },
  {
    label: 'Floral designer or florist',
    value: 'Floral designer or florist',
  },
  {
    label: 'Food or beverage server',
    value: 'Food or beverage server',
  },
  {
    label: 'Food preparation worker',
    value: 'Food preparation worker',
  },
  {
    label: 'Food scientist and technologist',
    value: 'Food scientist and technologist',
  },
  {
    label: 'Foreman',
    value: 'Foreman',
  },
  {
    label: 'Forensic science technician',
    value: 'Forensic science technician',
  },
  {
    label: 'Forest ranger or conservation worker',
    value: 'Forest ranger or conservation worker',
  },
  {
    label: 'Forester or forest technician',
    value: 'Forester or forest technician',
  },
  {
    label: 'Forklift Driver',
    value: 'Forklift Driver',
  },
  {
    label: 'Foundry mold and coremaker',
    value: 'Foundry mold and coremaker',
  },
  {
    label: 'Fundraiser',
    value: 'Fundraiser',
  },
  {
    label: 'Funeral service worker',
    value: 'Funeral service worker',
  },
  {
    label: 'Furnace, kiln operator',
    value: 'Furnace, kiln operator',
  },
  {
    label: 'Furniture finisher',
    value: 'Furniture finisher',
  },
  {
    label: 'Garbage Route Worker',
    value: 'Garbage Route Worker',
  },
  {
    label: 'Garbage Truck Driver',
    value: 'Garbage Truck Driver',
  },
  {
    label: 'Gas compressor or gas pumper',
    value: 'Gas compressor or gas pumper',
  },
  {
    label: 'Gas plant operator',
    value: 'Gas plant operator',
  },
  {
    label: 'Genetic Counselor',
    value: 'Genetic Counselor',
  },
  {
    label: 'Geographer',
    value: 'Geographer',
  },
  {
    label: 'Geological and petroleum technician',
    value: 'Geological and petroleum technician',
  },
  {
    label: 'Geologist',
    value: 'Geologist',
  },
  {
    label: 'Glass Installer or Glazier, Commercial',
    value: 'Glass Installer or Glazier, Commercial',
  },
  {
    label: 'Glass Installer or Glazier, Residential',
    value: 'Glass Installer or Glazier, Residential',
  },
  {
    label: 'Graphic designer',
    value: 'Graphic designer',
  },
  {
    label: 'Grounds maintenance worker',
    value: 'Grounds maintenance worker',
  },
  {
    label: 'Groundskeeping worker',
    value: 'Groundskeeping worker',
  },
  {
    label: 'Health and safety engineer',
    value: 'Health and safety engineer',
  },
  {
    label: 'Hearing aid specialist',
    value: 'Hearing aid specialist',
  },
  {
    label: 'Heating, air conditioning, (HVAC) worker',
    value: 'Heating, air conditioning, (HVAC) worker',
  },
  {
    label: 'Heavy Equipment Operator',
    value: 'Heavy Equipment Operator',
  },
  {
    label: 'Heavy vehicle or equipment service',
    value: 'Heavy vehicle or equipment service',
  },
  {
    label: 'Helper, construction trades',
    value: 'Helper, construction trades',
  },
  {
    label: 'Highway maintenance worker or flagman',
    value: 'Highway maintenance worker or flagman',
  },
  {
    label: 'Historian',
    value: 'Historian',
  },
  {
    label: 'Hoist and winch operator',
    value: 'Hoist and winch operator',
  },
  {
    label: 'Home appliance repairer',
    value: 'Home appliance repairer',
  },
  {
    label: 'Home entertainment installer and repairer',
    value: 'Home entertainment installer and repairer',
  },
  {
    label: 'Home health care provider or aide',
    value: 'Home health care provider or aide',
  },
  {
    label: 'Human resources worker',
    value: 'Human resources worker',
  },
  {
    label: 'Humane Shelter worker',
    value: 'Humane Shelter worker',
  },
  {
    label: 'Industrial engineer and technician',
    value: 'Industrial engineer and technician',
  },
  {
    label: 'Industrial machinery mechanic',
    value: 'Industrial machinery mechanic',
  },
  {
    label: 'Information Technologist',
    value: 'Information Technologist',
  },
  {
    label: 'Inspector, Tester',
    value: 'Inspector, Tester',
  },
  {
    label: 'Insulation worker',
    value: 'Insulation worker',
  },
  {
    label: 'Insurance Sales Agent',
    value: 'Insurance Sales Agent',
  },
  {
    label: 'Insurance underwriter',
    value: 'Insurance underwriter',
  },
  {
    label: 'Interior designer',
    value: 'Interior designer',
  },
  {
    label: 'Interpreter or translator',
    value: 'Interpreter or translator',
  },
  {
    label: 'Ironworker',
    value: 'Ironworker',
  },
  {
    label: 'Janitor or cleaner',
    value: 'Janitor or cleaner',
  },
  {
    label: 'Jeweler and precious stone worker',
    value: 'Jeweler and precious stone worker',
  },
  {
    label: 'Judge, magistrate judge or adjudicator',
    value: 'Judge, magistrate judge or adjudicator',
  },
  {
    label: 'Judicial law clerk',
    value: 'Judicial law clerk',
  },
  {
    label: 'Junk dealer',
    value: 'Junk dealer',
  },
  {
    label: 'Lab Technician',
    value: 'Lab Technician',
  },
  {
    label: 'Landscaper',
    value: 'Landscaper',
  },
  {
    label: 'Laundry or Laundromat worker',
    value: 'Laundry or Laundromat worker',
  },
  {
    label: 'Law enforcement Office worker',
    value: 'Law enforcement Office worker',
  },
  {
    label: 'Lawyer or Attorney',
    value: 'Lawyer or Attorney',
  },
  {
    label: 'Legislator or elected official',
    value: 'Legislator or elected official',
  },
  {
    label: 'Librarian',
    value: 'Librarian',
  },
  {
    label: 'Library technician',
    value: 'Library technician',
  },
  {
    label: 'Licensed practical nurse (LPN)',
    value: 'Licensed practical nurse (LPN)',
  },
  {
    label: 'Licensed vocational nurse (LVN)',
    value: 'Licensed vocational nurse (LVN)',
  },
  {
    label: 'Lifeguard, ski patrol, or other',
    value: 'Lifeguard, ski patrol, or other',
  },
  {
    label: 'Loan officer',
    value: 'Loan officer',
  },
  {
    label: 'Locker,coat or dressing room attendant',
    value: 'Locker,coat or dressing room attendant',
  },
  {
    label: 'Locksmith and safe repairer',
    value: 'Locksmith and safe repairer',
  },
  {
    label: 'Locomotive engineer and operator',
    value: 'Locomotive engineer and operator',
  },
  {
    label: 'Logging equipment operator',
    value: 'Logging equipment operator',
  },
  {
    label: 'Logging hauler or worker',
    value: 'Logging hauler or worker',
  },
  {
    label: 'Machine tool setter, operator',
    value: 'Machine tool setter, operator',
  },
  {
    label: 'Machinist',
    value: 'Machinist',
  },
  {
    label: 'Maid, housekeeper, cleaner',
    value: 'Maid, housekeeper, cleaner',
  },
  {
    label: 'Maintenance worker, machinery',
    value: 'Maintenance worker, machinery',
  },
  {
    label: 'Makeup artist, theatrical and performance',
    value: 'Makeup artist, theatrical and performance',
  },
  {
    label: 'Manager',
    value: 'Manager',
  },
  {
    label: 'Manicurist and pedicurist',
    value: 'Manicurist and pedicurist',
  },
  {
    label: 'Manufactured or mobile bldg installer',
    value: 'Manufactured or mobile bldg installer',
  },
  {
    label: 'Marine engineer and naval architect',
    value: 'Marine engineer and naval architect',
  },
  {
    label: 'Masseusse (Spa)',
    value: 'Masseusse (Spa)',
  },
  {
    label: 'Meat, poultry, and fish trimmer',
    value: 'Meat, poultry, and fish trimmer',
  },
  {
    label: 'Mechanical door repairer',
    value: 'Mechanical door repairer',
  },
  {
    label: 'Mechanical engineer or technician',
    value: 'Mechanical engineer or technician',
  },
  {
    label: 'Media and communication worker',
    value: 'Media and communication worker',
  },
  {
    label: 'Medical appliance technician',
    value: 'Medical appliance technician',
  },
  {
    label: 'Medical assistant',
    value: 'Medical assistant',
  },
  {
    label: 'Medical equipment preparer',
    value: 'Medical equipment preparer',
  },
  {
    label: 'Medical equipment repairer',
    value: 'Medical equipment repairer',
  },
  {
    label: 'Medical Massage therapist (Not Spa)',
    value: 'Medical Massage therapist (Not Spa)',
  },
  {
    label: 'Medical records technician',
    value: 'Medical records technician',
  },
  {
    label: 'Medical scientist',
    value: 'Medical scientist',
  },
  {
    label: 'Medical transcriptionist',
    value: 'Medical transcriptionist',
  },
  {
    label: 'Medical, dental, laboratory technician',
    value: 'Medical, dental, laboratory technician',
  },
  {
    label: 'Metal furnace operator',
    value: 'Metal furnace operator',
  },
  {
    label: 'Meter reader, utilities',
    value: 'Meter reader, utilities',
  },
  {
    label: 'Microbiologist',
    value: 'Microbiologist',
  },
  {
    label: 'Midwife',
    value: 'Midwife',
  },
  {
    label: 'Migrant Worker',
    value: 'Migrant Worker',
  },
  {
    label: 'Military',
    value: 'Military',
  },
  {
    label: 'Milling and planing machine operator',
    value: 'Milling and planing machine operator',
  },
  {
    label: 'Millwright',
    value: 'Millwright',
  },
  {
    label: 'Mining engineer mining safety engineer',
    value: 'Mining engineer mining safety engineer',
  },
  {
    label: 'Mining machine operator',
    value: 'Mining machine operator',
  },
  {
    label: 'Mining roof bolter',
    value: 'Mining roof bolter',
  },
  {
    label: 'Minister, Preacher, or Priest',
    value: 'Minister, Preacher, or Priest',
  },
  {
    label: 'Miscellaneous sales and related worker',
    value: 'Miscellaneous sales and related worker',
  },
  {
    label: 'Missionary',
    value: 'Missionary',
  },
  {
    label: 'Mobile heavy equipment mechanic',
    value: 'Mobile heavy equipment mechanic',
  },
  {
    label: 'Model',
    value: 'Model',
  },
  {
    label: 'Mortician, undertaker or funeral director',
    value: 'Mortician, undertaker or funeral director',
  },
  {
    label: 'Motorboat mechanic and service technician',
    value: 'Motorboat mechanic and service technician',
  },
  {
    label: 'Motorboat operator',
    value: 'Motorboat operator',
  },
  {
    label: 'Motorcycle mechanic',
    value: 'Motorcycle mechanic',
  },
  {
    label: 'MRI or XrayTechnician',
    value: 'MRI or XrayTechnician',
  },
  {
    label: 'Music director',
    value: 'Music director',
  },
  {
    label: 'Musical instrument repairer and tuner',
    value: 'Musical instrument repairer and tuner',
  },
  {
    label: 'Musician or singer',
    value: 'Musician or singer',
  },
  {
    label: 'Nanny',
    value: 'Nanny',
  },
  {
    label: 'News analyst',
    value: 'News analyst',
  },
  {
    label: 'Nuclear engineer or technician',
    value: 'Nuclear engineer or technician',
  },
  {
    label: 'Nuclear medicine technologist',
    value: 'Nuclear medicine technologist',
  },
  {
    label: 'Nuclear power reactor operator or worker',
    value: 'Nuclear power reactor operator or worker',
  },
  {
    label: 'Nurse anesthetist',
    value: 'Nurse anesthetist',
  },
  {
    label: 'Nurse practitioner',
    value: 'Nurse practitioner',
  },
  {
    label: 'Nursery or greenhouse worker',
    value: 'Nursery or greenhouse worker',
  },
  {
    label: 'Nursing assistant',
    value: 'Nursing assistant',
  },
  {
    label: 'Nursing, psychiatric',
    value: 'Nursing, psychiatric',
  },
  {
    label: 'Occupational therapist',
    value: 'Occupational therapist',
  },
  {
    label: 'Office and administrative support worker',
    value: 'Office and administrative support worker',
  },
  {
    label: 'Office machine operator, except computer',
    value: 'Office machine operator, except computer',
  },
  {
    label: 'Offshore Worker',
    value: 'Offshore Worker',
  },
  {
    label: 'Oil, Gas, or Mining occupation',
    value: 'Oil, Gas, or Mining occupation',
  },
  {
    label: 'Ophthalmic laboratory technician',
    value: 'Ophthalmic laboratory technician',
  },
  {
    label: 'Ophthalmic medical technician',
    value: 'Ophthalmic medical technician',
  },
  {
    label: 'Optician, dispensing',
    value: 'Optician, dispensing',
  },
  {
    label: 'Optometrist',
    value: 'Optometrist',
  },
  {
    label: 'Oral and maxillofacial surgeon',
    value: 'Oral and maxillofacial surgeon',
  },
  {
    label: 'Orderly',
    value: 'Orderly',
  },
  {
    label: 'Orthodontist',
    value: 'Orthodontist',
  },
  {
    label: 'Orthotist or prosthetist',
    value: 'Orthotist or prosthetist',
  },
  {
    label: 'Information security analyst',
    value: 'Information security analyst',
  },
  {
    label: 'Outdoor power mechanic',
    value: 'Outdoor power mechanic',
  },
  {
    label: 'Packer and packager, hand',
    value: 'Packer and packager, hand',
  },
  {
    label: 'Painter, construction and maintenance',
    value: 'Painter, construction and maintenance',
  },
  {
    label: 'Painter, residential',
    value: 'Painter, residential',
  },
  {
    label: 'Painting, coating, and decorating worker',
    value: 'Painting, coating, and decorating worker',
  },
  {
    label: 'Paralegal or legal assistant',
    value: 'Paralegal or legal assistant',
  },
  {
    label: 'Parking enforcement worker',
    value: 'Parking enforcement worker',
  },
  {
    label: 'Parking lot attendant',
    value: 'Parking lot attendant',
  },
  {
    label: 'Patternmaker, metal and plastic',
    value: 'Patternmaker, metal and plastic',
  },
  {
    label: 'Patternmaker, wood',
    value: 'Patternmaker, wood',
  },
  {
    label: 'Pawnbroker',
    value: 'Pawnbroker',
  },
  {
    label: 'Pest control worker',
    value: 'Pest control worker',
  },
  {
    label: 'Pharmacist',
    value: 'Pharmacist',
  },
  {
    label: 'Pharmacy technician',
    value: 'Pharmacy technician',
  },
  {
    label: 'Phlebotomist',
    value: 'Phlebotomist',
  },
  {
    label: 'Photographer or Portrait Photographer',
    value: 'Photographer or Portrait Photographer',
  },
  {
    label: 'Photographic process worker',
    value: 'Photographic process worker',
  },
  {
    label: 'Physical therapist',
    value: 'Physical therapist',
  },
  {
    label: 'Physician assistant',
    value: 'Physician assistant',
  },
  {
    label: 'Physician or Doctor',
    value: 'Physician or Doctor',
  },
  {
    label: 'Physicist',
    value: 'Physicist',
  },
  {
    label: 'Pile-driver operator',
    value: 'Pile-driver operator',
  },
  {
    label: 'Plasterer or stucco mason',
    value: 'Plasterer or stucco mason',
  },
  {
    label: 'Plumber, Pipefitter, and Steamfitter',
    value: 'Plumber, Pipefitter, and Steamfitter',
  },
  {
    label: 'Podiatrist',
    value: 'Podiatrist',
  },
  {
    label: 'Police officer',
    value: 'Police officer',
  },
  {
    label: 'Postal service mail carrier',
    value: 'Postal service mail carrier',
  },
  {
    label: 'Postal service office worker',
    value: 'Postal service office worker',
  },
  {
    label: 'Postmaster and mail superintendent',
    value: 'Postmaster and mail superintendent',
  },
  {
    label: 'Power plant operator or worker',
    value: 'Power plant operator or worker',
  },
  {
    label: 'Precision instrument repairer',
    value: 'Precision instrument repairer',
  },
  {
    label: 'Printing press operator or worker',
    value: 'Printing press operator or worker',
  },
  {
    label: 'Prison Guard',
    value: 'Prison Guard',
  },
  {
    label: 'Private detective and investigator',
    value: 'Private detective and investigator',
  },
  {
    label: 'Probation officer',
    value: 'Probation officer',
  },
  {
    label: 'Producer or director',
    value: 'Producer or director',
  },
  {
    label: 'Production worker',
    value: 'Production worker',
  },
  {
    label: 'Professor',
    value: 'Professor',
  },
  {
    label: 'Prosthodontist',
    value: 'Prosthodontist',
  },
  {
    label: 'Psychiatric aide',
    value: 'Psychiatric aide',
  },
  {
    label: 'Psychiatric technician',
    value: 'Psychiatric technician',
  },
  {
    label: 'Psychiatrist',
    value: 'Psychiatrist',
  },
  {
    label: 'Psychologist',
    value: 'Psychologist',
  },
  {
    label: 'Public Announcer',
    value: 'Public Announcer',
  },
  {
    label: 'Public relations specialist',
    value: 'Public relations specialist',
  },
  {
    label: 'Pumping station operator',
    value: 'Pumping station operator',
  },
  {
    label: 'Purchasing Agent',
    value: 'Purchasing Agent',
  },
  {
    label: 'Radiation therapist',
    value: 'Radiation therapist',
  },
  {
    label: 'Radio and communications installer',
    value: 'Radio and communications installer',
  },
  {
    label: 'Radio operator',
    value: 'Radio operator',
  },
  {
    label: 'Radio or television announcer',
    value: 'Radio or television announcer',
  },
  {
    label: 'Radio, cellular, and tower equipment',
    value: 'Radio, cellular, and tower equipment',
  },
  {
    label: 'Rail car repairer',
    value: 'Rail car repairer',
  },
  {
    label: 'Railroad conductor and yardmaster',
    value: 'Railroad conductor and yardmaster',
  },
  {
    label: 'Railroad Worker',
    value: 'Railroad Worker',
  },
  {
    label: 'Rail-track layer or maintenance opr',
    value: 'Rail-track layer or maintenance opr',
  },
  {
    label: 'Real estate broker and Agent',
    value: 'Real estate broker and Agent',
  },
  {
    label: 'Receptionist',
    value: 'Receptionist',
  },
  {
    label: 'Recreation and fitness worker',
    value: 'Recreation and fitness worker',
  },
  {
    label: 'Recreational vehicle service technician',
    value: 'Recreational vehicle service technician',
  },
  {
    label: 'Registered nurse',
    value: 'Registered nurse',
  },
  {
    label: 'Rehabilitation Counselor',
    value: 'Rehabilitation Counselor',
  },
  {
    label: 'Reinforcing iron and rebar worker',
    value: 'Reinforcing iron and rebar worker',
  },
  {
    label: 'Religious worker',
    value: 'Religious worker',
  },
  {
    label: 'Rendering Plant Worker',
    value: 'Rendering Plant Worker',
  },
  {
    label: 'Reporter, journalist, or correspondent',
    value: 'Reporter, journalist, or correspondent',
  },
  {
    label: 'Respiratory therapist',
    value: 'Respiratory therapist',
  },
  {
    label: 'Retail sales worker',
    value: 'Retail sales worker',
  },
  {
    label: 'Rigger',
    value: 'Rigger',
  },
  {
    label: 'Rock splitter, quarry',
    value: 'Rock splitter, quarry',
  },
  {
    label: 'Roofer',
    value: 'Roofer',
  },
  {
    label: 'Roustabout, oil and gas',
    value: 'Roustabout, oil and gas',
  },
  {
    label: 'Sales representative, service, all other',
    value: 'Sales representative, service, all other',
  },
  {
    label: 'Scuba or Snorkle Instructor',
    value: 'Scuba or Snorkle Instructor',
  },
  {
    label: 'Secretary or administrative assistant',
    value: 'Secretary or administrative assistant',
  },
  {
    label: 'Security and fire alarm systems installer',
    value: 'Security and fire alarm systems installer',
  },
  {
    label: 'Security guard',
    value: 'Security guard',
  },
  {
    label: 'Septic tank svc or sewer pipe cleaner',
    value: 'Septic tank svc or sewer pipe cleaner',
  },
  {
    label: 'Set and exhibit designer',
    value: 'Set and exhibit designer',
  },
  {
    label: 'Sewing machine operator',
    value: 'Sewing machine operator',
  },
  {
    label: 'Sheet metal worker',
    value: 'Sheet metal worker',
  },
  {
    label: 'Ship and boat captain and operator',
    value: 'Ship and boat captain and operator',
  },
  {
    label: 'Shoe and leather repair or worker',
    value: 'Shoe and leather repair or worker',
  },
  {
    label: 'Signal and track switch repairer',
    value: 'Signal and track switch repairer',
  },
  {
    label: 'Slaughterer and meat packer',
    value: 'Slaughterer and meat packer',
  },
  {
    label: 'Small engine mechanic',
    value: 'Small engine mechanic',
  },
  {
    label: 'Social worker',
    value: 'Social worker',
  },
  {
    label: 'Sociologist',
    value: 'Sociologist',
  },
  {
    label: 'Software developer and programmer',
    value: 'Software developer and programmer',
  },
  {
    label: 'Solar panel installer',
    value: 'Solar panel installer',
  },
  {
    label: 'Sonographer',
    value: 'Sonographer',
  },
  {
    label: 'Sound engineering technician',
    value: 'Sound engineering technician',
  },
  {
    label: 'Speech-language pathologist',
    value: 'Speech-language pathologist',
  },
  {
    label: 'Sports Scout',
    value: 'Sports Scout',
  },
  {
    label: 'Sprinkler installer',
    value: 'Sprinkler installer',
  },
  {
    label: 'Statistician',
    value: 'Statistician',
  },
  {
    label: 'Stockbroker',
    value: 'Stockbroker',
  },
  {
    label: 'Structural iron and steel worker',
    value: 'Structural iron and steel worker',
  },
  {
    label: 'Substance abuse or Behavior Counselor',
    value: 'Substance abuse or Behavior Counselor',
  },
  {
    label: 'Substitute teacher',
    value: 'Substitute teacher',
  },
  {
    label: 'Subway and streetcar opr or conductor',
    value: 'Subway and streetcar opr or conductor',
  },
  {
    label: 'Surgeon',
    value: 'Surgeon',
  },
  {
    label: 'Surveyor',
    value: 'Surveyor',
  },
  {
    label: 'Switchboard operator',
    value: 'Switchboard operator',
  },
  {
    label: 'Systems analyst',
    value: 'Systems analyst',
  },
  {
    label: 'Tailor, dressmaker, or Seamstress',
    value: 'Tailor, dressmaker, or Seamstress',
  },
  {
    label: 'Tank, car, truck, and ship loader',
    value: 'Tank, car, truck, and ship loader',
  },
  {
    label: 'Taper',
    value: 'Taper',
  },
  {
    label: 'Tax examiner',
    value: 'Tax examiner',
  },
  {
    label: 'Tax preparer',
    value: 'Tax preparer',
  },
  {
    label: 'Taxi driver or chauffeur',
    value: 'Taxi driver or chauffeur',
  },
  {
    label: 'Teacher assistant',
    value: 'Teacher assistant',
  },
  {
    label: 'Teacher or instructor',
    value: 'Teacher or instructor',
  },
  {
    label: 'Technical Writer',
    value: 'Technical Writer',
  },
  {
    label: 'Telemarketer',
    value: 'Telemarketer',
  },
  {
    label: 'Telephone operator',
    value: 'Telephone operator',
  },
  {
    label: 'Teller or Bank worker',
    value: 'Teller or Bank worker',
  },
  {
    label: 'Textile, apparel',
    value: 'Textile, apparel',
  },
  {
    label: 'Therapist',
    value: 'Therapist',
  },
  {
    label: 'Tire repairer and changer',
    value: 'Tire repairer and changer',
  },
  {
    label: 'Title examiner, abstractor, and searcher',
    value: 'Title examiner, abstractor, and searcher',
  },
  {
    label: 'Tobacco machine operator and tender',
    value: 'Tobacco machine operator and tender',
  },
  {
    label: 'Toll Collector',
    value: 'Toll Collector',
  },
  {
    label: 'Tool and die maker',
    value: 'Tool and die maker',
  },
  {
    label: 'Tool grinder, filer, and sharpener',
    value: 'Tool grinder, filer, and sharpener',
  },
  {
    label: 'Tour and travel guide',
    value: 'Tour and travel guide',
  },
  {
    label: 'Tow Truck Driver',
    value: 'Tow Truck Driver',
  },
  {
    label: 'Transit and railroad police',
    value: 'Transit and railroad police',
  },
  {
    label: 'Transportation security worker (TSA)',
    value: 'Transportation security worker (TSA)',
  },
  {
    label: 'Travel Agent',
    value: 'Travel Agent',
  },
  {
    label: 'Tree trimmers and pruner',
    value: 'Tree trimmers and pruner',
  },
  {
    label: 'Truck Driver, Local, Beverage Delivery',
    value: 'Truck Driver, Local, Beverage Delivery',
  },
  {
    label: 'Truck Driver, Local, Light Delivery',
    value: 'Truck Driver, Local, Light Delivery',
  },
  {
    label: 'Truck Driver, Long Haul Over the Road',
    value: 'Truck Driver, Long Haul Over the Road',
  },
  {
    label: 'Underground Construction Worker',
    value: 'Underground Construction Worker',
  },
  {
    label: 'Unskilled Health Care Aide',
    value: 'Unskilled Health Care Aide',
  },
  {
    label: 'Upholsterer',
    value: 'Upholsterer',
  },
  {
    label: 'Urban and regional planner',
    value: 'Urban and regional planner',
  },
  {
    label: 'Usher, lobby attendant, and ticket taker',
    value: 'Usher, lobby attendant, and ticket taker',
  },
  {
    label: 'USPS, UPS, FedEx, Delivery Driver',
    value: 'USPS, UPS, FedEx, Delivery Driver',
  },
  {
    label: 'Valet',
    value: 'Valet',
  },
  {
    label: 'Veterinarian - Large Animal or Mixed',
    value: 'Veterinarian - Large Animal or Mixed',
  },
  {
    label: 'Veterinarian - Small Animal',
    value: 'Veterinarian - Small Animal',
  },
  {
    label: 'Veterinary assistant',
    value: 'Veterinary assistant',
  },
  {
    label: 'Waiter or waitress',
    value: 'Waiter or waitress',
  },
  {
    label: 'Warden, Fish and Game',
    value: 'Warden, Fish and Game',
  },
  {
    label: 'Warden, Prison',
    value: 'Warden, Prison',
  },
  {
    label: 'Warehouse worker',
    value: 'Warehouse worker',
  },
  {
    label: 'Waste Management Route Worker',
    value: 'Waste Management Route Worker',
  },
  {
    label: 'Waste Management Truck Driver',
    value: 'Waste Management Truck Driver',
  },
  {
    label: 'Watch repairer',
    value: 'Watch repairer',
  },
  {
    label: 'Water or wastewater treatment worker',
    value: 'Water or wastewater treatment worker',
  },
  {
    label: 'Web developer',
    value: 'Web developer',
  },
  {
    label: 'Welder, cutter, solderer, and brazer',
    value: 'Welder, cutter, solderer, and brazer',
  },
  {
    label: 'Wellhead pumper',
    value: 'Wellhead pumper',
  },
  {
    label: 'Wild Animal Trainer',
    value: 'Wild Animal Trainer',
  },
  {
    label: 'Wind turbine service technician',
    value: 'Wind turbine service technician',
  },
  {
    label: 'Window washer, Commercial',
    value: 'Window washer, Commercial',
  },
  {
    label: 'Window washer, Residential',
    value: 'Window washer, Residential',
  },
  {
    label: 'Woodworker',
    value: 'Woodworker',
  },
  {
    label: 'Zoologist and wildlife biologist',
    value: 'Zoologist and wildlife biologist',
  },
  {
    label: 'Advertising worker',
    value: 'Advertising worker',
  },
  {
    label: 'Business Agent',
    value: 'Business Agent',
  },
  {
    label: 'Cafe Worker',
    value: 'Cafe Worker',
  },
  {
    label: 'Dance Instructor',
    value: 'Dance Instructor',
  },
  {
    label: 'Entertainment Industry worker',
    value: 'Entertainment Industry worker',
  },
  {
    label: 'Dog Groomer',
    value: 'Dog Groomer',
  },
  {
    label: 'Freight Handler',
    value: 'Freight Handler',
  },
  {
    label: 'Golf Course worker',
    value: 'Golf Course worker',
  },
  {
    label: 'Government Employee',
    value: 'Government Employee',
  },
  {
    label: 'Grocery Store worker',
    value: 'Grocery Store worker',
  },
  {
    label: 'Nursing Home worker',
    value: 'Nursing Home worker',
  },
  {
    label: 'Jockey',
    value: 'Jockey',
  },
  {
    label: 'Laborer, unskilled',
    value: 'Laborer, unskilled',
  },
  {
    label: 'Lecturer',
    value: 'Lecturer',
  },
  {
    label: 'Lumber yard worker',
    value: 'Lumber yard worker',
  },
  {
    label: 'Manufacturing worker',
    value: 'Manufacturing worker',
  },
  {
    label: 'Repairer',
    value: 'Repairer',
  },
  {
    label: 'Restaurant manager',
    value: 'Restaurant manager',
  },
  {
    label: 'Route Driver',
    value: 'Route Driver',
  },
  {
    label: 'Siding Installer',
    value: 'Siding Installer',
  },
  {
    label: 'Animal Care',
    value: 'Animal Care',
  },
  {
    label: 'Stocker',
    value: 'Stocker',
  },
  {
    label: 'Street Cleaner',
    value: 'Street Cleaner',
  },
  {
    label: 'Wallpaperer',
    value: 'Wallpaperer',
  },
  {
    label: 'Zoo Employee',
    value: 'Zoo Employee',
  },
  {
    label: 'Office worker',
    value: 'Office worker',
  },
  {
    label: 'Auctioneer',
    value: 'Auctioneer',
  },
  {
    label: 'Air Hammer Operator',
    value: 'Air Hammer Operator',
  },
];
