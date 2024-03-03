import { Spinner } from 'reactstrap'

type OverlaySpinnerProps = {
  isLoading: boolean
  tableLoader?: boolean
}

export default function OverlaySpinner(props: OverlaySpinnerProps) {
  if (props.isLoading) {
    return (
      <div
        style={
          props.tableLoader
            ? {
                backgroundColor: 'rgba(255,255,255,0.7)',
                width: '100%',
                height: '100%',
                position: 'absolute',
                zIndex: 1000,
              }
            : {
                backgroundColor: 'rgba(255,255,255,0.98)',
                width: '100%',
                height: '105%',
                position: 'fixed',
                zIndex: 1000,
                top: '0px',
                left: '0px',
              }
        }
      >
        <div
          style={
            props.tableLoader
              ? {
                  position: 'fixed',
                  top: '45%',
                  left: '48%',
                  zIndex: 1000,
                }
              : {
                  position: 'fixed',
                  top: '45%',
                  left: '50%',
                  zIndex: 1000,
                }
          }
        >
          <Spinner className="text-primary" animation="border" />
        </div>
      </div>
    )
  }

  return null
}
