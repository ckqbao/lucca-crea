import { useTranslation } from 'react-i18next'
import { Container, Input } from 'reactstrap'
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'

import Button from 'react-bootstrap/Button'

import { ReactComponent as EditIcon } from '../../assets/icons/pencil.svg'
import { ReactComponent as DeleteIcon } from '../../assets/icons/trash.svg'

type UserData = {
  id: string
  active: boolean
  email: string
  fullname: string
  role: string
}

type UsersTableProps = {
  data: UserData[]
  onDeleteClick?: (id: string) => void
  onEditClick?: (data: UserData) => void
  total?: number
}

const columnHelper = createColumnHelper<UserData>()

export default function UsersTable(props: UsersTableProps) {
  const { data = [] } = props

  const { t } = useTranslation()

  const columns = [
    columnHelper.accessor('fullname', {
      cell: (info) => info.getValue(),
      header: t('Name and Surname'),
    }),
    columnHelper.accessor('email', {
      header: t('E-mail'),
    }),
    columnHelper.accessor('role', {
      header: t('Role'),
      meta: { className: 'text-center' },
    }),
    columnHelper.accessor('active', {
      cell: ({ getValue }) => <Input defaultChecked={getValue()} type="checkbox" />,
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
      meta: {
        className: 'text-end',
      },
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
