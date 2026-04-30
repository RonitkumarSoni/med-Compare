import React, { useState, useCallback } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const mapContainerStyle = {
  width: '100%',
  height: '100%',
  borderRadius: '0.75rem'
};

const center = {
  lat: 19.1136, // Mumbai Andheri coordinates
  lng: 72.8697
};

const mapOptions = {
  styles: [
    {
      "elementType": "geometry",
      "stylers": [{ "color": "#f5f5f5" }]
    },
    {
      "elementType": "labels.icon",
      "stylers": [{ "visibility": "off" }]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [{ "color": "#616161" }]
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [{ "color": "#f5f5f5" }]
    },
    {
      "featureType": "administrative.land_parcel",
      "elementType": "labels.text.fill",
      "stylers": [{ "color": "#bdbdbd" }]
    },
    {
      "featureType": "poi",
      "elementType": "geometry",
      "stylers": [{ "color": "#eeeeee" }]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.fill",
      "stylers": [{ "color": "#757575" }]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry",
      "stylers": [{ "color": "#e5e5e5" }]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.fill",
      "stylers": [{ "color": "#9e9e9e" }]
    },
    {
      "featureType": "road",
      "elementType": "geometry",
      "stylers": [{ "color": "#ffffff" }]
    },
    {
      "featureType": "road.arterial",
      "elementType": "labels.text.fill",
      "stylers": [{ "color": "#757575" }]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [{ "color": "#dadada" }]
    },
    {
      "featureType": "road.highway",
      "elementType": "labels.text.fill",
      "stylers": [{ "color": "#616161" }]
    },
    {
      "featureType": "road.local",
      "elementType": "labels.text.fill",
      "stylers": [{ "color": "#9e9e9e" }]
    },
    {
      "featureType": "transit.line",
      "elementType": "geometry",
      "stylers": [{ "color": "#e5e5e5" }]
    },
    {
      "featureType": "transit.station",
      "elementType": "geometry",
      "stylers": [{ "color": "#eeeeee" }]
    },
    {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [{ "color": "#c9c9c9" }]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [{ "color": "#9e9e9e" }]
    }
  ],
  disableDefaultUI: true,
  zoomControl: true,
};

