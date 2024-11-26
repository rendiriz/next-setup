import type { ValidationState } from '@/types/validation';

import * as z from 'zod';

const createNumberValidation = (validation: ValidationState) => {
  // Base number schema
  const schema = z
    .string()
    .transform((val) => {
      const num = Number(val);
      return isNaN(num) ? undefined : num;
    })
    .pipe(
      z
        .number({
          invalid_type_error: validation.customError || 'Must be a number',
          required_error: validation.customError || 'This field is required',
        })
        .optional(),
    );

  // For whole number validation
  const isWholeNumber = (n: number) => Number.isInteger(n);

  switch (validation.rule) {
    case 'isNumber':
      return schema.pipe(
        z.number().refine((val) => !isNaN(val), {
          message: validation.customError || 'Must be a valid number',
        }),
      );

    case 'wholeNumber':
      return schema.pipe(
        z.number().refine(isWholeNumber, {
          message: validation.customError || 'Must be a whole number',
        }),
      );

    case 'greaterThan':
      return schema.pipe(
        z.number().refine((val) => val > (validation.value as number), {
          message: validation.customError || `Must be greater than ${validation.value}`,
        }),
      );

    case 'greaterThanOrEqual':
      return schema.pipe(
        z.number().refine((val) => val >= (validation.value as number), {
          message: validation.customError || `Must be greater than or equal to ${validation.value}`,
        }),
      );

    case 'lessThan':
      return schema.pipe(
        z.number().refine((val) => val < (validation.value as number), {
          message: validation.customError || `Must be less than ${validation.value}`,
        }),
      );

    case 'lessThanOrEqual':
      return schema.pipe(
        z.number().refine((val) => val <= (validation.value as number), {
          message: validation.customError || `Must be less than or equal to ${validation.value}`,
        }),
      );

    case 'equalTo':
      return schema.pipe(
        z.number().refine((val) => val === (validation.value as number), {
          message: validation.customError || `Must be equal to ${validation.value}`,
        }),
      );

    case 'notEqualTo':
      return schema.pipe(
        z.number().refine((val) => val !== (validation.value as number), {
          message: validation.customError || `Must not be equal to ${validation.value}`,
        }),
      );

    case 'between':
      const [min, max] = validation.value as unknown as number[];
      return schema.pipe(
        z.number().refine((val) => val > min && val < max, {
          message: validation.customError || `Must be between ${min} and ${max}`,
        }),
      );

    case 'notBetween':
      const [notMin, notMax] = validation.value as unknown as number[];
      return schema.pipe(
        z.number().refine((val) => val <= notMin || val >= notMax, {
          message: validation.customError || `Must not be between ${notMin} and ${notMax}`,
        }),
      );

    default:
      return schema;
  }
};

export const createZodSchema = (validation: ValidationState) => {
  // Start with base schema based on type
  let baseSchema = z.string();

  // Add required validation
  if (validation.required) {
    baseSchema = baseSchema.min(1, validation.customError || 'This field is required');
  }

  // Handle number type validation separately
  if (validation.type === 'number') {
    return createNumberValidation(validation);
  }

  // Handle text and length rules
  switch (validation.rule) {
    case 'contains':
      return baseSchema.refine((val) => val.includes(validation.value as string), {
        message: validation.customError || `Must contain "${validation.value}"`,
      });

    case 'doesntContain':
      return baseSchema.refine((val) => !val.includes(validation.value as string), {
        message: validation.customError || `Must not contain "${validation.value}"`,
      });

    case 'maxLength':
      return baseSchema.max(validation.value as number, {
        message: validation.customError || `Maximum length is ${validation.value} characters`,
      });

    case 'minLength':
      return baseSchema.min(validation.value as number, {
        message: validation.customError || `Minimum length is ${validation.value} characters`,
      });

    default:
      return baseSchema;
  }
};
