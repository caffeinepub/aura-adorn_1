import { RouterProvider, createRouter, createRoute, createRootRoute } from '@tanstack/react-router';
import { ThemeProvider } from 'next-themes';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import AdminProductsPage from './pages/AdminProductsPage';
import AffiliateDisclosurePage from './pages/AffiliateDisclosurePage';
import Layout from './components/Layout';
import { Toaster } from '@/components/ui/sonner';

const rootRoute = createRootRoute({
  component: Layout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
});

const fashionRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/fashion',
  component: () => <CategoryPage category="fashion" />,
});

const jewelryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/jewelry',
  component: () => <CategoryPage category="jewelry" />,
});

const luxuryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/luxury',
  component: () => <CategoryPage category="luxury" />,
});

const productRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/product/$productId',
  component: ProductDetailsPage,
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin',
  component: AdminProductsPage,
});

const affiliateDisclosureRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/affiliate-disclosure',
  component: AffiliateDisclosurePage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  fashionRoute,
  jewelryRoute,
  luxuryRoute,
  productRoute,
  adminRoute,
  affiliateDisclosureRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <RouterProvider router={router} />
      <Toaster />
    </ThemeProvider>
  );
}
