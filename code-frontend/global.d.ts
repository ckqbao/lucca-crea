import '@tanstack/react-table'
import { CSSProperties } from 'react'

declare module '@tanstack/react-table' {
  interface ColumnMeta<TData extends RowData, TValue> {
    className?: string
    style?: CSSProperties
  }
}
