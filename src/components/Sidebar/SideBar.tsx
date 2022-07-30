import { StaticImage } from 'gatsby-plugin-image';

const Sidebar = () => {
  return (
    <aside>
      <div className="rounded-xl bg-gradient-to-tl from-gray-700/60 to-gray-800/40 p-5">
        <div className="text-center">
          <div className="avatar">
            <div className="w-24 rounded-full ring ring-indigo-400/80 ring-offset-2">
              <StaticImage
                src="../../images/avatar.png"
                alt="avatar"
                className=""
              />
            </div>
          </div>
        </div>

        <div className="mt-4">
          <div className="text-center text-2xl font-bold text-emerald-300">
            <span className="border-b-2">K</span>
          </div>
          <p className="mt-5 text-sm text-gray-300/90">
            フロントエンド／バックエンドエンジニア。個人開発ではおもにVue.js、NuxtJSをメインに使っています。
          </p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;