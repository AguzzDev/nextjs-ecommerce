import { BarStyleProps, StepHeader } from "interfaces";

export const StepsHeader: React.FC<StepHeader> = ({
  title,
  num,
  act,
  value,
}) => {
  const style = value <= act ? "text-blue-500" : "text-gray-300";
  const borderStyle = value <= act ? "border-blue-500" : "border-gray-300";

  const barStyle: BarStyleProps = {
    step1: "w-[13%] lg:w-[12.5%] xl:w-[13%] bg-blue-500",
    step2: "w-[48%] md:w-[50%] bg-blue-500",
    step3: "w-[100%] bg-blue-500",
  };

  return (
    <>
      <div className="flex flex-col items-center mr-2">
        <div
          className={`${borderStyle} flex items-center justify-center z-50 border-2 rounded-full h-10 w-10  bg-white`}
        >
          <p className={style}>{num}</p>
        </div>
        <p className={style}>{title}</p>
      </div>

      <div className="absolute top-5 left-0 w-full h-[2px] bg-gray-300">
        <div className={`${barStyle[act]} h-full`}></div>
      </div>
    </>
  );
};
