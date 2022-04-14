import { asyncWrapper } from "../middleware/asyncWrapper.js"
import User from "../models/User.js"

export const getAllCart = asyncWrapper(async (req, res) => {
  const data = await User.find()
  res.status(200).json(data)
})

export const getCart = asyncWrapper(async (req, res) => {
  const data = await User.findById(req.user.id)

  res.status(200).json(data.cart)
})

export const createCart = asyncWrapper(async (req, res) => {
  const body = req.body.product

  User.findOne({ _id: req.user.id }, (_, userInfo) => {
    let duplicate = false

    userInfo.cart.forEach((item) => {
      if (item.productId == body.product._id) {
        duplicate = true
      }
    })

    if (duplicate) {
      return res.status(200).json("Ya en el carrito")
    } else {
      User.findOneAndUpdate(
        { _id: req.user.id },
        {
          $push: {
            cart: {
              productId: body.product._id,
              title: body.product.title,
              img: body.product.img,
              quantity: body.quantity,
              color: body.color,
              size: body.size,
              total: body.product.price * body.quantity,
            },
          },
        },
        { new: true },
        (err, userInfo) => {
          if (err) return res.json(err)
          res.status(200).json(userInfo.cart)
        }
      )
    }
  })
})

export const deleteItem = asyncWrapper(async (req, res) => {
  const { cart } = await User.findOne({ _id: req.user.id })
  const cartFilter = cart.filter((pId) => pId.productId !== req.body.productId)

  await User.findOneAndUpdate(
    { _id: req.user.id },
    { cart: cartFilter },
    { new: true }
  )
  res.status(200).json(req.body.productId)
})

export const deleteCart = asyncWrapper(async (req, res) => {
  const data = await User.findOneAndUpdate(
    { _id: req.user.id },
    { cart: [] },
    { new: true }
  )

  res.status(200).json(data)
})
