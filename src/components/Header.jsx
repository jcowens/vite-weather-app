import PropTypes from "prop-types";

const Header = ({ location, condition }) => {
  return (
    <header className="header">
      <h3>
        {location.name}, {location.region}
      </h3>
      <h4>{condition.text}</h4>
    </header>
  );
};

Header.propTypes = {
  location: PropTypes.shape({
    name: PropTypes.string.isRequired,
    region: PropTypes.string.isRequired,
  }).isRequired,
  condition: PropTypes.shape({
    text: PropTypes.string.isRequired,
  }).isRequired,
};

export default Header;
