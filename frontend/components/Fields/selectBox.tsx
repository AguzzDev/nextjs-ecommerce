import { Field, useField } from "formik";

import { SelectBoxInterface } from "interfaces";

export const SelectBox: React.FC<SelectBoxInterface> = ({
  options,
  ...props
}) => {
  const [field, meta] = useField(props.name);

  return (
    <>
      <Field
        as="select"
        {...field}
        {...props}
        className="w-full px-5 py-2 border border-gray-300 rounded-md"
      >
        <option value="">-</option>
        {options.map(({ id, value, text }) => (
          <option key={id} value={value}>
            {text}
          </option>
        ))}
      </Field>
      {meta.error && <div className="text-xs text-red-500">{meta.error}</div>}
    </>
  );
};
