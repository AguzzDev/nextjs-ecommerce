import { Dialog, Transition } from "@headlessui/react";
import { UserIcon, XIcon } from "@heroicons/react/outline";
import { useState, Fragment, useRef } from "react";
import { Formik, Form } from "formik";
import { useDispatch } from "react-redux";
import Link from "next/link";

import { userRegister, userLogin } from "store/actions/auth";
import { IconXS } from "components/Icons";
import { useMouseLeave } from "hooks/useMouseLeave";
import { FieldBox } from "components/Fields/FieldBox";
import { validateLogin, validateRegister } from "utils/validate";
import { SelectBox } from "components/Fields/selectBox";
import { useGeolocalization } from "hooks/useGeolocalization";
import { useModal } from "context/Modal/ModalProvider";

export const AuthModal = () => {
  const [screen, setScreen] = useState<boolean>(false);
  const [provinceId, setProvinceId] = useState<string>("");
  const { isOpen, setIsOpen, openModal, closeModal } = useModal();
  const { province, citys } = useGeolocalization(provinceId);

  const modalRef = useRef<HTMLDivElement | null>(null);

  const dispatch = useDispatch();

  const toggleScreen = () => {
    setScreen(!screen);
  };
  useMouseLeave(modalRef, setIsOpen);

  const filterProvinceId = (prov: string) => {
    const provinceFilter = province.filter((p) => p.nombre === prov);
    setProvinceId(provinceFilter[0]?.id);
  };

  return (
    <>
      <button onClick={openModal}>
        <IconXS Icon={UserIcon} />
      </button>

      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog
          className="fixed inset-0 flex"
          style={{ zIndex: 1000 }}
          as="div"
          open={isOpen}
          onClose={closeModal}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25 pointer-events-none" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-500 transform"
            enterFrom="translate-y-full"
            leave="transition ease-in-out duration-500 transform"
            leaveTo="translate-y-full"
          >
            <section className="relative grid w-full h-full place-content-center font-nike">
              <div className="bg-white" ref={modalRef}>
                <button
                  type="button"
                  className="flex items-center justify-center w-10 h-10 p-2 -mr-2 text-gray-400 bg-white rounded-md"
                  onClick={closeModal}
                >
                  <span className="sr-only">Close menu</span>
                  <IconXS Icon={XIcon} />
                </button>

                {!screen ? (
                  <div className="flex flex-col w-full p-10">
                    <h3 className="text-center">Ingresa a tu cuenta</h3>
                    <Formik
                      initialValues={{
                        email: "",
                        password: "",
                        err: "",
                      }}
                      validationSchema={validateLogin}
                      onSubmit={async (values, actions) => {
                        try {
                          await dispatch(userLogin(values, setIsOpen));

                          actions.setSubmitting(false);
                        } catch (error) {
                          const response = error as string;
                          actions.setErrors({ err: response });
                          actions.setSubmitting(false);
                        }
                      }}
                    >
                      {({ isSubmitting, errors }) => (
                        <Form className="flex flex-col mt-5 space-y-3">
                          <FieldBox
                            name="email"
                            type="text"
                            placeholder="Email"
                          />

                          <FieldBox
                            name="password"
                            type="password"
                            placeholder="Contraseña"
                          />

                          {errors.err ? (
                            <p className="text-xs text-red-500">{errors.err}</p>
                          ) : null}
                          <button
                            disabled={isSubmitting}
                            type="submit"
                            className="px-5 py-3 text-white uppercase bg-black rounded-md"
                          >
                            Iniciar Sesión
                          </button>
                        </Form>
                      )}
                    </Formik>
                    <div className="flex flex-col mt-1">
                      <div className="flex">
                        <p className="mr-2 text-gray-400">¿No sos miembro?</p>
                        <button className="underline" onClick={toggleScreen}>
                          Unite
                        </button>
                      </div>
                      <Link href="/forget-password">Olvide mi contraseña</Link>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col w-full p-10">
                    <h1 className="text-3xl text-center">Crea una cuenta</h1>
                    <Formik
                      initialValues={{
                        name: "",
                        surname: "",
                        email: "",
                        address: "",
                        address_number: 0,
                        city: "",
                        country: "",
                        province: "",
                        postal_code: 0,
                        password: "",
                        err: "",
                      }}
                      validationSchema={validateRegister}
                      onSubmit={async (values, actions) => {
                        try {
                          await dispatch(userRegister(values, setIsOpen));

                          actions.setSubmitting(false);
                        } catch (error) {
                          const response = error as string;
                          actions.setErrors({ err: response });
                          actions.setSubmitting(false);
                        }
                      }}
                    >
                      {({ values, isSubmitting, errors }) => (
                        <Form className="flex flex-col mt-5 space-y-3">
                          <FieldBox name="name" placeholder="Nombre" />
                          <FieldBox name="surname" placeholder="Apellido" />
                          <FieldBox
                            name="email"
                            type="text"
                            placeholder="Email"
                          />

                          <div className="flex justify-between space-x-3">
                            <FieldBox name="address" placeholder="Direccion" />
                            <FieldBox
                              name="address_number"
                              type="number"
                              placeholder="Numero"
                            />
                          </div>
                          <div className="flex justify-between space-x-3">
                            <SelectBox
                              name="country"
                              options={[
                                {
                                  id: 1,
                                  value: "Argentina",
                                  text: "Argentina",
                                },
                              ]}
                            />
                            <SelectBox
                              name="province"
                              onClick={() => {
                                filterProvinceId(values.province);
                              }}
                              options={province.map(({ id, nombre }) => ({
                                id,
                                value: nombre,
                                text: nombre,
                              }))}
                            />
                          </div>
                          <div className="flex justify-between space-x-3">
                            <SelectBox
                              name="city"
                              options={citys.map(({ id, nombre }) => ({
                                id,
                                value: nombre,
                                text: nombre,
                              }))}
                            />
                            <FieldBox
                              name="postal_code"
                              type="number"
                              placeholder="Codigo postal"
                            />
                          </div>

                          <FieldBox
                            name="password"
                            type="password"
                            placeholder="Contraseña"
                          />
                          {errors.err ? (
                            <p className="text-xs text-red-500">{errors.err}</p>
                          ) : null}
                          <button
                            disabled={isSubmitting}
                            type="submit"
                            className="px-5 py-3 text-white uppercase bg-black rounded-md"
                          >
                            Registrarse
                          </button>
                        </Form>
                      )}
                    </Formik>

                    <div className="flex mt-1">
                      <h1 className="mr-2 text-gray-400">¿Ya sos miembro?</h1>
                      <button className="underline" onClick={toggleScreen}>
                        Iniciar sesión
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </section>
          </Transition.Child>
        </Dialog>
      </Transition.Root>
    </>
  );
};
