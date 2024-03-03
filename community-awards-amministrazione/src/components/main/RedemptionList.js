import React, { useState, useEffect } from 'react';

import moment from 'moment';
import Container from 'react-bootstrap/Container';

import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import overlayFactory from 'react-bootstrap-table2-overlay';

import { useTranslation } from 'react-i18next';

const RedemptionList = (props) => {
  const { t } = useTranslation();

  const isLoading = props.loading === true ? true : false;
  const [pageNo, setPageNo] = useState(null);

  const imageDivStyle = {
    textAlign: 'center',
  };

  const smallText = {
    fontSize: '12 px !important',
  };

  useEffect(() => {
    if (Math.ceil(props.total / 5) < pageNo) {
      setPageNo(Math.ceil(props.total / 5));
      props.getRedemptionsList(Math.ceil(props.total / 5));
    }
  }, [props.total]);

  const columns = [
    {
      key: 'doc-row',
      text: t('POAP image'),
      dataField: 'doc-row',
      headerStyle: { textAlign: 'center' },
      style: { textAlign: 'center' },
      formatter: (rowContent, row) => {
        return (
          <>
            <div className="user-avatar-div" style={imageDivStyle}>
              {row.poapId?.image ? (
                <img
                  src={row.poapId?.image}
                  alt="Redemption"
                  className="rounded-circle profile-img"
                  style={{ maxHeight: 50, maxWidth: 50, minHeight: 50 }}
                />
              ) : (
                <img
                  src={row.poapId?.fallbackImage}
                  alt="Redemption"
                  className="rounded-circle profile-img"
                  style={{ maxHeight: 50, maxWidth: 50, minHeight: 50 }}
                />
              )}
            </div>
          </>
        );
      },
    },
    {
      key: 'poapName',
      dataField: 'poapName',
      text: t('POAP name'),
      style: { fontWeight: 500, textAlign: 'center' },
      headerStyle: { textAlign: 'center' },
      formatter: (rowContent, row) => row.poapId.name,
    },
    {
      key: 'userFullname',
      dataField: 'userFullname',
      text: t('User fullname'),
      style: { fontWeight: 500, textAlign: 'center' },
      headerStyle: { textAlign: 'center' },
      formatter: (rowContent, row) => {
        return (
          <>
            {row.externalUserData.first_name +
              ' ' +
              row.externalUserData.last_name}
            <br />
            <span className="externalUserId" style={smallText}>
              {row.externalUserId}
            </span>
          </>
        );
      },
    },
    {
      key: 'email',
      dataField: 'email',
      text: t('Email'),
      style: { fontWeight: 500, textAlign: 'center' },
      headerStyle: { textAlign: 'center' },
      formatter: (rowContent, row) => row.externalUserData.email,
    },
    {
      key: 'redeemedAt',
      dataField: 'redeemedAt',
      text: t('Redeemed at'),
      headerStyle: { textAlign: 'center' },
      style: { textAlign: 'center' },
      formatter: (rowContent, row) =>
        moment(row.startDate).format('DD MMMM YYYY hh:mm:ss'),
    },
    {
      key: 'ticketNumber',
      dataField: 'ticketNumber',
      text: t('Ticket number'),
      headerStyle: { textAlign: 'center' },
      style: { textAlign: 'center' },
      formatter: (rowContent, row) => row.ticketNumber,
    },
    {
      key: 'mintingLink',
      dataField: 'mintingLink',
      text: t('Mint link'),
      headerStyle: { textAlign: 'center' },
      style: { textAlign: 'center' },
      formatter: (rowContent, row) => {
        return (
          <a
            href={row.mintingLink}
            style={{ color: 'blue', textDecoration: 'underline' }}
          >
            {row.mintingLink}
          </a>
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
        data={props.redemptionsList}
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

export default RedemptionList;
