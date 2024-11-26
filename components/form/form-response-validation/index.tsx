'use client';

import { FormResponseValidationInput } from '@/components/form/form-response-validation-input';
import { FormResponseValidationInputError } from '@/components/form/form-response-validation-input-error';
import { FormResponseValidationRuleSelect } from '@/components/form/form-response-validation-rule-select';
import { FormResponseValidationTypeSelect } from '@/components/form/form-response-validation-type-select';
import type { QuestionType, ValidationRule, ValidationState, ValidationType } from '@/types/validation';

interface FormResponseValidationProps {
  type: QuestionType;
  value: ValidationState;
  onChange: (value: ValidationState) => void;
}

export const FormResponseValidation = (props: FormResponseValidationProps) => {
  const { type, value, onChange } = props;

  const handleTypeChange = (type: ValidationType) => {
    const defaultRules: Record<ValidationType, ValidationRule> = {
      text: 'contains',
      number: 'greaterThan',
      length: 'maxLength',
    };

    onChange({
      ...value,
      type,
      rule: defaultRules[type],
      value: '',
    });
  };

  const handleRuleChange = (rule: ValidationRule) => {
    if (!rule) return; // TODO: react 19 error
    onChange({ ...value, rule });
  };

  const handleValueChange = (val: string | number) => {
    onChange({ ...value, value: val });
  };

  const handleCustomErrorChange = (customError: string) => {
    onChange({ ...value, customError });
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-4">
        <FormResponseValidationTypeSelect
          type={type}
          value={value.type}
          onChange={handleTypeChange}
        />

        <FormResponseValidationRuleSelect
          type={value.type}
          value={value.rule}
          onChange={handleRuleChange}
        />
      </div>

      <FormResponseValidationInput
        type={value.type}
        rule={value.rule}
        value={value.value}
        onChange={handleValueChange}
      />

      <FormResponseValidationInputError
        value={value.customError || ''}
        onChange={handleCustomErrorChange}
      />
    </div>
  );
};
