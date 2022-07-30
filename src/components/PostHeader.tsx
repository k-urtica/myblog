import { formatDate, getPathByCategory } from '../utils/helpers';
import AppLink from './AppLink';

type Props = {
  frontmatter: GatsbyTypes.MarkdownRemarkFrontmatter;
};

const PostHeader = ({ frontmatter }: Props) => {
  const { title, date, updatedAt, category } = frontmatter;

  return (
    <>
      <h2 className="text-center text-xl font-bold text-gray-100 md:text-3xl">
        {title}
      </h2>

      <div className="mt-6 flex justify-center gap-9">
        <div className="text-sm font-bold">
          <div>Posted</div>
          <div className="mt-1 text-gray-200">
            <time dateTime={date}>{formatDate(date as string)}</time>
          </div>
        </div>
        {updatedAt !== 'Invalid date' && (
          <div className="text-sm font-bold">
            <div>Updated</div>
            <div className="mt-1 text-gray-200">
              <time dateTime={updatedAt}>
                {formatDate(updatedAt as string)}
              </time>
            </div>
          </div>
        )}
        <div className="text-sm font-bold">
          <div>Category</div>
          <div className="mt-1 text-gray-200">
            <AppLink to={getPathByCategory(category)}>{category}</AppLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostHeader;
