import { asyncWrapper } from "../middleware/asyncWrapper.js"
import History from "../models/History.js"

export const setHistory = asyncWrapper(async (req, res) => {
  try {
    const id = req.body.id
    const prevHistory = await History.find({ userId: req.user.id })

    if (prevHistory.length > 0) {
      const filter = prevHistory
        .map((ph) =>
          ph.item.filter(({ historyId }) => (historyId == id ? true : false))
        )
        .join(" ")

      if (filter.length === 0) {
        const newHistory = await History.findOneAndUpdate(
          { userId: req.user.id },
          { $push: { item: { historyId: id } } },
          { new: true }
        )
        res.status(200).json(newHistory)
      }
    } else {
      const newHistory = await History.create({
        userId: req.user.id,
        item: [{ historyId: id }],
      })
      res.status(200).json(newHistory)
    }
  } catch (error) {
    console.log(error)
  }
})

export const getHistoryUser = asyncWrapper(async (req, res) => {
  try {
    const history = await History.find({ userId: req.user.id })

    res.status(200).json(history.reverse())
  } catch (error) {
    console.log(error)
  }
})
