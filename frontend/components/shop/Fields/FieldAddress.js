import { useState } from "react"

import { useGeolocalization } from "hooks/useGeolocalization"
import { FieldBox } from "./FieldBox"

export const FieldAddress = ({ errors, values, handleChange }) => {
  const [provinceId, setProvinceId] = useState("")
  const { province, citys } = useGeolocalization(provinceId)

  const filterProvinceId = (prov) => {
    const provinceFilter = province.filter((p) => p.nombre === prov)
    setProvinceId(provinceFilter[0]?.id)
  }
  return (
    <>
      <FieldBox
        type="address"
        value={values.address}
        handleChange={handleChange}
        inputType="text"
        placeholder="Direccion"
      />
      {errors.address && <div className="text-sm">{errors.address}</div>}
      <div className="flex space-x-5">
        <div className="w-full">
          <select
            name="country"
            value={values.country}
            onChange={handleChange}
            className="w-full px-5 py-2 border border-gray-300 rounded-md"
          >
            <option value="">Pais</option>
            <option value="Argentina">Argentina</option>
          </select>
          {errors.country && <div className="text-sm">{errors.country}</div>}
        </div>
        <div className="w-full">
          <select
            name="province"
            value={values.province}
            onChange={handleChange}
            onClick={() => filterProvinceId(values.province)}
            className="w-full px-5 py-2 border border-gray-300 rounded-md"
          >
            <option value="">Provincia</option>
            {province.map(({ id, nombre }) => (
              <option key={id}>{nombre}</option>
            ))}
          </select>
          {errors.province && <div className="text-sm">{errors.province}</div>}
        </div>
      </div>

      <div className="flex space-x-5">
        <div className="w-full">
          <select
            name="city"
            value={values.city}
            onChange={handleChange}
            className="w-full px-5 py-2 border border-gray-300 rounded-md"
          >
            <option value="">Localidad</option>
            {citys.map(({ id, nombre }) => (
              <>
                <option key={id}>{nombre}</option>
              </>
            ))}
          </select>
          {errors.city && <div className="text-sm">{errors.city}</div>}
        </div>
        <div className="w-full">
          <FieldBox
            type="postal_code"
            value={values.postal_code}
            handleChange={handleChange}
            inputType="number"
            placeholder="Codigo postal"
          />
          {errors.postal_code && (
            <div className="text-sm">{errors.postal_code}</div>
          )}
        </div>
      </div>
    </>
  )
}
