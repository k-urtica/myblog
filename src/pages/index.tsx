import { graphql, PageProps } from 'gatsby';
import * as React from 'react';
import 'twin.macro';

import HeroHeader from '../components/HeroHeader';
import PostCardWrapper from '../components/PostCardWrapper';
import SEO from '../components/Seo';
import Wrapper from '../components/Wrapper';
import Layout from '../layouts/Layout';

const Home: React.FC<PageProps<GatsbyTypes.AllPostsQuery>> = ({ data }) => {
  return (
    <>
      <SEO titleTemplate={data.site?.siteMetadata?.title} />

      <Layout>
        <Wrapper tw="sm:mt-8 mb-10">
          <HeroHeader />
        </Wrapper>

        <Wrapper tw="container mx-auto mb-28 px-4">
          <PostCardWrapper allMarkdownRemark={data.allMarkdownRemark} />
        </Wrapper>
      </Layout>
    </>
  );
};

export const query = graphql`
  query AllPosts {
    allMarkdownRemark(sort: { fields: frontmatter___date, order: DESC }) {
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

export default Home;
