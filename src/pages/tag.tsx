import { graphql, PageProps } from 'gatsby';
import * as React from 'react';
import 'twin.macro';
import tw from 'twin.macro';

import AppLink from '../components/AppLink';
import SEO from '../components/Seo';
import Layout from '../layouts/Layout';
import { getPathByTag } from '../utils/helpers';

const TagPage: React.FC<PageProps<GatsbyTypes.AllTagQuery>> = ({ data }) => {
  const tags = data.allMarkdownRemark.group;

  return (
    <>
      <SEO title="ブログ記事タグ一覧" />

      <Layout>
        <MainWrapper>
          <HeaderContainer>
            <div tw="text-center">
              <h1 tw="inline-block text-2xl font-bold border-b-2 border-gray-700 px-4 pb-2">
                Tag List
              </h1>
            </div>
          </HeaderContainer>

          <div tw="grid grid-cols-2 xl:grid-cols-3 gap-6 py-8">
            {tags.map((item, index) => {
              return (
                <AppLink key={index} to={getPathByTag(item.fieldValue)}>
                  <TagCard>
                    <h2 tw="font-bold text-center md:text-xl mb-2">
                      {item.fieldValue}
                    </h2>
                    <span tw="block text-right text-xs">
                      記事数：{item.totalCount}
                    </span>
                  </TagCard>
                </AppLink>
              );
            })}
          </div>
        </MainWrapper>
      </Layout>
    </>
  );
};

const MainWrapper = tw.div`
  container mx-auto px-3 md:px-10
`;

const HeaderContainer = tw.div`
  mt-10 pb-12
`;

const TagCard = tw.div`
  bg-alabaster p-4 shadow rounded hover:(shadow-2xl bg-yellow-50) duration-500
`;

export const pageQuery = graphql`
  query AllTag {
    allMarkdownRemark(limit: 2000) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`;

export default TagPage;
