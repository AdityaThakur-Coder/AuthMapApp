import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet-routing-machine";
import { useEffect, useState } from "react";
import { useMapEvents } from "react-leaflet";
import './MapComponent.css';

// Fix marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: new URL("leaflet/dist/images/marker-icon-2x.png", import.meta.url).href,
  iconUrl: new URL("leaflet/dist/images/marker-icon.png", import.meta.url).href,
  shadowUrl: new URL("leaflet/dist/images/marker-shadow.png", import.meta.url).href,
});

function Routing({ pointA, pointB }) {
  const map = useMapEvents({});

  useEffect(() => {
    if (!pointA || !pointB) return;

    const routingControl = L.Routing.control({
      waypoints: [L.latLng(pointA), L.latLng(pointB)],
      routeWhileDragging: false,
      createMarker: function () { return null; },
      lineOptions: {
        styles: [{ color: '#667eea', weight: 6, opacity: 0.8 }]
      }
    }).addTo(map);

    return () => map.removeControl(routingControl);
  }, [pointA, pointB, map]);

  return null;
}

async function searchCities(query) {
  const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${query}`);
  return await response.json();
}

export default function MapComponent() {
  const [fromCity, setFromCity] = useState("");
  const [toCity, setToCity] = useState("");
  const [pointA, setPointA] = useState(null);
  const [pointB, setPointB] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fromSuggestions, setFromSuggestions] = useState([]);
  const [toSuggestions, setToSuggestions] = useState([]);

  useEffect(() => {
    const delay = setTimeout(async () => {
      if (fromCity.length > 2) {
        const results = await searchCities(fromCity);
        setFromSuggestions(results);
      } else {
        setFromSuggestions([]);
      }
    }, 300);
    return () => clearTimeout(delay);
  }, [fromCity]);

  useEffect(() => {
    const delay = setTimeout(async () => {
      if (toCity.length > 2) {
        const results = await searchCities(toCity);
        setToSuggestions(results);
      } else {
        setToSuggestions([]);
      }
    }, 300);
    return () => clearTimeout(delay);
  }, [toCity]);

  const handleSearch = async () => {
    if (!fromCity.trim() || !toCity.trim()) {
      setError("Please enter both cities");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const [coordA, coordB] = await Promise.all([
        searchCities(fromCity),
        searchCities(toCity)
      ]);
      setPointA([parseFloat(coordA[0].lat), parseFloat(coordA[0].lon)]);
      setPointB([parseFloat(coordB[0].lat), parseFloat(coordB[0].lon)]);
    } catch (error) {
      setError("Error finding cities: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setFromCity("");
    setToCity("");
    setPointA(null);
    setPointB(null);
    setError("");
    setFromSuggestions([]);
    setToSuggestions([]);
  };

  return (
    <div className="map-wrapper">
      <div className="search-panel">
        <h3 className="search-title">Route Finder</h3>
        <div className="input-group">
          <label>From</label>
          <input
            type="text"
            value={fromCity}
            onChange={(e) => setFromCity(e.target.value)}
            disabled={loading}
          />
          {fromSuggestions.length > 0 && (
            <ul className="autocomplete-list">
              {fromSuggestions.map((item, i) => (
                <li key={i} onClick={() => {
                  setFromCity(item.display_name);
                  setPointA([parseFloat(item.lat), parseFloat(item.lon)]);
                  setFromSuggestions([]);
                }}>{item.display_name}</li>
              ))}
            </ul>
          )}
        </div>
        <div className="input-group">
          <label>To</label>
          <input
            type="text"
            value={toCity}
            onChange={(e) => setToCity(e.target.value)}
            disabled={loading}
          />
          {toSuggestions.length > 0 && (
            <ul className="autocomplete-list">
              {toSuggestions.map((item, i) => (
                <li key={i} onClick={() => {
                  setToCity(item.display_name);
                  setPointB([parseFloat(item.lat), parseFloat(item.lon)]);
                  setToSuggestions([]);
                }}>{item.display_name}</li>
              ))}
            </ul>
          )}
        </div>
        <div className="button-group">
          <button onClick={handleSearch} disabled={loading}>Find Route</button>
          <button onClick={handleClear} disabled={loading}>Clear</button>
        </div>
        {error && <p className="error-message">{error}</p>}
      </div>

      <MapContainer center={[20.5937, 78.9629]} zoom={5} className="map-container">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="© OpenStreetMap contributors"
        />
        {pointA && <Marker position={pointA} />}
        {pointB && <Marker position={pointB} />}
        {pointA && pointB && <Routing pointA={pointA} pointB={pointB} />}
      </MapContainer>
    </div>
  );
}
