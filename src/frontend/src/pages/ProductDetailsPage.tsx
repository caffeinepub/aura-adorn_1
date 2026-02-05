import { useParams, useNavigate } from '@tanstack/react-router';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useGetProduct } from '../hooks/useQueries';
import { Category } from '../backend';

export default function ProductDetailsPage() {
  const { productId } = useParams({ from: '/product/$productId' });
  const navigate = useNavigate();
  const { data: product, isLoading, error } = useGetProduct(productId);

  if (isLoading) {
    return (
      <div className="container mx-auto flex min-h-[60vh] items-center justify-center px-4">
        <div className="text-center">
          <div className="mb-4 h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="text-sm text-muted-foreground">Loading product...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mx-auto flex min-h-[60vh] items-center justify-center px-4">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold">Product Not Found</h1>
          <p className="mb-8 text-muted-foreground">
            The product you're looking for doesn't exist.
          </p>
          <Button onClick={() => navigate({ to: '/' })}>Go to Home</Button>
        </div>
      </div>
    );
  }

  const categoryNames = {
    [Category.fashion]: 'Fashion',
    [Category.jewelry]: 'Jewelry',
    [Category.luxury]: 'Luxury',
  };

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Back Button */}
      <Button
        variant="ghost"
        onClick={() => navigate({ to: `/${product.category}` })}
        className="mb-8"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to {categoryNames[product.category]}
      </Button>

      {/* Product Details */}
      <div className="grid gap-12 lg:grid-cols-2">
        {/* Image */}
        <div className="overflow-hidden rounded-lg bg-muted">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Info */}
        <div className="flex flex-col">
          <div className="mb-4">
            <Badge variant="secondary" className="mb-4">
              {categoryNames[product.category]}
            </Badge>
            {product.brand && (
              <p className="mb-2 text-sm font-medium uppercase tracking-wider text-muted-foreground">
                {product.brand}
              </p>
            )}
            <h1 className="mb-4 text-4xl font-bold">{product.name}</h1>
            {product.price && (
              <p className="mb-6 text-3xl font-semibold">${product.price.toFixed(2)}</p>
            )}
          </div>

          <div className="mb-8">
            <h2 className="mb-3 text-lg font-semibold">Description</h2>
            <p className="text-muted-foreground">{product.shortDescription}</p>
          </div>

          {/* Affiliate Link */}
          <div className="mt-auto">
            <Button
              size="lg"
              className="w-full"
              asChild
            >
              <a
                href={product.affiliateUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center"
              >
                View Offer
                <ExternalLink className="ml-2 h-5 w-5" />
              </a>
            </Button>
            <p className="mt-4 text-xs text-muted-foreground">
              This is an affiliate link. We may earn a commission from qualifying purchases at no
              additional cost to you.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
