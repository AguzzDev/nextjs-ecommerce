import { asyncWrapper } from "../middleware/asyncWrapper.js"
import Order from "../models/Order.js"

export const createOrder = asyncWrapper(async (req, res) => {
  const body = req.body
  const orders = await Order.find({ paymentId: body.paymentId })

  if (orders.length === 0 && body.paymentId) {
    const newOrder = new Order({
      userId: req.user.id,
      paymentId: body.paymentId,
      products: body.cart.products.map((item) => {
        return {
          productId: item.productId,
          quantity: item.quantity,
          size: item.size,
          img: item.img[0],
          color: item.color,
          title: item.title,
        }
      }),
      userInfo: [
        {
          name:body.username,
          email:body.email,
          address: body.formData.address,
          city: body.formData.city,
          province: body.formData.province,
          postal_code: body.formData.postal_code,
          country: body.formData.country,
        },
      ],
      createdAt: Date.now(),
      sending: body.formData.sending,
      total: body.total,
    })
    const orderSaved = await newOrder.save()
    res.status(200).json(orderSaved)
  } else {
    res.status(500).json("Orden ya agregada")
  }
})

export const updateOrder = asyncWrapper(async (req, res) => {
  const updatedOrder = await Order.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    { new: true }
  )
  res.status(200).json(updatedOrder)
})

export const deleteOrder = asyncWrapper(async (req, res) => {
  await Order.findByIdAndDelete(req.params.id)
  res.status(200).json("Orden eliminada")
})

export const getUserOrder = asyncWrapper(async (req, res) => {
  const orders = await Order.find({ userId: req.user.id })
  res.status(200).json(orders)
})

export const getAllOrder = asyncWrapper(async (req, res) => {
  const orders = await Order.find()
  res.status(200).json(orders)
})


