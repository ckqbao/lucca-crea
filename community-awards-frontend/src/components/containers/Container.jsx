import clsx from 'clsx'

export default function Container(props) {
  return <div className={clsx('container mx-auto px-4 sm:px-6 lg:px-8', props.className)}>{props.children}</div>
}
