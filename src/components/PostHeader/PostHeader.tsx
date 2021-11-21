import { mdiCalendarBlank, mdiRefresh } from '@mdi/js';
import Icon from '@mdi/react';
import * as React from 'react';
import 'twin.macro';
import tw from 'twin.macro';

import { formatDate, getPathByCategory } from '../../utils/helpers';
import AppLink from '../AppLink';

const PostHeader: React.FC<Props> = ({ frontMatter }) => {
  const { title, date, updatedAt, category, summary } = frontMatter;

  return (
    <PostHeaderWrapper>
      <div tw="font-bold mb-2">
        <AppLink to={getPathByCategory(category)}>{category}</AppLink>
      </div>

      <PostTitle>{title}</PostTitle>

      <div tw="text-sm text-gray-600 mb-3">{summary}</div>

      <PostMeta>
        <div>
          <Icon
            path={mdiCalendarBlank}
            size={0.7}
            tw="inline-block mr-1 align-text-bottom"
          />
          <time dateTime={date}>{formatDate(date as string)}</time>
        </div>
        <div>
          {updatedAt && updatedAt.toString() !== 'Invalid date' && (
            <>
              <Icon
                path={mdiRefresh}
                size={0.7}
                tw="inline-block mr-1 align-text-bottom"
              />
              <time dateTime={updatedAt}>{formatDate(updatedAt)}</time>
            </>
          )}
        </div>
      </PostMeta>
    </PostHeaderWrapper>
  );
};

const PostHeaderWrapper = tw.div`
  px-3 py-4 sm:(px-6 rounded-2xl) bg-alabaster bg-opacity-90
`;

const PostTitle = tw.h1`
  font-bold text-2xl sm:text-3xl lg:text-4xl mb-6
`;

const PostMeta = tw.div`
  grid grid-flow-col auto-cols-max gap-x-4 justify-center text-sm text-gray-600
`;

type Props = {
  frontMatter: Pick<
    GatsbyTypes.MarkdownRemarkFrontmatter,
    'title' | 'date' | 'updatedAt' | 'category' | 'summary'
  >;
};

export default PostHeader;
