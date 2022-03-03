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
  const newProduct = new Product(req.body)

  const savedProduct = await newProduct.save()
  res.status(200).json(savedProduct)
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
  res.status(200).json("Product has been deleted...")
})
