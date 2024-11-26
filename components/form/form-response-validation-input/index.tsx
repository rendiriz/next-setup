'use client';

import { ChangeEvent, useEffect, useState } from 'react';

import { Input } from '@/components/ui/input';
import type { ValidationRule, ValidationType } from '@/types/validation';

import { useDebounce } from '@uidotdev/usehooks';

interface FormResponseValidationInputProps {
  type: ValidationType;
  rule: ValidationRule;
  value: string | number;
  onChange: (value: string | number) => void;
}

export const FormResponseValidationInput = (props: FormResponseValidationInputProps) => {
  const { type, rule, value, onChange } = props;
  const [inputValue, setInputValue] = useState<string | number>(value);
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
    setInputValue(type === 'text' ? event.target.value : Number(event.target.value));
  };

  const getInputType = () => {
    switch (type) {
      case 'number':
      case 'length':
        return 'number';
      default:
        return 'text';
    }
  };

  const getPlaceholder = () => {
    switch (type) {
      case 'text':
        return rule === 'contains' ? 'Text to contain...' : 'Text to exclude...';
      case 'number':
        return 'Enter number...';
      case 'length':
        return rule === 'maxLength' ? 'Maximum characters...' : 'Minimum characters...';
      default:
        return '';
    }
  };

  return (
    <Input
      className="focus-visible:ring-[var(--builder-color)]"
      type={getInputType()}
      value={inputValue}
      onChange={(e) => {
        handleInputChange(e);
      }}
      placeholder={getPlaceholder()}
      min={type === 'number' || type === 'length' ? 0 : undefined}
    />
  );
};
