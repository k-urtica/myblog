import PropTypes from 'prop-types';
import * as React from 'react';
import 'twin.macro';

import Footer from '../components/Footer';
import HeaderBar from '../components/HeaderBar';
import GlobalStyles from '../styles/GlobalStyles';

const Layout: React.FC = ({ children }) => (
  <>
    <GlobalStyles />

    <div tw="flex flex-col min-h-screen">
      <HeaderBar />
      <main tw="flex-grow">{children}</main>
      <Footer />
    </div>
  </>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
