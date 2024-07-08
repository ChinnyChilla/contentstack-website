import PropTypes from "prop-types";
import "./EarthCard.css";

const EarthCard = ({ className = "" }) => {
  return (
    <div className={`earth-card ${className}`}>
      <div className="dashboard-background" />
      <div className="where-the-globe">Where the globe will be</div>
      <div className="earth-card-content">
        <div className="metrics-data">
          <div className="glassmorphism">
            <div className="card-background" />
          </div>
          <div className="call-metrics">
            <h2 className="succesful-calls">Succesful Calls</h2>
            <div className="call-count">
              <img
                className="call-icon"
                loading="lazy"
                alt=""
                src="/vector.svg"
              />
            </div>
            <div className="count-unit">
              <div className="ms">312ms</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

EarthCard.propTypes = {
  className: PropTypes.string,
};

export default EarthCard;
