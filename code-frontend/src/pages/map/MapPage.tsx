import _ from 'lodash'
import { useEffect, useMemo, useRef } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import L, { LatLngTuple } from 'leaflet'
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import { useNavigate } from 'react-router-dom'
import { Button } from 'reactstrap'

import { ReactComponent as TentIcon } from '@/assets/icons/tent.svg'

import { useGetAllDataQuery } from '@/services/api'
import { LUCCA_CREA_COORDINATES } from '@/constants/coordinates'
// import { useGetPavilionsListQuery } from '@/services/api/pavilions'

const { VITE_MAPBOX_ACCESS_TOKEN, VITE_MAPBOX_STYLE_ID, VITE_MAPBOX_USERNAME } = import.meta.env

import 'leaflet/dist/leaflet.css'

function PavilionMarkers() {
  const map = useMap()

  const { data } = useGetAllDataQuery()
  // const { data } = useGetPavilionsListQuery()

  const pavilions = useMemo(() => data?.pavilions || [], [data])
  // const pavilions = useMemo(() => data?.results || [], [data])

  const bounds = useMemo(() => {
    if (!pavilions.length) return

    const latLngBounds = pavilions.map((pavilion) => {
      return pavilion.coordinates.split(',').map((coordinate) => parseFloat(coordinate.trim())) as LatLngTuple
    })

    return new L.LatLngBounds(latLngBounds)
  }, [pavilions])

  useEffect(() => {
    if (!bounds) return

    map.fitBounds(bounds, { padding: [50, 50] })
  }, [bounds, map])

  return (
    <>
      {pavilions.map((pavilion) => {
        const iconMarkup = renderToStaticMarkup(
          <>
            <div className="tw-border-2 tw-border-black rounded-2 p-1 map-marker" style={{ backgroundColor: '#' + pavilion.timingColor }}>
              <TentIcon width="100%" height="100%" />
            </div>
            <p
              className="position-absolute top-100 start-50 translate-middle z-3 bg-white m-0 mt-4 fw-semibold text-center rounded-5"
              style={{ color: '#090909', fontSize: '12px', padding: '2px 10px', whiteSpace: 'nowrap' }}
            >
              {pavilion.entrances.find(entrance => entrance.entranceId === pavilion.entranceId)?.entranceName}
            </p>
          </>
        )
        const icon = L.divIcon({ className: 'position-relative', html: iconMarkup, iconSize: [50, 50], iconAnchor: [25, 54] })
        const coordinates = pavilion.coordinates.split(',').map((coordinate) => parseFloat(coordinate.trim()))
        return (
          <Marker key={pavilion._id} icon={icon} position={{ lat: coordinates[0], lng: coordinates[1] }}>
          </Marker>
        )
      })}
    </>
  )
}

export default function MapPage() {
  const navigate = useNavigate()

  const mapOptions = {
    className: 'h-100',
    zoom: 13,
    maxZoom: 18,
    scrollWheelZoom: true,
    zoomControl: false,
    center: LUCCA_CREA_COORDINATES,
    id: 'map-pavilion',
  }

  return (
    <div className="position-relative vh-100 vw-100">
      <Button color="danger" className="position-absolute top-0 mt-2 ms-2" onClick={() => navigate('/')} style={{ zIndex: 500 }}>
        Torna alla lista
      </Button>
      <MapContainer {...mapOptions}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url={`https://api.mapbox.com/styles/v1/${VITE_MAPBOX_USERNAME}/${VITE_MAPBOX_STYLE_ID}/tiles/512/{z}/{x}/{y}@2x?access_token=${VITE_MAPBOX_ACCESS_TOKEN}`}
        />
        <PavilionMarkers />
      </MapContainer>
    </div>
  )
}
