import { Link } from 'gatsby';
import * as React from 'react';
import { ReactNode } from 'react';

const AppLink: React.FC<Props> = ({ to, children, className }) => {
  if (/^https?:\/\//.test(to)) {
    return (
      <a
        href={to}
        target="_blank"
        rel="nofollow noopener noreferrer"
        className={className}
      >
        {children}
      </a>
    );
  }
  return (
    <Link to={to} className={className}>
      {children}
    </Link>
  );
};

type Props = {
  to: string;
  children: ReactNode;
  className?: string;
};

export default AppLink;
