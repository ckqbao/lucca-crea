import { Link } from 'react-router-dom'
import { Col, BreadcrumbItem, Container } from 'reactstrap'

type BreadcrumbProps = {
  items: Array<{
    active?: boolean
    link: string
    title: string
  }>
  title: string
}

export default function Breadcrumb(props: BreadcrumbProps) {
  return (
    <div className="page-title-box d-flex align-items-center justify-content-between my-3">
      <h3 className="mb-0" style={{ textTransform: 'uppercase' }}>
        {props.title}
      </h3>
      <div className="page-title-right">
        <ol className="breadcrumb m-0 pe-0">
          {props.items?.map((item, idx) => (
            <BreadcrumbItem key={idx}>{item.active ? <strong>{item.title}</strong> : <Link to={item.link}>{item.title}</Link>}</BreadcrumbItem>
          ))}
        </ol>
      </div>
    </div>
  )
}
