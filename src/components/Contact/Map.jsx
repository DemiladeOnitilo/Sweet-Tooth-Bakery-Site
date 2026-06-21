import React from 'react'
import marker from '../../assets/Images/icon-location.svg'
import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const customIcon = new L.Icon({
  iconUrl: marker,
  iconSize: [46, 56],
  iconAnchor: [23, 56],
  popupAnchor: [0, -56]
})

const Map = () => {
  const center = { lat: 6.524379, lng: 3.369206 }

  return (
    <div className="h-full w-full min-h-[400px]">
      <MapContainer
        center={center}
        zoom={13}
        scrollWheelZoom={false}
        dragging={false}
        doubleClickZoom={false}
        zoomControl={false}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker icon={customIcon} position={center} />
      </MapContainer>
    </div>
  )
}

export default Map