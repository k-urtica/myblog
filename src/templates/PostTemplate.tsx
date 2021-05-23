import { graphql, PageProps } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import * as React from 'react';
import 'twin.macro';
import tw from 'twin.macro';

import Ads from '../components/Ads';
import AppLink from '../components/AppLink';
import PageWrapper from '../components/PageWrapper';
import PostAuthor from '../components/PostFooter/PostAuthor';
import PrevNextPost from '../components/PostFooter/PrevNextPost';
import PostHeader from '../components/PostHeader/PostHeader';
import PostAuthorSide from '../components/PostSideBar/PostAuthorSide';
import PostToc from '../components/PostSideBar/PostToc';
import SEO from '../components/Seo';
import ShareLinks from '../components/ShareLinks';
import Wrapper from '../components/Wrapper';
import Layout from '../layouts/Layout';
import '../styles/markdown.scss';
import { getPathByTag } from '../utils/helpers';

const PostTemplate: React.FC<
  PageProps<GatsbyTypes.BlogPostQuery, PageContext>
> = ({ data, pageContext }) => {
  const post = data.markdownRemark;
  const { next, previous } = pageContext;

  let pageUrl = '';
  if (data.site?.siteMetadata?.siteUrl && post?.fields) {
    pageUrl = ((data.site.siteMetadata.siteUrl as string) +
      post.fields.postPath) as string;
  }

  return (
    <>
      <SEO
        title={post?.frontmatter?.title}
        description={post?.frontmatter?.summary}
        image={post?.frontmatter?.cover?.childImageSharp}
      />

      <Layout>
        <PageWrapper>
          <article>
            {post?.frontmatter && (
              <>
                <Wrapper tw="mt-8 sm:mb-4">
                  <PostHeader frontMatter={post.frontmatter} />
                </Wrapper>

                {post.frontmatter.cover?.childImageSharp && (
                  <GatsbyImage
                    image={
                      post.frontmatter.cover.childImageSharp.gatsbyImageData
                    }
                    alt={post.frontmatter.title as string}
                    tw="sm:rounded-2xl mb-0 sm:mb-10 max-h-lg transform"
                  />
                )}
              </>
            )}

            <PostWrapper>
              <Section>
                <PostContent>
                  <div
                    className="markdown-body"
                    dangerouslySetInnerHTML={{ __html: post?.html as string }}
                  />

                  <ul tw="grid grid-flow-col auto-cols-max gap-3 mt-16">
                    {post?.frontmatter?.tags &&
                      post.frontmatter.tags.map((tag, index) => {
                        return (
                          <li key={index}>
                            <AppLink
                              to={getPathByTag(tag)}
                              tw="bg-purple-100 rounded-xl py-1 px-2 text-sm"
                            >
                              {tag}
                            </AppLink>
                          </li>
                        );
                      })}
                  </ul>
                </PostContent>

                <PostFooter>
                  <PostAuthor />

                  <ShareLinks url={pageUrl} tw="text-center mt-4 py-3" />

                  <Ads tw="my-3" />

                  <Wrapper tw="my-10 px-4 sm:px-0">
                    <PrevNextPost next={next} prev={previous} />
                  </Wrapper>
                </PostFooter>
              </Section>

              <SideContainer>
                <Wrapper tw="mb-6">
                  <PostAuthorSide />
                </Wrapper>
                {post?.headings && (
                  <Wrapper tw="sticky top-0.5">
                    <PostToc headings={post.headings} />
                  </Wrapper>
                )}
              </SideContainer>
            </PostWrapper>
          </article>
        </PageWrapper>
      </Layout>
    </>
  );
};

const PostWrapper = tw.div`
  grid grid-cols-1 lg:(grid-cols-12 gap-9) mb-10
`;

const Section = tw.section`
  lg:col-span-8 xl:col-span-9
`;

const PostContent = tw.div`
  py-4 px-3 sm:(rounded-2xl px-9) shadow bg-alabaster
`;

const PostFooter = tw.div`
  mt-6
`;

const SideContainer = tw.aside`
  hidden lg:(col-span-4 block) xl:col-span-3
`;

type PageContext = {
  next: GatsbyTypes.Maybe<GatsbyTypes.MarkdownRemark>;
  previous: GatsbyTypes.Maybe<GatsbyTypes.MarkdownRemark>;
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
