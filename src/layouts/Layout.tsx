import HeaderBar from '../components/HeaderBar';

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => (
  <div className="font-body antialiased">
    <HeaderBar />

    <main className="container mx-auto max-w-screen-xl pt-12 pb-16">
      {children}
    </main>
  </div>
);

export default Layout;
