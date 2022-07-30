import { graphql } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import PostFooter from '../components/PostFooter';
import PostHeader from '../components/PostHeader';

import SEO from '../components/Seo';
import Sidebar from '../components/Sidebar/SideBar';
import Layout from '../layouts/Layout';
import '../styles/markdown.scss';

type Props = {
  data: GatsbyTypes.BlogPostQuery;
  pageContext: {
    next: GatsbyTypes.Maybe<GatsbyTypes.MarkdownRemark>;
    previous: GatsbyTypes.Maybe<GatsbyTypes.MarkdownRemark>;
  };
};

const PostTemplate = ({ data, pageContext }: Props) => {
  const post = data.markdownRemark as GatsbyTypes.MarkdownRemark;
  const { frontmatter } = post;
  const { next, previous } = pageContext;

  return (
    <>
      <SEO
        title={frontmatter?.title}
        description={frontmatter?.summary}
        image={frontmatter?.cover?.childImageSharp}
      />

      <Layout>
        <article>
          <div className="pb-8">
            <PostHeader frontmatter={frontmatter!} />
          </div>

          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 md:col-span-8 xl:col-span-9">
              <div className="md:px-6 xl:px-9">
                {frontmatter?.cover?.childImageSharp && (
                  <GatsbyImage
                    image={frontmatter.cover.childImageSharp.gatsbyImageData}
                    alt={frontmatter?.title as string}
                    className="rounded-xl"
                  />
                )}
                <section className="pt-6">
                  <div
                    className="markdown-body"
                    dangerouslySetInnerHTML={{ __html: post.html as string }}
                  />
                </section>

                <div className="mt-14 border-t border-gray-400/50 py-6">
                  <PostFooter next={next} prev={previous} />
                </div>
              </div>
            </div>

            <div className="col-span-12 md:col-span-4 xl:col-span-3">
              <Sidebar />
            </div>
          </div>
        </article>
      </Layout>
    </>
  );
};

export const pageQuery = graphql`
  query BlogPost($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        summary
        cover {
          childImageSharp {
            gatsbyImageData(layout: FULL_WIDTH)
          }
        }
        category
        date(formatString: "YYYY-MM-DDTHH:mm+09:00")
        updatedAt(formatString: "YYYY-MM-DDTHH:mm+09:00")
        tags
      }
      headings {
        value
        depth
        id
      }
      fields {
        postPath
      }
    }
    site {
      siteMetadata {
        siteUrl
      }
    }
  }
`;

export default PostTemplate;
