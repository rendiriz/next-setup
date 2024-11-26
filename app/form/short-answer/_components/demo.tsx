'use client';

import { FormResponseValidation } from '@/components/form/form-response-validation';
import { FormShortAnswer } from '@/components/form/form-short-answer';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import type { QuestionType, ValidationState } from '@/types/validation';
import { createZodSchema } from '@/utils/createZodSchema';

import { zodResolver } from '@hookform/resolvers/zod';
import { observable } from '@legendapp/state';
import { observer } from '@legendapp/state/react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';

const setting = {
  color: '#673ab7',
};

export interface StoreType {
  value: string;
  type: QuestionType;
  name: string;
  isPublished: boolean;
  isResponseValidation: boolean;
  validation: ValidationState;
}

export const store = observable<StoreType>({
  value: '',
  type: 'short-answer',
  name: 'short-answer-Ksd8w',
  isPublished: false,
  isResponseValidation: false,
  validation: {
    type: 'text',
    required: true,
    rule: 'contains',
    value: '',
    customError: '',
  },
});

export const Demo = observer(() => {
  const value = store.value.get();
  const type = store.type.get();
  const name = store.name.get();
  const isPublished = store.isPublished.get();
  const isResponseValidation = store.isResponseValidation.get();
  const validation = store.validation.get();

  const formSchema = z.object({
    [name]: createZodSchema(validation),
  });

  type FormValues = z.infer<typeof formSchema>;

  const methods = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      [name]: value,
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(handleSubmit)}>
          <div
            style={
              {
                '--builder-color': setting.color,
              } as React.CSSProperties
            }
            className="flex flex-col space-y-4"
          >
            <FormShortAnswer
              name={name}
              isPublished={isPublished}
              value={value}
              onChangeValue={(newValue) => {
                if (newValue !== value) {
                  store.value.set(newValue);
                }
              }}
              validation={validation}
            />

            {isResponseValidation ? (
              <FormResponseValidation
                type={type}
                value={validation}
                onChange={(newValue) => {
                  store.validation.set(newValue);
                }}
              />
            ) : null}
          </div>

          <Button
            type="submit"
            className="mt-4"
          >
            Submit
          </Button>
        </form>
      </FormProvider>

      <Separator className="my-8" />

      <div className="flex flex-col space-y-2">
        <div>State:</div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="isPublished"
            checked={isPublished}
            onCheckedChange={() => store.isPublished.toggle()}
          />
          <label
            htmlFor="isPublished"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            isPublished
          </label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="isResponseValidation"
            checked={isResponseValidation}
            onCheckedChange={() => store.isResponseValidation.toggle()}
          />
          <label
            htmlFor="isResponseValidation"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            isResponseValidation
          </label>
        </div>
      </div>

      <Separator className="my-8" />

      <div className="flex flex-col space-y-2">
        <div>Value:</div>
        <pre className="text-xs">{JSON.stringify(store.get(), null, 2)}</pre>
      </div>
    </>
  );
});
