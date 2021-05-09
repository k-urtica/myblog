import * as React from 'react';
import 'twin.macro';
import tw from 'twin.macro';

import AppLink from './AppLink';

const PageNation: React.FC<Props> = (props) => {
  const { nextPagePath, prevPagePath, className } = props;

  return (
    <div className={className}>
      {prevPagePath === '' ? (
        <DisableText>{'< Prev'}</DisableText>
      ) : (
        <ActiveLink to={prevPagePath}>{'< Prev'}</ActiveLink>
      )}

      {nextPagePath === '' ? (
        <DisableText>{'Next >'}</DisableText>
      ) : (
        <ActiveLink to={nextPagePath}>{'Next >'}</ActiveLink>
      )}
    </div>
  );
};

const DisableText = tw.span`
  mx-3 py-2 px-3 bg-blue-800 opacity-50 text-alabaster rounded-2xl font-bold
`;

const ActiveLink = tw(AppLink)`
  mx-3 py-2 px-3 bg-blue-800 text-alabaster hover:text-yellow-200 rounded-2xl font-bold
`;

type Props = {
  className?: string;
  nextPagePath: string;
  prevPagePath: string;
};

export default PageNation;
