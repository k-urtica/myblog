import AppLink from './AppLink';

const HeaderBar = () => (
  <header className="container navbar mx-auto">
    <div className="flex-1">
      <AppLink to="/" className="text-lg">
        <h1 className="font-bold text-gray-100">K note.dev</h1>
      </AppLink>
    </div>

    {/* <div className="flex-none">
      <ul className="flex">
        <li>
          <AppLink to="/about/" className="btn btn-ghost text-base normal-case">
            Profil
          </AppLink>
        </li>
      </ul>
    </div> */}
  </header>
);

export default HeaderBar;
