import React, { useState, useEffect } from "react";
import { useStep } from "react-hooks-helper";

import { Step1 } from "./Step1";
import { Step2 } from "./Step2";
import { AllStepsInterface } from "interfaces";

const steps: Array<{ id: string }> = [{ id: "step1" }, { id: "step2" }];

export const AllSteps = () => {
  const [formData, setFormData] = useState<AllStepsInterface>({
    address: "",
    city: "",
    country: "",
    province: "",
    postal_code: "",
    sending: false,
    sendingPrice: "",
    iva: "",
  });

  const getStepSaved = localStorage.getItem("step");

  const { step, navigation } = useStep({
    steps,
    initialStep: (getStepSaved === "step2" && 1) || 0,
  });

  const stepId = step.id;
  const props = { navigation, stepId, formData, setFormData };

  useEffect(() => {
    localStorage.setItem("step", stepId);
  }, [stepId]);

  switch (stepId) {
    case "step1":
      return <Step1 {...props} />;
    case "step2":
      return <Step2 {...props} />;
  }
};
