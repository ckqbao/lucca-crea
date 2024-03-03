import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import Breadcrumb from '../../components/common/Breadcrumb'
import CategoriesTable from '../../components/main/CategoriesTable'
import CategoryModal from '../../components/main/CategoryModal'
import DeleteModal from '../../components/main/DeleteModal'
import SearchBar from '../../components/main/SearchBar'

import {
  CATEGORIES_ENDPOINT,
  addCategory,
  deleteCategory,
  editCategory,
  getCategoriesList,
} from '../../redux/store/actions/categoryActions'
import { selectCategories } from '../../redux/store/reducers/categoryReducer'

import request from '../../helpers/requestHelper'

export default function Categories() {
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const categoriesList = useSelector(selectCategories)

  const [deletingCategoryId, setDeletingCategoryId] = useState()
  const [editingCategory, setEditingCategory] = useState()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [previewUrl, setPreviewUrl] = useState()

  useEffect(() => {
    dispatch(getCategoriesList())
  }, [dispatch])

  const handleAddOrEditCategory = (formValues) => {
    setIsModalOpen(false)

    let data = {}

    data.name = formValues.name
    data.description = formValues.description
    if (formValues.categoryColor) data.categoryColor = formValues.categoryColor
    if (formValues.categoryTimeRemainingColor) data.categoryTimeRemainingColor = formValues.categoryTimeRemainingColor
    if (formValues.categoryImage) data.categoryImage = formValues.categoryImage

    if (formValues.id) {
      data.active = formValues.active
      dispatch(editCategory(formValues.id, data))
    } else {
      dispatch(addCategory(data))
    }
  }

  const handleDelete = () => {
    let categoryId = deletingCategoryId
    dispatch(deleteCategory(categoryId))
    setDeletingCategoryId()
  }

  const handleDeleteClick = (categoryId) => {
    setDeletingCategoryId(categoryId)
  }

  const handleEditClick = (category) => {
    setEditingCategory({
      id: category.id,
      active: category.active,
      description: category.description,
      categoryColor: category.categoryColor,
      categoryTimeRemainingColor: category.categoryTimeRemainingColor,
      categoryImage: category.categoryImage,
      name: category.name,
    })
    request({
      url: `${CATEGORIES_ENDPOINT}/${category.id}/image`,
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
    setEditingCategory()
    setIsModalOpen(true)
  }

  return (
    <div>
      <Breadcrumb
        title={t('Categories')}
        items={[
          { link: '/', title: t('Home') },
          { active: true, title: t('Categories') }
        ]}
      />
      <SearchBar
        name="Categories"
        btnName="Category"
        onClick={handleNewButtonClick}
      />
      <CategoriesTable
        data={categoriesList}
        onDeleteClick={handleDeleteClick}
        onEditClick={handleEditClick}
      />
      <CategoryModal
        title={t('Categories')}
        initialValues={editingCategory}
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        previewUrl={previewUrl}
        setPreviewUrl={setPreviewUrl}
        onSave={handleAddOrEditCategory}
      />
      <DeleteModal
        isOpen={!!deletingCategoryId}
        setIsOpen={setDeletingCategoryId}
        name="category"
        onDelete={handleDelete}
      />
    </div>
  )
}
