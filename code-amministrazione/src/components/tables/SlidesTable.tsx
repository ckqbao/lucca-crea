import clsx from 'clsx'
import { useTranslation } from 'react-i18next'
import { Table } from 'reactstrap'
import { createColumnHelper, flexRender, getCoreRowModel, getExpandedRowModel, useReactTable } from '@tanstack/react-table'

import Button from 'react-bootstrap/Button'

import { ReactComponent as DeleteIcon } from '@/assets/icons/trash.svg'
import { ReactComponent as EditIcon } from '@/assets/icons/pencil.svg'

type SlideData = {
  id: string
  fileName: string
  title: string
  type: 'image' | 'video'
}

type SlidesTableProps = {
  data: SlideData[]
  onDeleteClick?: (id: string) => void
  onEditClick?: (data: SlideData) => void
  total?: number
}

const columnHelper = createColumnHelper<SlideData>()

export default function SlidesTable(props: SlidesTableProps) {
  const { data = [], onDeleteClick, onEditClick } = props

  const { t } = useTranslation()

  const columns = [
    columnHelper.accessor('title', {
      header: t('Title'),
    }),
    columnHelper.accessor('fileName', {
      header: t('File name'),
    }),
    columnHelper.accessor('type', {
      header: t('Type'),
      meta: { className: 'text-center' },
    }),
    columnHelper.display({
      id: 'actions',
      header: t('Actions'),
      cell: ({ row }) => (
        <div className="d-flex justify-content-end g-2 text-primary">
          <Button className="me-1" onClick={() => onEditClick?.(row.original)} variant="warning">
            <EditIcon style={{ height: '100%', minWidth: '15', fill: '#fff' }} />
          </Button>
          <Button className="" onClick={() => onDeleteClick?.(row.original.id)} variant="danger">
            <DeleteIcon style={{ height: '100%', minWidth: '15', fill: '#fff' }} />
          </Button>
        </div>
      ),
      meta: { className: 'text-end' },
    }),
  ]

  const table = useReactTable<SlideData>({
    data,
    columns,
    enableExpanding: true,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <Table responsive>
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
              <td key={cell.id} className={cell.column.columnDef.meta?.className} style={cell.column.columnDef.meta?.style}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  )
}
