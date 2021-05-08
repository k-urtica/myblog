/* eslint-disable @typescript-eslint/no-var-requires */
const dayjs = require('dayjs');
dayjs.extend(require('dayjs/plugin/utc'));
const path = require('path');
const kebabCase = require('lodash.kebabcase');

exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === `MarkdownRemark`) {
    const { date, slug } = node.frontmatter;
    createNodeField({
      node,
      name: `postPath`,
      value: `/post/${dayjs.utc(date).format('YYYY-MM-DD')}${slug}/`,
    });
  }
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const results = await graphql(`
    {
      allMarkdownRemark(
        limit: 2000
        sort: { fields: frontmatter___date, order: DESC }
      ) {
        edges {
          node {
            fields {
              postPath
            }
            id
            frontmatter {
              category
              tags
            }
          }
          next {
            fields {
              postPath
            }
            frontmatter {
              title
            }
          }
          previous {
            frontmatter {
              title
            }
            fields {
              postPath
            }
          }
        }
      }
      categoryGroup: allMarkdownRemark(limit: 2000) {
        group(field: frontmatter___category) {
          fieldValue
        }
      }
      tagsGroup: allMarkdownRemark(limit: 2000) {
        group(field: frontmatter___tags) {
          fieldValue
        }
      }
    }
  `);

  if (results.errors) {
    console.error(results.errors);
    throw new Error(results.errors);
  }

  const posts = results.data.allMarkdownRemark.edges;

  /* Create Post detail pages */
  posts.forEach(({ node, next, previous }) => {
    const postPath = node.fields.postPath;

    createPage({
      path: postPath,
      component: path.resolve(`./src/templates/PostTemplate.tsx`),
      context: {
        // Data passed to context is available in page queries as GraphQL variables.
        id: node.id,
        next,
        previous,
      },
    });
  });

  const categories = results.data.categoryGroup.group;

  /* Make Category pages */
  categories.forEach((category) => {
    createPage({
      path: `/category/${kebabCase(category.fieldValue)}/`,
      component: path.resolve(`./src/templates/CategoryTemplate.tsx`),
      context: {
        category: category.fieldValue,
      },
    });
  });

  const tags = results.data.tagsGroup.group;

  /* Make Tag pages */
  tags.forEach((tag) => {
    createPage({
      path: `/tag/${kebabCase(tag.fieldValue)}/`,
      component: path.resolve(`./src/templates/TagTemplate.tsx`),
      context: {
        tag: tag.fieldValue,
      },
    });
  });
};
