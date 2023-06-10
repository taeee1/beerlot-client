import React, {useState} from "react";

interface NicknameInputProps {
  initialInputState: string;
}

const useNicknameInput = ({initialInputState}: NicknameInputProps) => {
  const [input, setInput] = useState<string | null>(initialInputState);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInput(e.target.value);
  };

  return {
    input,
    setInput,
    handleInputChange,
  };
};

export default useNicknameInput;
