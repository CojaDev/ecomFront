import HeaderStore from '@/components/HeaderStore';
import HelpPage from '@/components/HelpPage';
import Layout from '@/components/Layout';

const Home = () => {
  return (
    <Layout>
      <HeaderStore title="Help Center" />
      <HelpPage />
    </Layout>
  );
};

export default Home;
