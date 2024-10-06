import {
  MAX_BEER_VOLUME_SLIDER,
  MIN_BEER_VOLUME_SLIDER,
  countries,
} from '@/../interface/static'

export const getFlagByCountryName = (countryName: string) => {
  const country = countries.find((country) => country.name === countryName)
  return country ? country.flag : ''
}

export const isBeerVolumeWithinRange = (beerVolume: number[]) => {
  if (beerVolume.length !== 2) {
    console.error('beerVolume must be an array of length 2')
    return false
  }
  return (
    beerVolume[0] !== MIN_BEER_VOLUME_SLIDER ||
    beerVolume[1] !== MAX_BEER_VOLUME_SLIDER
  )
}
