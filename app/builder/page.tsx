import { FormBuilder } from './_components/form-builder';
import { SettingProvider } from './_components/setting-provider';

export default function BuilderPage() {
  return (
    <SettingProvider>
      <FormBuilder />
    </SettingProvider>
  );
}
