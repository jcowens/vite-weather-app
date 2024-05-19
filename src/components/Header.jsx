import PropTypes from "prop-types";
import { parseISO, format } from "date-fns";

const Header = ({ location, condition }) => {
  return (
    <header className="header">
      <div className="location-time">
        <h3>
          {location.name}, {location.region}
        </h3>
        <h4>{format(parseISO(location.localtime), "h:mm:a")}</h4>
      </div>
      <h4>{condition.text}</h4>
    </header>
  );
};

Header.propTypes = {
  location: PropTypes.shape({
    name: PropTypes.string.isRequired,
    region: PropTypes.string.isRequired,
    localtime: PropTypes.string.isRequired,
  }).isRequired,
  condition: PropTypes.shape({
    text: PropTypes.string.isRequired,
  }).isRequired,
};

export default Header;
