import * as React from 'react';
import {
  HatenaShareButton,
  HatenaIcon,
  TwitterShareButton,
  TwitterIcon,
  FacebookShareButton,
  FacebookIcon,
  PocketShareButton,
  PocketIcon,
  LineShareButton,
  LineIcon,
} from 'react-share';
import tw from 'twin.macro';

const ShareLinks: React.FC<Props> = ({ url, className }) => {
  const size = 32;
  return (
    <div className={className}>
      <TwitterShareButton url={url} css={shareBtn}>
        <TwitterIcon size={size} round />
      </TwitterShareButton>
      <FacebookShareButton url={url} css={shareBtn}>
        <FacebookIcon size={size} round />
      </FacebookShareButton>
      <HatenaShareButton url={url} css={shareBtn}>
        <HatenaIcon size={size} round />
      </HatenaShareButton>
      <PocketShareButton url={url} css={shareBtn}>
        <PocketIcon round size={size} />
      </PocketShareButton>
      <LineShareButton url={url} css={shareBtn}>
        <LineIcon round size={size} />
      </LineShareButton>
    </div>
  );
};

const shareBtn = tw`
  mx-1.5 transform hover:scale-125 duration-500
`;

type Props = {
  url: string;
  className?: string;
};

export default ShareLinks;
