import { useNavigate } from '@tanstack/react-router';
import { ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useInternetIdentity } from '../hooks/useInternetIdentity';

export default function AccessDeniedScreen() {
  const navigate = useNavigate();
  const { identity, login } = useInternetIdentity();

  const isAuthenticated = !!identity;

  return (
    <div className="container mx-auto flex min-h-[60vh] items-center justify-center px-4">
      <div className="max-w-md text-center">
        <ShieldAlert className="mx-auto mb-6 h-16 w-16 text-muted-foreground" />
        <h1 className="mb-4 text-3xl font-bold">Access Denied</h1>
        <p className="mb-8 text-muted-foreground">
          {isAuthenticated
            ? 'You do not have permission to access this page. Admin privileges are required.'
            : 'Please log in to access this page.'}
        </p>
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          {!isAuthenticated && (
            <Button onClick={login} size="lg">
              Login
            </Button>
          )}
          <Button onClick={() => navigate({ to: '/' })} variant="outline" size="lg">
            Go to Home
          </Button>
        </div>
      </div>
    </div>
  );
}
