import { graphql } from 'gatsby';
import PostCardList from '../components/PostCardList';

import SEO from '../components/Seo';
import Sidebar from '../components/Sidebar/SideBar';
import Layout from '../layouts/Layout';

type Props = {
  data: GatsbyTypes.PostByCategoryQuery;
  pageContext: {
    category: string;
  };
};

const CategoryTemplate = ({ data, pageContext }: Props) => {
  const categoryName = pageContext.category;
  return (
    <>
      <SEO title={`Category: ${categoryName}`} />

      <Layout>
        <div className="grid gap-6 md:grid-cols-12">
          <div className="col-span-12 md:col-span-8 xl:col-span-9">
            <div className="md:px-6 xl:px-9">
              <div className="mb-10 text-center">
                <div className="mb-1 font-bold text-gray-300">Category</div>
                <h2 className="text-2xl font-bold text-gray-100">
                  {categoryName}
                </h2>
              </div>

              <PostCardList posts={data} />
            </div>
          </div>

          <div className="col-span-12 md:col-span-4 xl:col-span-3">
            <Sidebar />
          </div>
        </div>
      </Layout>
    </>
  );
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
            summary
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
