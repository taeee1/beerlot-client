import { Box, Container, Flex } from '@chakra-ui/react'
import { LeftBackCompleteCircles } from '../../shared/Headers/LeftBackCompleteCircles'
import Nickname from './Nickname'
import { useState } from 'react'
import CompleteTemplate from './CompleteTemplate'
import { SignUpType } from '../../../../interface/types'
import BeerTasteSelection from './BeerTasteSelection'

export enum StepEnum {
  NICKNAME,
  BEERS,
  COMPLETE,
}
const SignUpTemplate = () => {
  const [step, setStep] = useState<StepEnum>(StepEnum.NICKNAME)
  const [userInfo, setUserInfo] = useState<SignUpType>({})
  const [selectedBeers, setSelectedBeers] = useState<number[]>([])

  const updateSelectedBeers = (beerId: number) => {
    setSelectedBeers((prev) =>
      prev.includes(beerId)
        ? prev.filter((id) => id !== beerId)
        : [...prev, beerId]
    )
  }

  const updateUserInfo = (key: keyof SignUpType, value: string) => {
    setUserInfo((prev) => ({ ...prev, [key]: value }))
  }

  const handleNext = () => {
    setStep((prev) => prev + 1)
  }

  return (
    <Box w='full' h='100vh' bg='gray.100'>
      <Container h='full' bg='white' p={0} maxW='450px' pos={'relative'}>
        <Flex w={'full'} h={'full'} pt={10} pb={'64px'} flexDirection='column'>
          <LeftBackCompleteCircles step={step} />

          {step === StepEnum.NICKNAME && (
            <Nickname setUserInfo={updateUserInfo} onNext={handleNext} />
          )}

          {step === StepEnum.BEERS && (
            <BeerTasteSelection
              username={userInfo.username}
              selectedBeers={selectedBeers}
              updateSelectedBeers={updateSelectedBeers}
              onNext={handleNext}
            />
          )}

          {step === StepEnum.COMPLETE && (
            <CompleteTemplate userInfo={userInfo} />
          )}
        </Flex>
      </Container>
    </Box>
  )
}

export default SignUpTemplate
