import * as yup from 'yup'
import { entranceFormSchema, pavilionFormSchema } from './schemas'

export type EntranceFormValues = yup.InferType<typeof entranceFormSchema>

export type PavilionFormValues = yup.InferType<typeof pavilionFormSchema>
