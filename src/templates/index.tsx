import { graphql, PageProps } from 'gatsby';
import * as React from 'react';
import 'twin.macro';

import HeroHeader from '../components/HeroHeader';
import PageNation from '../components/PageNation';
import PageWrapper from '../components/PageWrapper';
import PostCardWrapper from '../components/PostCardWrapper';
import SEO from '../components/Seo';
import Wrapper from '../components/Wrapper';
import Layout from '../layouts/Layout';

const IndexPage: React.FC<
  PageProps<GatsbyTypes.AllPostsQuery, PageContext>
> = ({ data, pageContext }) => {
  const { nextPagePath, previousPagePath } = pageContext;

  return (
    <>
      <SEO titleTemplate={data.site?.siteMetadata?.title} />

      <Layout>
        <PageWrapper>
          <Wrapper tw="sm:mt-8 mb-10">
            <HeroHeader />
          </Wrapper>

          <Wrapper tw="px-4 sm:px-0 mb-10">
            <PostCardWrapper allMarkdownRemark={data.allMarkdownRemark} />

            <PageNation
              nextPagePath={nextPagePath}
              prevPagePath={previousPagePath}
              tw="mt-14 py-4 text-center"
            />
          </Wrapper>
        </PageWrapper>
      </Layout>
    </>
  );
};

type PageContext = {
  nextPagePath: string;
  previousPagePath: string;
};

export const query = graphql`
  query AllPosts($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: { fields: frontmatter___date, order: DESC }
      skip: $skip
      limit: $limit
    ) {
      edges {
        node {
          frontmatter {
            title
            date(formatString: "YYYY-MM-DDTHH:mm+09:00")
            summary
            category
            tags
            cover {
              childImageSharp {
                gatsbyImageData(layout: CONSTRAINED)
              }
            }
          }
          fields {
            postPath
          }
        }
      }
    }
    site {
      siteMetadata {
        title
      }
    }
  }
`;

export default IndexPage;
