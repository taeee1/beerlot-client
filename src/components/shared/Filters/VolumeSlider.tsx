import {
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderProps,
  RangeSliderThumb,
  RangeSliderTrack,
} from '@chakra-ui/react'
import React from 'react'

interface VolumeSliderProps extends RangeSliderProps {
  min: number
  max: number
  value: number[]
  onChange: (val: number[]) => void
  trackColor?: string
}

export const VolumeSlider: React.FC<VolumeSliderProps> = ({
  min,
  max,
  value,
  trackColor,
  onChange,
  ...props
}) => {
  return (
    <RangeSlider
      min={min}
      max={max}
      defaultValue={[min, max]}
      onChange={onChange}
      value={value}
      {...props}
    >
      <RangeSliderTrack bg={trackColor}>
        <RangeSliderFilledTrack />
      </RangeSliderTrack>
      <RangeSliderThumb index={0} />
      <RangeSliderThumb index={1} />
    </RangeSlider>
  )
}
