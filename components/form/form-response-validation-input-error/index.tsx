'use client';

import { ChangeEvent, useEffect, useState } from 'react';

import { Input } from '@/components/ui/input';

import { useDebounce } from '@uidotdev/usehooks';

interface FormResponseValidationInputErrorProps {
  value: string;
  onChange: (value: string) => void;
}

export const FormResponseValidationInputError = (props: FormResponseValidationInputErrorProps) => {
  const { value, onChange } = props;
  const [inputValue, setInputValue] = useState<string>(value);
  const debouncedValue = useDebounce(inputValue, 500);

  useEffect(() => {
    if (value !== inputValue) {
      setInputValue(value);
    }
  }, [value]);

  useEffect(() => {
    if (debouncedValue !== value) {
      onChange?.(debouncedValue);
    }
  }, [debouncedValue, onChange, value]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <Input
      className="focus-visible:ring-[var(--builder-color)]"
      type="text"
      value={inputValue}
      onChange={(e) => {
        handleInputChange(e);
      }}
      placeholder="Custom error message"
    />
  );
};
