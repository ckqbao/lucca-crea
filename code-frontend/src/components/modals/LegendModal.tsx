import { Modal, ModalBody, Row, Container } from 'reactstrap'

type LegendModalProps = {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

export default function LegendModal(props: LegendModalProps) {
  const { isOpen, setIsOpen } = props

  const toggleModal = () => {
    setIsOpen(!props.isOpen)
  }

  return (
    <Modal autoFocus centered isOpen={isOpen} role="dialog" size="md" toggle={toggleModal} onClick={() => setIsOpen(false)}>
      <ModalBody>
        <Container>
          <Row>
            <div className="grid text-center" style={{ columnGap: 0 }}>
              <div
                className="g-col-12 border border-1 d-flex align-items-center px-4 py-3"
                style={{ background: '#E2E1E1', borderColor: '#707070', borderRadius: '20px' }}
              >
                <div className="legend-square legend-square-gray me-2" />
                <span className="tw-text-xl tw-font-bold tw-font-[Arial] text-black">{'Attesa < 15 Minuti'}</span>
              </div>
              <div
                className="g-col-12 border border-1 d-flex align-items-center px-4 py-3"
                style={{ background: '#E2E1E1', borderColor: '#707070', borderRadius: '20px' }}
              >
                <div className="legend-square legend-square-green me-2" />
                <span className="tw-text-xl tw-font-bold tw-font-[Arial] text-black">Attesa 30 Minuti</span>
              </div>
              <div
                className="g-col-12 border border-1 d-flex align-items-center px-4 py-3"
                style={{ background: '#E2E1E1', borderColor: '#707070', borderRadius: '20px' }}
              >
                <div className="legend-square legend-square-yellow me-2" />
                <span className="tw-text-xl tw-font-bold tw-font-[Arial] text-black">Attesa 60 Minuti</span>
              </div>
              <div
                className="g-col-12 border border-1 d-flex align-items-center px-4 py-3"
                style={{ background: '#E2E1E1', borderColor: '#707070', borderRadius: '20px' }}
              >
                <div className="legend-square legend-square-orange me-2" />
                <span className="tw-text-xl tw-font-bold tw-font-[Arial] text-black">Attesa 90 Minuti</span>
              </div>
              <div
                className="g-col-12 border border-1 d-flex align-items-center px-4 py-3"
                style={{ background: '#E2E1E1', borderColor: '#707070', borderRadius: '20px' }}
              >
                <div className="legend-square legend-square-red me-2" />
                <span className="tw-text-xl tw-font-bold tw-font-[Arial] text-black">Attesa 120 Minuti</span>
              </div>
              <div
                className="g-col-12 border border-1 d-flex align-items-center px-4 py-3"
                style={{ background: '#E2E1E1', borderColor: '#707070', borderRadius: '20px' }}
              >
                <div className="legend-square legend-square-purple me-2" />
                <span className="tw-text-xl tw-font-bold tw-font-[Arial] text-black">{'Attesa > 120 Minuti'}</span>
              </div>
            </div>
          </Row>
        </Container>
      </ModalBody>
    </Modal>
  )
}
