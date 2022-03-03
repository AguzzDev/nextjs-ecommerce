import { asyncWrapper } from "../middleware/asyncWrapper.js"
import User from "../models/User.js"

export const getFavourite = asyncWrapper(async (req, res) => {
  const data = await User.findOne({ _id: req.params.id })
  res.status(200).json(data.favourite)
})

export const addFavourite = asyncWrapper(async (req, res) => {
  const body = req.body

  User.findOne({ _id: req.user.id }, (_, userInfo) => {
    let duplicate = false
    userInfo.favourite.forEach((item) => {
      if (item.productId == body.product._id) {
        duplicate = true
      }
    })

    if (duplicate) {
      return res.status(404).json({ message: "product already added" })
    } else {
      User.findOneAndUpdate(
        { _id: req.user.id },
        {
          $push: {
            favourite: {
              productId: body.product._id,
              title: body.product.title,
              img: body.product.img,
              slug: body.product.slug,
              price: body.product.price,
              createdAt: Date.now(),
            },
          },
        },
        { new: true },
        (err, userInfo) => {
          if (err) return res.json(err)
          res.status(200).json(userInfo.favourite)
        }
      )
    }
  })
})

export const deleteItem = asyncWrapper(async (req, res) => {
  const { favourite } = await User.findOne({ _id: req.params.id })
  const favouriteFilter = favourite.filter(
    (pId) => pId.productId !== req.body.productId
  )

  await User.findOneAndUpdate(
    { _id: req.params.id },
    { favourite: favouriteFilter },
    { new: true }
  )
  res.status(200).json(req.body.productId)
})

export const deleteFavourite = asyncWrapper(async (req, res) => {
  const data = await User.findOneAndUpdate(
    { _id: req.params.id },
    { favourite: [] },
    { new: true }
  )

  res.status(200).json(data)
})
