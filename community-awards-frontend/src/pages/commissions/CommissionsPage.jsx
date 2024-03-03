import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import Container from '@/components/containers/Container'

function Commission(props) {
  const { commission } = props
  return (
    <div className="ds-card lg:ds-card-side bg-base-100 shadow-xl">
      {/* <figure>
        <img src={imgUrl} />
      </figure> */}
      <div className="ds-card-body">
        <h2 className="ds-card-title">{commission.name}</h2>
        <p>{commission.description}</p>
      </div>
    </div>
  )
}

export default function CommissionsPage() {
  const { t } = useTranslation()

  const commissionsList = [
    { id: '1', name: 'Commision member 1', description: "Short Description Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod"},
    { id: '2', name: 'Commision member 2', description: "Short Description Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod"},
    { id: '3', name: 'Commision member 3', description: "Short Description Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod"},
    { id: '4', name: 'Commision member 4', description: "Short Description Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod"}
  ]

  return (
    <Container>
      <div className="flex justify-center mt-5 mb-5">
        <Link className="ds-btn" to="/categories">{t('Categories')}</Link>
      </div>
      <div className="flex flex-col space-y-4">
        {commissionsList.map((commission) => (
          <div key={commission.id} className="col-sm-12">
            <Commission commission={commission} />
          </div>
        ))}
      </div>
    </Container>
  )
}
