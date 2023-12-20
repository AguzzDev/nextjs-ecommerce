import { asyncWrapper } from "../middleware/asyncWrapper.js";
import Product from "../models/Product.js";
import User from "../models/User.js";
import { findUser } from "../utils/findUser.js";

export const getFavourite = asyncWrapper(async (req, res) => {
  try {
    const data = await User.findById(req.user.id).populate("favourite");

    res.status(200).json(data.favourite);
  } catch (error) {
    res.status(500);
  }
});

export const addFavourite = asyncWrapper(async (req, res) => {
  try {
    const body = req.body;

    const user = await User.findById(req.user.id);

    const duplicates = user.favourite.find((item) => {
      item.productId == body.id;
    });

    if (duplicates) {
      return res.status(404).json("Producto ya agregado");
    }

    const findProduct = await Product.findById(body.id);

    await User.findByIdAndUpdate(
      req.user.id,
      {
        $push: {
          favourite: body.id,
        },
      },
      { new: true }
    );

    res.status(200).json(findProduct);
  } catch (error) {
    res.status(500);
  }
});

export const deleteItem = asyncWrapper(async (req, res) => {
  try {
    const body = req.body;
    const { favourite } = await findUser(req.user.id);

    const favouriteFilter = favourite.filter((pId) => pId == body.id);

    if (favouriteFilter.length === 0) {
      return res.status(400).json("El producto no esta en favoritos");
    }

    await User.findByIdAndUpdate(
      req.user.id,
      {
        $pull: {
          favourite: body.id,
        },
      },
      { new: true }
    );
    res.status(200).json(req.body.id);
  } catch (error) {
    res.status(500);
  }
});

export const deleteFavourite = asyncWrapper(async (req, res) => {
  try {
    const data = await User.findOneAndUpdate(
      { _id: req.params.id },
      { favourite: [] },
      { new: true }
    );

    res.status(200).json(data);
  } catch (error) {
    res.status(500);
  }
});
