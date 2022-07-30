import { GatsbyImage } from 'gatsby-plugin-image';
import { formatDate } from '../utils/helpers';
import AppLink from './AppLink';

type Props = {
  item: GatsbyTypes.MarkdownRemarkFrontmatter;
  path: string;
};

const PostCard = ({ item, path }: Props) => {
  const { title, summary, cover, date } = item;

  return (
    <AppLink to={path}>
      <article className="borde flex flex-col overflow-hidden rounded-xl bg-gradient-to-l from-gray-800/80 to-gray-800/20 hover:bg-gray-800 md:flex-row">
        <GatsbyImage
          image={cover?.childImageSharp?.gatsbyImageData}
          alt={title as string}
          className="w-full flex-shrink-0 object-cover md:w-52 lg:w-64"
        />

        <div className="flex flex-grow flex-col  rounded-lg px-5 py-4">
          <div className="mb-1">
            <time dateTime={date} className="text-sm font-bold text-violet-400">
              {formatDate(date as string)}
            </time>
          </div>
          <h2 className="text-lg font-bold text-gray-100 md:text-xl">
            {title}
          </h2>
          <p className="mt-4 text-sm text-gray-400 line-clamp-3 md:line-clamp-2">
            {summary}
          </p>
        </div>
      </article>
    </AppLink>
  );
};

export default PostCard;
