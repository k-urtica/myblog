import { mdiTwitter, mdiGithub } from '@mdi/js';
import Icon from '@mdi/react';
import { StaticImage } from 'gatsby-plugin-image';
import * as React from 'react';
import 'twin.macro';
import tw from 'twin.macro';

import { config } from '../../../config';
import AppLink from '../AppLink';

const PostAuthorSide: React.FC = () => {
  return (
    <AuthorWrapper>
      <div tw="text-center mb-3">
        <StaticImage
          src="../../images/avatar.png"
          alt="avatar"
          width={130}
          tw="rounded-full ring-2 ring-green-400 border-opacity-75 -mt-8 transform"
        />
      </div>
      <div tw="text-center mb-3">
        <span tw="font-bold text-xl text-indigo-700">K</span>
      </div>
      <div tw="px-2 mb-2">
        <span tw="text-sm text-gray-600">
          バックエンドエンジニア。最近はフロントエンド方面もやったり。
          旅行好き(海外十数か国／国内色々)、お酒好き、プログラミング好き😆
        </span>
      </div>

      <div tw="flex justify-center">
        <AppLink to={config.snsLink.twitter} tw="mr-3">
          <Icon path={mdiTwitter} size={1} color="#1da1f2" />
        </AppLink>
        <AppLink to={config.snsLink.github}>
          <Icon path={mdiGithub} size={1} color="#333" />
        </AppLink>
      </div>
    </AuthorWrapper>
  );
};

const AuthorWrapper = tw.div`
  bg-alabaster py-4 px-3 rounded-2xl shadow
`;

export default PostAuthorSide;
