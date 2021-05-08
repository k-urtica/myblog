import { useLocation } from '@reach/router';
import { graphql, useStaticQuery } from 'gatsby';
import { getSrc } from 'gatsby-plugin-image';
import { GatsbySeo } from 'gatsby-plugin-next-seo';
import * as React from 'react';

const SEO: React.FC<Props> = ({ title, titleTemplate, description, image }) => {
  const { pathname } = useLocation();
  const { site } = useStaticQuery<GatsbyTypes.SEOQuery>(query);
  const pageUrl = `${site?.siteMetadata?.siteUrl}${pathname}`;

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const imageUrl = image
    ? `${site?.siteMetadata?.siteUrl}${getSrc(image)}`
    : undefined;

  return (
    <GatsbySeo
      title={title}
      titleTemplate={titleTemplate}
      description={description}
      canonical={`${site?.siteMetadata?.siteUrl}${pathname}`}
      openGraph={{
        url: pageUrl,
        title: title,
        description: description,
        images: imageUrl ? [{ url: imageUrl }] : undefined,
      }}
    />
  );
};

type Props = {
  title?: string;
  titleTemplate?: string;
  description?: string;
  image?: Pick<GatsbyTypes.ImageSharp, 'gatsbyImageData'>;
};

const query = graphql`
  query SEO {
    site {
      siteMetadata {
        siteUrl
      }
    }
  }
`;

export default SEO;
