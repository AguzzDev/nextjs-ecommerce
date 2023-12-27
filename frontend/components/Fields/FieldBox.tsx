import { Field, FieldAttributes, useField } from "formik";

interface Props extends FieldAttributes<any> {
  name: string;
  placeholder?: string;
  type?: string;
}

export const FieldBox: React.FC<Props> = (props) => {
  const [field, meta] = useField(props);

  return (
    <>
      <Field
        {...field}
        {...props}
        className="w-full px-5 py-2 border border-gray-300 rounded-md"
        type={props.type || "text"}
        autoComplete="off"
      />
      {meta.error ? <p className="text-xs text-red-500">{meta.error}</p> : null}
    </>
  );
};
