import { asyncWrapper } from "../middleware/asyncWrapper.js"
import Product from "../models/Product.js"

export const getAllProduct = asyncWrapper(async (req, res) => {
  const products = await Product.find({})

  res.status(200).json({ items: products.length, data: products })
})

export const getProduct = asyncWrapper(async (req, res) => {
  const product = await Product.findOne({ slug: req.params.id })
  res.status(200).json(product)
})

export const createProduct = asyncWrapper(async (req, res) => {
  const data = req.body

  const newProduct = await Product.create(
    data.map((d) => {
      return {
        title: d.title,
        desc: d.desc,
        categories: d.categories,
        size: typeof d.size === "string" ? d.size.split(" ") : d.size,
        color: d.color,
        price: d.price,
      }
    })
  )

  res.status(200).json(newProduct)
})

export const updateProduct = asyncWrapper(async (req, res) => {
  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    { new: true }
  )
  res.status(200).json(updatedProduct)
})

export const deleteProduct = asyncWrapper(async (req, res) => {
  await Product.findByIdAndDelete(req.params.id)
  res.status(200).json(req.params.id)
})

export const getProductsFilterCategory = asyncWrapper(async (req, res) => {
  const products = await Product.find({ categories: req.body.categoriess })

  const filter = products.filter((f) => f._id != req.body._id)

  res.status(200).json(filter)
})
