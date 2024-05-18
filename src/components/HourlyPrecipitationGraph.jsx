import PropTypes from "prop-types";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import format from "date-fns/format";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const HourlyPrecipitationGraph = ({ data }) => {
  const chartData = {
    labels: data.map((hour) => format(new Date(hour.time), "p")),
    datasets: [
      {
        label: "Precipitation (%)",
        data: data.map((hour) => hour.chance_of_rain),
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
      },
    ],
  };

  return <Bar data={chartData} options={{ maintainAspectRatio: false }} />;
};

HourlyPrecipitationGraph.propTypes = {
  data: PropTypes.array.isRequired,
};

export default HourlyPrecipitationGraph;
