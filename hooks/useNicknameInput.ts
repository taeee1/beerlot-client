import React, {useState} from "react";

interface NicknameInputProps {
  initialInputState: string | null;
}

const useInput = ({initialInputState}: NicknameInputProps) => {
  const [input, setInput] = useState<string | null>(initialInputState);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInput(e.target.value);
  };

  return {
    input,
    setInput,
    onChange,
  };
};

export default useInput;
