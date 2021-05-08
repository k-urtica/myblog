import * as React from 'react';
import 'twin.macro';

import SEO from '../components/Seo';
import Layout from '../layouts/Layout';

const AboutPage: React.FC = () => (
  <>
    <SEO title="プロフィール" />

    <Layout>
      <div tw="container mx-auto py-16">
        <div tw="text-center py-4">
          <h1 tw="text-xl font-bold mb-2">About Page</h1>
        </div>
      </div>
    </Layout>
  </>
);

export default AboutPage;
