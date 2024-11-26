/* eslint-disable @typescript-eslint/no-explicit-any */
import { inter, jakartaPlusSans, roboto } from '@/lib/fonts';
import { isColorDark } from '@/utils/isColorDark';

import { observable } from '@legendapp/state';
import { syncedQuery } from '@legendapp/state/sync-plugins/tanstack-query';
import { QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient();

// Store
export interface StoreType {
  activeElement: string | null;
}

export const store = observable<StoreType>({
  activeElement: null,
});

// Setting
export interface StoreSetting {
  headerFontFamily: 'inter' | 'jakartaPlusSans' | 'roboto';
  headerFontSize: 18 | 19 | 20 | 21 | 22 | 23 | 24;
  questionFontFamily: 'inter' | 'jakartaPlusSans' | 'roboto';
  questionFontSize: 12 | 14 | 16 | 18;
  textFontFamily: 'inter' | 'jakartaPlusSans' | 'roboto';
  textFontSize: 12 | 14 | 16;
  color: string;
  backgroundColor: string;
  headerFontFamilyClass: {
    class: string;
    variable: string;
  };
  questionFontFamilyClass: {
    class: string;
    variable: string;
  };
  textFontFamilyClass: {
    class: string;
    variable: string;
  };
  textColor: string;
}

const fontMap: Record<string, { class: string; variable: string }> = {
  roboto: { class: roboto.variable, variable: 'var(--font-roboto)' },
  jakartaPlusSans: { class: jakartaPlusSans.variable, variable: 'var(--font-jakarta-plus-sans)' },
  default: { class: inter.variable, variable: 'var(--font-inter)' },
};

export const storeSetting = observable<StoreSetting>({
  headerFontFamily: 'inter',
  headerFontSize: 24,
  questionFontFamily: 'inter',
  questionFontSize: 18,
  textFontFamily: 'inter',
  textFontSize: 16,
  color: '#673ab7',
  backgroundColor: '#f6f6f6',
  headerFontFamilyClass: () => {
    const fontName = storeSetting.headerFontFamily.get();
    console.log(fontName);
    return fontMap[fontName] || fontMap['default'];
  },
  questionFontFamilyClass: () => {
    const fontName = storeSetting.questionFontFamily.get();
    return fontMap[fontName] || fontMap['default'];
  },
  textFontFamilyClass: () => {
    const fontName = storeSetting.textFontFamily.get();
    return fontMap[fontName] || fontMap['default'];
  },
  textColor: () => {
    const color: string = storeSetting.color.get();
    return isColorDark(color) ? '#ffffff' : '#000000';
  },
});

// Form
export interface StoreFormSection {
  id: string;
  isDescription: boolean;
  // elements: any[];
}

// export interface StoreForm {
//   id: string;
//   status: 'draft' | 'published' | 'archived' | 'deleted';
//   sections: StoreFormSection[];
// }

// export const storeForm = observable<StoreForm>({
//   id: '1e348e47-771c-45f3-ae15-393ee0b86ea5',
//   status: 'draft',
//   sections: [
//     {
//       id: 'sec-jasdh',
//       isDescription: true,
//       // elements: [
//       //   {
//       //     id: 'elm-cbdnh',
//       //     type: 'title',
//       //     title: {
//       //       type: 'doc',
//       //       content: [
//       //         {
//       //           type: 'heading',
//       //           attrs: {
//       //             level: 1,
//       //           },
//       //           content: [
//       //             {
//       //               type: 'text',
//       //               text: 'Untitled form',
//       //             },
//       //           ],
//       //         },
//       //       ],
//       //     },
//       //     description: {
//       //       type: 'doc',
//       //       content: [
//       //         {
//       //           type: 'paragraph',
//       //         },
//       //       ],
//       //     },
//       //   },
//       //   {
//       //     id: 'elm-aosid',
//       //     type: 'question',
//       //   },
//       // ],
//     },
//     {
//       id: 'sec-kjsdf',
//       isDescription: true,
//       // elements: [
//       //   {
//       //     id: 'element-ajsdh',
//       //     type: 'title',
//       //     title: {
//       //       type: 'doc',
//       //       content: [
//       //         {
//       //           type: 'heading',
//       //           attrs: {
//       //             level: 1,
//       //           },
//       //           content: [
//       //             {
//       //               type: 'text',
//       //               text: 'Untitled form',
//       //             },
//       //           ],
//       //         },
//       //       ],
//       //     },
//       //     description: {
//       //       type: 'doc',
//       //       content: [
//       //         {
//       //           type: 'paragraph',
//       //         },
//       //       ],
//       //     },
//       //   },
//       // ],
//     },
//   ],
// });

export interface StoreForm {
  form: {
    id: string;
    status: 'draft' | 'published' | 'archived' | 'deleted';
    sections: StoreFormSection[];
  };
}

export const storeForm = observable<StoreForm>({
  form: syncedQuery({
    queryClient,
    query: {
      queryKey: ['post'],
      queryFn: async () => {
        return fetch('http://localhost:3000/api/builder').then((v) => v.json());
        // return fetch('https://dummyjson.com/posts/1').then((v) => v.json());
      },
    },
    mutation: {
      mutationFn: async (variables) => {
        console.log(variables);
        return fetch('http://localhost:3000/api/builder', {
          body: JSON.stringify(variables),
          method: 'PATCH',
        });
        // return fetch('https://dummyjson.com/posts/1', { body: JSON.stringify(variables), method: 'PUT' });
      },
    },
  }),
});
