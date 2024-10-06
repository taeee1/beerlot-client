export const useSearch = (input: string) => {
  const isInputEmpty = input.length === 0

  return {
    isInputEmpty,
  }
}
