import { AuthRedirector } from './src/components/Auth/AuthRedirector';
import { AuthProvider } from './src/context/AuthContext';

export default function RootLayout() {
  return (
    <AuthProvider>
      <AuthRedirector />
    </AuthProvider>
  );
}