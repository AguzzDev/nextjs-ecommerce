import Excel from "exceljs"
import { Dialog, Transition } from "@headlessui/react"
import { useState, Fragment, useCallback, useMemo } from "react"
import { toast } from "react-toastify"
import {
  PlusSmIcon,
  TrashIcon,
  UploadIcon,
  XIcon,
} from "@heroicons/react/outline"
import { useDropzone } from "react-dropzone"
import { useForm, Controller } from "react-hook-form"
import { useDispatch } from "react-redux"
import useSWR from "swr"
import Select from "react-select"

import { IconCustom, IconsSm, IconsXs } from "components/dashboard/Icons"
import { createProduct, updateProduct } from "store/actions/product"
import filters from "data/Filter"
import { IconXS } from "components/shop/Icons"
import { API_URL } from "utils/urls"

const Modal = ({ row }) => {
  const [excelFile, setExcelFile] = useState("")
  const [excelDocument, setExcelDocument] = useState(null)
  const { mutate: mutateList } = useSWR(`${API_URL}/products`)

  useMemo(() => {
    if (excelFile) {
      const getData = async () => {
        const workbook = new Excel.Workbook()
        const data = await workbook.xlsx.load(excelFile[0])

        setExcelDocument(data.getWorksheet("Hoja1"))
      }
      getData()
    }
  }, [excelFile])

  const filter = [
    {
      name: "Tallas",
      options: [
        { value: "xs", label: "XS" },
        { value: "s", label: "S" },
        { value: "m", label: "M" },
        { value: "l", label: "L" },
        { value: "xl", label: "XL" },
        { value: "xxl", label: "XXL" },
        { value: "36", label: "36" },
        { value: "37", label: "37" },
        { value: "38", label: "38" },
        { value: "39", label: "39" },
        { value: "40", label: "40" },
        { value: "41", label: "41" },
      ],
    },
  ]
  const [isOpen, setIsOpen] = useState(false)
  const [images, setImages] = useState(row?.values?.img || [])

  const dispatch = useDispatch()

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      title: row?.values?.title,
      description: row?.values?.desc,
      price: row?.values?.price,
      categories: row?.values?.categories[0],
      color: row?.values?.color[0],
      size: row?.values?.size[0],
    },
  })

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    acceptedFiles[0].type === "image/png" ||
    acceptedFiles[0].type === "image/jpeg"
      ? acceptedFiles.forEach((file) => {
          const reader = new FileReader()
          reader.onload = () => {
            setImages((prev) => prev.concat(reader.result))
          }
          reader.readAsDataURL(file)
        })
      : setExcelFile(acceptedFiles)
  }, [])

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxFiles: 10,
  })
  const removeImage = (i) => {
    const filter = images.filter((img) => img !== i)
    return setImages(filter)
  }

  const onSubmit = async (data) => {
    toast.success("Producto agregado", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      pauseOnHover: false,
      closeOnClick: true,
    })

    const newData = [data].map((data, i) => {
      return {
        title: data.title,
        desc: data.description,
        img: images,
        categories: data.categories,
        size: data.size,
        color: data.color,
        price: Number(data.price),
      }
    })
    const id = row?.original?._id

    !row
      ? await dispatch(createProduct(newData))
      : await dispatch(updateProduct({ newData, id }))

    await mutateList(`${API_URL}/products`)

    reset()
    setImages([])
    closeModal()
  }

  const onSubmit2 = async () => {
    toast.success("Producto agregado", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      pauseOnHover: false,
      closeOnClick: true,
    })

    const rows = await excelDocument._rows.map((row) =>
      row._cells.map((cell) => {
        const value = cell._value.model.value
        return { value }
      })
    )

    const newData = await rows.map((row) => {
      return {
        title: row[0].value,
        desc: row[1].value,
        categories: row[2].value,
        size: row[3].value,
        color: row[4].value,
        price: row[5].value,
      }
    })
    await dispatch(createProduct(newData))
    await mutateList(`${API_URL}/products`)
    closeModal()
  }

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  return (
    <>
      <button onClick={openModal}>
        <IconsSm Icon={PlusSmIcon} props="dark:text-white text-black" />
      </button>

      <Transition show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          open={isOpen}
          onClose={closeModal}
          className="fixed inset-0 z-50 flex"
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black pointer-events-none bg-opacity-30" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            leave="transition ease-in-out duration-300 transform"
          >
            <section className="relative grid w-full h-full place-content-center">
              <div className="border dark:border-gray-800 border-gray-100 bg-white dark:bg-gray-800 w-[80vw] h-max rounded-md p-3">
                <div className="flex justify-end px-2">
                  <button onClick={closeModal}>
                    <IconsXs Icon={XIcon} props="darkmode" />
                  </button>
                </div>
                <h1 className="mb-3 text-xl text-center text-white">
                  {row
                    ? "Actualiza el producto"
                    : "Agrega un producto"}
                </h1>
                <div className="flex space-x-5">
                  <div className="w-full">
                    <div
                      className="w-full bg-gray-200 cursor-pointer dark:bg-gray-600 h-52"
                      {...getRootProps()}
                    >
                      <input {...getInputProps()} />
                      <div className="flex flex-col items-center justify-center h-full">
                        <IconCustom
                          Icon={UploadIcon}
                          props="w-32 h-32 text-gray-500 fill-current"
                        />
                        <p className="font-bold text-gray-500">
                          Hace click o arrastra imagenes
                        </p>
                      </div>
                    </div>
                    <div className="flex mt-3 space-x-3">
                      {images.length > 1 &&
                        images?.map((i) => (
                          <div key={i} className="relative">
                            <img
                              src={i}
                              className="w-[120px] h-[120px] object-cover cursor-pointer"
                            />

                            <div className="absolute p-1 bg-black rounded-full -bottom-2 -right-2">
                              <button
                                onClick={() => removeImage(i)}
                                className="flex items-center justify-center"
                              >
                                <IconXS Icon={TrashIcon} props="text-white" />
                              </button>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                  {!excelDocument ? (
                    <form
                      className="flex flex-col w-full"
                      onSubmit={handleSubmit(onSubmit)}
                    >
                      <div className="flex flex-col space-y-5">
                        <input
                          className="px-3 py-1"
                          {...register("title", { required: true })}
                          placeholder="Producto"
                        />
                        <textarea
                          className="px-3 py-1 outline-none"
                          rows="4"
                          {...register("description", { required: true })}
                          placeholder="Agrega una descripcion"
                        />
                        <input
                          className="px-3 py-1"
                          type="number"
                          {...register("price", { required: true })}
                          placeholder="Precio"
                        />

                        <Controller
                          {...register("color", { required: true })}
                          control={control}
                          render={({ field: { onChange, value, ref } }) => (
                            <Select
                              inputRef={ref}
                              classNamePrefix="addl-class"
                              options={filters[1].options}
                              value={filters[1].options.find(
                                (c) => c.value === value
                              )}
                              onChange={(val) => onChange(val.value)}
                              placeholder="Elige color"
                            />
                          )}
                        />
                        <Controller
                          {...register("categories", { required: true })}
                          control={control}
                          render={({ field: { onChange, value, ref } }) => (
                            <Select
                              inputRef={ref}
                              classNamePrefix="addl-class"
                              options={filters[2].options}
                              value={filters[2].options.find(
                                (c) => c.value === value
                              )}
                              onChange={(val) => onChange(val.value)}
                              placeholder="Elige categoria"
                            />
                          )}
                        />
                        <Controller
                          {...register("size", { required: true })}
                          control={control}
                          render={({ field: { onChange, value, ref } }) => (
                            <Select
                              inputRef={ref}
                              classNamePrefix="addl-class"
                              options={filter[0].options}
                              value={filter[0].options.find(
                                (c) => c.value === value
                              )}
                              onChange={(val) =>
                                onChange(val.map((c) => c.value))
                              }
                              isMulti
                              placeholder="Elige talla"
                            />
                          )}
                        />

                        {errors.title?.type === "required"
                          ? "Campo requerido"
                          : errors.description?.type === "required"
                          ? "Campo requerido"
                          : errors.price?.type === "required"
                          ? "Campo requerido"
                          : ""}
                        <input
                          className="py-2 text-white bg-black rounded-md cursor-pointer dark:bg-gray-600"
                          type="submit"
                        />
                      </div>
                    </form>
                  ) : (
                    <div className="w-full">
                      <h1>Insertar {excelDocument._rows.length} productos?</h1>
                      <button onClick={() => onSubmit2()} className="button">
                        Enviar
                      </button>
                      <button
                        onClick={() => setExcelDocument(null)}
                        className="button"
                      >
                        Volver
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </section>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  )
}

export { Modal }
