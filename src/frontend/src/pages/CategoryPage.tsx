import { Category } from '../backend';
import { useListProducts } from '../hooks/useQueries';
import ProductCard from '../components/ProductCard';

interface CategoryPageProps {
  category: keyof typeof Category;
}

export default function CategoryPage({ category }: CategoryPageProps) {
  const { data: allProducts = [], isLoading } = useListProducts();

  const products = allProducts.filter((p) => p.category === Category[category]);

  const categoryTitles = {
    fashion: 'Fashion',
    jewelry: 'Jewelry',
    luxury: 'Luxury',
  };

  const categoryDescriptions = {
    fashion: 'Timeless pieces for the modern wardrobe',
    jewelry: 'Exquisite pieces that make a statement',
    luxury: 'Premium selections for discerning tastes',
  };

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold md:text-5xl">{categoryTitles[category]}</h1>
        <p className="text-lg text-muted-foreground">{categoryDescriptions[category]}</p>
      </div>

      {/* Products Grid */}
      {isLoading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="h-96 animate-pulse rounded-lg bg-muted" />
          ))}
        </div>
      ) : products.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="py-16 text-center">
          <p className="text-lg text-muted-foreground">
            No products available in this category yet.
          </p>
        </div>
      )}
    </div>
  );
}
