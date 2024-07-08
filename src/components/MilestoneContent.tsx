import PropTypes from "prop-types";
import "./MilestoneContent.css";

const MilestoneContent = ({ className = "" }) => {
  return (
    <div className={`milestone-content ${className}`}>
      <div className="milestone-details">
        <div className="component-10">
          <div className="milestone-avatar-background" />
          <div className="avatar-23">
            <div className="frame-wrapper">
              <img
                className="frame-icon1"
                loading="lazy"
                alt=""
                src="/frame.svg"
              />
            </div>
            <div className="frame1">
              <div className="milestone-number" />
            </div>
            <b className="some-milestone-number">Some milestone number here</b>
          </div>
          <div className="name-here-container">
            <div className="name-here3">Name Here</div>
          </div>
        </div>
      </div>
      <div className="component-13">
        <div className="second-milestone-background" />
        <div className="avatar-231">
          <div className="frame-container">
            <img
              className="frame-icon2"
              loading="lazy"
              alt=""
              src="/frame.svg"
            />
          </div>
          <div className="frame2">
            <div className="second-milestone-number" />
          </div>
          <b className="some-milestone-number1">Some milestone number here</b>
        </div>
        <div className="name-here-frame">
          <div className="name-here4">Name Here</div>
        </div>
      </div>
    </div>
  );
};

MilestoneContent.propTypes = {
  className: PropTypes.string,
};

export default MilestoneContent;
