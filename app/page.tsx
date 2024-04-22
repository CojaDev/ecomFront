import CategoryTabs from '@/components/CategoryTabs';
import Featured from '@/components/Featured';
import HeaderHome from '@/components/Header';
import Layout from '@/components/Layout';

export default function Home() {
  return (
    <Layout>
      <HeaderHome />
      <CategoryTabs />
      <Featured />
    </Layout>
  );
}
