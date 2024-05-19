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
import { format, parseISO } from "date-fns";

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
    labels: data.map((hour) => format(parseISO(hour.time), "p")),
    datasets: [
      {
        label,
        data: data.map((hour) => Math.round(hour[dataKey])),
        borderColor: "rgba(75,192,192,1)",
        fill: false,
      },
    ],
  };

  return (
    <Line
      data={chartData}
      options={{
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
      }}
    />
  );
};

HourlyTemperatureGraph.propTypes = {
  data: PropTypes.array.isRequired,
  label: PropTypes.string.isRequired,
  dataKey: PropTypes.string.isRequired,
  isCelsius: PropTypes.bool.isRequired,
};

export default HourlyTemperatureGraph;
