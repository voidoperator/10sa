import type { GatsbyConfig } from 'gatsby';

const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const config: GatsbyConfig = {
  siteMetadata: {
    author: 'Julio Nunez',
    siteUrl: 'https://10sa.vercel.app/',
  },
  plugins: [
    'gatsby-plugin-image',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    'gatsby-plugin-postcss',
    // {
    //   resolve: 'gatsby-plugin-no-sourcemaps',
    // },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: '10 Steps Ahead',
        short_name: '10SA',
        start_url: '/',
        background_color: '#0f0f0f',
        icon: 'src/images/10sa-icon.png',
      },
    },
    {
      resolve: 'gatsby-source-contentful',
      options: {
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
      },
    },
  ],
};

export default config;
