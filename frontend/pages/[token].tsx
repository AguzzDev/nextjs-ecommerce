import { FieldBox } from "components/Fields/FieldBox";
import Layout from "components/Layout";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

import { changePassword } from "store/actions/auth";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { useUser } from "context/User/UserProvider";

const ChangePassword = ({ param }: { param: string }) => {
  const dispatch = useDispatch();
  const [screen, setScreen] = useState<boolean>(false);

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
      title="Cambiar contraseña"
    >
      <section className="max-w-2xl p-20 mx-auto bg-white">
        {!screen ? (
          <>
            <h1 className="mb-2">Cambia tu contraseña</h1>

            <Formik
              initialValues={{ password: "" }}
              onSubmit={async (values) => {
                setScreen(true);
                dispatch(changePassword({ param, values }));
              }}
            >
              {() => (
                <Form>
                  <FieldBox
                    name="password"
                    type="password"
                    placeholder="Contraseña"
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
            <h1>Contraseña cambiada</h1>
          </div>
        )}
      </section>
    </Layout>
  );
};

export default ChangePassword;

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const { params } = ctx;

  let param = "";

  if (params && params.token && typeof params.token === "string") {
    param = params.token.substring(22);
  }

  return {
    props: {
      param,
    },
  };
};
