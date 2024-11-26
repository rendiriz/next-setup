/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { FormDescription } from '@/components/form/form-description';
import { FormQuestion } from '@/components/form/form-question';
// import { FormShortAnswer } from '@/components/form/form-short-answer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';

import { observer } from '@legendapp/state/react';
import { Check, Copy, EllipsisVertical, ImageIcon, Trash, X } from 'lucide-react';

interface FormElementQuestionProps {
  className?: string;
  isMain: boolean;
  isActive: boolean;
  isEditable: boolean;
  isRequired: boolean;
  value: any;
  onChangeValue: (value: any) => void;
  // rounded?: string;
  onElementClick?: (id: string) => void;
  showDescription: boolean;
  onCopy: (id: string) => void;
  onDelete: (id: string) => void;
  onChangeShowDescription: (showDescription: boolean) => void;
}

export const FormElementQuestion = observer((props: FormElementQuestionProps) => {
  const {
    isMain = false,
    isActive,
    isEditable,
    isRequired,
    value,
    onChangeValue,
    onElementClick,
    showDescription,
    onCopy,
    onDelete,
    onChangeShowDescription,
  } = props;

  return (
    <Card
      onClick={() => onElementClick?.(value.id)}
      className={cn(
        isMain && 'rounded-t-lg border-t-[var(--builder-color)]',
        // rounded,
        isActive && 'shadow-lg',
      )}
    >
      <CardContent className="relative flex p-0">
        {isMain && (
          <div
            className={cn(
              'h-2.5 w-[calc(100%+2px)] bg-[var(--builder-color)] text-white',
              // rounded,
              isMain && 'absolute -left-[1px] -top-[1px] rounded-t-lg',
            )}
          ></div>
        )}
        <div className={cn(isMain ? 'pb-6 pt-8' : 'py-6', 'flex w-full flex-col space-y-2')}>
          <div className="flex space-x-4 px-6">
            <FormQuestion
              className="grow"
              isActive={isActive}
              isEditable={isEditable}
              isRequired={isRequired}
              value={value.question as Record<string, unknown>}
              onChangeValue={(question: Record<string, unknown>) => {
                onChangeValue({ ...value, question });
              }}
            />

            <Button
              variant="ghost"
              size="icon"
            >
              <ImageIcon />
            </Button>

            <div>Action</div>
          </div>

          <div className="flex px-6">
            {showDescription && (
              <FormDescription
                className="grow"
                isActive={isActive}
                isEditable={isEditable}
                value={value.description as Record<string, unknown>}
                onChangeValue={(description: Record<string, unknown>) => {
                  onChangeValue({ ...value, description });
                }}
              />
            )}
          </div>

          <div className="flex px-6">
            {/* <FormShortAnswer
              name={value.answer.name}
              isPublished={value.answer.isPublished}
              value={value.answer.value}
              onChangeValue={(answer: any) => {
                onChangeValue({ ...value, answer });
              }}
              validation={value.answer.validation}
            /> */}
          </div>

          <div className="flex px-6">FormResponseValidation</div>

          {isActive && (
            <div className="flex flex-col space-y-5">
              <Separator className="mx-6 w-auto" />

              <div className="flex h-5 items-center justify-end pl-6 pr-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    onCopy(value.id);
                  }}
                >
                  <Copy />
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    onDelete(value.id);
                  }}
                >
                  <Trash />
                </Button>

                <Separator
                  className="mx-2"
                  orientation="vertical"
                />

                <div className="mx-2 flex items-center gap-2">
                  <span>Required</span>
                  <Switch
                    id="required"
                    className="data-[state=checked]:bg-[var(--builder-color)]"
                    checked={isRequired}
                    onCheckedChange={(checked) => {
                      onChangeValue({ ...value, isRequired: checked });
                    }}
                  />
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                    >
                      <EllipsisVertical />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="w-56"
                    align="start"
                  >
                    <DropdownMenuLabel>Show</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => onChangeShowDescription(!showDescription)}
                      className="cursor-pointer"
                    >
                      {showDescription ? <Check /> : <X />}
                      <span>Description</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
});
