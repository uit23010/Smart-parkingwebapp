import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const MapComponent = ({ userLocation, parkingSpots }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (userLocation.lat && userLocation.lng) {
      if (!mapRef.current) {
        mapRef.current = L.map("map").setView([userLocation.lat, userLocation.lng], 14);

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: '&copy; OpenStreetMap',
        }).addTo(mapRef.current);
      } else {
        mapRef.current.setView([userLocation.lat, userLocation.lng], 14);
      }

      L.marker([userLocation.lat, userLocation.lng], { title: "Your Location" })
        .addTo(mapRef.current)
        .bindPopup("You are here")
        .openPopup();

      parkingSpots.forEach((spot) => {
        L.marker([spot.lat, spot.lng], {
          icon: L.icon({
            iconUrl: "https://cdn-icons-png.flaticon.com/512/447/447031.png",
            iconSize: [30, 30],
          }),
        })
          .addTo(mapRef.current)
          .bindPopup(`<b>${spot.name}</b><br>${spot.address}`);
      });
    }
  }, [userLocation, parkingSpots]);

  return <div id="map" style={{ height: "400px", width: "100%" }} />;
};

export default MapComponent;
