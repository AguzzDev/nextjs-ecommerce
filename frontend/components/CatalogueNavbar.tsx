import filters from "data/Filter";
import { DisclosureCategory } from "components/Disclosure/DisclosureCategory";
import { CatalogueNavbarInterface } from "interfaces";

export const CatalogueNavbar: React.FC<CatalogueNavbarInterface> = ({
  setFilter,
  setOperationType,
}) => {
  return (
    <section className="flex flex-col pb-10">
      {filters.map((section) => (
        <DisclosureCategory
          section={section}
          setFilter={setFilter}
          setOperationType={setOperationType}
        />
      ))}
      <button
        className="button mx-10"
        onClick={() => {
          setOperationType("clear");
          setFilter({
            query: "",
            sort: {
              label: "Descendiente",
              value: "desc",
            },
            category: {
              label: "",
              value: null,
            },
            color: {
              label: "",
              value: null,
            },
          });
        }}
      >
        Eliminar filtros
      </button>
    </section>
  );
};
