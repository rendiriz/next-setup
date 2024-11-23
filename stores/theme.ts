import { inter, jakartaPlusSans, roboto } from '@/lib/fonts';

import { observable } from '@legendapp/state';
import { syncedQuery } from '@legendapp/state/sync-plugins/tanstack-query';
import { QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient();

export const store = observable({
  theme: syncedQuery({
    queryClient,
    query: {
      queryKey: ['theme'],
      queryFn: async () => {
        store.isLoading.set(true);

        try {
          const response = await fetch('http://localhost:3000/api/theme');
          const data = await response.json();
          return data;
        } finally {
          store.isLoading.set(false);
        }
      },
    },
    mutation: {
      mutationFn: async (variables) => {
        store.isLoading.set(true);

        await new Promise((resolve) => setTimeout(resolve, 2000));

        try {
          return fetch('http://localhost:3000/api/theme', {
            body: JSON.stringify(variables),
            method: 'PUT',
          });
        } finally {
          store.isLoading.set(false);
        }
      },
    },
  }),
  isLoading: false,
  headerFontFamily: () => {
    const fontName = store.theme.get()?.headerFontFamily;

    switch (fontName) {
      case 'roboto':
        return {
          class: roboto.variable,
          variable: 'var(--font-roboto)',
        };
      case 'jakarta-plus-sans':
        return {
          class: jakartaPlusSans.variable,
          variable: 'var(--font-jakarta-plus-sans)',
        };
      default:
        return {
          class: inter.variable,
          variable: 'var(--font-inter)',
        };
    }
  },
  questionFontFamily: () => {
    const fontName = store.theme.get()?.questionFontFamily;

    switch (fontName) {
      case 'roboto':
        return {
          class: roboto.variable,
          variable: 'var(--font-roboto)',
        };
      case 'jakarta-plus-sans':
        return {
          class: jakartaPlusSans.variable,
          variable: 'var(--font-jakarta-plus-sans)',
        };
      default:
        return {
          class: inter.variable,
          variable: 'var(--font-inter)',
        };
    }
  },
  textFontFamily: () => {
    const fontName = store.theme.get()?.textFontFamily;

    switch (fontName) {
      case 'roboto':
        return {
          class: roboto.variable,
          variable: 'var(--font-roboto)',
        };
      case 'jakarta-plus-sans':
        return {
          class: jakartaPlusSans.variable,
          variable: 'var(--font-jakarta-plus-sans)',
        };
      default:
        return {
          class: inter.variable,
          variable: 'var(--font-inter)',
        };
    }
  },
});
