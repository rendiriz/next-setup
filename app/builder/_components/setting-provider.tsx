'use client';

import { observer } from '@legendapp/state/react';

interface SettingProviderProps {
  children: React.ReactNode;
}

const setting = {
  headerFontFamily: 'inter',
  headerFontSize: 24,
  questionFontFamily: 'inter',
  questionFontSize: 18,
  textFontFamily: 'inter',
  textFontSize: 16,
  color: '#673ab7',
  textColor: '#ffffff',
  backgroundColor: '#f6f6f6',
};

export const SettingProvider = observer(({ children }: SettingProviderProps) => {
  return (
    <main
      style={
        {
          '--builder-color': setting.color,
          '--builder-text-color': setting.textColor,
          '--builder-background-color': setting.backgroundColor,
        } as React.CSSProperties
      }
      className="h-[calc(100%-24px)] bg-[var(--builder-background-color)]"
    >
      {children}
    </main>
  );
});
