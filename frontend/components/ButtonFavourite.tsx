import { useDispatch } from "react-redux";

import { addFavourite, removeFavourite } from "store/actions/favourite";
import { toast } from "react-toastify";
import { HeartIcon } from "@heroicons/react/outline";
import { IconXS } from "./Icons";
import { useUser } from "context/User/UserProvider";
import { useFavouriteSelector } from "store/selectors/useFavouriteSelector";
import { ButtonFavouriteInterface, ProductInterface } from "interfaces";

export const ButtonFavourite: React.FC<ButtonFavouriteInterface> = ({
  data,
  id,
}) => {
  const dispatch = useDispatch();

  const { user } = useUser();
  const { favourite } = useFavouriteSelector();

  const allFavourites = favourite.map((c) => c._id);
  const includes = allFavourites.length > 0 && allFavourites.includes(data);

  const addItem = (data: string) => {
    toast.success("Agregado a favoritos", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      pauseOnHover: false,
      closeOnClick: true,
    }),
      dispatch(addFavourite(data));
  };
  const removeItem = (data: string) => {
    toast.success("Eliminado de favoritos", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      pauseOnHover: false,
      closeOnClick: true,
    }),
      dispatch(removeFavourite(data));
  };

  return (
    <>
      {user ? (
        id === "catalogue" ? (
          <button
            onClick={() => (includes ? removeItem(data) : addItem(data))}
            className="flex items-center justify-center bg-black rounded-full h-7 w-7"
          >
            {includes ? (
              <IconXS Icon={HeartIcon} props="text-white fill-current" />
            ) : (
              <IconXS
                Icon={HeartIcon}
                props="text-white hover:fill-current transform active:scale-110 duration-300"
              />
            )}
          </button>
        ) : id === "favourites" ? (
          <button
            onClick={() => removeItem(data)}
            className="flex items-center justify-center bg-black rounded-full h-7 w-7"
          >
            <IconXS
              Icon={HeartIcon}
              props="text-white fill-current hover:fill-black"
            />
          </button>
        ) : (
          <button
            onClick={() => (includes ? removeItem(data) : addItem(data))}
            className="absolute right-0 p-2 bg-black top-5"
          >
            {includes ? (
              <IconXS Icon={HeartIcon} props="text-white fill-current" />
            ) : (
              <IconXS
                Icon={HeartIcon}
                props="text-white hover:fill-current transform active:scale-110 duration-300"
              />
            )}
          </button>
        )
      ) : null}
    </>
  );
};
