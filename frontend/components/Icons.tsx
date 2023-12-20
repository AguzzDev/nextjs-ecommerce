import { IconInterface } from "interfaces";

export const IconXS: React.FC<IconInterface> = ({ Icon, props }) => {
  return <Icon className={`w-5 h-5 ${props}`} />;
};
