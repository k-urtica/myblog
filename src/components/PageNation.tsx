import AppLink from './AppLink';

type Props = {
  nextPage: string;
  prevPage: string;
};

const PageNation = ({ nextPage, prevPage }: Props) => {
  return (
    <div className="flex justify-between">
      <div>
        {prevPage && (
          <AppLink to={prevPage} className="btn btn-ghost">
            Prev
          </AppLink>
        )}
      </div>

      <div>
        {nextPage && (
          <AppLink to={nextPage} className="btn btn-ghost">
            Next
          </AppLink>
        )}
      </div>
    </div>
  );
};

export default PageNation;
