import * as React from 'react';

const Wrapper: React.FC<Props> = ({ children, className }) => {
  return <div className={className}>{children}</div>;
};

type Props = {
  className?: string;
  children: React.ReactNode;
};

export default Wrapper;
