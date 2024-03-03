import React, { useState, useEffect } from 'react';
import { Container } from 'reactstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import overlayFactory from 'react-bootstrap-table2-overlay';

import proPic from './../../assets/images/propic.png';

import { ReactComponent as EditIcon } from '../../assets/icons/pencil.svg';
import { ReactComponent as DeleteIcon } from '../../assets/icons/trash.svg';

import Button from 'react-bootstrap/Button';

import { users } from '../../constants/Data';

import { useTranslation } from 'react-i18next';

const UsersTable = (props) => {
  const { t } = useTranslation();

  const isLoading = props.loading === true ? true : false;
  const [pageNo, setPageNo] = useState(null);

  useEffect(() => {
    if (Math.ceil(props.total / 5) < pageNo) {
      setPageNo(Math.ceil(props.total / 5));
      props.getUsersList(Math.ceil(props.total / 5));
    }
  }, [props.total]);

  const columns = [
    {
      key: 'doc-row',
      text: '#',
      dataField: 'doc-row',
      formatter: (rowContent, row) => {
        return (
          <div className="user-avatar-div">
            {row.avatar ? (
              <img
                src={row.avatar ? row.avatar : proPic}
                alt="User"
                className="rounded-circle profile-img"
                style={{ maxHeight: 50, maxWidth: 50, minHeight: 50 }}
              />
            ) : (
              <div>
                {row.name[0].toUpperCase() + row.surname[0].toUpperCase()}
              </div>
            )}
          </div>
        );
      },
    },
    {
      key: 'name',
      dataField: 'name',
      text: t('Name and Surname'),
      style: { fontWeight: 500 },
      formatter: (rowContent, row) => row.name + ' ' + row.surname,
    },
    {
      key: 'email',
      dataField: 'email',
      text: 'Email',
    },
    {
      key: 'role',
      dataField: 'role',
      text: t('Role'),
      style: { color: '#74788D' },
      formatter: (rowContent, row) =>
        users.find((el) => el.value === row.role).name,
    },

    {
      key: 'actions',
      dataField: 'actions',
      text: t('Actions'),
      headerStyle: { textAlign: 'center' },
      style: { textAlign: 'center' },
      formatter: (rowContent, row) => {
        return (
          <div className="text-primary">
            <Button
              onClick={() => props.onEditClick(row)}
              variant="warning"
              className="me-1"
            >
              <EditIcon
                style={{ height: '100%', minWidth: '15', fill: '#fff' }}
              />
            </Button>
            <Button
              onClick={() => props.onDeleteClick(row.id)}
              variant="danger"
            >
              <DeleteIcon
                style={{ height: '100%', minWidth: '15', fill: '#fff' }}
              />
            </Button>
          </div>
        );
      },
    },
  ];

  const pagination = paginationFactory({
    sizePerPage: 20,
    page: pageNo ? pageNo : 1,
    withFirstAndLast: false,
    alwaysShowAllBtns: true,
    hideSizePerPage: true,
    totalSize: props.total,
  });

  const onTableChange = (name, e) => {
    setPageNo(e.page);
    props.getUsersList(e.page);
  };

  return (
    <Container fluid={true} className="table-container">
      <BootstrapTable
        keyField="id"
        data={props.usersList}
        columns={columns}
        pagination={pagination}
        bordered={false}
        classes="table-responsive table-common user-table"
        headerClasses="header-class-dark-table"
        overlay={overlayFactory({
          spinner: true,
          styles: {
            spinner: (base) => ({
              ...base,
              '& svg circle': { stroke: '#DA1021' },
              width: '50px',
            }),
            overlay: (base) => ({
              ...base,
              background: 'rgba(255, 255, 255, 0.9)',
            }),
          },
        })}
        onTableChange={onTableChange}
        remote
        loading={isLoading}
        noDataIndication={<></>}
      />
    </Container>
  );
};

export default UsersTable;
