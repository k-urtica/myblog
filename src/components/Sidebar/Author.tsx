import { StaticImage } from 'gatsby-plugin-image';
import AppLink from '../AppLink';

type Props = {
  className?: string;
};

const Author = ({ className }: Props) => {
  return (
    <div className={className}>
      <div className="text-center">
        <StaticImage
          src="../../images/avatar.png"
          alt="avatar"
          width={110}
          className="transform rounded-full ring-4 ring-indigo-600/80 ring-offset-2"
        />
      </div>

      <div className="mt-4">
        <div className="text-center text-2xl font-bold text-emerald-300">
          <span className="border-b-2">K</span>
        </div>
        <div className="mt-5 text-sm text-gray-300/90">
          <p>
            フロントエンド／バックエンドエンジニア。個人開発ではおもにVue.js、NuxtJSをメインに使っています。
          </p>

          <p className="mt-3">プロフィール兼ポートフォリオサイト</p>
          <AppLink
            to="https://k-urtica.github.io/"
            className="mt-1 inline-block font-bold text-sky-200/90 before:content-['👉_'] after:ml-1 after:content-['↗']"
          >
            K - Web Developer
          </AppLink>
        </div>
      </div>
    </div>
  );
};

export default Author;
