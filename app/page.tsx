import Header from '@/components/Header';
import Nav from '@/components/Nav';

export default function Home() {
  return (
    <main className="flex relative flex-col min-h-screen font-sans">
      <Nav />
      <Header />
    </main>
  );
}
