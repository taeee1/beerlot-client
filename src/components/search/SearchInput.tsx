import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  InputProps,
  InputRightElement,
} from '@chakra-ui/react'
import React, { useRef } from 'react'
import { SEARCH_BAR_PLACEHOLDER } from '../../../interface/static'
import { SearchGlass, WhiteCross } from '../../../public/svg'

interface SearchInputProps extends InputProps {
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void
  onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  autoFocus?: boolean
  clearValue?: () => void
}

const SearchInput: React.FC<SearchInputProps> = ({
  onFocus,
  onChange,
  onKeyPress,
  clearValue,
  autoFocus = false,
}) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const clearInput = () => {
    if (inputRef.current) {
      inputRef.current.value = ''
      clearValue?.()
    }
  }

  return (
    <InputGroup display='flex' alignItems='center' justifyContent='center'>
      <Input
        ref={inputRef}
        onKeyPress={onKeyPress}
        py='20px'
        px='20px'
        bg='blue.100'
        placeholder={SEARCH_BAR_PLACEHOLDER}
        size='sm'
        onChange={onChange}
        borderRadius='20px'
        textColor='white'
        _placeholder={{ color: 'inherit' }}
        focusBorderColor='inherit'
        autoFocus={autoFocus}
        onFocus={onFocus}
        _hover={{}}
      />
      <InputLeftElement h='full'>
        <SearchGlass />
      </InputLeftElement>
      <InputRightElement h='full' onClick={clearInput} borderRadius='50%'>
        <Box w='21px' h='21px' borderRadius='full' bg='blue.200'>
          <WhiteCross />
        </Box>
      </InputRightElement>
    </InputGroup>
  )
}

export default SearchInput
