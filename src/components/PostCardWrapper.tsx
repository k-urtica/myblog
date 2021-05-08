import * as React from 'react';
import 'twin.macro';

import PostCard from './PostCard';

const PostCardWrapper: React.FC<
  Pick<GatsbyTypes.AllPostsQuery, 'allMarkdownRemark'>
> = ({ allMarkdownRemark }) => {
  const posts = allMarkdownRemark.edges;

  return (
    <div>
      <div tw="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-10">
        {posts &&
          posts.map((val, index) => {
            const frontMatter = val.node.frontmatter;
            return (
              <PostCard
                key={index}
                title={frontMatter?.title as string}
                summary={frontMatter?.summary as string}
                date={frontMatter?.date as string}
                path={val.node.fields?.postPath as string}
                category={frontMatter?.category as string}
                tags={frontMatter?.tags as Array<string>}
                image={
                  val.node.frontmatter?.cover
                    ?.childImageSharp as GatsbyTypes.ImageSharp
                }
              />
            );
          })}
      </div>
    </div>
  );
};

export default PostCardWrapper;
