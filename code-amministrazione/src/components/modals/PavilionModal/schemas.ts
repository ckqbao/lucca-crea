import * as yup from 'yup'

export const entranceFormSchema = yup.object({
  _id: yup.string(),
  code: yup.string().required(),
  coordinates: yup.string().required(),
  name: yup.string().required(),
  threshold0: yup.string().required(),
  threshold1: yup.string().required(),
  threshold2: yup.string().required(),
  threshold3: yup.string().required(),
  threshold4: yup.string().required(),
  threshold5: yup.string().required(),
})

export const pavilionFormSchema = yup.object({
  id: yup.string(),
  active: yup.boolean().required(),
  code: yup.string().required(),
  coordinates: yup.string().required(),
  entrances: yup.array().of(entranceFormSchema).min(1),
  name: yup.string().required(),
})
