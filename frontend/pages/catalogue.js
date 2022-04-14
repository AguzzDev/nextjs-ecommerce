import React, { useMemo, useEffect, useState } from "react"
import Fuse from "fuse.js"
import axios from "axios"

import { CatalogueNavbar } from "components/shop/CatalogueNavbar"
import Layout from "components/shop/Layout"
import { API_URL } from "utils/urls"
import { ProductsItems } from "components/shop/ProductsItems"
import useSWR from "swr"

export default function Catalogue() {
  const [data, setData] = useState([])
  const [dataFiltered, setDataFiltered] = useState([])
  const [sort, setSort] = useState()
  const [color, setColor] = useState()
  const [category, setCategory] = useState(null)
  const [size, setSize] = useState(null)

  const { data:products } = useSWR(`${API_URL}/products`)

  const removeFilters = async () => {
    setSort(null)
    setColor(null)
    setCategory(null)
    setSize(null)
    setDataFiltered([])
  }

  useEffect(() => {
    setData(products?.data?.data)
  }, [products])

  const fuse = new Fuse(data, {
    keys: ["color", "categories", "size"],
    shouldSort: true,
    matchAllTokens: true,
    findAllMatches: true,
    includeScore: true,
    threshold: 0,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 1,
  })
  useMemo(() => {
    if (sort === "asc") {
      const result = data.sort((a, b) => (a.price < b.price ? 1 : -1))
      setDataFiltered(result)
    }
    if (sort === "desc") {
      const result = data.sort((a, b) => (a.price > b.price ? 1 : -1))
      setDataFiltered(result)
    }
    if (category) {
      const result = fuse.search(category)
      setDataFiltered(result)
    }
    if (color) {
      const result = fuse.search(color)
      setDataFiltered(result)
    }
    if (size) {
      const result = fuse.search(size)
      setDataFiltered(result)
    }
  }, [sort, color, category, size])

  const toFilter = () => {
    return dataFiltered.length === 0 ? data : dataFiltered
  }

  return (
    <Layout title="Catalogo">
      <section className="flex flex-col md:flex-row">
        <div className="md:w-5/12 border-b md:border-b-0 border-x border-gray-300 mt-3 md:min-h-screen">
          <CatalogueNavbar
            setColor={setColor}
            setCategory={setCategory}
            setSize={setSize}
            setSort={setSort}
            color={color}
            sort={sort}
            category={category}
            size={size}
            removeFilters={removeFilters}
          />
        </div>

        <div className=" grid w-full py-3 md:pl-3 gap-5 grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 place-items-start">
          {!data ? (
            <h1>No products</h1>
          ) : (
            toFilter()?.map((product, i) => (
              <ProductsItems
                product={product}
                i={i}
                id="catalogue"
                dataFiltered={dataFiltered}
              />
            ))
          )}
        </div>
      </section>
    </Layout>
  )
}


