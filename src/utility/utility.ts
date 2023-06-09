export const isBrowser = () => typeof window !== 'undefined';

export const toTitleCase = (string: string) => {
  string = string.replace(/_/g, ' ');
  return string.replace(/\w\S*/g, function (text: string) {
    return text.charAt(0).toUpperCase() + text.substring(1).toLowerCase();
  });
};

export const parseCurrency = (input: string | undefined) => {
  if (typeof input === 'undefined') {
    return 0;
  }
  return parseFloat((input || '0').replace(/[^\d\.]/g, ''));
};
