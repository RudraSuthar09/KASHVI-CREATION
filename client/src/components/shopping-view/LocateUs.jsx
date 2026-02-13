import { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker, DirectionsRenderer } from "@react-google-maps/api";

const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY; // ✅ Correct way for Vite



const shopName = "Kashvi Creations";
const shopCoords = { lat: 21.17944726027164, lng: 72.84421758144205 };

const mapContainerStyle = {
  width: "100%",
  height: "400px",
};

console.log("Google Maps API Key:", googleMapsApiKey);
const LocateUs = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [directions, setDirections] = useState(null);

  // Fetch user location
  const handleShowRoute = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ lat: latitude, lng: longitude });
        calculateRoute(latitude, longitude);
      },
      (error) => {
        alert("Unable to retrieve your location. Please allow location access.");
        console.error(error);
      }
    );
  };

  // Calculate Route
  const calculateRoute = (lat, lng) => {
    const directionsService = new window.google.maps.DirectionsService();
    directionsService.route(
      {
        origin: { lat, lng },
        destination: shopCoords,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          setDirections(result);
        } else {
          console.error("Error fetching directions:", status);
        }
      }
    );
  };

  return (
    <div className="flex flex-col md:flex-row items-center p-6">
      <div className="md:w-1/3 p-4 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-gray-800">{shopName}</h2>
        <p className="text-gray-600 mt-2">Surat, Gujarat, India</p>
        <p className="text-gray-600">📍 Latitude: {shopCoords.lat}</p>
        <p className="text-gray-600">📍 Longitude: {shopCoords.lng}</p>
        <button
          onClick={handleShowRoute}
          className="mt-4 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
        >
          Show Directions
        </button>
      </div>

      <div className="md:w-2/3 h-96 w-full mt-6 md:mt-0 md:ml-6">
        <LoadScript googleMapsApiKey={googleMapsApiKey}>
          <GoogleMap mapContainerStyle={mapContainerStyle} center={shopCoords} zoom={15}>
            {/* Shop Marker */}
            <Marker position={shopCoords} label="📍 Shop" />

            {/* User Location Marker */}
            {userLocation && <Marker position={userLocation} label="🧍 You" />}

            {/* Route */}
            {directions && <DirectionsRenderer directions={directions} />}
          </GoogleMap>
        </LoadScript>
      </div>
    </div>
  );
};

export default LocateUs;
