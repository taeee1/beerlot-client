import {
  Button,
  ButtonProps,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerOverlay,
  Text,
} from '@chakra-ui/react'
import React from 'react'

interface BottomDrawerProps {
  isOpen: boolean
  onClose: () => void
  headerLabel: string
  confirmLabel: string
  cancelLabel: string
  bodyLabel?: string
  onConfirm: ButtonProps['onClick']
  onCancel: ButtonProps['onClick']
  reversed?: boolean
}
const BottomDrawer: React.FC<BottomDrawerProps> = ({
  onClose,
  isOpen,
  headerLabel,
  bodyLabel,
  onConfirm,
  onCancel,
  confirmLabel,
  cancelLabel,
}) => {
  return (
    <Drawer placement={'bottom'} onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay bg={'rgba(0, 0, 0, 0.07)'} />
      <DrawerContent
        pt={8}
        pb={10}
        px={5}
        gap={5}
        justifyContent={'center'}
        display={'flex'}
        bg={'white.100'}
        borderRadius={'10px 10px 0px 0px'}
      >
        <DrawerBody
          w='full'
          p={0}
          alignItems={'center'}
          flexDir={'column'}
          display={'flex'}
        >
          <Text textStyle={'h2_bold'} textColor={'black.100'}>
            {headerLabel}
          </Text>
          {bodyLabel && (
            <Text
              mt={1}
              textAlign={'center'}
              textStyle={'h3'}
              textColor={'gray.300'}
              whiteSpace={'pre-wrap'}
            >
              {bodyLabel}
            </Text>
          )}
        </DrawerBody>
        <DrawerFooter w={'full'} p={0} display={'flex'} gap={3}>
          <Button
            {...commonButtonStyle}
            onClick={onCancel}
            flex={1}
            bg='gray.200'
            borderRadius={'20px'}
          >
            <Text textColor={'black.100'} textStyle={'h2_bold'}>
              {cancelLabel}
            </Text>
          </Button>
          <Button
            {...commonButtonStyle}
            onClick={onConfirm}
            flex={1}
            bg='orange.300'
          >
            <Text textColor={'white'} textStyle={'h2_bold'}>
              {confirmLabel}
            </Text>
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export default BottomDrawer

const commonButtonStyle = {
  py: 2.5,
  borderRadius: '20px',
  minH: 'initial',
  h: 'fit-content',
}
