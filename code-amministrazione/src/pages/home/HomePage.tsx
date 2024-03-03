import { useTranslation } from 'react-i18next'
import { Container } from 'reactstrap'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import { faker } from '@faker-js/faker'

import { useGetChartDataQuery } from '@/services/api'
import Breadcrumb from '@/components/ui/Breadcrumb'
import { Button, Col, Row } from 'reactstrap'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Andamento ultime 24 ore, esclusi periodi di chiusura',
    },
  },
};

// const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

// const graphData = {
//   labels,
//   datasets: [
//     {
//       label: 'Dataset 1',
//       data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
//       borderColor: 'rgb(255, 99, 132)',
//       backgroundColor: 'rgba(255, 99, 132, 0.5)',
//     },
//     {
//       label: 'Dataset 2',
//       data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
//       borderColor: 'rgb(53, 162, 235)',
//       backgroundColor: 'rgba(53, 162, 235, 0.5)',
//     },
//   ],
// };

export default function HomePage() {
  const { t } = useTranslation()

  const data = useGetChartDataQuery();

  const graphData = {
    labels: data.data?.labels,
    datasets: data.data?.data || []
  }

  return (
    <Container>
      <Breadcrumb
        title={t('Home')}
        items={[
          { link: '/', title: t('Home') },
          { active: true, link: '/', title: t('Home') },
        ]}
      />
      <Row className="mt-4 mb-4">
        <Col className="ms-auto text-end">
          <Button className="bg-red text-white border-0 mx-1" onClick={() => window.location.reload()}>{t('Reload data')}</Button>
        </Col>
      </Row>
      <div
          className="mt-5 p-4"
          style={{
            borderRadius: '4px',
            boxShadow: '0px 12px 24px #12263F08',
          }}
        >
          <h3 className='mb-4'>{t('Latest detection from operators')}</h3>
          <Line
            options={chartOptions}
            data={graphData}
          />
        </div>
    </Container>
  )
}
