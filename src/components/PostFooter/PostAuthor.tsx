import { mdiTwitter, mdiGithub } from '@mdi/js';
import Icon from '@mdi/react';
import { StaticImage } from 'gatsby-plugin-image';
import * as React from 'react';
import 'twin.macro';
import tw from 'twin.macro';

import { config } from '../../../config';
import AppLink from '../AppLink';

const PostAuthor: React.FC = () => {
  return (
    <AuthorWrapper>
      <div tw="flex mx-auto">
        <div tw="w-1/3 text-center">
          <StaticImage
            src="../../images/avatar.png"
            alt="avatar"
            tw="rounded-full ring-2 ring-green-400 border-opacity-75 my-1 w-24 sm:w-28"
          />
        </div>

        <div tw="w-2/3 px-2">
          <div tw="text-center mb-2">
            <span tw="font-bold text-xl text-indigo-700">K</span>
          </div>
          <div>
            <span tw="text-xs sm:text-sm text-gray-600">
              バックエンドエンジニア。最近はフロントエンド方面もやったり。
              旅行好き(海外十数か国／国内色々)、お酒好き、プログラミング好き😆
            </span>
          </div>

          <div tw="grid grid-flow-col auto-cols-max gap-x-4 justify-center mt-2">
            <AppLink to={config.snsLink.twitter}>
              <Icon path={mdiTwitter} size={1} color="#1da1f2" />
            </AppLink>
            <AppLink to={config.snsLink.github}>
              <Icon path={mdiGithub} size={1} color="#333" />
            </AppLink>
          </div>
        </div>
      </div>
    </AuthorWrapper>
  );
};

const AuthorWrapper = tw.div`
  bg-alabaster shadow py-4 px-3 sm:rounded-2xl
`;

export default PostAuthor;
