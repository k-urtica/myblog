import { graphql } from 'gatsby';
import PageNation from '../components/PageNation';
import PostCardList from '../components/PostCardList';

import SEO from '../components/Seo';
import Sidebar from '../components/Sidebar/SideBar';
import Layout from '../layouts/Layout';

type Props = {
  data: Queries.AllPostsQuery;
  pageContext: {
    nextPagePath: string;
    previousPagePath: string;
  };
};

const IndexPage = ({ data, pageContext }: Props) => {
  return (
    <>
      <SEO titleTemplate={data.site?.siteMetadata?.title as string} />

      <Layout>
        <div className="pt-10">
          <div className="grid gap-6 md:grid-cols-12">
            <div className="col-span-12 md:col-span-8 xl:col-span-9">
              <div className="md:px-6 xl:px-9">
                <PostCardList posts={data} />

                <div className="mt-4">
                  <PageNation
                    nextPage={pageContext.nextPagePath}
                    prevPage={pageContext.previousPagePath}
                  />
                </div>
              </div>
            </div>

            <div className="col-span-12 md:col-span-4 xl:col-span-3">
              <Sidebar />
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
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
