import { asyncWrapper } from "../middleware/asyncWrapper.js";
import History from "../models/History.js";

export const setHistory = asyncWrapper(async (req, res) => {
  try {
    const id = req.body.id;

    const history = await History.findOne({ userId: req.user.id });

    if (!history) {
      await History.create({
        userId: req.user.id,
        products: id,
      });

      return res.sendStatus(200);
    }

    const filter = history.products.filter((pId) => pId == id);

    if (filter.length === 0) {
      await History.findOneAndUpdate(
        { userId: req.user.id },
        { $push: { products: id } },
        { new: true }
      );
    }

    res.sendStatus(200);
  } catch (error) {
    res.send(500)
  }
});

export const getHistoryUser = asyncWrapper(async (req, res) => {
  try {
    const history = await History.findOne({ userId: req.user.id }).populate(
      "products"
    );

    if (!history) {
      return res.status(200);
    }

    res.status(200).json(history.products.reverse());
  } catch (error) {
    res.send(500)
  }
});
