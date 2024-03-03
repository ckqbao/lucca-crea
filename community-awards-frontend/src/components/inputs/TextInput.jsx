import { ExclamationCircleIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx'

export default function TextInput(props) {
  const { defaultValue, error = false, helperText, inputRef, label, name, placeholder, type = 'text', ...rest } = props
  return (
    <div>
      {label && (
        <label htmlFor={name} className="block text-sm font-medium leading-6 text-gray-900">
          {label}
        </label>
      )}
      <div className="relative mt-2 rounded-md shadow-sm">
        <input
          {...rest}
          ref={inputRef}
          type={type}
          name={name}
          className={clsx('block w-full rounded-md border-0 py-1.5 pr-10 ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6', {
            'ring-red-300 placeholder:text-red-300  focus:ring-red-500': error,
          })}
          placeholder={placeholder}
          defaultValue={defaultValue}
        />
        {error && (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
          </div>
        )}
      </div>
      {helperText && (
        <p className="mt-2 text-sm text-red-600" id="email-error">
          {helperText}
        </p>
      )}
    </div>
  )
}
