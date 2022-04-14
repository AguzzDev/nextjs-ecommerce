import { Field } from "formik"

export const FieldBox = ({
  type,
  value,
  handleChange,
  placeholder,
  inputType,
}) => {
  return (
    <Field
      name={type}
      autoComplete="off"
      type={inputType}
      value={value}
      onChange={handleChange}
      className="w-full px-5 py-2 border border-gray-300 rounded-md"
      placeholder={placeholder}
    />
  )
}
