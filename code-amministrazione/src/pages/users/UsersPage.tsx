import _ from 'lodash'
import { ChangeEvent, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button, Col, Container, Input, Row } from 'reactstrap'

import Breadcrumb from '@/components/ui/Breadcrumb'
import DeleteModal from '@/components/modals/DeleteModal'
import UserModal from '@/components/modals/UserModal'
import UsersTable from '@/components/tables/UsersTable'

import { useAddUserMutation, useDeleteUserMutation, useEditUserMutation, useGetUsersListQuery } from '@/services/api/users'

export default function UsersPage() {
  const { t } = useTranslation()

  const [deletingUserId, setDeletingUserId] = useState<string | null>(null)
  const [editingUserId, setEditingUserId] = useState<string | null>(null)
  const [isUserModalOpen, setIsUserModalOpen] = useState(false)

  const { data: usersListData } = useGetUsersListQuery()
  const [addUser, { error }] = useAddUserMutation()
  const [editUser] = useEditUserMutation()
  const [deleteUser] = useDeleteUserMutation()

  const { results: users = [] } = usersListData ?? {}

  const userInitialValues = useMemo(() => {
    const editingUser = users.find((user) => user.id === editingUserId)
    if (editingUser) {
      return {
        id: editingUser.id,
        active: editingUser.active,
        email: editingUser.email,
        name: editingUser.name,
        role: editingUser.role,
        surname: editingUser.surname,
        password: '',
        confirmPassword: '',
      }
    }
    return {
      active: true,
      email: '',
      name: '',
      role: '',
      surname: '',
      password: '',
      confirmPassword: '',
    }
  }, [users, editingUserId])

  useEffect(() => {
    if (!isUserModalOpen) setEditingUserId(null)
  }, [isUserModalOpen])

  const handleAddButtonClick = () => {
    setIsUserModalOpen(true)
  }

  const handleDeleteUser = async () => {
    if (!deletingUserId) return

    await deleteUser(deletingUserId)
    setDeletingUserId(null)
  }

  const handleSearch = (_event: ChangeEvent<HTMLInputElement>) => {}

  return (
    <Container fluid="xl">
      <Breadcrumb
        title={t('Users management')}
        items={[
          { link: '/', title: t('Home') },
          { active: true, link: '/users', title: t('Users') },
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
            {t('Add')} {t('User')}
          </Button>
        </Col>
      </Row>
      <UsersTable
        data={users}
        onDeleteClick={(userId) => {
          setDeletingUserId(userId)
        }}
        onEditClick={(user) => {
          setEditingUserId(user.id)
          setIsUserModalOpen(true)
        }}
      />
      <UserModal
        submissionError={_.get(error, 'data.message')}
        initialValues={userInitialValues}
        isOpen={isUserModalOpen}
        onSubmit={async (values) => {
          const { active, confirmPassword, id, ...data } = values
          try {
            if (id) {
              await editUser({ id, active, ...data }).unwrap()
            } else {
              await addUser(data).unwrap()
            }
            setIsUserModalOpen(false)
          } catch (error) {
            console.error(error)
          }
        }}
        setIsOpen={setIsUserModalOpen}
      />
      <DeleteModal name={t('Pavilion')} isOpen={!!deletingUserId} onDelete={handleDeleteUser} />
    </Container>
  )
}
