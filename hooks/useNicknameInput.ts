import React, { useState } from "react";

interface NicknameInputProps {
  initialInputState: string | null;
}

export const useInput = ({ initialInputState }: NicknameInputProps) => {
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
