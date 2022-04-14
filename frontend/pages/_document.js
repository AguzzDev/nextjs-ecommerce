import { NextSeo } from "next-seo"
import { Html, Head, Main, NextScript } from "next/document"

export default function Document() {
  return (
    <Html>
      <Head>
        <NextSeo
          title="Ecommerce | En construccion"
          description="Busca lo que queres"
          canonical="https://nextjs-ecommerce-aguzzdev.vercel.app"
          openGraph={{
            url: "https://nextjs-ecommerce-aguzzdev.vercel.app",
            title: "Ecommerce",
            description: "Busca lo que quieres",
            site_name: "Ecommerce",
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
