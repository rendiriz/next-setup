/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { FormDescription } from '@/components/form/form-description';
import { FormTitle } from '@/components/form/form-title';
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
import { cn } from '@/lib/utils';

import { Check, Copy, EllipsisVertical, Trash, X } from 'lucide-react';

interface FormElementTitleProps {
  className?: string;
  isMain: boolean;
  isActive: boolean;
  isEditable: boolean;
  value: any;
  onChangeValue: (value: any) => void;
  // rounded?: string;
  onElementClick?: (id: string) => void;
  showDescription: boolean;
  onCopy: (id: string) => void;
  onDelete: (id: string) => void;
  onChangeShowDescription: (showDescription: boolean) => void;
}

export const FormElementTitle = (props: FormElementTitleProps) => {
  const {
    isMain = false,
    isActive,
    isEditable,
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
          <div className="flex space-x-4 pl-6 pr-4">
            <FormTitle
              className="grow"
              isActive={isActive}
              isEditable={isEditable}
              value={value.title as Record<string, unknown>}
              onChangeValue={(title: Record<string, unknown>) => {
                onChangeValue({ ...value, title });
              }}
            />

            {isEditable && isActive && (
              <div className="flex">
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
            )}
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
        </div>
      </CardContent>
    </Card>
  );
};
