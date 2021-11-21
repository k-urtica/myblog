import { Global, css } from '@emotion/react';
import * as React from 'react';
import tw, { GlobalStyles as BaseStyles } from 'twin.macro';

const customStyles = css`
  body {
    ${tw`antialiased`};
    ${tw`font-body`};
    color: rgba(0, 0, 0, 0.82);
    background-image: linear-gradient(
        135deg,
        transparent 0%,
        transparent 20%,
        rgba(60, 61, 207, 0.6) 20%,
        rgba(60, 61, 207, 0.6) 57%,
        transparent 57%,
        transparent 64%,
        rgba(118, 125, 200, 0.6) 64%,
        rgba(118, 125, 200, 0.6) 100%
      ),
      linear-gradient(
        45deg,
        transparent 0%,
        transparent 55%,
        rgb(60, 61, 207) 55%,
        rgb(60, 61, 207) 65%,
        rgb(104, 109, 202) 65%,
        rgb(104, 109, 202) 86%,
        transparent 86%,
        transparent 91%,
        rgb(147, 157, 196) 91%,
        rgb(147, 157, 196) 100%
      ),
      linear-gradient(90deg, rgb(255, 255, 255), rgb(255, 255, 255));
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
