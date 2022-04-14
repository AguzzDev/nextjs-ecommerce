import { Dialog, Transition } from "@headlessui/react"
import { UserIcon, XIcon } from "@heroicons/react/outline"
import { useState, Fragment, useContext } from "react"
import { Formik, Form } from "formik"
import { useDispatch } from "react-redux"
import { useRef } from "react"
import Link from "next/link"

import ModalContext from "context/Modal/ModalContext"
import { userRegister, userLogin } from "store/actions/auth"
import { IconXS } from "components/shop/Icons"
import { useMouseLeave } from "hooks/useMouseLeave"
import { FieldBox } from "components/shop/Fields/FieldBox"
import { validateLogin, validateRegister } from "utils/validate"
import { FieldAddress } from "components/shop/Fields/FieldAddress"

export const AuthModal = () => {
  const { isOpen, setIsOpen, openModal, closeModal } = useContext(ModalContext)
  const [screen, setScreen] = useState(false)

  const modalRef = useRef(null)

  const dispatch = useDispatch()

  const toggleScreen = () => {
    setScreen(!screen)
  }
  useMouseLeave(modalRef, setIsOpen)

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
                    <h1 className="text-3xl text-center">
                      Ingresa a tu cuenta
                    </h1>
                    <Formik
                      initialValues={{
                        email: "",
                        password: "",
                      }}
                      validationSchema={validateLogin}
                      onSubmit={async (values) => {
                        await dispatch(userLogin(values, setIsOpen))
                      }}
                    >
                      {({ handleChange, values, errors }) => (
                        <Form className="flex flex-col mt-5 space-y-3">
                          <FieldBox
                            type="email"
                            value={values.email}
                            handleChange={handleChange}
                            inputType="text"
                            placeholder="Email"
                          />
                          {errors.email && (
                            <div className="text-sm">{errors.email}</div>
                          )}
                          <FieldBox
                            type="password"
                            value={values.password}
                            handleChange={handleChange}
                            inputType="password"
                            placeholder="Contraseña"
                          />
                          {errors.password && (
                            <div className="text-sm">{errors.password}</div>
                          )}
                          <button
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
                        <h1 className="mr-2 text-gray-400">¿No sos miembro?</h1>
                        <button className="underline" onClick={toggleScreen}>
                          Unite
                        </button>
                      </div>
                      <Link href="/forget-password">
                        <a>Olvide mi contraseña</a>
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col w-full p-10">
                    <h1 className="text-3xl text-center">Crea una cuenta</h1>
                    <Formik
                      initialValues={{
                        username: "",
                        email: "",
                        address: "",
                        city: "",
                        country: "",
                        province: "",
                        postal_code: "",
                        password: "",
                      }}
                      validationSchema={validateRegister}
                      onSubmit={async (values) =>
                        await dispatch(userRegister(values, setIsOpen))
                      }
                    >
                      {({ handleChange, values, errors }) => (
                        <Form className="flex flex-col mt-5 space-y-3">
                          <FieldBox
                            type="username"
                            value={values.username}
                            handleChange={handleChange}
                            inputType="text"
                            placeholder="Nombre"
                          />
                          {errors.username && (
                            <div className="text-sm">{errors.username}</div>
                          )}
                          <FieldBox
                            type="email"
                            value={values.email}
                            handleChange={handleChange}
                            inputType="text"
                            placeholder="Email"
                          />
                          {errors.email && (
                            <div className="text-sm">{errors.email}</div>
                          )}

                          <FieldAddress
                            errors={errors}
                            values={values}
                            handleChange={handleChange}
                          />

                          <FieldBox
                            type="password"
                            value={values.password}
                            handleChange={handleChange}
                            inputType="password"
                            placeholder="Contraseña"
                          />
                          {errors.password && (
                            <div className="text-sm">{errors.password}</div>
                          )}
                          <button
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
  )
}
