import React, { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import DraggableMarker from './DraggableMarker';
import { useParams } from 'react-router-dom';
import Loading from '../../Shired/Loading/Loading';
import L from 'leaflet';
import iconMarker from 'leaflet/dist/images/marker-icon.png'
import iconRetina from 'leaflet/dist/images/marker-icon-2x.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'

const DisplayMap = () => {
    const { messId } = useParams()
    const [mess, setMess] = useState({})
    const [isLoading, setIsloading] = useState(false);
    const icon = L.icon({
        iconRetinaUrl: iconRetina,
        iconUrl: iconMarker,
        shadowUrl: iconShadow
    });

    useEffect(() => {
        setIsloading(true)
        fetch(`http://localhost:5000/messWithId/${messId}`)
            .then(res => res.json())
            .then(data => {

                console.log(data)
                setMess(data)
                setIsloading(false)

            })
    }, [])

    return (
        <div>
            {
                (isLoading && <Loading></Loading>) || (!isLoading && parseFloat(mess.latitude) && <MapContainer className='leaflet-container' center={[parseFloat(mess.latitude), parseFloat(mess.longitude)]} zoom={15} scrollWheelZoom={false}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={[parseFloat(mess.latitude), parseFloat(mess.longitude)]} icon={icon}>
                        <Popup>
                            A pretty CSS3 popup. <br /> Easily customizable.
                        </Popup>
                    </Marker>
                    <DraggableMarker></DraggableMarker>
                </MapContainer>)
            }
        </div>
    );
};

export default DisplayMap;