'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { ValidationRule, ValidationType } from '@/types/validation';

interface FormResponseValidationRuleSelectProps {
  type: ValidationType;
  value: ValidationRule;
  onChange: (rule: ValidationRule) => void;
}

export const FormResponseValidationRuleSelect = (props: FormResponseValidationRuleSelectProps) => {
  const { type, value, onChange } = props;

  const getRuleOptions = () => {
    switch (type) {
      case 'text':
        return [
          { value: 'contains', label: 'Contains' },
          { value: 'doesntContain', label: "Doesn't Contain" },
        ];
      case 'number':
        return [
          { value: 'greaterThan', label: 'Greater Than' },
          { value: 'greaterThanOrEqual', label: 'Greater Than or Equal To' },
          { value: 'lessThan', label: 'Less Than' },
          { value: 'lessThanOrEqual', label: 'Less Than or Equal To' },
          { value: 'equalTo', label: 'Equal To' },
          { value: 'notEqualTo', label: 'Not Equal To' },
          { value: 'between', label: 'Between' },
          { value: 'notBetween', label: 'Not Between' },
          { value: 'isNumber', label: 'Is Number' },
          { value: 'wholeNumber', label: 'Whole Number' },
        ];
      case 'length':
        return [
          { value: 'maxLength', label: 'Maximum Length' },
          { value: 'minLength', label: 'Minimum Length' },
        ];
      default:
        return [];
    }
  };

  return (
    <Select
      value={value}
      onValueChange={(value) => onChange(value as ValidationRule)}
    >
      <SelectTrigger className="w-auto focus:ring-[var(--builder-color)]">
        <SelectValue placeholder="Rules" />
      </SelectTrigger>
      <SelectContent>
        {getRuleOptions().map((option) => (
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
