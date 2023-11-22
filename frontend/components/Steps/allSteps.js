import React, { useState } from "react"
import { useStep } from "react-hooks-helper"
import { Step1 } from "./Step1"
import { Step2 } from "./Step2"

const steps = [{ id: "step1" }, { id: "step2" }]

export const AllSteps = () => {
  const [formData, setFormData] = useState({
    address: "",
    city: "",
    country: "",
    province: "",
    postal_code: "",
    sending: false,
    sendingPrice: "",
    iva: "",
  })
  const { step, navigation } = useStep({
    steps,
    initialStep: 0,
  })
  const stepId = step.id
  const props = { navigation, stepId, formData, setFormData }

  switch (step.id) {
    case "step1":
      return <Step1 {...props} />
    case "step2":
      return <Step2 {...props} />
  }
}
