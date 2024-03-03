import { useEffect, useState } from "react"

type ImageSlideProps = {
  image: string
  slideId: string
}

export default function ImageSlide(props: ImageSlideProps) {
  const { image, slideId } = props

  const [imgUrl, setImgUrl] = useState<string>()

  useEffect(() => {
    async function getImage() {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/slides/${slideId}/image`, { method: 'GET' })
      const blob = await response.blob()
      setImgUrl(URL.createObjectURL(blob))
    }
    getImage()
  }, [slideId])

  return (
    <div className="tw-w-full tw-h-full tw-relative tw-bg-[#F5F8E5] tw-overflow-hidden">
      <img className="tw-absolute tw-w-full tw-h-full tw-object-contain" src={imgUrl} alt={image} />
    </div>
  )
}