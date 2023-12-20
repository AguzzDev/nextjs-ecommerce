import { useEffect, useState } from "react";

import { CatalogueNavbar } from "components/CatalogueNavbar";
import Layout from "components/Layout";
import { ProductsItems } from "components/ProductsItems";
import { getAllProducts } from "store/actions/product";
import { withDispatch } from "hoc/withDispatch";
import { SearchInput } from "components/SearchInput";
import { IconXS } from "components/Icons";
import { XIcon } from "@heroicons/react/outline";
import {
  ChildrenType,
  FilterCatalogueInterface,
  ProductInterface,
  TagInterface,
} from "interfaces";
import { useProductsSelector } from "store/selectors/useProductsSelector";

function Catalogue() {
  const [filter, setFilter] = useState<FilterCatalogueInterface>({
    query: "",
    sort: {
      label: "Descendente",
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

  const [operationType, setOperationType] = useState<string | null>(null);
  const [data, setData] = useState<ProductInterface[]>([]);

  const Tag: React.FC<TagInterface> = ({ field, value }) => {
    const TagBox = ({ children }: { children: string | ChildrenType }) => (
      <div className="flex items-center py-1 pl-2 pr-1 bg-gray-300 text-xs rounded-md">
        {children}
      </div>
    );
    const selectedField = filter[field as keyof typeof filter];
    return field === "sort" ? (
      <TagBox>{value.label}</TagBox>
    ) : typeof selectedField === 'object' && selectedField.value !== null ? (
      <TagBox>
        <button
          onClick={() => {
            setFilter((v) => ({ ...v, [field]: { label: "", value: null } }));
            setOperationType("tag");
          }}
          className="flex items-center"
        >
          <p>{value.label}</p>
          <IconXS Icon={XIcon} />
        </button>
      </TagBox>
    ) : null;
  };

  const { products } = useProductsSelector();

  const order = ({
    sort,
    data,
  }: {
    sort: FilterCatalogueInterface["sort"];
    data: ProductInterface[];
  }) => {
    const sortedData = [...data];

    return sort.value === "asc"
      ? sortedData.sort((a, b) => (a.price < b.price ? 1 : -1))
      : sortedData.sort((a, b) => (a.price > b.price ? 1 : -1));
  };

  useEffect(() => {
    let dataCopy = [...products.items];
    const { category, color, sort, query } = filter;

    if (operationType === "price") {
      setData(order({ data: data || dataCopy, sort }));
    } else if (operationType === "category") {
      const res = data.filter((v) => v.categories[0] == category.value);

      if (res.length === 0) {
        const res = dataCopy.filter((v) => v.categories[0] == category.value);
        return setData(
          color.value ? res.filter((v) => v.color[0] == color.value) : res
        );
      }

      setData(res);
    } else if (operationType === "color") {
      const res = data.filter((v) => v.color[0] == color.value);

      if (res.length === 0) {
        const res = dataCopy.filter((v) => v.color[0] == color.value);

        return setData(
          category.value
            ? res.filter((v) => v.categories[0] == category.value)
            : res
        );
      }

      setData(res);
    } else if (operationType === "clear") {
      setData(order({ data: dataCopy, sort }));
    } else if (operationType === "search") {
      const res = dataCopy.filter(({ title }) =>
        title.toLowerCase().includes(query.toLowerCase())
      );
      setData(res);
    } else if (operationType === "tag") {
      if (category.value) {
        setData(dataCopy.filter((v) => v.categories[0] == category.value));
      } else if (color.value) {
        setData(dataCopy.filter((v) => v.color[0] == color.value));
      } else {
        setData(order({ data: dataCopy, sort }));
      }
    } else {
      return;
    }
  }, [filter]);

  useEffect(() => {
    if (products) {
      setData(order({ data: products.items, sort: filter.sort }));
    }
  }, [products]);

  return (
    <Layout title="Catalogo" sectionProps="flex flex-col md:flex-row">
      <div className="md:w-5/12 border-b md:border-b-0 border-x border-gray-300 py-3">
        <div className="mx-3">
          <div className="flex flex-wrap space-x-3 mb-1">
            <Tag field="sort" value={filter.sort} />
            <Tag field="category" value={filter.category} />
            <Tag field="color" value={filter.color} />
          </div>
          <SearchInput
            setOperationType={setOperationType}
            setFilter={setFilter}
          />
        </div>

        <CatalogueNavbar
          setOperationType={setOperationType}
          setFilter={setFilter}
        />
      </div>

      <div className="grid py-3 md:pl-3 gap-5 grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 w-full">
        {data.length === 0 ? (
          <h3>No products</h3>
        ) : (
          <>
            {data.map((product, i) => (
              <ProductsItems key={i} product={product} i={i} id="catalogue" />
            ))}
          </>
        )}
      </div>
    </Layout>
  );
}

export default withDispatch(Catalogue, {
  actions: getAllProducts,
});
