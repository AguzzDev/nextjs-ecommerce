import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"

export const useDispatchActions = (action) => {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(action)
    setLoading(false)
  }, [])

  return { loading }
}
