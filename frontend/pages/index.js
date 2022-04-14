import axios from "axios"
import Layout from "components/shop/Layout"
import { Slider } from "components/shop/Slider/Slider"
import { useDispatchActions } from "hooks/useDispatchActions"
import { useSelector } from "react-redux"
import { getHistoryUser } from "store/actions/history"
import { API_URL } from "utils/urls"
import useSWR from "swr"
import { setHistory } from "lib/api"
import { useMemo, useState } from "react"

export default function Home() {
  const [historyList, setHistoryList] = useState(null)
  const { history } = useSelector((state) => state.history)

  const { data } = useSWR(`${API_URL}/products`)
  const products = data?.data?.data

  useMemo(() => {
    const allHistory = history[0]?.item.map((item) => item.historyId)
    if (allHistory) {
      setHistoryList(products?.filter((ph) => allHistory.includes(ph._id)))
    }
  }, [history])

  const toFilter = (category) => {
    return products?.filter((p) => p.categories[0] === category)
  }

  useDispatchActions(getHistoryUser())
  return (
    <Layout title="Inicio" props="relative px-0">
      <main className="py-10">
        <h4 className="mb-5 text-4xl font-bold">Nuestro catalogo</h4>

        <div className="flex flex-col space-y-2">
          <Slider products={toFilter("buzo")} title="Buzos" />
          <Slider products={toFilter("remera")} title="Remeras" />
          {historyList && (
            <Slider products={historyList} title="Ultimos productos vistos" />
          )}
        </div>
      </main>

      <div className="absolute -bottom-20 -left-20 h-[50vh] w-[10vw] bg-gray-200 bg-opacity-50 rounded-full"></div>
      <div className="absolute -bottom-52 right-20 h-[75vh] w-[25vw] bg-gray-200 bg-opacity-50 rounded-full"></div>
      <div className="absolute -bottom-52 left-80 h-[85vh] w-[25vw] bg-gray-200 bg-opacity-50 rounded-full"></div>
    </Layout>
  )
}

// export const getStaticProps = async () => {

//   return {
//     props: {
//       products: data,
//     },
//   }
// }
