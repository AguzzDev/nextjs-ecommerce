import { Dialog, Transition } from "@headlessui/react"
import { UserIcon, XIcon } from "@heroicons/react/outline"
import { useState, Fragment, useContext } from "react"
import { Formik, Form, Field } from "formik"
import * as Yup from "yup"
import { useDispatch } from "react-redux"
import { useRef } from "react"

import LogoIcon from "public/logo"
import { IconXS } from "components/Icons"
import { userRegister, userLogin } from "store/actions/auth"
import ModalContext from "context/Modal/ModalContext"
import { useMouseLeave } from "hooks/useMouseLeave"

export const AuthModal = () => {
  const { isOpen, setIsOpen, openModal, closeModal } = useContext(ModalContext)
  const [screen, setScreen] = useState(false)
  const modalRef = useRef(null)

  const dispatch = useDispatch()

  const toggleScreen = () => {
    setScreen(!screen)
  }
  useMouseLeave(modalRef,setIsOpen)
  return (
    <>
      <button onClick={openModal}>
        <IconXS Icon={UserIcon} />
      </button>
      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog
          className="fixed inset-0 z-50 flex"
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
            <Dialog.Overlay className="pointer-events-none fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-500 transform"
            enterFrom="translate-y-full"
            leave="transition ease-in-out duration-500 transform"
            leaveTo="translate-y-full"
          >
            <section className="w-full h-full relative grid place-content-center">
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
                    <div className="mx-auto">
                      <LogoIcon />
                    </div>
                    <h1 className="text-3xl text-center">
                      TU CUENTA PARA TODO LO RELACIONADO CON NIKE
                    </h1>
                    <Formik
                      initialValues={{
                        email: "",
                        password: "",
                      }}
                      validationSchema={Yup.object({
                        password: Yup.string()
                          .min(8, "Min 8 characters")
                          .required("Required"),
                        email: Yup.string()
                          .email("Invalid email address")
                          .required("Required"),
                      })}
                      onSubmit={async (values) => {
                        await dispatch(userLogin(values))
                        setIsOpen(false)
                      }}
                    >
                      {({ handleChange, values, errors }) => (
                        <Form className="flex flex-col mt-5 space-y-3">
                          <Field
                            name="email"
                            type="email"
                            value={values.email}
                            onChange={handleChange}
                            className="w-full px-5 py-2 border border-gray-200 rounded-md"
                            placeholder="Email"
                          />
                          {errors.email && <div>{errors.email}</div>}
                          <Field
                            name="password"
                            type="password"
                            value={values.password}
                            onChange={handleChange}
                            className="w-full px-5 py-2 border border-gray-200 rounded-md"
                            placeholder="Contraseña"
                          />
                          {errors.password && <div>{errors.password}</div>}
                          <button
                            type="submit"
                            className="uppercase px-5 py-3 text-white bg-black rounded-md"
                          >
                            Iniciar Sesión
                          </button>
                        </Form>
                      )}
                    </Formik>
                    <div className="flex mt-1">
                      <h1 className="text-gray-400 mr-2">¿No sos miembro?</h1>
                      <button className="underline" onClick={toggleScreen}>
                        Unite
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col w-full p-10">
                    <div className="mx-auto">
                      <LogoIcon />
                    </div>
                    <h1 className="text-3xl text-center">
                      HACETE MIEMBRO DE NIKE
                    </h1>
                    <Formik
                      initialValues={{
                        username: "",
                        email: "",
                        password: "",
                      }}
                      validationSchema={Yup.object({
                        username: Yup.string().required("Required"),
                        password: Yup.string()
                          .min(8, "Min 8 characters")
                          .required("Required"),
                        email: Yup.string()
                          .email("Invalid email address")
                          .required("Required"),
                      })}
                      onSubmit={async (values) => {
                        await dispatch(userRegister(values))
                        setIsOpen(false)
                      }}
                    >
                      {({ handleChange, values, errors }) => (
                        <Form className="flex flex-col mt-5 space-y-3">
                          <Field
                            name="username"
                            type="text"
                            value={values.username}
                            onChange={handleChange}
                            className="w-full px-5 py-2 border border-gray-200 rounded-md"
                            placeholder="Name"
                          />
                          {errors.username && <div>{errors.username}</div>}
                          <Field
                            name="email"
                            type="email"
                            value={values.email}
                            onChange={handleChange}
                            className="w-full px-5 py-2 border border-gray-200 rounded-md"
                            placeholder="Email"
                          />
                          {errors.email && <div>{errors.email}</div>}
                          <Field
                            name="password"
                            type="password"
                            value={values.password}
                            onChange={handleChange}
                            className="w-full px-5 py-2 border border-gray-200 rounded-md"
                            placeholder="Contraseña"
                          />
                          {errors.password && <div>{errors.password}</div>}
                          <button
                            type="submit"
                            className="uppercase px-5 py-3 text-white bg-black rounded-md"
                          >
                            Iniciar Sesión
                          </button>
                        </Form>
                      )}
                    </Formik>

                    <div className="flex mt-1">
                      <h1 className="text-gray-400 mr-2">¿Ya sos miembro?</h1>
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
