import _ from 'lodash'
import { ChangeEvent, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button, Col, Container, Input, Row } from 'reactstrap'

import Breadcrumb from '@/components/ui/Breadcrumb'
import DeleteModal from '@/components/modals/DeleteModal'
import PavilionsTable from '@/components/tables/PavilionsTable'
import PavilionModal from '@/components/modals/PavilionModal/PavilionModal'

import { useAddEntranceMutation } from '@/services/api/entrances'
import { useAddPavilionMutation, useDeletePavilionMutation, useEditPavilionMutation, useGetPavilionsListQuery } from '@/services/api/pavilions'

export default function PavilionsPage() {
  const { t } = useTranslation()

  const [deletingPavilionId, setDeletingPavilionId] = useState<string | null>(null)
  const [isPavilionModalOpen, setIsPavilionModalOpen] = useState(false)
  const [selectedPavilionId, setSelectedPavilionId] = useState<string | null>(null)

  const { data: pavilionsListData } = useGetPavilionsListQuery()
  const [addPavilion, { isLoading: isAddingPavilion }] = useAddPavilionMutation()
  const [editPavilion, { isLoading: isEditingPavilion }] = useEditPavilionMutation()
  const [deletePavilion] = useDeletePavilionMutation()

  const [addEntrance] = useAddEntranceMutation()

  const { results: pavilions = [] } = pavilionsListData ?? {}

  const pavilionInitialValues = useMemo(() => {
    const selectedPavilion = pavilions.find((pavilion) => pavilion.id === selectedPavilionId)
    if (selectedPavilion) {
      return {
        id: selectedPavilion.id,
        active: selectedPavilion.active,
        code: selectedPavilion.code,
        coordinates: selectedPavilion.coordinates,
        entrances: selectedPavilion.entrances.map((entrance) => ({
          _id: entrance._id,
          code: entrance.code,
          coordinates: entrance.coordinates,
          name: entrance.name,
          threshold0: (entrance.threshold0 ?? '') + '',
          threshold1: (entrance.threshold1 ?? '') + '',
          threshold2: (entrance.threshold2 ?? '') + '',
          threshold3: (entrance.threshold3 ?? '') + '',
          threshold4: (entrance.threshold4 ?? '') + '',
          threshold5: (entrance.threshold5 ?? '') + '',
        })),
        name: selectedPavilion.name,
      }
    }
    return {
      active: true,
      code: '',
      coordinates: '',
      name: '',
      entrances: [],
    }
  }, [pavilions, selectedPavilionId])

  const pavilionsData = useMemo(
    () =>
      pavilions.map((pavilion) => ({
        id: pavilion.id,
        pavilionName: pavilion.name,
        entranceName: pavilion.entrances[0]?.name,
        entranceThreshold0: pavilion.entrances[0]?.threshold0,
        entranceThreshold1: pavilion.entrances[0]?.threshold1,
        entranceThreshold2: pavilion.entrances[0]?.threshold2,
        entranceThreshold3: pavilion.entrances[0]?.threshold3,
        entranceThreshold4: pavilion.entrances[0]?.threshold4,
        entranceThreshold5: pavilion.entrances[0]?.threshold5,
        subRows: _.drop(pavilion.entrances).map((entrance) => ({
          id: entrance._id,
          pavilionName: '',
          entranceName: entrance.name,
          entranceThreshold0: entrance.threshold0,
          entranceThreshold1: entrance.threshold1,
          entranceThreshold2: entrance.threshold2,
          entranceThreshold3: entrance.threshold3,
          entranceThreshold4: entrance.threshold4,
          entranceThreshold5: entrance.threshold5,
        })),
      })),
    [pavilions]
  )

  useEffect(() => {
    if (!isPavilionModalOpen) setSelectedPavilionId(null)
  }, [isPavilionModalOpen])

  const handleAddButtonClick = () => {
    setIsPavilionModalOpen(true)
  }

  const handleDeletePavilion = async () => {
    if (!deletingPavilionId) return

    await deletePavilion(deletingPavilionId)
    setDeletingPavilionId(null)
  }

  const handleSearch = (_event: ChangeEvent<HTMLInputElement>) => {}

  return (
    <Container fluid="xl">
      <Breadcrumb
        title={t('Pavilions')}
        items={[
          { link: '/', title: t('Home') },
          { active: true, link: '/pavilions', title: t('Pavilions') },
        ]}
      />
      <Row className="mt-4 mb-4">
        {/* <Col className="d-flex searchbar-input">
          <div>
            <i className="bx bx-search-alt"></i>
          </div>
          <Input type="text" name="pavilions" className="form-control form-control-login" placeholder={t('Search')} onChange={handleSearch} />
        </Col> */}
        <Col className="ms-auto text-end">
          <Button onClick={handleAddButtonClick} className="bg-red text-white border-0">
            {t('Add')} {t('Pavilion')}
          </Button>
        </Col>
      </Row>
      <PavilionsTable
        data={pavilionsData}
        onDeleteClick={(pavilionId) => {
          setDeletingPavilionId(pavilionId)
        }}
        onEditClick={(pavilion) => {
          setSelectedPavilionId(pavilion.id)
          setIsPavilionModalOpen(true)
        }}
      />
      <PavilionModal
        initialValues={pavilionInitialValues}
        isLoading={isAddingPavilion || isEditingPavilion}
        isOpen={isPavilionModalOpen}
        onSubmit={async (values) => {
          const { active, entrances = [], id, ...data } = values
          if (id) {
            await editPavilion({ id, active, ...data }).unwrap()
          } else {
            const pavilion = await addPavilion(data).unwrap()
            for (const entrance of entrances) {
              const { code, coordinates, name, threshold0, threshold1, threshold2, threshold3, threshold4, threshold5 } = entrance
              await addEntrance(
                _.merge(
                  { pavilionId: pavilion.id, code, coordinates, name },
                  {
                    threshold0: parseInt(threshold0),
                    threshold1: parseInt(threshold1),
                    threshold2: parseInt(threshold2),
                    threshold3: parseInt(threshold3),
                    threshold4: parseInt(threshold4),
                    threshold5: parseInt(threshold5),
                  }
                )
              )
            }
          }
          setIsPavilionModalOpen(false)
        }}
        setIsOpen={setIsPavilionModalOpen}
      />
      <DeleteModal name={t('Pavilion')} isOpen={!!deletingPavilionId} onDelete={handleDeletePavilion} setIsOpen={() => setDeletingPavilionId(null)} />
    </Container>
  )
}
