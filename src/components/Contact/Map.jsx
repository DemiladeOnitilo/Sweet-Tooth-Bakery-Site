import React, { useEffect } from 'react'
import marker from '../../assets/Images/icon-location.svg'
import { MapContainer, TileLayer, Marker, } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const customIcon = new L.Icon({
  iconUrl: marker,
  iconSize: [46, 56], // size of the icon
  iconAnchor: [23, 56], // point of the icon which will correspond to marker's location
  popupAnchor: [0, -56] // point from which the popup should open relative to the iconAnchor
})


const Map = () => {

  const center = { lat: 6.524379, lng: 3.369206 }

  return (
      <div className='h-[70vh] w-full lg:w-[40%]'>
      <MapContainer center={center} zoom={13} scrollWheelZoom={false} dragging={false} doubleClickZoom={false} zoomControl={false} style={{height: '100%', width:'100%'}}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker icon={customIcon} position={center}>
        </Marker>
      </MapContainer>
    </div>
  )
}

export default Map