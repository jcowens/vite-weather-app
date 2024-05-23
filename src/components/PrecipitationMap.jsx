import { useState, useEffect, useRef } from "react";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import XYZ from "ol/source/XYZ";
import { fromLonLat } from "ol/proj";
import "ol/ol.css";
import PropTypes from "prop-types";
import legendCelsius from "../legendMetric.js";

const PrecipitationMap = ({ lat, lon }) => {
  const [layerType, setLayerType] = useState("precipitation_new");
  const mapRef = useRef();

  const layerTypeMapping = {
    clouds_new: "Clouds_percentage",
    precipitation_new: "Rain_mm",
    pressure_new: "Pressure_Pa",
    temp_new: "Temperature_Celsius",
  };

  useEffect(() => {
    if (mapRef.current) {
      const map = new Map({
        target: mapRef.current,
        layers: [
          new TileLayer({
            source: new XYZ({
              url: "https://{a-c}.basemaps.cartocdn.com/rastertiles/light_all/{z}/{x}/{y}.png",
            }),
          }),
          new TileLayer({
            source: new XYZ({
              url: `https://tile.openweathermap.org/map/${layerType}/{z}/{x}/{y}.png?appid=${
                import.meta.env.VITE_OPENWEATHER_API_KEY
              }`,
            }),
          }),
        ],
        view: new View({
          center: fromLonLat([lon, lat]),
          zoom: 7,
          projection: "EPSG:3857",
        }),
      });

      return () => map.setTarget(null);
    }
  }, [lat, lon, layerType]);

  const legendKey = layerTypeMapping[layerType];
  const legendData = legendCelsius[legendKey];

  const gradientStops = legendData["raster-colorizer-stops"]
    .map(
      (stop, index, array) =>
        `${stop.color} ${(index / (array.length - 1)) * 100}%`
    )
    .join(", ");
  const gradientString = `linear-gradient(to right, ${gradientStops})`;

  return (
    <div style={{ width: "100%", height: "400px", position: "relative" }}>
      <select
        style={{ position: "absolute", top: 10, right: 10, zIndex: 1000 }}
        value={layerType}
        onChange={(e) => setLayerType(e.target.value)}
      >
        <option value="clouds_new">Clouds</option>
        <option value="precipitation_new">Precipitation</option>
        <option value="pressure_new">Pressure</option>
        <option value="temp_new">Temperature</option>
      </select>
      <div ref={mapRef} style={{ width: "100%", height: "100%" }} />
      {legendData && (
        <div
          style={{
            position: "absolute",
            bottom: 10,
            left: 0,
            right: 0,
            zIndex: 1000,
            textAlign: "center",
          }}
        >
          <div
            style={{
              display: "inline-block",
              padding: "5px",
              width: "200px",
              background: "white",
              borderRadius: "5px",
            }}
          >
            <div
              style={{
                display: "flex",
                height: "20px",
                background: gradientString,
                transition: "background 0.5s",
              }}
            >
              {legendData["raster-colorizer-stops"].map((stop, index) => (
                <div
                  key={index}
                  style={{
                    flex: 1,
                  }}
                />
              ))}
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "5px",
              }}
            >
              {legendData["raster-colorizer-stops"].map((stop, index) => (
                <span key={index} style={{ fontSize: "12px" }}>
                  {stop.stop}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

PrecipitationMap.propTypes = {
  lat: PropTypes.number.isRequired,
  lon: PropTypes.number.isRequired,
};

export default PrecipitationMap;
