import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Container, Input } from 'reactstrap'
import BootstrapTable from 'react-bootstrap-table-next'
import overlayFactory from 'react-bootstrap-table2-overlay'
import paginationFactory from 'react-bootstrap-table2-paginator'

import Button from 'react-bootstrap/Button'

import { ReactComponent as EditIcon } from '../../assets/icons/pencil.svg'
import { ReactComponent as DeleteIcon } from '../../assets/icons/trash.svg'
import { ReactComponent as UsersIcon } from '../../assets/icons/users.svg'

export default function CategoriesTable(props) {
  const { data = [] } = props

  const history = useHistory()
  const { t } = useTranslation()

  const columns = [
    {
      key: 'name',
      dataField: 'name',
      text: 'Category Name',
      headerClasses: 'align-middle'
    },
    {
      key: 'description',
      dataField: 'description',
      text: 'Category Description',
      headerClasses: 'align-middle'
    },
    {
      key: 'deadline',
      dataField: 'deadline',
      text: 'Deadline',
      align: 'center',
      headerAlign: 'center',
      headerClasses: 'align-middle'
    },
    {
      key: 'participantsNumber',
      dataField: 'participantsNumber',
      text: 'Number of participants',
      align: 'center',
      headerAlign: 'center',
      headerClasses: 'align-middle'
    },
    {
      key: 'active',
      dataField: 'active',
      text: 'isActive',
      align: 'center',
      headerAlign: 'center',
      headerClasses: 'align-middle',
      formatter: (rowContent, row) => {
        return <Input checked={row.active ?? false} readOnly type="checkbox" />
      },
    },
    {
      key: 'actions',
      dataField: 'actions',
      text: t('Actions'),
      align: 'center',
      headerAlign: 'center',
      headerClasses: 'align-middle',
      formatter: (rowContent, row) => {
        return (
          <div className="text-primary">
            <Button
              className="me-1"
              onClick={() => history.push(`/categories/${row.id}/participants`)}
              variant="info"
            >
              <UsersIcon
                style={{
                  height: '100%',
                  minWidth: '15',
                  width: '24px',
                  fill: '#fff',
                }}
              />
            </Button>
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
        )
      },
    },
  ]

  const pagination = paginationFactory({
    sizePerPage: 20,
    page: 1,
    withFirstAndLast: false,
    alwaysShowAllBtns: true,
    hideSizePerPage: true,
    totalSize: props.total ?? 0,
  })

  const onTableChange = () => {}

  return (
    <Container fluid={true} className="table-container">
      <BootstrapTable
        keyField="id"
        data={data}
        columns={columns}
        pagination={pagination}
        bordered={false}
        classes="table-responsive table-common user-table"
        headerClasses="header-class-dark-table"
        rowClasses={(row) => row.active ? '' : 'opacity-25'}
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
        loading={false}
        noDataIndication={<></>}
      />
    </Container>
  )
}
