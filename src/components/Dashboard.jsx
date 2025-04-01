import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";

// Haversine formula to calculate the distance between two points (in km)
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of the Earth in km
  const dLat = (lat2 - lat1) * (Math.PI / 180); // Convert degrees to radians
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in km
  return distance.toFixed(2); // Round to 2 decimal places
};

const Dashboard = () => {
  const navigate = useNavigate();
  
  const [parkingSpots, setParkingSpots] = useState([]);
  const [userLocation, setUserLocation] = useState({ lat: null, lng: null });

  useEffect(() => {
    const storedParkingSpots = JSON.parse(localStorage.getItem("parkingSpots"));
    const storedTimestamp = localStorage.getItem("parkingSpotsTimestamp");
    const currentTime = new Date().getTime();
    
    // Check if parking spots are already stored and if they are not expired (you can set an expiration time, e.g., 1 hour)
    if (storedParkingSpots && storedTimestamp && currentTime - storedTimestamp < 3600000) {
      setParkingSpots(storedParkingSpots); // Use the cached parking spots if valid
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
          fetchParkingSpots(latitude, longitude);
        },
        (error) => console.error("Error getting location:", error),
        { enableHighAccuracy: true }
      );
    }
  }, []);

  const fetchParkingSpots = async (lat, lng) => {
    const query = `
      [out:json];
      (
        node["amenity"="parking"](around:5000, ${lat}, ${lng});
        way["amenity"="parking"](around:5000, ${lat}, ${lng});
        relation["amenity"="parking"](around:5000, ${lat}, ${lng});
      );
      out center;`;

    const overpassAPI = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`;

    try {
      let response = await fetch(overpassAPI);
      if (!response.ok) throw new Error("Overpass API failed");
      const data = await response.json();

      let spots = await Promise.all(
        data.elements
          .filter((el) => el.tags?.name) // Only include those with names
          .map(async (el) => {
            let name = el.tags.name;
            let address = el.tags?.["addr:full"] || null;
            const lat = el.lat || el.center?.lat;
            const lng = el.lon || el.center?.lon;

            if (!address && lat && lng) {
              address = await fetchAddressFromCoordinates(lat, lng);
            }

            const distance = calculateDistance(lat, lng, userLocation.lat, userLocation.lng); // Calculate distance

            return { name, address: address || "Address Not Available", lat, lng, distance };
          })
      );

      if (spots.length < 6) {
        console.warn("Less than 6 parking spots found, try increasing radius!");
      }

      // Store fetched parking spots in localStorage
      localStorage.setItem("parkingSpots", JSON.stringify(spots.slice(0, 6)));
      localStorage.setItem("parkingSpotsTimestamp", new Date().getTime());

      setParkingSpots(spots.slice(0, 6)); // Set the state with the fetched spots
    } catch (error) {
      console.error("Error fetching parking spots:", error);
    }
  };

  const fetchAddressFromCoordinates = async (lat, lng) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
      );
      const data = await response.json();
      return data.display_name || "Unknown Address";
    } catch (error) {
      console.error("Reverse geocoding failed:", error);
      return "Unknown Address";
    }
  };

  const handleBookNow = (name, address) => {
    alert(`Booking confirmed for ${name}\nLocation: ${address}`);
  };

  return (
    <div className="dashboard">
      <h1 className="dashboard-title">Nearby Parking Spots</h1>
      <div className="card-container">
        {parkingSpots.length === 0 ? (
          <p>Loading parking spots...</p>
        ) : (
          parkingSpots.map((spot, index) => (
            <div key={index} className="card">
              <h3>{spot.name}</h3><br/>
              <p>{spot.address}</p><br/>
              <p><strong>Distance: </strong>{spot.distance} km</p><br/> {/* Display distance */}
              <button onClick={() => navigate("/smart-parking")}>Book now</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;
