import clsx from 'clsx'
import { FieldValues, useController, UseControllerProps } from 'react-hook-form'
import { FormFeedback, Input, InputProps } from 'reactstrap'

type InputControllerProps<T extends FieldValues> = UseControllerProps<T> & {
  children?: InputProps['children']
  className?: string
  placeholder?: string
  required?: boolean
  type?: InputProps['type']
}

export default function InputController<T extends FieldValues>(props: InputControllerProps<T>) {
  const { className, children, control, name, placeholder, required = false, type = 'text' } = props
  const {
    field,
    fieldState: { error },
  } = useController({ name, control })

  return (
    <div>
      <Input
        children={children}
        className={clsx("form-control", className)}
        ref={field.ref}
        invalid={!!error}
        name={field.name}
        onChange={field.onChange}
        onBlur={field.onBlur}
        placeholder={placeholder}
        required={required}
        type={type}
        value={field.value}
      />
      <FormFeedback className="input-controller-feedback">{error?.message}</FormFeedback>
    </div>
  )
}
