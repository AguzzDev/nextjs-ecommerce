export const useUploadFiles = async (file) => {
  const cloudUrl = process.env.NEXT_PUBLIC_CLOUDINARY_URL

  const formData = new FormData()
  formData.append("upload_preset", "Ecommerce")
  formData.append("cloud_name", process.env.NEXT_PUBLIC_CLOUDINARY_NAME)
  formData.append("file", file[1])

  try {
    const resp = await fetch(cloudUrl, {
      method: "POST",
      body: formData,
    })
    if (resp.ok) {
      const cloudResp = await resp.json()
      return cloudResp.secure_url
    } else {
      throw await resp.json()
    }
  } catch (err) {
    throw err
  }
}
