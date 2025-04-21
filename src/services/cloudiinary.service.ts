// upload.service.ts
const uploadService = {
  uploadImage: async (file: File) => {
    const formData = new FormData()
    formData.append("file", file)
    formData.append("upload_preset", "thinkx")

    const res = await fetch(`https://api.cloudinary.com/v1_1/dja6e1wov/image/upload`, {
      method: "POST",
      body: formData,
    })
    if (!res.ok) throw new Error("Upload failed")
    return await res.json()
  },

  uploadVideo: async (file: File) => {
    const formData = new FormData()
    formData.append("file", file)
    formData.append("upload_preset", "thinkx") 
    formData.append("resource_type", "video") 

    const res = await fetch(`https://api.cloudinary.com/v1_1/dja6e1wov/video/upload`, {
      method: "POST",
      body: formData,
    })

    if (!res.ok) throw new Error("Upload video failed")

    const data = await res.json()
    // Tự động tạo thumbnail từ frame đầu
    const thumb = `https://res.cloudinary.com/dja6e1wov/video/upload/so_1/${data.public_id}.jpg`

    return {
      ...data,
      thumb,
    }
  },

  getVideoInfo: async (publicId: string) => {
    const encodedCredentials = btoa(`579677216886487:QdLPxgPcPSc36S_wyCsd7vTvK0Y`)

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/dja6e1wov/resources/video/upload/el1isjcpqwiz6wzqcgjb`,
      {
        method: "GET",
        headers: {
          Authorization: `Basic ${encodedCredentials}`,
        },
      }
    )

    if (!res.ok) throw new Error("Failed to fetch video info")
    return await res.json()
  },
}
  
export default uploadService
  