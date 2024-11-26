import { ValidationType } from '@/types/validationRule';

export function getDefaultResponseValidation(type: ValidationType) {
  if (type === 'text') {
    return 'contains';
  } else if (type === 'number') {
    return 'greater-than';
  } else if (type === 'length') {
    return 'maximum-character-count';
  }
}
