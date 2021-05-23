import * as React from 'react';
import AdSense from 'react-adsense';

const Ads: React.FC<Props> = ({ className }) => {
  return (
    <>
      {process.env.GATSBY_GOOGLE_ADS_ID ? (
        <AdSense.Google
          client={process.env.GATSBY_GOOGLE_ADS_ID}
          slot="5168605319"
          layout="in-article"
          responsive="false"
          className={className}
        />
      ) : (
        ''
      )}
    </>
  );
};

type Props = {
  className?: string;
};

export default Ads;
