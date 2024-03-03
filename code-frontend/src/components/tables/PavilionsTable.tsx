import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Container, Table } from 'reactstrap'
import { ExpandedState, createColumnHelper, flexRender, getCoreRowModel, getExpandedRowModel, useReactTable } from '@tanstack/react-table'

import Button from 'react-bootstrap/Button'

import { ReactComponent as DeleteIcon } from '@/assets/icons/trash.svg'
import { ReactComponent as EditIcon } from '@/assets/icons/pencil.svg'
import { ReactComponent as ExpandIcon } from '@/assets/icons/expand.svg'
import { ReactComponent as MinimizeIcon } from '@/assets/icons/minimize.svg'

type PavilionData = {
  id: string
  pavilionName: string
  entranceName?: string
  entranceThreshold1?: number
  entranceThreshold2?: number
  entranceThreshold3?: number
  entranceThreshold4?: number
  entranceThreshold5?: number
  subRows?: PavilionData[]
}

type PavilionsTableProps = {
  data: PavilionData[]
  onDeleteClick?: (id: string) => void
  onEditClick?: (data: PavilionData) => void
  total?: number
}

const columnHelper = createColumnHelper<PavilionData>()

export default function PavilionsTable(props: PavilionsTableProps) {
  const { data = [], onDeleteClick, onEditClick } = props

  const { t } = useTranslation()

  const columns = [
    columnHelper.accessor('pavilionName', {
      cell: (info) => info.getValue(),
      footer: (footerProps) => footerProps.column.id,
    }),
    columnHelper.accessor('entranceName', {
      header: t('Entrance Name'),
    }),
    columnHelper.accessor('entranceThreshold1', {
      meta: { className: 'text-center' },
    }),
    columnHelper.accessor('entranceThreshold2', {
      meta: { className: 'text-center' },
    }),
    columnHelper.accessor('entranceThreshold3', {
      meta: { className: 'text-center' },
    }),
    columnHelper.accessor('entranceThreshold4', {
      meta: { className: 'text-center' },
    }),
    columnHelper.accessor('entranceThreshold5', {
      meta: { className: 'text-center' },
    }),
    columnHelper.display({
      id: 'actions',
      header: t('Actions'),
      cell: ({ row }) =>
        !!row.original.pavilionName && (
          <div className="d-flex justify-content-end g-2 text-primary">
            {!!row.original.entranceName && !!row.original.subRows?.length && (
              <Button className="me-1" onClick={row.getToggleExpandedHandler()}>
                {row.getIsExpanded() ? <MinimizeIcon width={16} height={16} /> : <ExpandIcon width={16} height={16} style={{ fill: '#fff' }} />}
              </Button>
            )}
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

  const [expanded, setExpanded] = useState<ExpandedState>({})

  const table = useReactTable<PavilionData>({
    data,
    columns,
    enableExpanding: true,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getSubRows: (row) => row.subRows,
    onExpandedChange: setExpanded,
    state: {
      expanded,
    },
  })

  return (
    <Table responsive>
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
    </Table>
  )
}
