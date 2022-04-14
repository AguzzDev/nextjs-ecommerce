import Head from "next/head"
import { useContext } from "react"

import Navbar from "components/dashboard/Navbar/Navbar"
import Sidebar from "components/dashboard/Navbar/Sidebar"
import SidebarContext from "context/Sidebar/SidebarContext"

export default function Layout({ props, children, title,main }) {
  const { active } = useContext(SidebarContext)

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <main className={`${main} flex w-full dashboard-body`}>
        <Sidebar />

        <section className={`${active ? "w-10/12" : "w-[93vw]"} `}>
          <Navbar />
          <section className={`${props} pb-5`}>{children}</section>
        </section>
      </main>
    </>
  )
}
