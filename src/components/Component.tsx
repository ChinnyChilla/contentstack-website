import PropTypes from "prop-types";
import "./Component.css";

const Component = ({ className = "" }) => {
  return (
    <div className={`component-12 ${className}`}>
      <div className="third-milestone-background" />
      <div className="avatar-232">
        <div className="frame-frame">
          <img className="frame-icon3" loading="lazy" alt="" src="/frame.svg" />
        </div>
        <div className="frame3">
          <div className="third-milestone-number" />
        </div>
        <b className="some-milestone-number2">Some milestone number here</b>
      </div>
      <div className="frame-div">
        <div className="name-here5">Name Here</div>
      </div>
    </div>
  );
};

Component.propTypes = {
  className: PropTypes.string,
};

export default Component;
