import { AllKeyboardEvent } from '../interface/types'

const useKeyboard = () => {
  const isEnterKey = (e: AllKeyboardEvent) => {
    return e.code === 'Enter'
  }

  return {
    isEnterKey,
  }
}
export default useKeyboard
