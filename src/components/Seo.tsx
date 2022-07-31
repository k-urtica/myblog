import { useLocation } from '@reach/router';
import { graphql, useStaticQuery } from 'gatsby';
import { getSrc } from 'gatsby-plugin-image';
import { GatsbySeo } from 'gatsby-plugin-next-seo';
import * as React from 'react';

type Props = {
  title?: string;
  titleTemplate?: string;
  description?: string;
  image?: Queries.Maybe<Queries.ImageSharp>;
};

const SEO: React.FC<Props> = ({ title, titleTemplate, description, image }) => {
  const { pathname } = useLocation();
  const { site } = useStaticQuery<Queries.SEOQuery>(query);
  const pageUrl = `${site?.siteMetadata?.siteUrl}${pathname}`;

  const imageUrl = image
    ? `${site?.siteMetadata?.siteUrl}${getSrc(image.gatsbyImageData)}`
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