const PharmacySettings = () => {
  const [showToast, setShowToast] = useState(null);
  const [markerPos, setMarkerPos] = useState(center);
  const [isAdjusting, setIsAdjusting] = useState(false);
  const [map, setMap] = useState(null);
  const [address, setAddress] = useState({
    street: 'Plot 42, Medical Square, Andheri West',
    city: 'Mumbai',
    postalCode: '400001'
  });

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY
  });

  const onMapLoad = useCallback((mapInstance) => {
    setMap(mapInstance);
  }, []);

  const geocodeAddress = useCallback((addrObj) => {
    if (!window.google) return;
    const geocoder = new window.google.maps.Geocoder();
    
    const components = [addrObj.street, addrObj.city, addrObj.postalCode, 'India'].filter(Boolean);
    const fullAddress = components.join(', ');
    
    geocoder.geocode({ address: fullAddress }, async (results, status) => {
      if (status === 'OK' && results[0]) {
        const newPos = {
          lat: results[0].geometry.location.lat(),
          lng: results[0].geometry.location.lng()
        };
        setMarkerPos(newPos);
        if (map) { map.panTo(newPos); map.setZoom(16); }
        notify('Location found (Google)!');
      } else {
        // FALLBACK: Use OpenStreetMap (Nominatim) if Google is denied or fails
        console.log('Google Geocoding failed, trying fallback...');
        try {
          const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(fullAddress)}`);
          const data = await response.json();
          
          if (data && data.length > 0) {
            const newPos = {
              lat: parseFloat(data[0].lat),
              lng: parseFloat(data[0].lon)
            };
            setMarkerPos(newPos);
            if (map) { map.panTo(newPos); map.setZoom(16); }
            notify('Location found (Backup Service)!');
          } else {
            notify('Location not found in any database.', 'warning');
          }
        } catch (err) {
          notify('Search failed. Check your internet connection.', 'warning');
        }
      }
    });
  }, [map]);

  const handleAddressChange = (field, value) => {
    const newAddress = { ...address, [field]: value };
    setAddress(newAddress);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      geocodeAddress(address);
      notify('Searching location...', 'info');
    }
  };

  const onMarkerDragEnd = useCallback((e) => {
    const newPos = {
      lat: e.latLng.lat(),
      lng: e.latLng.lng()
    };
    setMarkerPos(newPos);
    notify('Location pin updated manually.');
  }, []);

  const notify = (msg, type = 'success') => {
    setShowToast({ msg, type });
    setTimeout(() => setShowToast(null), 3000);
  };

  const handleSaveChanges = () => {
    notify('Pharmacy profile updated successfully.');
  };
  return (
    <div className="flex-1 min-h-screen bg-background relative">
      {/* Premium Toast Notification */}
      {showToast && (
        <div className={`fixed top-24 right-8 z-[100] flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl border backdrop-blur-xl animate-in slide-in-from-right-full duration-500 ${
          showToast.type === 'success' ? 'bg-emerald-500/90 border-emerald-400 text-white' : 
          showToast.type === 'warning' ? 'bg-amber-500/90 border-amber-400 text-white' :
          'bg-blue-600/90 border-blue-500 text-white'
        }`}>
          <span className="material-symbols-outlined">
            {showToast.type === 'success' ? 'check_circle' : showToast.type === 'warning' ? 'warning' : 'info'}
          </span>
          <p className="font-headline font-bold text-sm tracking-tight">{showToast.msg}</p>
        </div>
      )}
      {/* Header Section */}
      <header className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-bold rounded-full uppercase tracking-widest font-headline">
            <span className="material-symbols-outlined text-xs" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
            Pharmacy Profile
          </div>
          <h3 className="font-headline text-3xl font-extrabold text-on-surface tracking-tight">Public Presence</h3>
          <p className="font-body text-on-surface-variant max-w-xl leading-relaxed">Configure how patients and partners view your pharmacy on the MedCompare marketplace. Precision and trust start here.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-white text-primary font-bold rounded-xl border border-primary/10 shadow-sm hover:bg-surface-container-high transition-all active:scale-95 font-headline">
          <span className="material-symbols-outlined">visibility</span>
          Preview Profile
        </button>
      </header>

      {/* Bento Configuration Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Basic Info (Large Card) */}
        <div className="lg:col-span-8 med-card p-8 space-y-8">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>storefront</span>
            </div>
            <div>
              <h4 className="font-headline text-xl font-bold text-on-surface">Store Identity</h4>
              <p className="text-sm text-on-surface-variant font-body">Primary branding and contact information.</p>
            </div>
          </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-body">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-on-surface-variant px-1">Pharmacy Name</label>
                <input
                  className="w-full bg-surface-container-low border border-transparent rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 hover:border-surface-container-high transition-all text-on-surface font-medium placeholder:text-on-surface-variant/50"
                  type="text"
                  defaultValue="Apollo Pharmacy"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-on-surface-variant px-1">Email Address</label>
                <input
                  className="w-full bg-surface-container-low border border-transparent rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 hover:border-surface-container-high transition-all text-on-surface font-medium placeholder:text-on-surface-variant/50"
                  type="email"
                  defaultValue="contact@apollo.in"
                />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-sm font-semibold text-on-surface-variant px-1">About the Pharmacy</label>
                <textarea
                  className="w-full bg-surface-container-low border border-transparent rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 hover:border-surface-container-high transition-all text-on-surface font-medium resize-none placeholder:text-on-surface-variant/50"
                  rows="4"
                  defaultValue="Apex Medical Center provides specialized pharmaceutical care with a focus on rare medications and personalized wellness counseling. Serving the community for over 15 years with integrity and care."
                ></textarea>
              </div>
            </div>
          <div className="pt-4 flex items-center justify-between border-t border-surface-container font-headline">
            <p className="text-xs text-on-surface-variant italic font-body">Last updated: 2 hours ago</p>
            <button 
              onClick={handleSaveChanges}
              className="px-8 py-3 bg-gradient-to-r from-primary to-primary-container text-white font-bold rounded-xl shadow-lg shadow-primary/20 active:scale-95 transition-all"
            >
              Save Changes
            </button>
          </div>
        </div>

        {/* Logo Upload (Smaller Side Card) */}
        <div className="lg:col-span-4 space-y-8">
          <div className="med-card p-8 flex flex-col items-center text-center space-y-6">
            <h4 className="font-headline text-lg font-bold text-on-surface w-full text-left">Brand Logo</h4>
            <div className="relative group">
              <div className="h-40 w-40 rounded-3xl bg-surface-container-low overflow-hidden flex items-center justify-center ring-4 ring-white shadow-xl group-hover:opacity-90 transition-all">
                <img
                  alt="Pharmacy Brand Logo"
                  className="h-full w-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCVSfipPzclEs-DfQrNXrvyv4LEUBjX5BY1VZITHLosCqHu6FOSV6zvuwHIHwkYZtbt5NgohtTpbcLrNHt6tinVpJb7TfAP9I3OXcoAvPmrTbze3LKXeXY8bxnCVQ1gKvqwSzJ9aTWgNqpmeN22VYWDxnPt0hj_jkp2H4R0FjjA_9NRxOLUfotdbAJkgDlSluWCeWUJJUr-qVusQVQDTdRleU6cwjetjW5h7ylHHJqY0E35YmVofD2BocsBuCw5Nd5u-JROxGuykma5"
                />
              </div>
              <button className="absolute -bottom-2 -right-2 h-10 w-10 bg-primary text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all">
                <span className="material-symbols-outlined text-lg">edit</span>
              </button>
            </div>
            <p className="text-xs text-on-surface-variant leading-relaxed font-body">SVG, PNG, or JPG (max. 800x800px). <br /> We recommend a transparent background.</p>
          </div>

          {/* Quick Actions / Profile Strength */}
          <div className="bg-primary text-white rounded-2xl p-6 shadow-xl shadow-primary/20 space-y-4 font-headline">
            <h5 className="font-bold flex items-center gap-2">
              <span className="material-symbols-outlined">auto_awesome</span>
              Profile Strength
            </h5>
            <div className="h-1.5 w-full bg-white/20 rounded-full overflow-hidden">
              <div className="h-full w-[85%] bg-white rounded-full"></div>
            </div>
            <p className="text-sm text-white/80 font-body">Your profile is 85% complete. Add your license number to get verified.</p>
            <button className="w-full py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-bold transition-all border border-white/10">Complete Now</button>
          </div>
        </div>

        {/* Address & Map */}
        <div className="lg:col-span-12 med-card overflow-hidden">
          <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>location_on</span>
                </div>
                <div>
                  <h4 className="font-headline text-xl font-bold text-on-surface">Location Details</h4>
                  <p className="text-sm text-on-surface-variant font-body">Set your physical storefront address.</p>
                </div>
              </div>
              <div className="space-y-4 font-body">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-on-surface-variant px-1">Street Address</label>
                  <input
                    className="w-full bg-surface-container-low border border-transparent rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 hover:border-surface-container-high transition-all text-on-surface font-medium"
                    type="text"
                    value={address.street}
                    onChange={(e) => handleAddressChange('street', e.target.value)}
                    onKeyDown={handleKeyPress}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-on-surface-variant px-1">City</label>
                    <input
                      className="w-full bg-surface-container-low border border-transparent rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 hover:border-surface-container-high transition-all text-on-surface font-medium"
                      type="text"
                      value={address.city}
                      onChange={(e) => handleAddressChange('city', e.target.value)}
                      onKeyDown={handleKeyPress}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-on-surface-variant px-1">Postal Code</label>
                    <input
                      className="w-full bg-surface-container-low border border-transparent rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 hover:border-surface-container-high transition-all text-on-surface font-medium"
                      type="text"
                      value={address.postalCode}
                      onChange={(e) => handleAddressChange('postalCode', e.target.value)}
                      onKeyDown={handleKeyPress}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="rounded-xl overflow-hidden bg-slate-100 min-h-[300px] relative group border border-outline-variant/10">
              {isLoaded ? (
                <GoogleMap
                  mapContainerStyle={mapContainerStyle}
                  center={markerPos}
                  zoom={15}
                  options={mapOptions}
                  onLoad={onMapLoad}
                >
                  <Marker
                    position={markerPos}
                    draggable={isAdjusting}
                    onDragEnd={onMarkerDragEnd}
                    animation={window.google?.maps?.Animation?.DROP}
                  />
                  {!isAdjusting && (
                    <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                      <button 
                        onClick={() => setIsAdjusting(true)}
                        className="bg-white text-primary font-bold px-8 py-3 rounded-full shadow-2xl font-headline border border-primary/10 hover:scale-105 active:scale-95 transition-all"
                      >
                        Adjust Pin Location
                      </button>
                    </div>
                  )}
                  {isAdjusting && (
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10">
                      <button 
                        onClick={() => {
                          setIsAdjusting(false);
                          notify('New location saved.');
                        }}
                        className="bg-emerald-500 text-white font-bold px-6 py-2 rounded-full shadow-xl font-headline flex items-center gap-2"
                      >
                        <span className="material-symbols-outlined text-sm">check</span>
                        Done Adjusting
                      </button>
                    </div>
                  )}
                </GoogleMap>
              ) : (
                <div className="w-full h-full flex items-center justify-center animate-pulse bg-slate-100">
                  <p className="text-on-surface-variant font-headline font-bold">Loading Satellite Grid...</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Operating Hours */}
        <div className="lg:col-span-12 bg-surface-container-low rounded-2xl p-8 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-white flex items-center justify-center text-primary shadow-sm">
                <span className="material-symbols-outlined">schedule</span>
              </div>
              <div>
                <h4 className="font-headline text-xl font-bold text-on-surface">Operating Hours</h4>
                <p className="text-sm text-on-surface-variant font-body">Let patients know when you're available.</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input defaultChecked className="sr-only peer" type="checkbox" />
              <div className="w-11 h-6 bg-surface-container-high peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              <span className="ms-3 text-sm font-semibold text-on-surface font-headline">Show on Profile</span>
            </label>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 font-body">
            <div className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm border border-transparent hover:border-primary/20 transition-all">
              <span className="font-bold text-on-surface-variant">Monday - Friday</span>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium px-2 py-1 bg-surface-container-low rounded">08:00 AM</span>
                <span className="text-xs text-on-surface-variant">—</span>
                <span className="text-sm font-medium px-2 py-1 bg-surface-container-low rounded">09:00 PM</span>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm border border-transparent hover:border-primary/20 transition-all">
              <span className="font-bold text-on-surface-variant">Saturday</span>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium px-2 py-1 bg-surface-container-low rounded">09:00 AM</span>
                <span className="text-xs text-on-surface-variant">—</span>
                <span className="text-sm font-medium px-2 py-1 bg-surface-container-low rounded">05:00 PM</span>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm border border-transparent hover:border-primary/20 transition-all">
              <span className="font-bold text-on-surface-variant">Sunday</span>
              <span className="text-xs font-bold text-red-600 px-3 py-1 bg-red-50 rounded-full font-headline">CLOSED</span>
            </div>
          </div>
          <div className="flex justify-end font-headline">
            <button className="text-primary font-bold text-sm flex items-center gap-1 hover:underline">
              <span className="material-symbols-outlined text-sm">add_circle</span>
              Add Special Hours (Holidays)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PharmacySettings;
