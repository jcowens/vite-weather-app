import { useEffect, useRef } from "react";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import XYZ from "ol/source/XYZ";
import { fromLonLat } from "ol/proj";
import "ol/ol.css";
import PropTypes from "prop-types";

const PrecipitationMap = ({ lat, lon }) => {
  const mapRef = useRef();

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
              url: `https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${
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
  }, [lat, lon]);

  return <div ref={mapRef} style={{ width: "100%", height: "400px" }} />;
};

PrecipitationMap.propTypes = {
  lat: PropTypes.number.isRequired,
  lon: PropTypes.number.isRequired,
};

export default PrecipitationMap;
