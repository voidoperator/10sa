import React from 'react';
import Head from 'next/head';

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
  let typeSafeMeta: Array<Meta>;
  if (meta instanceof Array) {
    typeSafeMeta = meta;
  } else {
    typeSafeMeta = [];
  }

  const pageTitle = subtitle ? ` || ${subtitle}` : '';

  return (
    <Head>
      <html lang={lang} />
      <title>{`10 Steps Ahead${pageTitle}`}</title>
      <meta name='description' content='10 Steps Ahead' />
      <meta property='og:title' content='10 Steps Ahead' />
      <meta property='og:description' content={`10 Steps Ahead${pageTitle}`} />
      <meta name='theme-color' content='#0f0f0f' />
      <meta property='og:type' content='website' />
      {typeSafeMeta.map((metaItem, index) => {
        return metaItem.name ? (
          <meta name={metaItem.name} content={metaItem.content} key={index} />
        ) : (
          <meta property={metaItem.property} content={metaItem.content} key={index} />
        );
      })}
    </Head>
  );
};

export default Seo;
