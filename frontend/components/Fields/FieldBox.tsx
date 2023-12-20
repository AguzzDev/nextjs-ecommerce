import { Field, FieldAttributes, useField } from "formik";

export const FieldBox: React.FC<FieldAttributes<any>> = (props) => {
  const [field, meta] = useField(props.name);

  return (
    <>
      <Field
        {...field}
        {...props}
        className="w-full px-5 py-2 border border-gray-300 rounded-md"
        type={props.type ? props.type : "text"}
        placeholder={props.placeholder}
        autoComplete="off"
      />
      {meta.error ? <p className="text-xs text-red-500">{meta.error}</p> : null}
    </>
  );
};