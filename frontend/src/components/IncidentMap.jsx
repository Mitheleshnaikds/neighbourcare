import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default markers in React Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom icons
const incidentIcon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
  className: 'incident-marker'
});

const volunteerIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',
  iconRetinaUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
  className: 'volunteer-marker'
});

const userIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png',
  iconRetinaUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
  className: 'user-marker'
});

// Component to handle map centering
const MapCenterController = ({ center, zoom }) => {
  const map = useMap();
  
  useEffect(() => {
    if (center && center[0] !== 0 && center[1] !== 0) {
      map.setView(center, zoom);
    }
  }, [map, center, zoom]);
  
  return null;
};

const IncidentMap = ({ incidents = [], volunteerLocation = null, userLocation = null, onIncidentClick = null, height = '400px' }) => {
  const mapRef = useRef(null);
  
  // Determine the best center and zoom
  const getMapCenter = () => {
    if (volunteerLocation && volunteerLocation[0] !== 0 && volunteerLocation[1] !== 0) {
      return volunteerLocation;
    }
    if (userLocation && userLocation[0] !== 0 && userLocation[1] !== 0) {
      return userLocation;
    }
    return [40.7128, -74.0060]; // NYC default
  };
  
  const mapCenter = getMapCenter();
  const defaultZoom = (volunteerLocation || userLocation) ? 13 : 10;

  return (
    <div style={{ height, width: '100%', borderRadius: '8px', overflow: 'hidden' }}>
      <MapContainer
        ref={mapRef}
        center={mapCenter}
        zoom={defaultZoom}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={true}
      >
        <MapCenterController center={mapCenter} zoom={defaultZoom} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* Volunteer location marker */}
        {volunteerLocation && volunteerLocation[0] !== 0 && volunteerLocation[1] !== 0 && (
          <Marker position={volunteerLocation} icon={volunteerIcon}>
            <Popup>
              <div>
                <strong>Your Location (Volunteer)</strong>
                <br />
                You are here
              </div>
            </Popup>
          </Marker>
        )}
        
        {/* User location marker */}
        {userLocation && userLocation[0] !== 0 && userLocation[1] !== 0 && (
          <Marker position={userLocation} icon={userIcon}>
            <Popup>
              <div>
                <strong>Your Location</strong>
                <br />
                You are here
              </div>
            </Popup>
          </Marker>
        )}
        
        {/* Incident markers */}
        {incidents.map((incident) => {
          if (!incident.location?.coordinates) return null;
          
          const [lng, lat] = incident.location.coordinates;
          const position = [lat, lng];
          
          return (
            <Marker
              key={incident._id}
              position={position}
              icon={incidentIcon}
              eventHandlers={onIncidentClick ? {
                click: () => onIncidentClick(incident)
              } : {}}
            >
              <Popup>
                <div>
                  <strong>{incident.title}</strong>
                  <br />
                  <span className="text-sm text-gray-600">{incident.description}</span>
                  <br />
                  <span className={`text-xs px-2 py-1 rounded mt-2 inline-block ${
                    incident.priority === 'critical' ? 'bg-red-100 text-red-800' :
                    incident.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                    incident.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {incident.priority} priority
                  </span>
                  {onIncidentClick && (
                    <div className="mt-2">
                      <button
                        onClick={() => onIncidentClick(incident)}
                        className="text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                      >
                        View Details
                      </button>
                    </div>
                  )}
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default IncidentMap;