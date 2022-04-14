import { asyncWrapper } from "../middleware/asyncWrapper.js"
import User from "../models/User.js"

export const getFavourite = asyncWrapper(async (req, res) => {
  const data = await User.findById(req.user.id)
  res.status(200).json(data.favourite)
})

export const addFavourite = asyncWrapper(async (req, res) => {
  const body = req.body

  User.findById(req.user.id, (_, userInfo) => {
    let duplicate = false

    userInfo.favourite.forEach((item) => {
      if (item.productId == body._id) {
        duplicate = true
      }
    })

    if (duplicate) {
      return res.status(404).json({ message: "product already added" })
    } else {
      User.findByIdAndUpdate(
        req.user.id,
        {
          $push: {
            favourite: {
              productId: body._id,
              title: body.title,
              img: body.img,
              slug: body.slug,
              price: body.price,
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
  const { favourite } = await User.findOne({ _id: req.user.id })
  const favouriteFilter = favourite.filter(
    (pId) => pId.productId !== req.body.productId
  )

  await User.findOneAndUpdate(
    { _id: req.user.id },
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
