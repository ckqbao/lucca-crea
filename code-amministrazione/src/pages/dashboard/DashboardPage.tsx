import _ from 'lodash'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button, Col, Container, Input, Row } from 'reactstrap'
import FileSaver from 'file-saver'

import Breadcrumb from '@/components/ui/Breadcrumb'
import DashboardTable from '@/components/tables/DashboardTable'
import DeleteModal from '@/components/modals/DeleteModal'
import PavilionModal from '@/components/modals/PavilionModal'

import { useAppSelector } from '@/redux/store'
import { selectAccessToken } from '@/redux/reducers/authReducer'

import { useGetDataTimingsQuery } from '@/services/api'
import { Pavilion, useDeletePavilionMutation, useEditPavilionMutation, useLazyGetPavilionQuery } from '@/services/api/pavilions'

export default function DashboardPage() {
  const { t } = useTranslation()

  const accessToken = useAppSelector(selectAccessToken)

  const [deletingPavilionId, setDeletingPavilionId] = useState<string | null>(null)
  const [editingPavilion, setEditingPavilion] = useState<Pavilion | null>(null)
  const [isPavilionModalOpen, setIsPavilionModalOpen] = useState(false)

  const { data: dataTimings, refetch } = useGetDataTimingsQuery()
  const [getPavilion] = useLazyGetPavilionQuery()
  const [editPavilion, { isLoading: isEditingPavilion }] = useEditPavilionMutation()
  const [deletePavilion] = useDeletePavilionMutation()

  const { pavilions = [] } = dataTimings ?? {}

  const pavilionsData = useMemo(
    () =>
      pavilions.map((pavilion) => {
        const latestSubmittedEntrance = pavilion.entrances.find((entrance) => entrance.entranceId === pavilion.entranceId)
        return {
          id: pavilion._id,
          active: pavilion.active,
          currentStatus: '#' + pavilion.timingColor,
          name: pavilion.name,
          entranceName: latestSubmittedEntrance?.entranceName ?? '',
          forcedStatus: pavilion.forcedStatus,
          forcedStatusValue: pavilion.forcedStatusValue,
          userSubmittedData: {
            threshold0Count: latestSubmittedEntrance?.userSubmittedData.threshold_0_count ?? 0,
            threshold1Count: latestSubmittedEntrance?.userSubmittedData.threshold_1_count ?? 0,
            threshold2Count: latestSubmittedEntrance?.userSubmittedData.threshold_2_count ?? 0,
            threshold3Count: latestSubmittedEntrance?.userSubmittedData.threshold_3_count ?? 0,
            threshold4Count: latestSubmittedEntrance?.userSubmittedData.threshold_4_count ?? 0,
            threshold5Count: latestSubmittedEntrance?.userSubmittedData.threshold_5_count ?? 0,
          },
        }
      }),
    [pavilions]
  )

  const pavilionInitialValues = useMemo(() => {
    if (editingPavilion) {
      return {
        id: editingPavilion.id,
        active: editingPavilion.active,
        code: editingPavilion.code,
        coordinates: editingPavilion.coordinates,
        entrances: editingPavilion.entrances.map((entrance) => ({
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
        name: editingPavilion.name,
      }
    }
    return {
      active: true,
      code: '',
      coordinates: '',
      name: '',
      entrances: [],
    }
  }, [editingPavilion])

  const handleDeletePavilion = async () => {
    if (!deletingPavilionId) return

    await deletePavilion(deletingPavilionId)
    setDeletingPavilionId(null)
  }

  const handleExportData = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/data/exportdata`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      const blob = await response.blob()
      FileSaver.saveAs(blob, "data.xlsx");
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Container>
      <Breadcrumb
        title={t('Dashboard')}
        items={[
          { link: '/', title: t('Home') },
          { active: true, link: '/dashboard', title: t('Dashboard') },
        ]}
      />
      <Row className="mt-4 mb-4">
        {/* <Col className="d-flex searchbar-input">
          <div>
            <i className="bx bx-search-alt"></i>
          </div>
          <Input type="text" name="pavilions" className="form-control form-control-login" placeholder={t('Search Pavilion Entry')} />
        </Col> */}
        <Col className="ms-auto text-end">
          <Button className="bg-red text-white border-0 mx-1" onClick={() => window.location.reload()}>{t('Reload data')}</Button>
          <Button className="bg-red text-white border-0" onClick={handleExportData}>{t('Data export')}</Button>
        </Col>
      </Row>
      <DashboardTable
        data={pavilionsData}
        onChangeForcedStatus={async (pavilionId, forcedStatus) => {
          await editPavilion({ id: pavilionId, forcedStatus }).unwrap()
          refetch()
        }}
        onChangeForcedStatusValue={async (pavilionId: string, forcedStatusValue) => {
          await editPavilion({ id: pavilionId, forcedStatusValue }).unwrap()
          refetch()
        }}
        onDeleteClick={(pavilionId) => {
          setDeletingPavilionId(pavilionId)
        }}
        onEditClick={async ({ id }) => {
          setIsPavilionModalOpen(true)
          const pavilion = await getPavilion(id).unwrap()
          setEditingPavilion(pavilion)
        }}
      />
      <PavilionModal
        initialValues={pavilionInitialValues}
        isLoading={isEditingPavilion}
        isOpen={isPavilionModalOpen}
        onSubmit={async (values) => {
          const { active, entrances = [], id, ...data } = values
          if (id) {
            await editPavilion({ id, active, ...data }).unwrap()
            setIsPavilionModalOpen(false)
          }
        }}
        setIsOpen={setIsPavilionModalOpen}
      />
      <DeleteModal name={t('Pavilion')} isOpen={!!deletingPavilionId} onDelete={handleDeletePavilion} setIsOpen={() => setDeletingPavilionId(null)} />
    </Container>
  )
}
