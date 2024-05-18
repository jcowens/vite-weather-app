import PropTypes from "prop-types";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import format from "date-fns/format";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const HourlyTemperatureGraph = ({ data, label, dataKey }) => {
  const chartData = {
    labels: data.map((hour) => format(new Date(hour.time), "p")),
    datasets: [
      {
        label,
        data: data.map((hour) => hour[dataKey]),
        borderColor: "rgba(75,192,192,1)",
        fill: false,
      },
    ],
  };

  return <Line data={chartData} options={{ maintainAspectRatio: false }} />;
};

HourlyTemperatureGraph.propTypes = {
  data: PropTypes.array.isRequired,
  label: PropTypes.string.isRequired,
  dataKey: PropTypes.string.isRequired,
  isCelsius: PropTypes.bool.isRequired,
};

export default HourlyTemperatureGraph;
