import * as React from 'react';
import 'twin.macro';

const PageWrapper: React.FC<Props> = ({ children }) => {
  return <div tw="container mx-auto px-0 sm:px-3 2xl:px-6">{children}</div>;
};

type Props = {
  children: React.ReactNode;
};

export default PageWrapper;
