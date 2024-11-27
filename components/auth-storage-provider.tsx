import { useAuthStorage } from '@/hooks/useAuthStorage';

export function AuthStorageProvider({ children }: { children: React.ReactNode }) {
  useAuthStorage();
  return <>{children}</>;
}
