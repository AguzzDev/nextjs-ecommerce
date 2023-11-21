import { NextSeo } from "next-seo";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <meta name="description" content="Busca lo que queres" />

        <meta
          property="og:url"
          content="https://ecommerce-app.agustin-ribotta.xyz/"
        />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Inicio" />
        <meta property="og:description" content="Busca lo que queres" />
        <meta property="og:image" content="" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:domain"
          content="ecommerce-app.agustin-ribotta.xyz"
        />
        <meta
          property="twitter:url"
          content="https://ecommerce-app.agustin-ribotta.xyz/"
        />
        <meta name="twitter:title" content="Inicio" />
        <meta name="twitter:description" content="Busca lo que queres" />
        <meta name="twitter:image" content="" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
