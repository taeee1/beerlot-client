import { useBeersQuery } from '@/../hooks/query/useBeerQuery'
import { useUserInfoQuery } from '@/../hooks/query/useUserQuery'
import SearchInput from '@/components/search/SearchInput'
import { Flex } from '@chakra-ui/react'
import Cookies from 'js-cookie'
import React, { useEffect, useState } from 'react'
import { SearchResultHandler } from './SearchResultHandler'

interface SearchBarListProps {
  handleClickItem?: (name: string, id: number) => void
  onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void
}

const SearchBarList: React.FC<SearchBarListProps> = ({
  handleClickItem,
  onKeyPress,
}) => {
  const [input, setInput] = useState('')
  const [debouncedInput, setDebouncedInput] = useState('')

  // user
  const accessToken = Cookies.get('beerlot-oauth-auth-request')
  const userQuery = useUserInfoQuery(accessToken ?? '')

  useEffect(() => {
    userQuery.refetch()
  }, [])

  // Debouncing input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedInput(input)
    }, 200) // 500ms의 딜레이

    return () => {
      clearTimeout(timer)
    }
  }, [input])

  const { data, isLoading } = useBeersQuery(
    {
      keyword: debouncedInput,
    },
    {
      enabled: !!debouncedInput,
    }
  )

  const searchResult = data?.contents

  const clearValue = () => {
    setInput('')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  return (
    <Flex
      h='full'
      w='full'
      direction='column'
      borderRadius='20px'
      gap='10px'
      mt='14px'
    >
      <SearchInput
        onKeyPress={onKeyPress}
        onChange={handleChange}
        clearValue={clearValue}
      />
      <Flex flexDirection='column' h='full' w='full'>
        <SearchResultHandler
          input={debouncedInput}
          username={userQuery.data?.username}
          searchResult={searchResult}
          isLoading={isLoading}
          onClickBeerCard={handleClickItem}
        />
      </Flex>
    </Flex>
  )
}

export { SearchBarList }
