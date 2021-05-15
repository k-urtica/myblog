import { graphql, PageProps } from 'gatsby';
import * as React from 'react';
import 'twin.macro';
import tw from 'twin.macro';

import AppLink from '../components/AppLink';
import PageWrapper from '../components/PageWrapper';
import SEO from '../components/Seo';
import Layout from '../layouts/Layout';
import { getPathByCategory } from '../utils/helpers';

const CategoryPage: React.FC<PageProps<GatsbyTypes.AllCategoryQuery>> = ({
  data,
}) => {
  const categories = data.allMarkdownRemark.group;

  return (
    <>
      <SEO title="ブログ記事カテゴリー一覧" />

      <Layout>
        <PageWrapper>
          <InnerWrapper>
            <HeaderContainer>
              <div tw="text-center">
                <h1 tw="inline-block text-2xl font-bold border-b-2 border-gray-700 px-4 pb-2">
                  Category List
                </h1>
              </div>
            </HeaderContainer>

            <div tw="grid grid-cols-2 xl:grid-cols-3 gap-6 py-8">
              {categories.map((item, index) => {
                return (
                  <AppLink key={index} to={getPathByCategory(item.fieldValue)}>
                    <CategoryCard>
                      <h2 tw="font-bold text-center md:text-xl mb-2">
                        {item.fieldValue}
                      </h2>
                      <span tw="block text-right text-xs">
                        記事数：{item.totalCount}
                      </span>
                    </CategoryCard>
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
  px-3 sm:px-0
`;

const HeaderContainer = tw.div`
  mt-10 pb-12
`;

const CategoryCard = tw.div`
  bg-alabaster p-4 shadow rounded hover:(shadow-2xl bg-yellow-50) duration-500
`;

export const pageQuery = graphql`
  query AllCategory {
    allMarkdownRemark(limit: 2000) {
      group(field: frontmatter___category) {
        fieldValue
        totalCount
      }
    }
  }
`;

export default CategoryPage;
