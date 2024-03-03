import _ from 'lodash'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { XCircleIcon } from '@heroicons/react/20/solid'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import SelectInput from '@/components/ui/inputs/SelectInput'

import { useLoginMutation } from '@/services/api/auth'
import { useGetPavilionsListQuery } from '@/services/api/pavilions'

const loginSchema = yup.object({
  pavilion: yup.string().required(),
  entrance: yup.string().required(),
  username: yup.string().required(),
})

type LoginFormValues = yup.InferType<typeof loginSchema>

export default function LoginPage() {
  const navigate = useNavigate()
  const { t } = useTranslation()

  const { control, handleSubmit, register, setValue, watch } = useForm<LoginFormValues>({ resolver: yupResolver(loginSchema) })
  const selectedPavilion = watch('pavilion')

  const { data: pavilionsListData } = useGetPavilionsListQuery()
  const [login, { error }] = useLoginMutation()

  const { results: pavilions } = pavilionsListData ?? {}

  const pavilionOptions = useMemo(() => pavilions?.map((pavilion) => ({ label: pavilion.name, value: pavilion.id })) ?? [], [pavilions])
  const entranceOptions = useMemo(
    () => pavilions?.find((pavilion) => pavilion.id === selectedPavilion)?.entrances.map((entrance) => ({ label: entrance.name, value: entrance._id })) ?? [],
    [pavilions, selectedPavilion]
  )

  const onLogin: SubmitHandler<LoginFormValues> = async (values) => {
    await login({ username: values.username }).unwrap()
    navigate('/', { state: { pavilionId: values.pavilion, entranceId: values.entrance } })
  }

  return (
    <div className="w-full h-full flex flex-col items-center">
      <div className="relative w-full flex-1 max-w-xs mt-20 mb-32">
        <form className="flex h-full flex-col justify-between" onSubmit={handleSubmit(onLogin)}>
          <div
            className="flex flex-col space-y-8 border-2 border-[#171905] px-10 py-6 rounded-2xl"
            style={{ background: 'transparent radial-gradient(closest-side at 50% 50%, #92AD4F 0%, #495728 100%) 0% 0% no-repeat padding-box' }}
          >
            <div>
              <Controller
                control={control}
                name="pavilion"
                render={({ field: { value }, formState: { errors } }) => (
                  <SelectInput
                    error={!!errors.pavilion}
                    onChange={(value) => setValue('pavilion', value, { shouldValidate: true })}
                    options={pavilionOptions}
                    placeholder={t('Select pavilion')}
                    value={value}
                  />
                )}
              />
            </div>
            <div>
              <Controller
                control={control}
                name="entrance"
                render={({ field: { value }, formState: { errors } }) => (
                  <SelectInput
                    error={!!errors.entrance}
                    onChange={(value) => setValue('entrance', value, { shouldValidate: true })}
                    options={entranceOptions}
                    placeholder={t('Select entrance')}
                    value={value}
                  />
                )}
              />
            </div>
          </div>
          <div>
            {error && (
              <div className="rounded-md bg-red-50 mb-4 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">{_.get(error, 'data.message')}</h3>
                  </div>
                </div>
              </div>
            )}
            <label htmlFor="username" className="block text-lg font-medium leading-6 text-[#92AD4F]">
              {t('Operator Code')}
            </label>
            <div className="mt-2">
              <input
                {...register('username')}
                type="text"
                className="block w-full rounded-md border-0 px-6 py-7 text-gray-900 shadow-sm placeholder:text-[#504F4F73]"
                placeholder="opcode"
              />
            </div>
            <p className='text-white py-1'>{t('Please use lowercap letters')}</p>
          </div>
          <div className="flex items-center justify-center">
            <button
              className="border-2 border-[#171905] px-14 py-8 rounded-xl text-2xl text-[#DFDFDF]"
              style={{ background: 'transparent radial-gradient(closest-side at 50% 50%, #F10B1B 0%, #E80B1A 24%, #79060E 130%) 0% 0% no-repeat padding-box' }}
              type="submit"
            >
              {t('Login')}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
