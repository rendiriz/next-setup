'use client';

import { FormQuestion } from '@/components/form/form-question';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';

import { observer } from '@legendapp/state/react';
import { Copy, EllipsisVertical, ImageIcon, Trash } from 'lucide-react';

interface FormElementQuestionProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any; // TODO: types
  isMain?: boolean;
  rounded?: string;
  isActive?: boolean;
  className?: string;
  onElementClick?: (id: string) => void;
}

export const FormElementQuestion = observer(
  ({ data, isMain = false, rounded = '', isActive = false, onElementClick }: FormElementQuestionProps) => {
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
            <div className="flex gap-4 px-6">
              <FormQuestion
                isDemo={false}
                className="grow"
                isActive={isActive}
              />

              <Button
                variant="ghost"
                size="icon"
              >
                <ImageIcon />
              </Button>

              <div>Action</div>
            </div>

            <div className="flex px-6">asd</div>

            {isActive && (
              <>
                <Separator className="m-6 w-auto" />

                <div className="flex h-5 items-center justify-end pl-6 pr-4">
                  <Button
                    variant="ghost"
                    size="icon"
                  >
                    <Copy />
                  </Button>

                  <Button
                    variant="ghost"
                    size="icon"
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
                      <DropdownMenuItem>
                        <span>Delete section</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    );
  },
);
