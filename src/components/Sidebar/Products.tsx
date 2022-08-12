import { StaticImage } from 'gatsby-plugin-image';
import AppLink from '../AppLink';
type Props = {
  className?: string;
};

const Products = ({ className }: Props) => {
  return (
    <div className={className}>
      <div className="rounded-xl bg-gradient-to-tl from-gray-700/60 to-gray-800/40 p-5">
        <AppLink to="https://web-toolbox.dev">
          <section className="text-center text-sm font-bold">
            <StaticImage
              src="../../images/web-toolbox.png"
              alt="Web ToolBox"
              className="transform rounded-lg"
            />

            <h5 className="mt-1 after:ml-1 after:content-['↗']">Web ToolBox</h5>
            <p className="mt-1">開発・運営中💚</p>
          </section>
        </AppLink>
      </div>
    </div>
  );
};

export default Products;
