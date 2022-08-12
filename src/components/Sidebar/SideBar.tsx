import Author from './Author';
import Contact from './Contact';
import Products from './Products';

const Sidebar = () => {
  return (
    <aside className="mx-auto max-w-xs">
      <div className="rounded-xl bg-gradient-to-tl from-gray-700/60 to-gray-800/40 p-5">
        <Author />

        <Contact className="mt-7" />
      </div>

      <Products className="mt-5" />
    </aside>
  );
};

export default Sidebar;
