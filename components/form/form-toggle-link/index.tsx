'use client';

import { useCallback, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ToggleGroupItem } from '@/components/ui/toggle-group';

import { zodResolver } from '@hookform/resolvers/zod';
import type { Editor } from '@tiptap/react';
import { Link } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

interface FormToggleLinkProps {
  className?: string;
  editor: Editor;
}

const LinkFormSchema = z.object({
  text: z.string(),
  link: z.string().url('Invalid URL'),
});

type LinkForm = z.infer<typeof LinkFormSchema>;

export const FormToggleLink = ({ editor }: FormToggleLinkProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<LinkForm>({
    resolver: zodResolver(LinkFormSchema),
    defaultValues: {
      text: '',
      link: '',
    },
    mode: 'onChange',
  });

  const openDialog = useCallback(() => {
    if (editor) {
      setIsOpen(true);

      editor.chain().focus().extendMarkRange('link').run();

      const { view, state } = editor;
      const { from, to } = view.state.selection;
      const previousText = state.doc.textBetween(from, to, ' ');

      const previousUrl = editor.getAttributes('link').href;

      form.setValue('text', previousText ?? '');
      form.setValue('link', previousUrl ?? '');
    }
  }, [form, editor]);

  const handleSubmit = useCallback(
    async (input: LinkForm) => {
      if (editor) {
        setIsOpen(false);
        form.reset();

        let text = input.text;
        if (input.text === '') text = input.link;

        editor
          .chain()
          .focus()
          .extendMarkRange('link')
          .setLink({ href: input.link })
          .setUnderline()
          .command(({ tr }) => {
            tr.insertText(text);
            return true;
          })
          .run();
      }
    },
    [form, editor],
  );

  return (
    <>
      <ToggleGroupItem
        value="link"
        aria-label="Toggle link"
        onClick={openDialog}
        data-state={editor.isActive('link') ? 'on' : 'off'}
      >
        <Link className="size-4" />
      </ToggleGroupItem>

      <Dialog
        open={isOpen}
        onOpenChange={setIsOpen}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add link</DialogTitle>
          </DialogHeader>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-6"
            >
              <div className="mx-auto w-full max-w-lg space-y-8">
                <div className="grid gap-y-4">
                  <FormField
                    control={form.control}
                    name="text"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel>Text to display</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="link"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel>Link to</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            required
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <DialogFooter>
                <Button type="submit">Save</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};
