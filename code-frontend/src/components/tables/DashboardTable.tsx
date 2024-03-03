import { useTranslation } from 'react-i18next'
import { Container, DropdownItem, DropdownMenu, DropdownToggle, FormGroup, Input, UncontrolledDropdown } from 'reactstrap'
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'

import Button from 'react-bootstrap/Button'

import { ReactComponent as EditIcon } from '../../assets/icons/pencil.svg'
import { ReactComponent as DeleteIcon } from '../../assets/icons/trash.svg'

type RowData = {
  id: string
  active: boolean
  name: string
  forcedStatus: boolean
  forcedStatusValue: number
}

type DashboardTableProps = {
  data: RowData[]
  onChangeForcedStatus?: (pavilionId: string, status: boolean) => void
  onDeleteClick?: (id: string) => void
  onEditClick?: (data: RowData) => void
  total?: number
}

const columnHelper = createColumnHelper<RowData>()

const thresholdColors = [
  { name: 'threshold0', value: '#E1E0DB' },
  { name: 'threshold1', value: '#19FE00' },
  { name: 'threshold2', value: '#FFCE00' },
  { name: 'threshold3', value: '#FF6702' },
  { name: 'threshold4', value: '#F10B1B' },
  { name: 'threshold5', value: '#9E003F' },
]

export default function DashboardTable(props: DashboardTableProps) {
  const { data = [], onChangeForcedStatus } = props

  const { t } = useTranslation()

  const columns = [
    columnHelper.accessor('name', {
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('active', {
      cell: ({ getValue }) => <Input checked={getValue()} type="checkbox" />,
      meta: {
        className: 'text-center',
      },
    }),
    columnHelper.accessor('forcedStatus', {
      header: t('Force Status'),
      cell: ({ getValue, row }) => (
        <FormGroup className="d-inline-block" switch>
          <Input
            defaultChecked={getValue()}
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
      header: t('Forced Status'),
      cell: () => (
        <UncontrolledDropdown direction="end">
          <DropdownToggle
            tag="button"
            style={{ backgroundColor: '#F10B1B', width: '32px', height: '32px', borderRadius: '100%', border: '1px solid #707070' }}
          ></DropdownToggle>
          <DropdownMenu style={{ background: '#EEE', borderRadius: '13px', border: '1px solid #707070', minWidth: 0, transform: 'translate3d(0px, 0px, 0px)' }}>
            {thresholdColors.map((thresholdColor) => (
              <DropdownItem key={thresholdColor.name} className="dropdown-item-hover-transparent" tag="div">
                <button style={{ backgroundColor: thresholdColor.value, width: '32px', height: '32px', borderRadius: '100%', border: '1px solid #707070' }} />
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
          <Button onClick={() => props.onDeleteClick?.(row.original.id)} variant="danger">
            <DeleteIcon style={{ height: '100%', minWidth: '15', fill: '#fff' }} />
          </Button>
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
      <table className="table table-responsive table-common user-table">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className={header.column.columnDef.meta?.className} scope="col" style={header.column.columnDef.meta?.style}>
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
                <td key={cell.id} className={cell.column.columnDef.meta?.className} style={cell.column.columnDef.meta?.style}>
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
