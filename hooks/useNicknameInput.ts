import {useState} from "react";

interface UseNicknameInputProps {
  initialInputState?: string;
}
const useNicknameInput = ({initialInputState}: UseNicknameInputProps = {}) => {
  const [input, setInput] = useState<string | null>(initialInputState ?? null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };
  return {
    input,
    setInput,
    handleInputChange,
  };
};
export default useNicknameInput;
