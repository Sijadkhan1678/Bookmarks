import type { GatsbyConfig } from "gatsby"
import path from 'path'

const config: GatsbyConfig = {
  siteMetadata: {
    siteUrl: `https://www.yourdomain.tld`,
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: [

    `gatsby-plugin-material-ui`,
    `gatsby-plugin-image`,
    `gatsby-transformer-sharp`,
     `gatsby-background-image`,
    // `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        // Defaults used for gatsbyImageData and StaticImage
        defaults: {},
        // Set to none to allow builds to continue on image errors
        failOn: `none`,
        // deprecated options and their defaults:
        base64Width: 20,
        forceBase64Format: `jpg`, // valid formats: png,jpg,webp
        useMozJpeg: process.env.GATSBY_JPEG_ENCODER === `MOZJPEG`,
        stripMetadata: true,
        defaultQuality: 50,
      }
    },
    {
    
      resolve:`gatsby-source-filesystem`,

      options: {
      
        name: `images`,
        path: path.join(__dirname,`src`,`images`)
      }
    },
      

  
  
  ],
}

export default config
