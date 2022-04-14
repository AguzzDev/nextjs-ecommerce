import { ArrowSmDownIcon } from "@heroicons/react/outline"
import { IconsSm } from "components/dashboard/Icons"

export const TripleTable = () => {
  return (
    <div className="flex justify-between mt-5">
      <div className="w-[400px] darkmode rounded-md p-5">
        <h1 className="text-xl font-semibold">Ingresos</h1>
        <div className="flex space-x-5 my-3">
          <p className="text-3xl font-bold">$2415</p>
          <div className="flex items-center font-bold">
            <p>-11.4</p>
            <div className="fill-current text-red-500">
              <IconsSm Icon={ArrowSmDownIcon} />
            </div>
          </div>
        </div>
        <h2>Comparado con el mes anterior</h2>
      </div>

      <div className="w-[400px] darkmode rounded-md p-5">
        <h1 className="text-xl font-semibold">Ventas</h1>
        <div className="flex space-x-5 my-3">
          <p className="text-3xl font-bold">$2415</p>
          <div className="flex items-center font-bold">
            <p>-11.4</p>
            <div className="fill-current text-red-500">
              <IconsSm Icon={ArrowSmDownIcon} />
            </div>
          </div>
        </div>
        <h2>Comparado con el mes anterior</h2>
      </div>

      <div className="w-[400px] darkmode rounded-md p-5">
        <h1 className="text-xl font-semibold">Costos</h1>
        <div className="flex space-x-5 my-3">
          <p className="text-3xl font-bold">$2415</p>
          <div className="flex items-center font-bold">
            <p>-11.4</p>
            <div className="fill-current text-red-500">
              <IconsSm Icon={ArrowSmDownIcon} />
            </div>
          </div>
        </div>
        <h2>Comparado con el mes anterior</h2>
      </div>
    </div>
  )
}
