import { SearchBarList } from '@/components/home/Search/SearchBarList'
import {
  ModalBody,
  ModalContentProps,
  ModalHeader,
  VStack,
} from '@chakra-ui/react'
import React from 'react'
import { LeftBackRandom } from '../Headers/LeftBackRandom'

interface BeerSearchContentProps extends ModalContentProps {
  onBack: () => void
  onChangeBeerName: (name: string, id: number) => void
}

export const BeerSearchContent: React.FC<BeerSearchContentProps> = ({
  onBack,
  onChangeBeerName,
}) => {
  const handleClick = (name: string, id: number) => {
    onBack()
    onChangeBeerName(name, id)
  }

  return (
    <>
      <ModalHeader pt='46px'>
        <LeftBackRandom onClick={onBack} title='맥주 이름' />
      </ModalHeader>
      <ModalBody p='10px 20px' h='full'>
        <VStack
          h='full'
          gap='10px'
          justifyContent='flex-start'
          alignItems={'flex-start'}
        >
          <SearchBarList handleClickItem={handleClick} />
        </VStack>
      </ModalBody>
    </>
  )
}
