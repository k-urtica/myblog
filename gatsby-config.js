const SITE_TITLE = `K note.dev`;
const SITE_URL = `https://knote.dev`;
const DESCRIPTION = `ソフトウェアエンジニア「K」の個人ブログ。個人開発で使うプログラミング等の技術を中心にアウトプットしていきます。`;

module.exports = {
  siteMetadata: {
    title: SITE_TITLE,
    siteUrl: SITE_URL,
    // twitterUrl: `https://twitter.com/k_urtica`,
    // gitHubUrl: `https://github.com/k-urtica`,
  },

  plugins: [
    {
      resolve: `gatsby-plugin-typescript`,
      options: {
        isTSX: true, // defaults to false
        jsxPragma: `jsx`, // defaults to "React"
        allExtensions: true, // defaults to false
      },
    },
    {
      resolve: `gatsby-plugin-next-seo`,
      options: {
        // Default meta. Use SEO components when overriding.
        title: SITE_TITLE,
        titleTemplate: `%s | ${SITE_TITLE}`,
        defaultTitle: SITE_TITLE,
        description: DESCRIPTION,
        language: `ja`, // html attr
        canonical: SITE_URL,
        htmlAttributes: {
          prefix: `og: https://ogp.me/ns#`,
        },
        openGraph: {
          type: `website`,
          locale: `ja_JP`,
          url: SITE_URL,
          site_name: SITE_TITLE,
          title: SITE_TITLE,
          description: DESCRIPTION,
          images: [{ url: `${SITE_URL}/ogp.png` }],
        },
        twitter: {
          site: `@k_urtica`,
          cardType: `summary_large_image`,
        },
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `posts`,
        path: `${__dirname}/content`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1000,
              quality: 80,
              withWebp: true,
            },
          },
          {
            resolve: `gatsby-remark-autolink-headers`,
          },
          {
            resolve: 'gatsby-remark-prismjs-title',
          },
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              showLineNumbers: false,
            },
          },
          {
            resolve: 'gatsby-remark-external-links',
            options: {
              target: '_blank',
              rel: 'nofollow noopener noreferrer',
            },
          },
          {
            resolve: `gatsby-remark-link-card`,
          },
          `@fec/remark-a11y-emoji/gatsby`,
        ],
      },
    },
    {
      resolve: `gatsby-plugin-typegen`,
    },
    `gatsby-plugin-sass`,
    `gatsby-plugin-emotion`,

    {
      resolve: `gatsby-plugin-image`,
      options: {
        quality: 80,
      },
    },
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: SITE_TITLE,
        short_name: SITE_TITLE,
        description: DESCRIPTION,
        start_url: `/`,
        background_color: `#fafafa`,
        theme_color: `#1e3a8a`,
        display: `standalone`,
        lang: `ja`,
        icon: `src/images/icon.png`,
      },
    },
    {
      resolve: `gatsby-plugin-robots-txt`,
    },
    {
      resolve: `gatsby-plugin-sitemap`,
    },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: ['G-W8WC213W4R'],
        pluginConfig: {
          head: true,
        },
      },
    },
  ],
};
