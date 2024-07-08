import PropTypes from "prop-types";
import "./LeaderboardEntry.css";

const LeaderboardEntry = ({ className = "", name4, menu55 }) => {
  return (
    <div className={`leaderboard-entry ${className}`}>
      <div className="entry-content">
        <div className="avatar-22">
          <div className="avatar-background-wrapper">
            <img
              className="avatar-background-icon"
              loading="lazy"
              alt=""
              src="/frame-6.svg"
            />
          </div>
          <div className="avatar-name">
            <div className="text1" />
          </div>
        </div>
        <div className="name-4-wrapper">
          <div className="name-4">{name4}</div>
        </div>
      </div>
      <div className="menu-5-5-wrapper">
        <img className="menu-5-5" loading="lazy" alt="" src={menu55} />
      </div>
    </div>
  );
};

LeaderboardEntry.propTypes = {
  className: PropTypes.string,
  name4: PropTypes.string,
  menu55: PropTypes.string,
};

export default LeaderboardEntry;
