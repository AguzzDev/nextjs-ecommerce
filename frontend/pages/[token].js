import { FieldBox } from "components/shop/Fields/FieldBox"
import Layout from "components/shop/Layout"
import { Form, Formik } from "formik"
import { useContext, useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { changePassword } from "store/actions/auth"
import UserContext from "context/User/UserContext"
import { useRouter } from "next/router"

const changePasswordC = ({ param }) => {
  const [screen, setScreen] = useState(false)
  const dispatch = useDispatch()
  const router = useRouter()

  const { user } = useContext(UserContext)

  useEffect(() => {
    if (user) {
      router.push("/")
    }
  }, [user])

  return (
    <Layout
      sectionProps="mt-0 grid place-content-center min-h-screen"
      title="Cambiar contraseña"
    >
      <section className="max-w-2xl p-20 mx-auto bg-white">
        {!screen ? (
          <>
            <h1 className="mb-2">Cambia tu contraseña</h1>

            <Formik
              initialValues={{ password: "" }}
              onSubmit={async (values) => {
                setScreen(true)
                dispatch(changePassword({ param, values }))
              }}
            >
              {({ handleChange, values, errors }) => (
                <Form>
                  <FieldBox
                    handleChange={handleChange}
                    inputType="password"
                    type="password"
                    placeholder="Contraseña"
                    value={values.password}
                  />
                  {errors.password && (
                    <div className="text-sm">{errors.password}</div>
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
            <h1>Contraseña cambiada</h1>
          </div>
        )}
      </section>
    </Layout>
  )
}

export default changePasswordC

export const getServerSideProps = ({ params }) => {
  const param = params.token.substring(22)

  return {
    props: {
      param,
    },
  }
}
