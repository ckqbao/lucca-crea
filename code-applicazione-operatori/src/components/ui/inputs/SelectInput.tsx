import clsx from 'clsx'
import { Fragment } from 'react'
import { Listbox, Transition } from '@headlessui/react'

type SelectInputProps = {
  error?: boolean
  label?: string
  onChange: (value: string) => void
  options: Array<{
    label: string
    value: string
  }>
  placeholder?: string
  value: string
}
export default function SelectInput(props: SelectInputProps) {
  const { error, label, onChange, options, placeholder, value } = props

  return (
    <Listbox value={value} onChange={onChange}>
      {({ open }) => (
        <div className="flex flex-col space-y-2">
          {label && <Listbox.Label className="block text-sm font-medium leading-6 text-gray-900">{label}</Listbox.Label>}
          <div className="relative">
            <Listbox.Button
              className={clsx(
                'relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm focus:outline-none focus:ring-0 sm:text-sm sm:leading-6',
                {
                  'border-2 border-red-500': !!error,
                }
              )}
            >
              <span className="block truncate">{options.find((option) => option.value === value)?.label ?? placeholder}</span>
            </Listbox.Button>

            <Transition show={open} as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
              <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {options.map((option) => (
                  <Listbox.Option
                    key={option.value}
                    className={({ active }) => clsx(active ? 'bg-[#92AD4F] text-white' : 'text-gray-900', 'relative cursor-default select-none py-2 pl-3 pr-9')}
                    value={option.value}
                  >
                    {({ selected }) => <span className={clsx(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>{option.label}</span>}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </div>
      )}
    </Listbox>
  )
}
