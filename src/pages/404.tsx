import { StaticImage } from 'gatsby-plugin-image';
import * as React from 'react';
import 'twin.macro';

import AppLink from '../components/AppLink';
import SEO from '../components/Seo';
import Layout from '../layouts/Layout';

const Error404Page: React.FC = () => (
  <>
    <SEO title="404 Not Found..." />

    <Layout>
      <div tw="container mx-auto py-16">
        <div tw="text-center">
          <StaticImage src="../images/404.svg" alt="404 image" width={720} />
        </div>

        <div tw="text-center py-4">
          <h1 tw="text-xl font-bold mb-2">404 Not Found...</h1>
          <AppLink to="/">トップへ戻る</AppLink>
        </div>
      </div>
    </Layout>
  </>
);

export default Error404Page;
