import CategoryTabs from '@/components/CategoryTabs';
import HeaderHome from '@/components/Header';
import Layout from '@/components/Layout';

export default function Home() {
  return (
    <Layout>
      <HeaderHome />
      <CategoryTabs />
    </Layout>
  );
}
