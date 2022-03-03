import { asyncWrapper } from "../middleware/asyncWrapper.js"
import Order from "../models/Order.js"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_KEY)

export const createOrder = asyncWrapper(async (req, res) => {
  const body = req.body

  stripe.paymentIntents.create(
    {
      amount: body.cart.total * 100,
      payment_method: body.paymentMethod.id,
      currency: "usd",
      confirm: true,
    },
    (Serr, Sres) => {
      if (Serr) {
        res.status(500).json(false)
      } else {
        const newOrder = new Order({
          userId: req.user.id,
          products: body.cart.products.map((item) => {
            return {
              productId: item.productId,
              quantity: item.quantity,
              size: item.size,
              img: item.img,
              color: item.color,
              title: item.title,
            }
          }),
          userInfo: [
            {
              address: body.paymentMethod.billing_details.address.line1,
              city: body.paymentMethod.billing_details.address.city,
              state: body.paymentMethod.billing_details.address.state,
              postal_code: body.paymentMethod.billing_details.address.postal_code,
              country: body.paymentMethod.billing_details.address.country,
              cardType: body.paymentMethod.card.brand,
              lastNumbers: body.paymentMethod.card.last4,
            },
          ],
          createdAt: Date.now(),
          total: body.cart.total,
        })
        newOrder.save()
        res.status(200).json(true)
      }
    }
  )
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
  res.status(200).json("Order has been deleted...")
})

export const getUserOrder = asyncWrapper(async (req, res) => {
  const orders = await Order.find({ userId: req.params.userId })
  res.status(200).json(orders)
})

export const getAllOrder = asyncWrapper(async (req, res) => {
  const orders = await Order.find()
  res.status(200).json(orders)
})

export const getIncome = asyncWrapper(async (req, res) => {
  const date = new Date()
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1))
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1))

  const income = await Order.aggregate([
    { $match: { createdAt: { $gte: previousMonth } } },
    {
      $project: {
        month: { $month: "$createdAt" },
        sales: "$amount",
      },
    },
    {
      $group: {
        _id: "$month",
        total: { $sum: "$sales" },
      },
    },
  ])
  res.status(200).json(income)
})
