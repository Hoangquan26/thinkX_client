export default function VideoThumbnail({ url }: { url: string }) {
    const getThumbnail = (videoUrl: string) => {
      if (!videoUrl.includes("cloudinary")) return ""
      return videoUrl.replace("/video/upload/", "/video/upload/so_0/").replace(/\.(mp4|webm|mov)/, ".jpg")
    }
  
    return (
      <img
        src={getThumbnail(url)}
        alt="Video thumbnail"
        className="w-full h-48 object-cover"
      />
    )
  }
  