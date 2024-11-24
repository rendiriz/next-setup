'use client';

import { FormDescription } from '@/components/form/form-description';
import { FormTitle } from '@/components/form/form-title';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

import { observer } from '@legendapp/state/react';
import { EllipsisVertical } from 'lucide-react';

interface FormElementTitleProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any; // TODO: types
  isMain?: boolean;
  rounded?: string;
  isActive?: boolean;
  className?: string;
  onElementClick?: (id: string) => void;
}

export const FormElementTitle = observer(
  ({ data, isMain = false, rounded = '', isActive = false, onElementClick }: FormElementTitleProps) => {
    return (
      <Card
        onClick={() => onElementClick?.(data.id)}
        className={cn(isMain && 'border-t-[var(--builder-color)]', rounded, isActive && 'shadow-lg')}
      >
        <CardContent className="relative flex p-0">
          {isMain && (
            <div
              className={cn(
                'h-2.5 w-[calc(100%+2px)] bg-[var(--builder-color)] text-white',
                rounded,
                isMain && 'absolute -left-[1px] -top-[1px]',
              )}
            ></div>
          )}
          <div className={cn(isMain ? 'pb-6 pt-8' : 'py-6', 'w-full')}>
            <div className="flex gap-4 pl-6 pr-4">
              <FormTitle
                isDemo={false}
                className="grow"
                isActive={isActive}
              />

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
                  <DropdownMenuItem>
                    <span>Delete section</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="flex px-6">
              <FormDescription
                isDemo={false}
                className="grow"
                isActive={isActive}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  },
);
