export type QuestionType = 'short-answer' | 'long-answer';
export type ValidationType = 'text' | 'number' | 'length';

export type TextRule = 'contains' | 'doesntContain';
export type NumberRule =
  | 'greaterThan'
  | 'greaterThanOrEqual'
  | 'lessThan'
  | 'lessThanOrEqual'
  | 'equalTo'
  | 'notEqualTo'
  | 'between'
  | 'notBetween'
  | 'isNumber'
  | 'wholeNumber';
export type LengthRule = 'maxLength' | 'minLength';

export type ValidationRule = TextRule | NumberRule | LengthRule;

export interface ValidationState {
  type: ValidationType;
  required: boolean;
  rule: ValidationRule;
  value: string | number;
  customError?: string;
}

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}
