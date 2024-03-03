import React, { useState, useEffect } from 'react';

import moment from 'moment';
import { Input } from 'reactstrap';
import Container from 'react-bootstrap/Container';

import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import overlayFactory from 'react-bootstrap-table2-overlay';

import { ReactComponent as ShowIcon } from '../../assets/icons/eye.svg';
import { ReactComponent as EditIcon } from '../../assets/icons/edit.svg';
import { ReactComponent as BinIcon } from '../../assets/icons/bin.svg';
import { ReactComponent as LinkIcon } from '../../assets/icons/link.svg';

import { useTranslation } from 'react-i18next';

const PoapList = (props) => {
  const { t } = useTranslation();

  const isLoading = props.loading === true ? true : false;
  const [pageNo, setPageNo] = useState(null);
  
  useEffect(() => {
    if (Math.ceil(props.total / 5) < pageNo) {
      setPageNo(Math.ceil(props.total / 5));
      props.getPoapsList(Math.ceil(props.total / 5));
    }
  }, [props.total]);

  const columns = [
    {
      key: 'doc-row',
      text: '',
      dataField: 'doc-row',
      headerStyle: { textAlign: 'center' },
      style: { textAlign: 'center' },
      formatter: (rowContent, row) => {
        return (
          <div className="user-avatar-div">
            <img
                src={row.image}
                alt="Poap"
                className="rounded-circle profile-img"
                style={{ maxHeight: 100, maxWidth: 100, minHeight: 100 }}
              />
          </div>
        );
      },
    },
    {
      key: 'name',
      dataField: 'name',
      text: t('Name'),
      style: { fontWeight: 500, textAlign: 'center' },
      headerStyle: { textAlign: 'center' },
      formatter: (rowContent, row) => row.name,
    },
    {
      key: 'dates',
      dataField: 'dates',
      text: t('Start date / End date'),
      headerStyle: { textAlign: 'center' },
      style: { textAlign: 'center' },
      formatter: (rowContent, row) => {
        return (
          <>
            <div>{moment(row.startDate).format('DD MMMM YYYY')}</div>
            <div>{moment(row.endDate).format('DD MMMM YYYY')}</div>
          </>
        );
      },
    },
    {
      key: 'isPoap',
      dataField: 'isPoap',
      text: t('POAP Blockchain'),
      headerStyle: { textAlign: 'center' },
      style: { textAlign: 'center' },
      formatter: (rowContent, row) => {
        return <Input type="checkbox" checked={row.isPoap} disabled />;
      },
    },
    {
      key: 'isRedeemable',
      dataField: 'isRedeemable',
      text: t('Redeemable'),
      headerStyle: { textAlign: 'center' },
      style: { textAlign: 'center' },
      formatter: (rowContent, row) => {
        return <Input type="checkbox" checked={row.isRedeemable} disabled />;
      },
    },

    {
      key: 'codesUsed',
      dataField: 'codesUsed',
      text: t('Available Mint Links'),
      headerStyle: { textAlign: 'center' },
      style: { textAlign: 'center' },
      formatter: (rowContent, row) => <p>{props.poapCounData[row.id]}</p>,
    },

    {
      key: 'actions',
      dataField: 'actions',
      text: t('Actions'),
      headerStyle: { textAlign: 'center' },
      style: { textAlign: 'center' },
      formatter: (rowContent, row) => {
        return (
          <div className="d-flex align-items-center justify-content-center">
            <ShowIcon
              className="clickable"
              style={{
                paddingTop: '2px',
                width: '25px',
                height: '25px',
                fill: '#f21a18',
              }}
              onClick={() => props.onDetailShow(row)}
            />
            <EditIcon
              className="clickable mx-2"
              style={{
                width: '20px',
                height: '20px',
                fill: '#f21a18',
              }}
              onClick={() => props.onEditClick(row)}
            />
            <BinIcon
              className="clickable me-2"
              style={{
                width: '25px',
                height: '25px',
                stroke: '#f21a18',
              }}
              onClick={() => props.onDeleteClick(row.id)}
            />
            <LinkIcon
              className="clickable"
              style={{
                width: '19px',
                height: '19px',
                fill: '#f21a18',
              }}
              onClick={() => {
                props.onAddMintLinks(row);
              }}
            />
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
        data={props.poapsList}
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

export default PoapList;
