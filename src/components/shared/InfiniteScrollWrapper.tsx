import React, { useEffect, useRef } from 'react'
import { Spinner, Center } from '@chakra-ui/react'

interface InfiniteScrollWrapperProps {
  handleLoadMore: () => void
  isFetching: boolean
  children: React.ReactNode
}

export const InfiniteScrollWrapper: React.FC<InfiniteScrollWrapperProps> = ({
  handleLoadMore,
  isFetching,
  children,
}) => {
  const loadMoreRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        handleLoadMore()
      }
    })

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current)
    }

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current)
      }
    }
  }, [loadMoreRef, handleLoadMore])

  return (
    <>
      {children}
      {isFetching && (
        <Center py={2}>
          <Spinner />
        </Center>
      )}
      <div ref={loadMoreRef} />
    </>
  )
}
