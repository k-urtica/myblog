// import { Script } from 'gatsby';
import Footer from '../components/Footer';
import HeaderBar from '../components/HeaderBar';

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => (
  <>
    {/* <Script
      async
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
    /> */}

    <div className="font-body antialiased">
      <HeaderBar />

      <main className="container mx-auto max-w-screen-xl px-4 pt-12 pb-16">
        {children}
      </main>

      <Footer />
    </div>
  </>
);

export default Layout;
