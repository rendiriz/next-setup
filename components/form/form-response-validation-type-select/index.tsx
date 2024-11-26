'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { QuestionType, ValidationType } from '@/types/validation';

interface FormResponseValidationTypeSelectProps {
  type: QuestionType;
  value: ValidationType;
  onChange: (type: ValidationType) => void;
}

export const FormResponseValidationTypeSelect = (props: FormResponseValidationTypeSelectProps) => {
  const { type, value, onChange } = props;

  const getTypeOptions = () => {
    switch (type) {
      case 'short-answer':
        return [
          { value: 'text', label: 'Text' },
          { value: 'number', label: 'Number' },
          { value: 'length', label: 'Length' },
        ];
      case 'long-answer':
        return [{ value: 'length', label: 'Length' }];
      default:
        return [];
    }
  };

  return (
    <Select
      value={value}
      onValueChange={(value) => onChange(value as ValidationType)}
    >
      <SelectTrigger className="w-auto focus:ring-[var(--builder-color)]">
        <SelectValue placeholder="Rules" />
      </SelectTrigger>
      <SelectContent>
        {getTypeOptions().map((option) => (
          <SelectItem
            key={option.value}
            value={option.value}
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
