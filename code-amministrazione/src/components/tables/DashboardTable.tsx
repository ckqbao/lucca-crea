import clsx from 'clsx'
import { useTranslation } from 'react-i18next'
import { Container, DropdownItem, DropdownMenu, DropdownToggle, FormGroup, Input, UncontrolledDropdown } from 'reactstrap'
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'

import Button from 'react-bootstrap/Button'

import { ReactComponent as EditIcon } from '../../assets/icons/pencil.svg'
// import { ReactComponent as DeleteIcon } from '../../assets/icons/trash.svg'

type RowData = {
  id: string
  active: boolean
  currentStatus: string
  name: string
  entranceName: string
  forcedStatus: boolean
  forcedStatusValue: number
  userSubmittedData: {
    threshold0Count: number
    threshold1Count: number
    threshold2Count: number
    threshold3Count: number
    threshold4Count: number
    threshold5Count: number
  }
}

type DashboardTableProps = {
  data: RowData[]
  onChangeForcedStatus?: (pavilionId: string, status: boolean) => void
  onChangeForcedStatusValue?: (pavilionId: string, value: number) => void
  onDeleteClick?: (id: string) => void
  onEditClick?: (data: RowData) => void
  total?: number
}

const columnHelper = createColumnHelper<RowData>()

const thresholdLevels = [
  { name: 'threshold0', color: '#E1E0DB', value: 15 },
  { name: 'threshold1', color: '#19FE00', value: 30 },
  { name: 'threshold2', color: '#FFCE00', value: 60 },
  { name: 'threshold3', color: '#FF6702', value: 90 },
  { name: 'threshold4', color: '#F10B1B', value: 120 },
  { name: 'threshold5', color: '#9E003F', value: 150 },
]

export default function DashboardTable(props: DashboardTableProps) {
  const { data = [], onChangeForcedStatus, onChangeForcedStatusValue } = props

  const { t } = useTranslation()

  const columns = [
    columnHelper.accessor('name', {
      header: t('Pavilion Name'),
    }),
    columnHelper.accessor('entranceName', {
      header: t('Entrance Name'),
    }),
    columnHelper.accessor('userSubmittedData', {
      header: t('Feedback received within the last hour'),
      cell: ({ getValue }) => (
        <div className="tw-w-full tw-flex tw-items-center tw-justify-center tw-space-x-12">
          {thresholdLevels.map((threshold) => (
            <div
              key={threshold.name}
              className="tw-w-10 tw-h-8 tw-flex tw-items-center tw-justify-center tw-border tw-border-[#707070] tw-rounded-xl"
              style={{ background: threshold.color }}
            >
              <span className="tw-text-xl text-white">{getValue()[`${threshold.name}Count` as keyof RowData['userSubmittedData']]}</span>
            </div>
          ))}
        </div>
      ),
      meta: {
        className: 'text-center',
      },
    }),
    columnHelper.accessor('currentStatus', {
      header: t('Current status'),
      cell: ({ getValue }) => <div className="tw-w-8 tw-h-8 tw-border tw-border-[#707070] tw-rounded-full" style={{ backgroundColor: getValue() }} />,
      meta: {
        className: 'tw-flex tw-items-center tw-justify-center text-center',
      },
    }),
    columnHelper.accessor('active', {
      header: t('Active'),
      cell: ({ getValue }) => <Input checked={getValue()} type="checkbox" readOnly />,
      meta: {
        className: 'text-center',
      },
    }),
    columnHelper.accessor('forcedStatus', {
      header: t('Force status'),
      cell: ({ getValue, row }) => (
        <FormGroup className="d-inline-block !tw-m-0" switch>
          <Input
            className="tw-cursor-pointer"
            checked={getValue()}
            onChange={(event) => onChangeForcedStatus?.(row.original.id, event.target.checked)}
            type="switch"
            role="switch"
            style={{ width: '3em', height: '1.5em' }}
          />
        </FormGroup>
      ),
      meta: {
        className: 'text-center',
      },
    }),
    columnHelper.accessor('forcedStatusValue', {
      header: t('Forced status'),
      cell: ({ getValue, row }) => (
        <UncontrolledDropdown direction="end">
          <DropdownToggle
            tag="button"
            style={{
              backgroundColor: thresholdLevels.find(({ value }) => getValue() === value)?.color ?? '#E1E0DB',
              width: '32px',
              height: '32px',
              borderRadius: '100%',
              border: '1px solid #707070',
            }}
          />
          <DropdownMenu style={{ background: '#EEE', borderRadius: '13px', border: '1px solid #707070', minWidth: 0, transform: 'translate3d(0px, 0px, 0px)' }}>
            {thresholdLevels.map((thresholdLevel) => (
              <DropdownItem
                key={thresholdLevel.name}
                className="dropdown-item-hover-transparent"
                tag="div"
                onClick={() => onChangeForcedStatusValue?.(row.original.id, thresholdLevel.value)}
              >
                <button style={{ backgroundColor: thresholdLevel.color, width: '32px', height: '32px', borderRadius: '100%', border: '1px solid #707070' }} />
              </DropdownItem>
            ))}
          </DropdownMenu>
        </UncontrolledDropdown>
      ),
      meta: { className: 'text-center' },
    }),
    columnHelper.display({
      id: 'actions',
      header: t('Actions'),
      cell: ({ row }) => (
        <div className="text-primary">
          <Button onClick={() => props.onEditClick?.(row.original)} variant="warning" className="me-1">
            <EditIcon style={{ height: '100%', minWidth: '15', fill: '#fff' }} />
          </Button>
          {/* <Button onClick={() => props.onDeleteClick?.(row.original.id)} variant="danger">
            <DeleteIcon style={{ height: '100%', minWidth: '15', fill: '#fff' }} />
          </Button> */}
        </div>
      ),
      meta: { className: 'text-end' },
    }),
  ]

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <Container fluid={true} className="table-container">
      <p className="mt-4 mb-4">
        Questo cruscotto rappresenta la situazione attuale dei padiglioni monitorati.
      </p>
      <table className="table table-responsive table-common user-table">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className={clsx('tw-align-middle', header.column.columnDef.meta?.className)}
                  scope="col"
                  style={header.column.columnDef.meta?.style}
                >
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className={clsx('tw-align-middle', cell.column.columnDef.meta?.className)} style={cell.column.columnDef.meta?.style}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  )
}
