import {
  HatenaShareButton,
  HatenaIcon,
  TwitterShareButton,
  TwitterIcon,
  FacebookShareButton,
  FacebookIcon,
} from 'react-share';

type Props = {
  url: string;
  className?: string;
};

const ShareLinks = ({ url, className }: Props) => {
  const size = 32;
  return (
    <div className={className}>
      <div className="flex justify-center gap-3">
        <TwitterShareButton url={url} className="">
          <TwitterIcon size={size} round />
        </TwitterShareButton>
        <FacebookShareButton url={url} className="">
          <FacebookIcon size={size} round />
        </FacebookShareButton>
        <HatenaShareButton url={url} className="">
          <HatenaIcon size={size} round />
        </HatenaShareButton>
      </div>
    </div>
  );
};

export default ShareLinks;
