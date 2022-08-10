import { useLocation } from '@reach/router';
import AppLink from './AppLink';

const HeaderBar = () => {
  const location = useLocation();

  return (
    <header className="container navbar mx-auto max-w-screen-xl justify-between">
      <div className="">
        <AppLink to="/" className="text-lg">
          <h1 className="font-bold text-gray-100">K note.dev</h1>
        </AppLink>
      </div>

      {location.pathname !== '/' && (
        <div>
          <AppLink to="/" className="btn btn-ghost text-base normal-case">
            All Posts
          </AppLink>
        </div>
      )}
    </header>
  );
};

export default HeaderBar;
