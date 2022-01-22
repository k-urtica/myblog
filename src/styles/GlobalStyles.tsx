import { Global, css } from '@emotion/react';
import * as React from 'react';
import tw, { GlobalStyles as BaseStyles } from 'twin.macro';

const customStyles = css`
  body {
    ${tw`antialiased`};
    ${tw`font-body`};
    color: #334155;
    background-image: linear-gradient(
      45deg,
      rgb(47, 38, 96) 0%,
      rgb(47, 38, 96) 1%,
      rgb(80, 63, 103) 1%,
      rgb(80, 63, 103) 53%,
      rgb(113, 87, 110) 53%,
      rgb(113, 87, 110) 57%,
      rgb(146, 112, 116) 57%,
      rgb(146, 112, 116) 69%,
      rgb(179, 136, 123) 69%,
      rgb(179, 136, 123) 75%,
      rgb(212, 161, 130) 75%,
      rgb(212, 161, 130) 100%
    );
  }
  a {
    color: #2563eb;
    &:hover {
      color: #1e40af;
    }
  }
`;

const GlobalStyles: React.FC = () => (
  <>
    <BaseStyles />
    <Global styles={customStyles} />
  </>
);

export default GlobalStyles;
