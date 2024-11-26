'use client';

import { observer } from '@legendapp/state/react';

import { storeSetting } from '../_stores/store';

interface SettingProviderProps {
  children: React.ReactNode;
}

export const SettingProvider = observer(({ children }: SettingProviderProps) => {
  const headerFontFamily = storeSetting.headerFontFamilyClass.get();
  const headerFontSize = storeSetting.headerFontSize.get();
  const textFontFamily = storeSetting.textFontFamilyClass.get();
  const textFontSize = storeSetting.textFontSize.get();
  const questionFontFamily = storeSetting.questionFontFamilyClass.get();
  const questionFontSize = storeSetting.questionFontSize.get();
  const color = storeSetting.color.get();
  const textColor = storeSetting.textColor.get();
  const backgroundColor = storeSetting.backgroundColor.get();

  return (
    <main
      style={
        {
          '--builder-title-font-family': headerFontFamily.variable,
          '--builder-title-font-size': `${headerFontSize}px`,
          '--builder-description-font-family': textFontFamily.variable,
          '--builder-description-font-size': `${textFontSize}px`,
          '--builder-question-font-family': questionFontFamily.variable,
          '--builder-question-font-size': `${questionFontSize}px`,
          '--builder-color': color,
          '--builder-text-color': textColor,
          '--builder-background-color': backgroundColor,
        } as React.CSSProperties
      }
      className="h-[calc(100%-24px)] bg-[var(--builder-background-color)]"
    >
      {children}
    </main>
  );
});
