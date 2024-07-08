import MilestoneContent from "./MilestoneContent";
import Component from "./Component";
import PropTypes from "prop-types";
import "./Milestones.css";

const Milestones = ({ className = "" }) => {
  return (
    <div className={`milestones ${className}`}>
      <div className="background" />
      <h1 className="leaderboard">Milestones</h1>
      <div className="milestone-instance-wrapper">
        <div className="milestone-instance">
          <div className="component-16">
            <img
              className="component-16-child"
              alt=""
              src="/rectangle-47.svg"
            />
            <MilestoneContent />
            <MilestoneContent />
            <div className="third-milestone">
              <Component />
              <Component />
            </div>
          </div>
          <div className="component-17-wrapper">
            <img
              className="component-17-icon"
              loading="lazy"
              alt=""
              src="/component-17.svg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

Milestones.propTypes = {
  className: PropTypes.string,
};

export default Milestones;
