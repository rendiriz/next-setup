'use client';

import { ChangeEvent, useEffect, useState } from 'react';

import { Input } from '@/components/ui/input';
import type { ValidationState } from '@/types/validation';

import { observer } from '@legendapp/state/react';
import { useDebounce } from '@uidotdev/usehooks';
import { useFormContext } from 'react-hook-form';

interface FormShortAnswerProps {
  name: string;
  isPublished: boolean;
  value: string;
  onChangeValue: (value: string) => void;
  validation: ValidationState;
}

export const FormShortAnswer = observer((props: FormShortAnswerProps) => {
  const { name, isPublished, value, onChangeValue, validation } = props;
  const [inputValue, setInputValue] = useState<string>(value);
  const debouncedValue = useDebounce(inputValue, 500);

  const {
    register,
    formState: { errors },
    trigger,
  } = useFormContext();

  useEffect(() => {
    if (value !== inputValue) {
      setInputValue(value);
    }
  }, [value]);

  useEffect(() => {
    if (debouncedValue !== value) {
      onChangeValue?.(debouncedValue);
      trigger(name);
    }
  }, [debouncedValue, onChangeValue, trigger, name, value]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="space-y-2">
      <Input
        className="focus-visible:ring-[var(--builder-color)]"
        type={validation?.type === 'number' ? 'number' : 'text'}
        value={inputValue}
        {...register(name)}
        onChange={(e) => {
          handleInputChange(e);
          register(name).onChange(e);
        }}
        placeholder={isPublished ? 'Your answer' : 'Short answer text'}
        readOnly={!isPublished}
        disabled={!isPublished}
        aria-invalid={!!errors[name]}
      />
      {errors[name] && <p className="text-sm text-red-500">{errors[name]?.message as string}</p>}
    </div>
  );
});
