import PostCard from './PostCard';

type Props = {
  posts: GatsbyTypes.AllPostsQuery | GatsbyTypes.PostByCategoryQuery;
};

const PostList = ({ posts }: Props) => {
  const { edges } = posts.allMarkdownRemark;

  return (
    <div className="flex flex-col gap-6">
      {edges.map((edge, i) => (
        <PostCard
          key={i}
          item={edge.node.frontmatter as GatsbyTypes.MarkdownRemarkFrontmatter}
          path={edge.node.fields?.postPath as string}
        />
      ))}
    </div>
  );
};

export default PostList;
