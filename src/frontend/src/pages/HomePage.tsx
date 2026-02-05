import { useNavigate } from '@tanstack/react-router';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useListProducts } from '../hooks/useQueries';
import ProductCard from '../components/ProductCard';
import { Category } from '../backend';

export default function HomePage() {
  const navigate = useNavigate();
  const { data: products = [], isLoading } = useListProducts();

  const fashionProducts = products.filter((p) => p.category === Category.fashion).slice(0, 3);
  const jewelryProducts = products.filter((p) => p.category === Category.jewelry).slice(0, 3);
  const luxuryProducts = products.filter((p) => p.category === Category.luxury).slice(0, 3);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-muted/30">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: 'url(/assets/generated/aura-adorn-hero-bg.dim_1920x1080.png)' }}
        />
        <div className="container relative mx-auto px-4 py-24 md:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <img
              src="/assets/generated/aura-adorn-wordmark.dim_1200x300.png"
              alt="aura&adorn"
              className="mx-auto mb-8 h-16 md:h-20"
            />
            <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-6xl">
              Curated Luxury & Elegance
            </h1>
            <p className="mb-8 text-lg text-muted-foreground md:text-xl">
              Discover the finest in fashion, jewelry, and luxury products. Each piece carefully
              selected for those who appreciate timeless style.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" onClick={() => navigate({ to: '/fashion' })}>
                Explore Fashion
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate({ to: '/jewelry' })}>
                View Jewelry
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        {/* Fashion */}
        <div className="mb-16">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="mb-2 text-3xl font-bold">Fashion</h2>
              <p className="text-muted-foreground">Timeless pieces for the modern wardrobe</p>
            </div>
            <Button
              variant="ghost"
              onClick={() => navigate({ to: '/fashion' })}
              className="group"
            >
              View All
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
          {isLoading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-96 animate-pulse rounded-lg bg-muted" />
              ))}
            </div>
          ) : fashionProducts.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {fashionProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground">No fashion products available yet.</p>
          )}
        </div>

        {/* Jewelry */}
        <div className="mb-16">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="mb-2 text-3xl font-bold">Jewelry</h2>
              <p className="text-muted-foreground">Exquisite pieces that make a statement</p>
            </div>
            <Button
              variant="ghost"
              onClick={() => navigate({ to: '/jewelry' })}
              className="group"
            >
              View All
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
          {isLoading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-96 animate-pulse rounded-lg bg-muted" />
              ))}
            </div>
          ) : jewelryProducts.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {jewelryProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground">No jewelry products available yet.</p>
          )}
        </div>

        {/* Luxury */}
        <div>
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="mb-2 text-3xl font-bold">Luxury</h2>
              <p className="text-muted-foreground">Premium selections for discerning tastes</p>
            </div>
            <Button variant="ghost" onClick={() => navigate({ to: '/luxury' })} className="group">
              View All
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
          {isLoading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-96 animate-pulse rounded-lg bg-muted" />
              ))}
            </div>
          ) : luxuryProducts.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {luxuryProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground">No luxury products available yet.</p>
          )}
        </div>
      </section>
    </div>
  );
}
