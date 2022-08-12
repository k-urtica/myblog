import { formatDate, getPathByTag } from '../utils/helpers';
import AppLink from './AppLink';

type Props = {
  frontmatter: Queries.MarkdownRemarkFrontmatter;
};

const PostHeader = ({ frontmatter }: Props) => {
  const { title, date, updatedAt, tags } = frontmatter;

  return (
    <>
      <h2 className="text-center text-xl font-bold text-gray-100 md:text-3xl">
        {title}
      </h2>

      <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 sm:gap-10">
        <div className="text-sm font-bold">
          <div className="text-center">Posted</div>
          <div className="mt-1 text-gray-200">
            <time dateTime={date as string}>{formatDate(date as string)}</time>
          </div>
        </div>
        {updatedAt !== 'Invalid date' && (
          <div className="text-sm font-bold">
            <div className="text-center">Updated</div>
            <div className="mt-1 text-gray-200">
              <time dateTime={updatedAt as string}>
                {formatDate(updatedAt as string)}
              </time>
            </div>
          </div>
        )}
        <div className="text-sm font-bold">
          <div className="text-center">Tags</div>
          <div className="mt-1 text-gray-200">
            <ul className="flex gap-3">
              {tags?.map((tag) => (
                <li key={tag}>
                  <AppLink
                    to={getPathByTag(tag)}
                    className="underline-offset-2 hover:underline"
                  >
                    {tag}
                  </AppLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostHeader;
