import { FieldAddress } from "components/Fields/FieldAddress";
import UserContext from "context/User/UserContext";
import { Form, Formik } from "formik";
import { useContext, useState } from "react";
import { useSelector } from "react-redux";
import { validateAddress } from "utils/validate";
import { StepsHeader } from "./stepsHeader";
import { StepAside } from "./StepAside";

export function Step1({ navigation, stepId, setFormData, formData }) {
  const [userInfo, setUserInfo] = useState(1);
  const [sending, setSending] = useState(0);
  const { user } = useContext(UserContext);
  const cart = useSelector((state) => state.cart);

  const toogleButton = (e, n) => {
    e.preventDefault();
    setUserInfo(n);
    if (n === 1) {
      setFormData({
        sending: false,
      });

      setSending(0);
    } else if (n === 2) {
      setFormData({
        address: user?.address,
        city: user?.city,
        country: user?.country,
        province: user?.province,
        postal_code: user?.postal_code,
        sending: true,
      });
      setSending(600);
    }
  };

  return (
    <>
      <section className="flex my-8 space-x-8">
        <div className="w-4/6 bg-white h-[80vh] p-5">
          <div className="relative">
            <div className="flex justify-between w-full px-10 ">
              <StepsHeader
                title="Dirección"
                num="1"
                value="step1"
                act={stepId}
              />
              <StepsHeader title="Pago" num="2" value="step2" act={stepId} />
              <StepsHeader title="¡Hecho!" num="3" value="step3" act={stepId} />
            </div>
          </div>
          <div>
            <div className="mt-5">
              <h1 className="mb-1 text-lg">Datos personales</h1>
              <div className="flex justify-between space-x-5">
                <button
                  onClick={(e) => toogleButton(e, 1)}
                  className={`${
                    userInfo === 1 && "bg-black w-full"
                  }py-3 px-5 border border-gray-300 rounded-md w-full`}
                >
                  <p className={`${userInfo === 1 && "text-white"}`}>
                    Retirar en el local
                  </p>
                </button>
                <button
                  onClick={(e) => toogleButton(e, 2)}
                  className={`${
                    userInfo === 2 && "bg-black w-full"
                  }py-3 px-5 border border-gray-300 rounded-md w-full`}
                >
                  <p className={`${userInfo === 2 && "text-white"}`}>
                    Usar mi direccion
                  </p>
                </button>
                <button
                  onClick={(e) => toogleButton(e, 3)}
                  className={`${
                    userInfo === 3 && "bg-black"
                  } py-3 px-5 border border-gray-300 rounded-md w-full`}
                >
                  <p className={`${userInfo === 3 && "text-white"}`}>
                    Usar otra direccion
                  </p>
                </button>
              </div>
            </div>
            <div>
              {userInfo === 2 ? (
                <>
                  <div className="flex flex-col mt-5 space-y-3">
                    <div className="px-5 py-2 border border-gray-300 rounded-md">
                      {user?.address}
                    </div>
                    <div className="flex space-x-5">
                      <div className="w-full px-5 py-2 border border-gray-300 rounded-md">
                        {user?.country}
                      </div>
                      <div className="w-full px-5 py-2 border border-gray-300 rounded-md">
                        {user?.province}
                      </div>
                    </div>
                    <div className="flex space-x-5">
                      <div className="w-full px-5 py-2 border border-gray-300 rounded-md">
                        {user?.city}
                      </div>
                      <div className="w-full px-5 py-2 border border-gray-300 rounded-md">
                        {user?.postal_code}
                      </div>
                    </div>
                  </div>
                </>
              ) : userInfo === 3 ? (
                <>
                  <Formik
                    initialValues={{
                      address: "",
                      city: "",
                      country: "",
                      province: "",
                      postal_code: "",
                    }}
                    validationSchema={validateAddress}
                    onSubmit={async (values) => {
                      await setFormData({
                        address: values?.address,
                        city: values?.city,
                        country: values?.country,
                        province: values?.province,
                        postal_code: values?.postal_code,
                        sending: true,
                      });
                      setSending(600);
                    }}
                  >
                    {({ handleChange, values, errors }) => (
                      <Form className="flex flex-col mt-5 h-[55vh] space-y-3">
                        <FieldAddress
                          handleChange={handleChange}
                          values={values}
                          errors={errors}
                        />
                        <button
                          className="w-full py-3 text-white bg-black"
                          type="submit"
                        >
                          Guardar
                        </button>
                      </Form>
                    )}
                  </Formik>
                </>
              ) : null}
            </div>
          </div>
        </div>

        <StepAside
          cart={cart}
          sending={sending}
          navigation={navigation}
          formData={formData}
          setFormData={setFormData}
          act={stepId}
        />
      </section>
    </>
  );
}
