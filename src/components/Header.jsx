// src/components/Header.jsx
import PropTypes from "prop-types";

const Header = ({ location }) => {
  return (
    <header className="header">
      <h1>
        {location.name}, {location.region}
      </h1>
    </header>
  );
};

Header.propTypes = {
  location: PropTypes.string.isRequired,
};

export default Header;
