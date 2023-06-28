import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang='en'>
      <Head>
        <meta name='description' content='10 Steps Ahead' />
        <meta property='og:title' content='10 Steps Ahead' />
        <meta property='og:description' content='10 Steps Ahead' />
        <meta name='theme-color' content='#0f0f0f' />
        <meta property='og:type' content='website' />
        <link rel='manifest' href='/manifest.json' />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
