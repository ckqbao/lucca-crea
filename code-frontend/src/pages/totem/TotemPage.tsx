import _ from 'lodash'
import { useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Autoplay, EffectCoverflow, EffectFlip, Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import bgTotem from '@/assets/images/bg-totem.png'

import ImageSlide from '@/components/slides/ImageSlide'
import PavilionCard from '@/components/cards/PavilionCard'
import VideoSlide from '@/components/slides/VideoSlide'

import { useGetBigScreenTimingsDataQuery, useGetSlidesQuery } from '@/services/api/totem'

import 'swiper/css'
import 'swiper/css/navigation'

const refreshTimingsDataInterval = 5 // minutes
const refreshSlidesInterval = 5 // minutes

export default function TotemPage() {
  const { t } = useTranslation()

  const { data: timingsData } = useGetBigScreenTimingsDataQuery(undefined, { pollingInterval: refreshTimingsDataInterval * 60 * 1000 })
  const { data: slidesData } = useGetSlidesQuery(undefined, { pollingInterval: refreshSlidesInterval * 60 * 1000 })

  const pavilions = useMemo(() => timingsData?.pavilions || [], [timingsData])
  const slides = useMemo(() => slidesData?.results ?? [], [slidesData])

  useEffect(() => {}, [])

  return (
    <div className="tw-h-full t-w-full">
      <img src={bgTotem} className="tw-absolute tw-h-full tw-w-full tw-top-0 tw-left-0 -tw-z-10 tw-object-cover" />
      <div className="tw-hidden tw-h-full tw-w-full totem:tw-flex tw-flex-col tw-space-y-10 tw-py-24">
        <div className="tw-flex-2 tw-overflow-auto">
          <div className="tw-mx-auto tw-grid tw-grid-cols-1 totem:tw-grid-cols-2 tw-gap-10 tw-px-2">
            {pavilions.map((pavilion) => (
              <div key={pavilion._id}>
                <PavilionCard
                  id={pavilion._id}
                  name={pavilion.name}
                  entranceName={pavilion.entrances.find((entrance) => entrance.entranceId === pavilion.entranceId)?.entranceName ?? ''}
                  timingColor={pavilion.timingColor}
                  variant="totem"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="tw-flex-1">
          <Swiper
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            centeredSlides
            className="tw-h-full tw-w-full"
            grabCursor
            loop
            modules={[Autoplay, EffectCoverflow]}
            slidesPerView={1}
            watchSlidesProgress
            speed={1000}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 100,
              modifier: 2.5,
              slideShadows: true,
            }}
            effect="coverflow"
          >
            {slides?.map((slide) => (
              <SwiperSlide key={slide.id} className="tw-relative">
                {({ isActive }) =>
                  slide.video ? (
                    <VideoSlide
                      isActive={isActive}
                      // src="http://media.w3.org/2010/05/sintel/trailer.mp4"
                      src={`${new URL(import.meta.env.VITE_OWN_URL).origin}/data/video/${slide.videoFileName}`}
                    />
                  ) : (
                    <ImageSlide image={slide.image} slideId={slide.id} />
                  )
                }
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  )
}
