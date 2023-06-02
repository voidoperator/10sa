import * as React from 'react';
import { Helmet } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';

interface SeoProps {
  subtitle?: string;
  lang?: string;
  meta?: [];
}
interface Meta {
  property?: string;
  name?: string;
  content: string;
}

const Seo = ({ subtitle, lang = 'en', meta }: SeoProps) => {
  const { metadata } = useStaticQuery(
    graphql`
      query metadataQuery {
        metadata: contentfulSiteMetadata {
          title
          description
        }
      }
    `,
  );

  const title = metadata.title;
  const description = metadata.description;

  let typeSafeMeta: Array<Meta>;
  if (meta instanceof Array) {
    typeSafeMeta = meta;
  } else {
    typeSafeMeta = [];
  }

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={title ? `${title} || ${subtitle}` : '10 Steps Ahead || Lead Form'}
      meta={[
        {
          name: `description`,
          content: description,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: description,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        ...typeSafeMeta,
      ]}
    />
  );
};

export default Seo;
