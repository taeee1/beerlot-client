import { HStack, IconButton, Input, Tag, Text } from '@chakra-ui/react'
import { WhiteCross } from '../../../../public/svg'
import { useCallback, useEffect, useState } from 'react'

interface EtcPlaceTagOptionProps {
  handleChangePlace: (place: string) => void
}
export const EtcPlaceTagOption: React.FC<EtcPlaceTagOptionProps> = ({
  handleChangePlace,
}) => {
  const [localPlaceInput, setLocalPlaceInput] = useState('')

  const onClearPlace = useCallback(() => {
    setLocalPlaceInput('')
  }, [setLocalPlaceInput])

  useEffect(() => {
    return () => {
      onClearPlace()
    }
  }, [onClearPlace])

  return (
    <HStack
      px={'0px'}
      py={'2px'}
      borderBottom='1px solid'
      borderBottomColor={'orange.200'}
    >
      {/* styling slightly weird, width should be fixed */}
      <Input
        onChange={(e) => setLocalPlaceInput(e.target.value)}
        onBlur={() => handleChangePlace(localPlaceInput)}
        value={localPlaceInput}
        w='auto'
        h='auto'
        border='none'
        px={'0px'}
        borderRadius={'none'}
        focusBorderColor='none'
        placeholder='직접 입력해주세요!'
        _placeholder={{ color: 'orange.100' }}
        color='orange.200'
        textStyle={'h2'}
      />

      <IconButton
        onClick={onClearPlace}
        bg='gray.200'
        size={'24px'}
        borderRadius='full'
        px={'0px'}
        aria-label='delete-x-button'
        icon={<WhiteCross />}
        _hover={{}}
        _active={{}}
      />
    </HStack>
  )
}
