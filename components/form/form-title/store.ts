import { createObservableHook } from '@legendapp/state/react-hooks/createObservableHook';
import { useEditor } from '@tiptap/react';

export const useEditorStore = createObservableHook(useEditor);
