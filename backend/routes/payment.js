import mercadopago from "mercadopago";
import express from "express";
import { asyncWrapper } from "../middleware/asyncWrapper.js";

const router = express.Router();

mercadopago.configure({
  access_token:
    "TEST-7450930257596680-030718-bf01b06ae7e7e8f6d1cd1f4e98763145-257575176",
});

router.post(
  "/",
  asyncWrapper(async (req, res) => {
    const order = req.body.cart.products;
    const allQuantity = order.length;

    let preference = {
      items: [],
      back_urls: {
        success: `${process.env.CORS_ORIGIN}/success`,
        failure: `${process.env.CORS_ORIGIN}/failed`,
        pending: `${process.env.CORS_ORIGIN}/pending`,
      },
      auto_return: "approved",
    };

    preference.items.push({
      title: allQuantity === 1 ? order[0].title : "Productos",
      unit_price: req.body.total,
      quantity: 1,
    });

    const response = await mercadopago.preferences.create(preference);
    console.log({ response });
    const preferenceId = response.body.id;

    res.status(200).json(preferenceId);
  })
);

export default router;
