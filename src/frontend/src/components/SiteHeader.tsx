import { Link, useNavigate } from '@tanstack/react-router';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import LoginButton from './LoginButton';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useGetCallerUserRole } from '../hooks/useQueries';

export default function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { identity } = useInternetIdentity();
  const { data: userRole } = useGetCallerUserRole();

  const isAdmin = identity && userRole === 'admin';

  const navLinks = [
    { name: 'Fashion', path: '/fashion' },
    { name: 'Jewelry', path: '/jewelry' },
    { name: 'Luxury', path: '/luxury' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img
              src="/assets/generated/aura-adorn-monogram.dim_512x512.png"
              alt="aura&adorn"
              className="h-10 w-10"
            />
            <img
              src="/assets/generated/aura-adorn-wordmark.dim_1200x300.png"
              alt="aura&adorn"
              className="hidden h-8 sm:block"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center space-x-8 md:flex">
            {navLinks.map((link) => (
              <button
                key={link.path}
                onClick={() => navigate({ to: link.path })}
                className="text-sm font-medium tracking-wide text-foreground/80 transition-colors hover:text-foreground"
              >
                {link.name}
              </button>
            ))}
            {isAdmin && (
              <button
                onClick={() => navigate({ to: '/admin' })}
                className="text-sm font-medium tracking-wide text-foreground/80 transition-colors hover:text-foreground"
              >
                Manage Products
              </button>
            )}
          </nav>

          {/* Desktop Login Button */}
          <div className="hidden md:block">
            <LoginButton />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="border-t border-border/40 py-4 md:hidden">
            <nav className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <button
                  key={link.path}
                  onClick={() => {
                    navigate({ to: link.path });
                    setMobileMenuOpen(false);
                  }}
                  className="text-left text-sm font-medium tracking-wide text-foreground/80 transition-colors hover:text-foreground"
                >
                  {link.name}
                </button>
              ))}
              {isAdmin && (
                <button
                  onClick={() => {
                    navigate({ to: '/admin' });
                    setMobileMenuOpen(false);
                  }}
                  className="text-left text-sm font-medium tracking-wide text-foreground/80 transition-colors hover:text-foreground"
                >
                  Manage Products
                </button>
              )}
              <div className="pt-4">
                <LoginButton />
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
