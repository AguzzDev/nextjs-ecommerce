import { useRef } from "react";

import { SearchIcon } from "@heroicons/react/outline";
import { IconXS } from "./Icons";
import { SearchInputInterface } from "interfaces";

export const SearchInput: React.FC<SearchInputInterface> = ({
  setOperationType,
  setFilter,
}) => {
  const queryRef = useRef<HTMLInputElement | null>(null);
  const timeout = useRef<NodeJS.Timeout | null>(null);

  const handleSearch = () => {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
    timeout.current = setTimeout(() => {
      setFilter((v) => ({ ...v, query: queryRef.current!.value }));
      setOperationType("search");
    }, 500);
  };

  return (
    <div className="flex items-center p-2 mb-2 bg-gray1 rounded-md">
      <IconXS Icon={SearchIcon} />
      <input className="w-full" onChange={handleSearch} ref={queryRef} />
    </div>
  );
};
