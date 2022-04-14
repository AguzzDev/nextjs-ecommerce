import mercadopago from "mercadopago"
import express from "express"
import { asyncWrapper } from "../middleware/asyncWrapper.js"

const router = express.Router()

mercadopago.configure({
  access_token:
    process.env.MERCADOPAGO_API_KEY,
})
router.post(
  "/",
  asyncWrapper(async (req, res) => {
    const order = req.body.cart.products
    const allQuantity = order.length

    let preference = {
      items: [],
      back_urls: {
        success: "http://localhost:3000/success",
        failure: "http://localhost:3000/success",
        pending: "http://localhost:3000/success",
      },
      auto_return: "approved",
    }

    preference.items.push({
      title: allQuantity === 1 ? order[0].title : "Productos",
      unit_price: req.body.total,
      quantity: 1,
    })

    const response = await mercadopago.preferences.create(preference)
    const preferenceId = response.body.id

    res.status(200).json(preferenceId)
  })
)

export default router
