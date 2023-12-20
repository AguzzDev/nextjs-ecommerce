import { useState } from "react";

import { StepsHeader } from "./stepsHeader";
import { StepAside } from "./StepAside";
import { useCartSelector } from "store/selectors/useCartSelector";
import { useUser } from "context/User/UserProvider";
import { ClickEventType, StepInterface } from "interfaces";

const Info = ({ title, text }: { title: string; text: string }) => (
  <p>
    {title}: <span>{text}</span>
  </p>
);

export const Step1: React.FC<StepInterface> = ({
  navigation,
  stepId,
  setFormData,
  formData,
}) => {
  const [userInfo, setUserInfo] = useState<number>(1);

  const { user, loading } = useUser();
  const cart = useCartSelector();

  const toogleButton = (e: ClickEventType, n: number) => {
    e.preventDefault();
    setUserInfo(n);
    if (n === 1) {
      setFormData!((prev) => ({
        ...prev,
        sending: false,
      }));
    } else if (n === 2) {
      setFormData!((prev) => ({
        ...prev,
        address: user!.location.address,
        city: user!.location.city,
        country: user!.location.country,
        province: user!.location.province,
        postal_code: user!.location.postal_code,
        sending: true,
      }));
    }
  };

  return !loading ? (
    <section className="flex flex-col md:flex-row my-8 md:space-x-8">
      <div className="md:w-4/6 bg-white md:h-[80vh] p-5">
        <div className="relative">
          <div className="flex justify-between w-full px-10 ">
            <StepsHeader title="Dirección" num="1" value="step1" act={stepId} />
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
                <div className="grid grid-cols-2 mt-5">
                  <Info
                    title="Direccion"
                    text={`${user!.location.address} ${
                      user!.location.address_number
                    }`}
                  />
                  <Info title="Pais" text={user!.location.country} />
                  <Info title="Provincia" text={user!.location.province} />
                  <Info title="Ciudad" text={user!.location.city} />
                  <Info
                    title="Codigo postal"
                    text={user!.location.postal_code}
                  />
                </div>
              </>
            ) : userInfo === 3 ? (
              <>
                {/* <Formik
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
               
                    <button
                      className="w-full py-3 text-white bg-black"
                      type="submit"
                    >
                      Guardar
                    </button>
                  </Form>
                )}
              </Formik> */}
              </>
            ) : null}
          </div>
        </div>
      </div>

      <StepAside
        cart={cart}
        navigation={navigation}
        formData={formData}
        setFormData={setFormData}
        stepId={stepId}
      />
    </section>
  ) : null;
};
