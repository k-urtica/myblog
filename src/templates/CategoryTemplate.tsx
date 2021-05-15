import { mdiFolderOutline } from '@mdi/js';
import Icon from '@mdi/react';
import { graphql, PageProps } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import * as React from 'react';
import 'twin.macro';
import tw from 'twin.macro';

import AppLink from '../components/AppLink';
import PageWrapper from '../components/PageWrapper';
import SEO from '../components/Seo';
import Layout from '../layouts/Layout';
import { formatDate } from '../utils/helpers';

const CategoryTemplate: React.FC<
  PageProps<GatsbyTypes.PostByTagQuery, PageContext>
> = ({ data, pageContext }) => {
  const { edges, totalCount } = data.allMarkdownRemark;
  const categoryName = pageContext.category;
  return (
    <>
      <SEO title={`カテゴリ：${categoryName}`} />

      <Layout>
        <PageWrapper>
          <InnerWrapper>
            <HeaderContainer>
              <div tw="text-center">
                <span tw="inline-block text-2xl font-bold border-b-2 border-gray-700 px-4 pb-2">
                  Category
                </span>
              </div>

              <CategoryTitle>
                <Icon path={mdiFolderOutline} size={1.1} tw="inline mr-3" />
                {categoryName}
              </CategoryTitle>
              <h2 tw="text-lg text-gray-500">
                A collection of {totalCount} post
              </h2>
            </HeaderContainer>

            <div tw="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-6">
              {edges.map((tag, index) => {
                const fr = tag.node.frontmatter;
                return (
                  <AppLink key={index} to={tag.node.fields?.postPath as string}>
                    <CardWrapper>
                      <div tw="flex">
                        <div tw="w-1/3">
                          {fr?.cover?.childImageSharp?.gatsbyImageData && (
                            <GatsbyImage
                              image={fr.cover.childImageSharp.gatsbyImageData}
                              alt={fr.title as string}
                              tw="block"
                            />
                          )}
                        </div>

                        <div tw="w-2/3 px-2">
                          <div tw="flex flex-col h-full">
                            <h2 tw="text-sm lg:text-base">{fr?.title}</h2>
                            <div tw="mt-auto">
                              <time dateTime={fr?.date}>
                                <span tw="text-gray-500 text-xs">
                                  {formatDate(fr?.date as string)}
                                </span>
                              </time>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardWrapper>
                  </AppLink>
                );
              })}
            </div>
          </InnerWrapper>
        </PageWrapper>
      </Layout>
    </>
  );
};

const InnerWrapper = tw.div`
  px-3
`;

const HeaderContainer = tw.div`
  my-10 border-b border-gray-300
`;

const CategoryTitle = tw.h1`
  text-3xl sm:text-5xl font-bold mt-8 mb-3
`;

const CardWrapper = tw.div`
   w-full bg-alabaster rounded shadow hover:(shadow-2xl bg-yellow-50) duration-500 overflow-hidden p-3
`;

type PageContext = {
  category: string;
};

export const pageQuery = graphql`
  query PostByCategory($category: String) {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { category: { eq: $category } } }
    ) {
      totalCount
      edges {
        node {
          frontmatter {
            title
            date(formatString: "YYYY-MM-DDTHH:mm+09:00")
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
  }
`;

export default CategoryTemplate;
