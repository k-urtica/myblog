import { graphql } from 'gatsby';
import PostCardList from '../components/PostCardList';

import SEO from '../components/Seo';
import Sidebar from '../components/Sidebar/SideBar';
import Layout from '../layouts/Layout';

type Props = {
  data: Queries.PostByTagQuery;
  pageContext: {
    tag: string;
  };
};

const TagTemplate = ({ data, pageContext }: Props) => {
  const tagName = pageContext.tag;
  return (
    <>
      <SEO title={`Tag: ${tagName}`} />

      <Layout>
        <div className="grid gap-6 md:grid-cols-12">
          <div className="col-span-12 md:col-span-8">
            <section className="pb10">
              <div className="mb-10 text-center">
                <div className="mb-1 font-bold text-gray-300">Tag</div>
                <h2 className="text-2xl font-bold text-gray-100">{tagName}</h2>
              </div>

              <PostCardList posts={data} />
            </section>
          </div>

          <div className="col-span-12 md:col-span-4">
            <Sidebar />
          </div>
        </div>
      </Layout>
    </>
  );
};

export const pageQuery = graphql`
  query PostByTag($tag: String) {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
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

export default TagTemplate;
