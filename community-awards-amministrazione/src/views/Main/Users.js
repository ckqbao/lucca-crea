import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Breadcrumb from '../../components/common/Breadcrumb';
import UsersTable from '../../components/main/UsersTable';
import SearchBar from '../../components/main/SearchBar';
import UserModal from '../../components/main/UserModal';
import DeleteModal from '../../components/main/DeleteModal';

import {
  getUsersList,
  addUser,
  editUser,
  deleteUser,
} from '../../redux/store/actions/userActions';

import request from '../../helpers/requestHelper';

import { useTranslation } from 'react-i18next';

const Users = (props) => {
  const { t } = useTranslation();

  const history = useHistory();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  const [usersData, setUsersData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formState, setFormState] = useState({
    name: '',
    surname: '',
    email: '',
    password: '',
    confirmPassword: '',
    avatar: '',
    role: '',
    active: true,
  });
  const [deleteId, setDeleteId] = useState();
  const [userSearch, setUserSearch] = useState();
  const [userPics] = useState([]);
  const [previewUrl, setPreviewUrl] = useState();

  useEffect(() => {
    dispatch(getUsersList(1));
  }, [dispatch]);

  useEffect(() => {
    setUsersData(user.usersList);
    if (user.usersList.length) {
      getPicture();
    }
  }, [JSON.stringify(user.usersList)]);

  useEffect(() => {
    if (user.errorMsg && user.errorMsg.code === 401) history.go(0);
  }, [user.errorMsg]);

  const getPicture = async () => {
    let oldData = JSON.parse(JSON.stringify(user.usersList));

    for (var i = 0; i < user.usersList.length; i++) {
      if (user.usersList[i].avatar) {
        const res = await request({
          url: `files/${user.usersList[i].avatar}/type/avatar`,
          auth: true,
          method: 'GET',
        });
        if (!res.code) {
          var objectURL = URL.createObjectURL(res);
          oldData[i].avatar = objectURL;
        }
      }
    }
    setUsersData(oldData);
  };

  const onNewButtonClick = () => {
    setIsModalOpen(true);
  };

  const onEditClick = (item) => {
    setFormState({
      password: '',
      confirmPassword: '',
      role: item.role,
      email: item.email,
      name: item.name,
      surname: item.surname,
      active: item.active,
      id: item.id,
      avatar: item.avatar,
    });
    getSinglePicture(item.avatar);
    setIsModalOpen(true);
  };

  const onSaveClick = (e) => {
    setIsModalOpen(false);
    e.preventDefault();

    let data = {};

    data.email = formState.email;
    data.name = formState.name;
    data.surname = formState.surname;
    data.role = formState.role;
    data.avatar = formState.avatar;

    if (formState.id) {
      if (formState.password) data.password = formState.password;

      data.id = formState.id;
      data.active = formState.active;
      dispatch(editUser(data));
    } else {
      data.password = formState.password;
      dispatch(addUser(data));
    }

    setFormState({
      name: '',
      surname: '',
      email: '',
      password: '',
      confirmPassword: '',
      avatar: '',
      role: '',
      active: true,
    });
  };

  const onDeleteClick = (id) => {
    setDeleteId(id);
  };

  const handleDelete = () => {
    let id = deleteId;
    setDeleteId();

    dispatch(deleteUser(id));
  };

  const getSinglePicture = async (avatarName) => {
    if (avatarName) {
      const res = await request({
        url: `files/${avatarName}/type/avatar`,
        auth: true,
        method: 'GET',
      });
      if (!res.code) {
        var objectURL = URL.createObjectURL(res);
        setPreviewUrl(objectURL);
      }
    }
  };

  return (
    <div>
      <Breadcrumb
        title="Home"
        breadcrumbItem={t('Users')}
        breadcrumbItemName={t('Users')}
      />
      <SearchBar
        name="Users"
        btnName="User"
        onClick={onNewButtonClick}
        searchValue={userSearch}
        setSearchValue={setUserSearch}
      />
      <UsersTable
        onEditClick={onEditClick}
        onDeleteClick={onDeleteClick}
        usersList={
          userSearch
            ? usersData.filter(
                (el) =>
                  (el.name + ' ' + el.surname)
                    .toLowerCase()
                    .includes(userSearch.toLowerCase()) ||
                  el.email.toLowerCase().includes(userSearch.toLowerCase())
              )
            : usersData
        }
        userPics={userPics}
        total={user.total}
        loading={user.subLoading}
        getUsersList={(pageNo) => dispatch(getUsersList(pageNo))}
      />
      <UserModal
        formState={formState}
        setFormState={setFormState}
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        name="User"
        onSaveClick={onSaveClick}
        previewUrl={previewUrl}
        setPreviewUrl={setPreviewUrl}
      />
      <DeleteModal
        isOpen={deleteId ? true : false}
        setIsOpen={setDeleteId}
        name="user"
        onDelete={handleDelete}
      />
    </div>
  );
};

export default Users;
