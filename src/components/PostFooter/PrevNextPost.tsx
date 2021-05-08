import {
  mdiArrowLeftBoldCircleOutline,
  mdiArrowRightBoldCircleOutline,
} from '@mdi/js';
import Icon from '@mdi/react';
import * as React from 'react';
import 'twin.macro';
import tw from 'twin.macro';

import AppLink from '../AppLink';

const PrevNextPost: React.FC<Props> = ({ next, prev }) => {
  return (
    <div tw="grid grid-cols-1 sm:grid-cols-2 gap-x-16 gap-y-6">
      {prev && (
        <PostDataCard>
          <AppLink to={prev.fields?.postPath as string}>
            <div tw="flex">
              <div tw="w-1/6 flex content-center flex-wrap">
                <Icon
                  path={mdiArrowLeftBoldCircleOutline}
                  size={1.2}
                  tw="mx-auto"
                />
              </div>
              <div tw="w-5/6 text-sm">{prev.frontmatter?.title}</div>
            </div>
          </AppLink>
        </PostDataCard>
      )}
      {next && (
        <PostDataCard>
          <AppLink to={next.fields?.postPath as string}>
            <div tw="flex">
              <div tw="w-5/6 text-sm">{next.frontmatter?.title}</div>
              <div tw="w-1/6 flex content-center flex-wrap">
                <Icon
                  path={mdiArrowRightBoldCircleOutline}
                  size={1.2}
                  tw="mx-auto"
                />
              </div>
            </div>
          </AppLink>
        </PostDataCard>
      )}
    </div>
  );
};

const PostDataCard = tw.div`
  bg-purple-50 shadow p-3 rounded-2xl hover:shadow-2xl duration-500
`;

type Props = {
  next?: GatsbyTypes.Maybe<GatsbyTypes.MarkdownRemark>;
  prev?: GatsbyTypes.Maybe<GatsbyTypes.MarkdownRemark>;
};

export default PrevNextPost;
