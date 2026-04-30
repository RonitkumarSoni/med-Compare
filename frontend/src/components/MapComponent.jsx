import React, { useState, useCallback } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px',
  borderRadius: '1.5rem',
};

const defaultCenter = {
  lat: 28.6139, // Default to Delhi
  lng: 77.2090
};

const MapComponent = ({ pharmacies = [], center = defaultCenter, zoom = 12 }) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY
  });

  const [map, setMap] = useState(null);
  const [selectedPharmacy, setSelectedPharmacy] = useState(null);

  const onLoad = useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    if (pharmacies.length > 0) {
      pharmacies.forEach(pharmacy => {
        if (pharmacy.coordinates && pharmacy.coordinates.length === 2) {
          bounds.extend({
            lat: pharmacy.coordinates[1],
            lng: pharmacy.coordinates[0]
          });
        }
      });
      map.fitBounds(bounds);
    }
    setMap(map);
  }, [pharmacies]);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  if (!isLoaded) {
    return (
      <div className="w-full h-[400px] bg-surface-container-low animate-pulse rounded-[1.5rem] flex items-center justify-center">
        <span className="text-on-surface-variant font-medium">Loading Map...</span>
      </div>
    );
  }

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={zoom}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={{
        styles: [
          {
            "featureType": "all",
            "elementType": "labels.text.fill",
            "stylers": [{ "color": "#7c93a3" }, { "lightness": "-10" }]
          },
          // ... you can add more premium styles here
        ],
        disableDefaultUI: false,
        zoomControl: true,
      }}
    >
      {pharmacies.map((pharmacy) => (
        pharmacy.coordinates && pharmacy.coordinates.length === 2 && (
          <Marker
            key={pharmacy._id || pharmacy.id}
            position={{
              lat: pharmacy.coordinates[1],
              lng: pharmacy.coordinates[0]
            }}
            onClick={() => setSelectedPharmacy(pharmacy)}
            title={pharmacy.shopName}
          />
        )
      ))}

      {selectedPharmacy && (
        <InfoWindow
          position={{
            lat: selectedPharmacy.coordinates[1],
            lng: selectedPharmacy.coordinates[0]
          }}
          onCloseClick={() => setSelectedPharmacy(null)}
        >
          <div className="p-2 max-w-[200px]">
            <h4 className="font-bold text-on-surface mb-1">{selectedPharmacy.shopName}</h4>
            <p className="text-xs text-on-surface-variant mb-2">{selectedPharmacy.address}</p>
            {selectedPharmacy.sellingPrice && (
              <p className="text-sm font-bold text-primary">Price: ₹{selectedPharmacy.sellingPrice}</p>
            )}
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
};

export default React.memo(MapComponent);
