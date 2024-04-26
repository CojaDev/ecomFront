import CategoryTabs from '@/components/CategoryTabs';
import ProductList from '@/components/ProductList';
import HeaderHome from '@/components/Header';
import Layout from '@/components/Layout';
import FeaturedProduct from '@/components/FeaturedProduct';

export default function Home() {
  return (
    <Layout>
      <HeaderHome />
      <CategoryTabs />
      <ProductList title="Featured" />
      <FeaturedProduct />
      <ProductList title="NEW ARRIVALS" />
    </Layout>
  );
}
