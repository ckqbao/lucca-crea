import React, { useState } from 'react'
// import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import Breadcrumb from '../../components/common/Breadcrumb'
// import DocumentTable from '../../components/main/DocumentTable';
import SearchBar from '../../components/main/SearchBar'
// import DeleteModal from '../../components/main/DeleteModal';

// import {
//   getDocumentsList,
//   deleteDocument,
// } from '../../redux/store/actions/documentActions';

const Home = (props) => {
  const history = useHistory()
  // const dispatch = useDispatch()
  // const documents = useSelector((state) => state.document);

  // const [isModalOpen, setIsModalOpen] = useState(false)
  // const [formState, setFormState] = useState({})
  // const [deleteId, setDeleteId] = useState()
  const [documentSearch, setDocumentSearch] = useState()

  // useEffect(() => {
  //   dispatch(getDocumentsList(1));
  // }, []);

  // useEffect(() => {
  //   if (documents.errorMsg && documents.errorMsg.code === 401) history.go(0);
  // }, [documents.errorMsg]);

  const onNewButtonClick = () => {
    history.push('/document-detail/new')
  }
  // const onDeleteClick = (id) => {
  //   setDeleteId(id)
  // }

  // const handleDelete = () => {
  //   let id = deleteId
  //   setDeleteId()

  //   // dispatch(deleteDocument(id));
  // }

  // const onEditClick = (id) => {
  //   history.push(`/document-detail/${id}`)
  // }

  return (
    <div>
      <Breadcrumb title="Home" />
      <SearchBar
        name="Documents"
        btnName="Document"
        onClick={onNewButtonClick}
        searchValue={documentSearch}
        setSearchValue={setDocumentSearch}
      />
      {/* <DocumentTable
        documentsList={
          documentSearch
            ? documents.documentsList.filter(
                (el) =>
                  el.name
                    .toLowerCase()
                    .includes(documentSearch.toLowerCase()) ||
                  el.description
                    .toLowerCase()
                    .includes(documentSearch.toLowerCase())
              )
            : documents.documentsList
        }
        total={documents.total}
        loading={documents.subLoading}
        onEditClick={onEditClick}
        onDeleteClick={onDeleteClick}
        getDocumentsList={(pageNo) => dispatch(getDocumentsList(pageNo))}
      />

      <DeleteModal
        isOpen={deleteId ? true : false}
        setIsOpen={setDeleteId}
        name="document"
        onDelete={handleDelete}
      /> */}
    </div>
  )
}

export default Home
