import { Box, Checkbox, Text } from '@chakra-ui/react'
interface ConsentsSectionProps {
  checkedItems: boolean[]
  onCheckItem: (newItems: boolean[]) => void
}
export const ConsentsSection: React.FC<ConsentsSectionProps> = ({
  checkedItems,
  onCheckItem,
}) => {
  const allChecked = checkedItems.every(Boolean)
  return (
    <Box w='full'>
      <Checkbox
        w='100%'
        bg='gray.100'
        borderRadius='5px'
        py='8px'
        px='6px'
        isChecked={allChecked}
        onChange={(e) => onCheckItem([e.target.checked, e.target.checked])}
      >
        <Text textStyle='h3_bold' textColor='black.100'>
          전체 동의
        </Text>
      </Checkbox>
      <Checkbox
        w='100%'
        borderRadius='5px'
        py='8px'
        px='6px'
        isChecked={checkedItems[0]}
        onChange={(e) => onCheckItem([e.target.checked, checkedItems[1]])}
        _hover={{}}
      >
        <Text textStyle='h3' textColor='black.100'>
          (필수) 비어랏 이용약관 동의
        </Text>
      </Checkbox>
      <Checkbox
        w='100%'
        borderRadius='5px'
        py='8px'
        px='6px'
        isChecked={checkedItems[1]}
        _hover={{}}
        onChange={(e) => onCheckItem([checkedItems[0], e.target.checked])}
      >
        <Text textStyle='h3' textColor='black.100'>
          (필수) 개인정보 수집 및 이용 동의
        </Text>
      </Checkbox>
    </Box>
  )
}
