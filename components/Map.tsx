import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L, { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Leaflet의 기본 마커 아이콘을 설정합니다. (필요한 경우)
L.Icon.Default.mergeOptions({
	iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
	iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
	shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png'
});

interface MyMapProps {
	latitude?: number;
	longitude?: number;
}

const MyMap: React.FC<MyMapProps> = ({ latitude, longitude }) => {
	if (!latitude || !longitude) {
		return <></>;
	}
	const position: LatLngExpression = [latitude, longitude];

	return (
		<MapContainer center={position} zoom={13} style={{ height: '130px', width: '130px' }}>
			<TileLayer
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
			/>
			<Marker position={position}>
				<Popup>This is your location.</Popup>
			</Marker>
		</MapContainer>
	);
};

export default MyMap;
