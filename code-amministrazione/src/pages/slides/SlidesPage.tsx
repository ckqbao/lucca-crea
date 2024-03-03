import _ from 'lodash'
import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button, Col, Container, Row } from 'reactstrap'

import Breadcrumb from '@/components/ui/Breadcrumb'
import DeleteModal from '@/components/modals/DeleteModal'
import SlidesTable from '@/components/tables/SlidesTable'
import SlideModal from '@/components/modals/SlideModal'

import { AddSlideArg, EditSlideArg, useAddSlideMutation, useDeleteSlideMutation, useEditSlideMutation, useGetSlidesListQuery } from '@/services/api/slides'

export default function SlidesPage() {
  const { t } = useTranslation()

  const [deletingSlideId, setDeletingSlideId] = useState<string | null>(null)
  const [isSlideModalOpen, setIsSlideModalOpen] = useState(false)
  const [selectedSlideId, setSelectedSlideId] = useState<string | null>(null)

  const { data: slidesListData } = useGetSlidesListQuery()
  const [addSlide, { error: addSlideError, isLoading: isAddingSlide }] = useAddSlideMutation()
  const [editSlide, { error: editSlideError, isLoading: isEditingSlide }] = useEditSlideMutation()
  const [deleteSlide] = useDeleteSlideMutation()

  const { results: slides = [] } = slidesListData ?? {}

  const slideInitialValues = useMemo(() => {
    const selectedSlide = slides.find((slide) => slide.id === selectedSlideId)
    if (selectedSlide) {
      return {
        id: selectedSlide.id,
        active: selectedSlide.active,
        imageFileName: selectedSlide.image ?? '',
        order: selectedSlide.order,
        title: selectedSlide.title,
        type: selectedSlide.video ? 'video' : ('image' as 'video' | 'image'),
        videoFileName: selectedSlide.videoFileName ?? '',
      }
    }
    return {
      active: true,
      imageFileName: '',
      order: 0,
      title: '',
      type: 'image' as 'video' | 'image',
      videoFileName: '',
    }
  }, [slides, selectedSlideId])

  const slidesData = useMemo(
    () =>
      slides.map((slide) => ({
        id: slide.id,
        fileName: slide.video ? slide.videoFileName : slide.image ?? '',
        title: slide.title,
        type: slide.video ? 'video' : ('image' as 'image' | 'video'),
      })),
    [slides]
  )

  useEffect(() => {
    if (!isSlideModalOpen) setSelectedSlideId(null)
  }, [isSlideModalOpen])

  const handleAddButtonClick = () => {
    setIsSlideModalOpen(true)
  }

  const handleDeleteSlide = async () => {
    if (!deletingSlideId) return

    await deleteSlide(deletingSlideId)
    setDeletingSlideId(null)
  }

  return (
    <Container fluid="xl">
      <Breadcrumb
        title={t('Slides')}
        items={[
          { link: '/', title: t('Home') },
          { active: true, link: '/slides', title: t('Slides') },
        ]}
      />
      <Row className="mt-4 mb-4">
        <Col className="ms-auto text-end">
          <Button onClick={handleAddButtonClick} className="bg-red text-white border-0">
            {t('Add')} {t('Slide')}
          </Button>
        </Col>
      </Row>
      <SlidesTable
        data={slidesData}
        onDeleteClick={(slideId) => {
          setDeletingSlideId(slideId)
        }}
        onEditClick={(slide) => {
          setSelectedSlideId(slide.id)
          setIsSlideModalOpen(true)
        }}
      />
      <SlideModal
        initialValues={slideInitialValues}
        isLoading={isAddingSlide || isEditingSlide}
        isOpen={isSlideModalOpen}
        submissionError={_.get(addSlideError ?? editSlideError, 'data.message')}
        onSubmit={async (values) => {
          const { id, active, image, order, title, type, videoFileName } = values
          if (id) {
            let data: EditSlideArg = { id, active, order, title, video: type === 'video' }
            if (type === 'image') data = { ...data, image }
            if (type === 'video') data = { ...data, videoFileName }
            await editSlide(data).unwrap()
          } else {
            let data: AddSlideArg = { active, order, title, video: type === 'video' }
            if (type === 'image') data = { ...data, image }
            if (type === 'video') data = { ...data, videoFileName }
            await addSlide(data).unwrap()
          }
          setIsSlideModalOpen(false)
        }}
        setIsOpen={setIsSlideModalOpen}
      />
      <DeleteModal name={t('Slide')} isOpen={!!deletingSlideId} onDelete={handleDeleteSlide} setIsOpen={() => setDeletingSlideId(null)} />
    </Container>
  )
}
