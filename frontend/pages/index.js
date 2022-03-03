import Marquee from "react-fast-marquee"

import Layout from "components/Layout"

export default function Home() {
  const letter = new Array(15).fill("just do it")
  return (
    <Layout title="Nike Clon" props="relative overflow-hidden px-0">
      <main className="py-10">
        <h1 className="font-bold capitalize text-7xl">
          all the sneakers you want is here
        </h1>
      </main>

      <Marquee className="absolute opacity-0 md:opacity-100 -top-20 xl:top-0 md:-right-[20rem] xl:-right-[40rem] bg-black w-[5vw] text-3xl text-white transform rotate-[50deg]">
        <h1 className="uppercase">
          {letter.map((l) => (
            <span key={l} className="mr-5">{l}</span>
          ))}
        </h1>
      </Marquee>

      <div className="absolute -bottom-20 -left-20 h-[50vh] w-[10vw] bg-gray-200 bg-opacity-50 rounded-full"></div>
      <div className="absolute -bottom-52 right-20 h-[75vh] w-[25vw] bg-gray-200 bg-opacity-50 rounded-full"></div>
      <div className="absolute -bottom-52 left-80 h-[85vh] w-[25vw] bg-gray-200 bg-opacity-50 rounded-full"></div>
    </Layout>
  )
}
