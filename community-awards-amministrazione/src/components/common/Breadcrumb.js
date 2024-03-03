import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Col, BreadcrumbItem, Container } from 'reactstrap'

const Breadcrumb = (props) => {
  return (
    <Container fluid={true}>
      <Col xs="12">
        <div className="page-title-box d-flex align-items-center justify-content-between my-3">
          <h3 className="mb-0" style={{ textTransform: 'uppercase' }}>
            {props.title}
          </h3>
          <div className="page-title-right">
            <ol className="breadcrumb m-0 pe-0">
              {props.items?.map((item) => (
                <BreadcrumbItem>
                  {item.active ? (
                    <strong>{item.title}</strong>
                  ) : (
                    <Link to={item.link}>{item.title}</Link>
                  )}
                </BreadcrumbItem>
              ))}
            </ol>
          </div>
        </div>
      </Col>
    </Container>
  )
}

Breadcrumb.propTypes = {
  breadcrumbItem: PropTypes.string,
  title: PropTypes.string,
}

export default Breadcrumb
