/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

const siteMetadata = {
  title: `My Gatsby Blog`,
  description: `This is my coding blog.`,
};

module.exports = {
  siteMetadata,
  plugins: [
    `gatsby-plugin-theme-ui`,
    `gatsby-plugin-mdx`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content`,
        name: `content`,
      },
    },
  ],
};
