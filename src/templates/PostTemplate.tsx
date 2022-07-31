import { graphql } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import PostFooter from '../components/PostFooter';
import PostHeader from '../components/PostHeader';

import SEO from '../components/Seo';
import Sidebar from '../components/Sidebar/SideBar';
import Layout from '../layouts/Layout';
import '../styles/markdown.scss';

type Props = {
  data: Queries.BlogPostQuery;
  pageContext: {
    next: Queries.MarkdownRemark;
    previous: Queries.MarkdownRemark;
  };
};

const PostTemplate = ({ data, pageContext }: Props) => {
  const post = data.markdownRemark as Queries.MarkdownRemark;
  const { frontmatter } = post;
  const { next, previous } = pageContext;
  const shareUrl = `${data?.site?.siteMetadata?.siteUrl}${post?.fields?.postPath}`;

  return (
    <>
      <SEO
        title={frontmatter?.title as string}
        description={frontmatter?.summary as string}
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
                  <PostFooter share={shareUrl} next={next} prev={previous} />
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
