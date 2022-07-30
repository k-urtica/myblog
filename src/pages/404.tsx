import { StaticImage } from 'gatsby-plugin-image';

import AppLink from '../components/AppLink';
import SEO from '../components/Seo';
import Layout from '../layouts/Layout';

const Error404Page = () => (
  <>
    <SEO title="404 Not Found..." />

    <Layout>
      <div className="mt-16">
        <div className="text-center">
          <StaticImage src="../images/404.svg" alt="404 image" width={720} />
        </div>

        <div className="py-6 text-center">
          <h1 className="mb-2 text-xl font-bold">404 Not Found...</h1>
          <AppLink to="/">トップへ戻る</AppLink>
        </div>
      </div>
    </Layout>
  </>
);

export default Error404Page;
