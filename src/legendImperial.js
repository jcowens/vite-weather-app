const legendImperial = {
    Rain_in: {
      "raster-opacity": 0.6,
      "raster-scaling": "lanczos",
      "raster-colorizer-default-mode": "linear",
      "raster-colorizer-default-color": "transparent",
      "raster-colorizer-stops": [
        { stop: 0, color: "rgba(225, 200, 100, 0)" },
        { stop: 0.004, color: "rgba(200, 150, 150, 0)" },
        { stop: 0.008, color: "rgba(150, 150, 170, 0)" },
        { stop: 0.02, color: "rgba(120, 120, 190, 0)" },
        { stop: 0.04, color: "rgba(110, 110, 205, 0.3)" },
        { stop: 0.39, color: "rgba(80, 80, 225, 0.7)" },
        { stop: 5.51, color: "rgba(20, 20, 255, 0.9)" },
      ],
    },
    Snow_in: {
      "raster-colorizer-stops": [
        { stop: 0, color: "transparent" },
        { stop: 0.2, color: "#00d8ff" },
        { stop: 0.39, color: "#00b6ff" },
        { stop: 0.99, color: "#9549ff" },
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
    Temperature_Fahrenheit: {
      "raster-colorizer-stops": [
        { stop: -85, color: "rgba(130, 22, 146, 1)" },
        { stop: -67, color: "rgba(130, 22, 146, 1)" },
        { stop: -49, color: "rgba(130, 22, 146, 1)" },
        { stop: -40, color: "rgba(130, 22, 146, 1)" },
        { stop: -22, color: "rgba(130, 87, 219, 1)" },
        { stop: -4, color: "rgba(32, 140, 236, 1)" },
        { stop: 14, color: "rgba(32, 196, 232, 1)" },
        { stop: 32, color: "rgba(35, 221, 221, 1)" },
        { stop: 50, color: "rgba(194, 255, 40, 1)" },
        { stop: 68, color: "rgba(255, 240, 40, 1)" },
        { stop: 77, color: "rgba(255, 194, 40, 1)" },
        { stop: 86, color: "rgba(252, 128, 20, 1)" },
      ],
    },
    Pressure_psi: {
      "raster-colorizer-stops": [
        { stop: 13.63, color: "rgba(0, 115, 255, 1)" },
        { stop: 13.92, color: "rgba(0, 170, 255, 1)" },
        { stop: 14.21, color: "rgba(75, 208, 214, 1)" },
        { stop: 14.5, color: "rgba(141, 231, 199, 1)" },
        { stop: 14.65, color: "rgba(176, 247, 32, 1)" },
        { stop: 14.79, color: "rgba(240, 184, 0, 1)" },
        { stop: 15.08, color: "rgba(251, 85, 21, 1)" },
        { stop: 15.37, color: "rgba(243, 54, 59, 1)" },
        { stop: 15.66, color: "rgba(198, 0, 0, 1)" },
      ],
    },
    Wind_mph: {
      "raster-colorizer-stops": [
        { stop: 2.24, color: "rgba(255, 255, 255, 0)" },
        { stop: 11.18, color: "rgba(238, 206, 206, 0.4)" },
        { stop: 33.55, color: "rgba(179, 100, 188, 0.7)" },
        { stop: 33.55, color: "rgba(179, 100, 188, 0.7)" },
        { stop: 55.92, color: "rgba(63, 33, 59, 0.8)" },
        { stop: 111.84, color: "rgba(116, 76, 172, 0.9)" },
        { stop: 223.69, color: "rgba(70, 0, 175, 1)" },
        { stop: 447.39, color: "rgba(13, 17, 38, 1)" },
      ],
    },
  };
  
  export default legendImperial;