import {countries} from "@/../interface/static";

export const getFlagByCountryName = (countryName: string) => {
  const country = countries.find((country) => country.name === countryName);
  return country ? country.flag : "";
};
