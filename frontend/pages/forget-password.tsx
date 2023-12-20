import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";

import { FieldBox } from "components/Fields/FieldBox";
import Layout from "components/Layout";
import { forgetPassword } from "store/actions/auth";
import { useUser } from "context/User/UserProvider";

const forgetPasswordC = () => {
  const [screen, setScreen] = useState<boolean>(false);
  const [mail, setMail] = useState<string>("");

  const dispatch = useDispatch();
  const router = useRouter();

  const { user } = useUser();

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user]);

  return (
    <Layout
      sectionProps="mt-0 grid place-content-center min-h-screen"
      title="Restablecer contraseña"
    >
      <div className="bg-white max-w-2xl mx-auto p-20">
        {!screen ? (
          <>
            <h1 className="mb-2">Restablecer contraseña</h1>

            <Formik
              initialValues={{ email: "" }}
              onSubmit={async (values) => {
                setScreen(true);
                setMail(values.email);
                dispatch(forgetPassword(values));
              }}
            >
              {() => (
                <Form>
                  <FieldBox
                    name="email"
                    type="email"
                    placeholder="Email"
                  />
               
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
  );
};
export default forgetPasswordC;
