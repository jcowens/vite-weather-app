const legendCelsius = {
  Rain_mm: {
    "raster-opacity": 0.6,
    "raster-scaling": "lanczos",
    "raster-colorizer-default-mode": "linear",
    "raster-colorizer-default-color": "transparent",
    "raster-colorizer-stops": [
      { stop: 0, color: "rgba(225, 200, 100, 0)" },
      { stop: 0.1, color: "rgba(200, 150, 150, 0)" },
      { stop: 0.2, color: "rgba(150, 150, 170, 0)" },
      { stop: 0.5, color: "rgba(120, 120, 190, 0)" },
      { stop: 1, color: "rgba(110, 110, 205, 0.3)" },
      { stop: 10, color: "rgba(80, 80, 225, 0.7)" },
      { stop: 140, color: "rgba(20, 20, 255, 0.9)" },
    ],
  },
  Snow_mm: {
    "raster-colorizer-stops": [
      { stop: 0, color: "transparent" },
      { stop: 5, color: "#00d8ff" },
      { stop: 10, color: "#00b6ff" },
      { stop: 25.076, color: "#9549ff" },
    ],
  },
  Clouds_percentage: {
    "raster-colorizer-stops": [
      { stop: 0, color: "rgba(255, 255, 255, 0.0)" },
      { stop: 10, color: "rgba(253, 253, 255, 0.1)" },
      { stop: 20, color: "rgba(252, 251, 255, 0.2)" },
      { stop: 30, color: "rgba(250, 250, 255, 0.3)" },
      { stop: 40, color: "rgba(249, 248, 255, 0.4)" },
      { stop: 50, color: "rgba(247, 247, 255, 0.5)" },
      { stop: 60, color: "rgba(246, 245, 255, 0.75)" },
      { stop: 70, color: "rgba(244, 244, 255, 1)" },
      { stop: 80, color: "rgba(243, 242, 255, 1)" },
      { stop: 90, color: "rgba(242, 241, 255, 1)" },
      { stop: 100, color: "rgba(240, 240, 255, 1)" },
    ],
  },
  Temperature_Celsius: {
    "raster-colorizer-stops": [
      { stop: -65, color: "rgba(130, 22, 146, 1)" },
      { stop: -55, color: "rgba(130, 22, 146, 1)" },
      { stop: -45, color: "rgba(130, 22, 146, 1)" },
      { stop: -40, color: "rgba(130, 22, 146, 1)" },
      { stop: -30, color: "rgba(130, 87, 219, 1)" },
      { stop: -20, color: "rgba(32, 140, 236, 1)" },
      { stop: -10, color: "rgba(32, 196, 232, 1)" },
      { stop: 0, color: "rgba(35, 221, 221, 1)" },
      { stop: 10, color: "rgba(194, 255, 40, 1)" },
      { stop: 20, color: "rgba(255, 240, 40, 1)" },
      { stop: 25, color: "rgba(255, 194, 40, 1)" },
      { stop: 30, color: "rgba(252, 128, 20, 1)" },
    ],
  },
  Pressure_Pa: {
    "raster-colorizer-stops": [
      { stop: 94000, color: "rgba(0, 115, 255, 1)" },
      { stop: 96000, color: "rgba(0, 170, 255, 1)" },
      { stop: 98000, color: "rgba(75, 208, 214, 1)" },
      { stop: 100000, color: "rgba(141, 231, 199, 1)" },
      { stop: 101000, color: "rgba(176, 247, 32, 1)" },
      { stop: 102000, color: "rgba(240, 184, 0, 1)" },
      { stop: 104000, color: "rgba(251, 85, 21, 1)" },
      { stop: 106000, color: "rgba(243, 54, 59, 1)" },
      { stop: 108000, color: "rgba(198, 0, 0, 1)" },
    ],
  },
  Wind_m_s: {
    "raster-colorizer-stops": [
      { stop: 1, color: "rgba(255, 255, 255, 0)" },
      { stop: 5, color: "rgba(238, 206, 206, 0.4)" },
      { stop: 15, color: "rgba(179, 100, 188, 0.7)" },
      { stop: 15, color: "rgba(179, 100, 188, 0.7)" },
      { stop: 25, color: "rgba(63, 33, 59, 0.8)" },
      { stop: 50, color: "rgba(116, 76, 172, 0.9)" },
      { stop: 100, color: "rgba(70, 0, 175, 1)" },
      { stop: 200, color: "rgba(13, 17, 38, 1)" },
    ],
  },
};

export default legendCelsius;
