import { Link } from '@tanstack/react-router';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Product } from '../backend';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link to="/product/$productId" params={{ productId: product.id }}>
      <Card className="group h-full overflow-hidden transition-all hover:shadow-lg">
        <div className="aspect-square overflow-hidden bg-muted">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <CardContent className="p-4">
          {product.brand && (
            <p className="mb-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              {product.brand}
            </p>
          )}
          <h3 className="mb-2 line-clamp-2 text-base font-semibold">{product.name}</h3>
          <p className="line-clamp-2 text-sm text-muted-foreground">{product.shortDescription}</p>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          {product.price && (
            <Badge variant="secondary" className="text-sm">
              ${product.price.toFixed(2)}
            </Badge>
          )}
        </CardFooter>
      </Card>
    </Link>
  );
}
