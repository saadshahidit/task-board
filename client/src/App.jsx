import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext.jsx';
import AppRouter from './router/AppRouter.jsx';

export default function App() {
  return (
    <AuthProvider>
      <AppRouter />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: { fontSize: '14px' },
        }}
      />
    </AuthProvider>
  );
}
