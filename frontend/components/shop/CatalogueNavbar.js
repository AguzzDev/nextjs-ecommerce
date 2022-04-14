import filters from "data/Filter"
import { DisclosureCategory } from "components/shop/Disclosure/DisclosureCategory"

export const CatalogueNavbar = ({
  category,
  removeFilters,
  setColor,
  setSize,
  setCategory,
  setSort,
}) => {
  return (
    <>
      <section className="flex flex-col h-full">
        {filters?.map((section) => (
          <>
            {!category ? (
              section.id === "size" ||
              section.id === "color" ||
              section.id === "size2" ? null : (
                <DisclosureCategory
                  section={section}
                  setColor={setColor}
                  setSize={setSize}
                  setCategory={setCategory}
                  setSort={setSort}
                />
              )
            ) : category === "zapatilla" ? (
              section.id === "size" ? null : (
                <DisclosureCategory
                  section={section}
                  setColor={setColor}
                  setSize={setSize}
                  setCategory={setCategory}
                  setSort={setSort}
                />
              )
            ) : section.id === "size2" ? null : (
              <DisclosureCategory
                section={section}
                setColor={setColor}
                setSize={setSize}
                setCategory={setCategory}
                setSort={setSort}
              />
            )}
          </>
        ))}
        <button className="button mx-10" onClick={removeFilters}>
          Eliminar filtros
        </button>
      </section>
    </>
  )
}
