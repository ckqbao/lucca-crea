import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import Breadcrumb from '../../components/common/Breadcrumb'
import DeleteModal from '../../components/main/DeleteModal'
import ParticipantModal from '../../components/main/ParticipantModal'
import ParticipantsTable from '../../components/main/ParticipantsTable'
import SearchBar from '../../components/main/SearchBar'

import { getCategory } from '../../redux/store/actions/categoryActions'
import {
  PARTICIPANTS_ENDPOINT,
  addParticipant,
  deleteParticipant,
  editParticipant,
  getParticipantsByCategory,
} from '../../redux/store/actions/participantActions'
import { selectCategoryById } from '../../redux/store/reducers/categoryReducer'
import { selectParticipants } from '../../redux/store/reducers/participantReducer'

import request from '../../helpers/requestHelper'
import { addVote } from '../../redux/store/actions/voteActions'

export default function Participants() {
  const dispatch = useDispatch()
  const { categoryId } = useParams()
  const { t } = useTranslation()

  const participantsList = useSelector(selectParticipants)
  const category = useSelector((state) =>
    categoryId ? selectCategoryById(state, categoryId) : undefined
  )

  const [deletingParticipantId, setDeletingParticipantId] = useState()
  const [editingParticipant, setEditingParticipant] = useState()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [previewUrl, setPreviewUrl] = useState()

  useEffect(() => {
    if (!categoryId) return

    dispatch(getParticipantsByCategory(categoryId))
  }, [categoryId, dispatch])

  useEffect(() => {
    if (!categoryId || !!category) return

    dispatch(getCategory(categoryId))
  }, [categoryId, category, dispatch])

  const handleAddOrEditParticipant = (formValues) => {
    setIsModalOpen(false)

    let data = {}

    data.category = categoryId
    data.name = formValues.name
    data.description = formValues.description
    if (formValues.participantImage)
      data.participantImage = formValues.participantImage

    if (formValues.id) {
      data.active = formValues.active
      dispatch(editParticipant(formValues.id, data))
    } else {
      dispatch(addParticipant(data))
    }
  }

  const handleDelete = () => {
    let participantId = deletingParticipantId
    dispatch(deleteParticipant(participantId))
    setDeletingParticipantId()
  }

  const handleDeleteClick = (participantId) => {
    setDeletingParticipantId(participantId)
  }

  const handleEditClick = (participant) => {
    setEditingParticipant({
      id: participant.id,
      active: participant.active,
      description: participant.description,
      participantImage: participant.participantImage,
      name: participant.name,
    })
    request({
      url: `${PARTICIPANTS_ENDPOINT}/${participant.id}/image`,
      auth: true,
      method: 'GET',
    }).then((res) => {
      if (!res.code) {
        const objectURL = URL.createObjectURL(res)
        setPreviewUrl(objectURL)
      }
    })
    setIsModalOpen(true)
  }

  const handleNewButtonClick = () => {
    setEditingParticipant()
    setIsModalOpen(true)
  }

  const handleVote = (participantId) => {
    dispatch(addVote({ participantId, categoryId }))
  }

  return (
    <div>
      <Breadcrumb
        title={t('Participant manager')}
        items={[
          { link: '/', title: t('Home') },
          { link: '/categories', title: t('Categories') },
          { active: true, title: t('Participants') },
        ]}
      />
      <SearchBar
        name="Participants"
        btnName={t('participant')}
        onClick={handleNewButtonClick}
      />
      <ParticipantsTable
        categoryColor={category?.categoryColor}
        data={participantsList}
        onDeleteClick={handleDeleteClick}
        onEditClick={handleEditClick}
        onVote={handleVote}
      />
      <ParticipantModal
        title={t('Participants')}
        category={category?.name}
        initialValues={editingParticipant}
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        previewUrl={previewUrl}
        setPreviewUrl={setPreviewUrl}
        onSave={handleAddOrEditParticipant}
      />
      <DeleteModal
        isOpen={!!deletingParticipantId}
        setIsOpen={setDeletingParticipantId}
        name="participant"
        onDelete={handleDelete}
      />
    </div>
  )
}
