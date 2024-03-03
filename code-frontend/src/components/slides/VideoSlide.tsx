import { useEffect, useRef, useState } from 'react'
import { useSwiper } from 'swiper/react'

type VideoSlideProps = {
  isActive: boolean
  src: string
}
export default function VideoSlide(props: VideoSlideProps) {
  const { isActive, src } = props

  const videoRef = useRef<HTMLVideoElement>(null)

  const [videoState, setVideoState] = useState<HTMLMediaElement['readyState']>(0)

  const swiper = useSwiper()

  useEffect(() => {
    function handleCanPlayThrough() {
      setVideoState(HTMLMediaElement.HAVE_ENOUGH_DATA)
    }
    function handleVideoEnded() {
      swiper.autoplay.start()
      swiper.slideNext()
    }

    const video = videoRef.current

    if (!video) return

    video.addEventListener('canplaythrough', handleCanPlayThrough)
    video.addEventListener('ended', handleVideoEnded)

    return () => {
      video.removeEventListener('canplaythrough', handleCanPlayThrough)
      video.removeEventListener('ended', handleVideoEnded)
    }
  }, [swiper])

  useEffect(() => {
    const video = videoRef.current

    if (!video || videoState !== HTMLMediaElement.HAVE_ENOUGH_DATA) return

    if (isActive) {
      swiper.autoplay.stop()
      video.play()
    } else if (!video.paused && !swiper.autoplay.running) {
      video.currentTime = 0
      video.pause()
      swiper.autoplay.start()
    }
  }, [isActive, swiper, videoState])

  return (
    <div className="tw-w-full tw-h-full tw-relative tw-bg-[#F5F8E5] tw-overflow-hidden">
      <video ref={videoRef} className="tw-h-full tw-w-full" preload="auto" muted>
        <source src={src} type="video/mp4" />
      </video>
    </div>
  )
}
