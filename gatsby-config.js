require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`
});

module.exports = {
  siteMetadata: {
    starter: "gatsby-starter-gcn",
    title: 'Yawdfood',
    description: 'Foodways digital repository',
    siteUrl: 'https://yawdfood.com',
    heroImage: './static/images/hero-image.jpg',
    image: '/images/share.jpg',
    menuLinks: [
      {
        name: 'Yawdfood',
        slug: '/',
        subtext: 'Food, Stories, and Culture'
      },
      {
        name: 'Search',
        slug: '/search/',
        subtext: ''
      },
      {
        name: 'Food',
        slug: '/food/',
        subtext: ''
      },
      {
        name: 'About',
        slug: '/about/',
        subtext: ''
      },
      {
        name: 'Contact',
        slug: '/contact/',
        subtext: ''
      },
    ],
    postsPerFirstPage: 7,
    postsPerPage: 6,
    basePath: '/',
  },
  plugins: [
    `gatsby-plugin-emotion`,
    'gatsby-plugin-theme-ui',
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-prismjs`,
          },
          `gatsby-remark-autolink-headers`,
          {
            resolve: `gatsby-remark-images-contentful`,
            options: {
              maxWidth: 650,
              backgroundColor: 'white',
              linkImagesToOriginal: false,
            },
          },
        ],
      },
    },
    `gatsby-plugin-catch-links`,
    {
      resolve: 'gatsby-source-contentful',
      options: {
        spaceId: `${process.env.SPACE_ID}`,
        accessToken: `${process.env.ACCESS_TOKEN}`
      }
    },
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: process.env.GOOGLE_ANALYTICS,
        head: true,
      },
    },
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'GCN',
        short_name: 'GCN',
        start_url: '/',
        background_color: '#ffffff',
        theme_color: '#ffffff',
        display: 'minimal-ui',
        icon: './static/images/favicon.png',
      },
    },
    'gatsby-plugin-offline',
    // {
    //   resolve: `gatsby-plugin-schema-snapshot`,
    //   options: {
    //     path: `./src/gatsby/schema/schema.gql`,
    //     update: process.env.GATSBY_UPDATE_SCHEMA_SNAPSHOT,
    //   },
    // },
    'gatsby-plugin-netlify',
  ],
}
