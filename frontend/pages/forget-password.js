import { FieldBox } from "components/shop/Fields/FieldBox"
import Layout from "components/shop/Layout"
import { Form, Formik } from "formik"
import { useContext, useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { forgetPassword } from "store/actions/auth"
import UserContext from "context/User/UserContext"
import { useRouter } from "next/router"

const forgetPasswordC = () => {
  const [screen, setScreen] = useState(false)
  const [mail, setMail] = useState("")
  const dispatch = useDispatch()
  const router = useRouter()
  const { user } = useContext(UserContext)

  useEffect(() => {
    if (user) {
      router.push("/")
    }
  }, [user])

  return (
    <Layout sectionProps="mt-0 grid place-content-center min-h-screen" title="Restablecer contraseña">
        <div className="bg-white max-w-2xl mx-auto p-20">
          {!screen ? (
            <>
              <h1 className="mb-2">Restablecer contraseña</h1>

              <Formik
                initialValues={{ email: "" }}
                onSubmit={async (values) => {
                  setScreen(true)
                  setMail(values.email)
                  dispatch(forgetPassword(values))
                }}
              >
                {({ handleChange, values, errors }) => (
                  <Form>
                    <FieldBox
                      handleChange={handleChange}
                      inputType="email"
                      type="email"
                      placeholder="Email"
                      value={values.email}
                    />
                    {errors.email && (
                      <div className="text-sm">{errors.email}</div>
                    )}
                    <button className="button" type="submit">
                      Enviar
                    </button>
                  </Form>
                )}
              </Formik>
            </>
          ) : (
            <div className="grid place-content-center h-36">
              <h2>Se envio un mail a {mail}</h2>
            </div>
          )}
        </div>
    </Layout>
  )
}
export default forgetPasswordC
