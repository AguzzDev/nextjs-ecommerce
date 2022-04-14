import { useRouter } from "next/router"

export const StepsHeader = ({ title, num, act, value }) => {
  const router = useRouter()
  const pathname = router.pathname

  return (
    <>
      <div className="relative flex flex-col items-center">
        <div
          className={`flex items-center justify-center z-50 border-2 ${
            value <= act || pathname === "/success" ? "border-blue-500" : "border-gray-300"
          } rounded-full h-10 w-10  bg-white`}
        >
          <p
            className={`${
              value <= act || pathname === "/success"
                ? "text-blue-500"
                : "text-gray-300"
            }`}
          >
            {num}
          </p>
        </div>
        <p
          className={`${
            value <= act || pathname === "/success"
              ? "text-blue-500"
              : "text-gray-300"
          }`}
        >
          {title}
        </p>

        {value === "step2" && (
          <>
            <div
              className={`${
                act === "step3" || pathname === "/success"
                  ? "border-blue-500"
                  : "border-gray-300"
              } absolute top-5 left-5 w-[20rem] border-b-2`}
            ></div>
            <div
              className={`${
                act === "step2" || pathname === "/success"
                  ? "border-blue-500"
                  : "border-gray-300"
              } absolute top-5 right-5 w-[20rem] border-b-2`}
            ></div>
          </>
        )}
      </div>
    </>
  )
}
