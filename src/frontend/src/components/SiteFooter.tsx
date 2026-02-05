import { Link } from '@tanstack/react-router';
import { Heart } from 'lucide-react';

export default function SiteFooter() {
  return (
    <footer className="border-t border-border/40 bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand */}
          <div>
            <img
              src="/assets/generated/aura-adorn-wordmark.dim_1200x300.png"
              alt="aura&adorn"
              className="mb-4 h-8"
            />
            <p className="text-sm text-muted-foreground">
              Curating the finest in fashion, jewelry, and luxury.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider">Explore</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/fashion" className="text-muted-foreground hover:text-foreground">
                  Fashion
                </Link>
              </li>
              <li>
                <Link to="/jewelry" className="text-muted-foreground hover:text-foreground">
                  Jewelry
                </Link>
              </li>
              <li>
                <Link to="/luxury" className="text-muted-foreground hover:text-foreground">
                  Luxury
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/affiliate-disclosure"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Affiliate Disclosure
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Affiliate Disclosure Snippet */}
        <div className="mt-8 border-t border-border/40 pt-8">
          <p className="text-xs text-muted-foreground">
            <strong>Affiliate Disclosure:</strong> aura&adorn may earn commissions from qualifying
            purchases made through affiliate links on this site. This comes at no additional cost to
            you.
          </p>
        </div>

        {/* Copyright */}
        <div className="mt-8 flex flex-col items-center justify-center space-y-2 text-center text-xs text-muted-foreground">
          <p>
            © 2026. Built with <Heart className="inline h-3 w-3 fill-current text-red-500" /> using{' '}
            <a
              href="https://caffeine.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground"
            >
              caffeine.ai
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}
