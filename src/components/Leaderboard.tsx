import LeaderboardEntry from "./LeaderboardEntry";
import PropTypes from "prop-types";
import "./Leaderboard.css";

const Leaderboard = ({ className = "" }) => {
  return (
    <div className={`leaderboard1 ${className}`}>
      <div className="leaderboard-background" />
      <div className="leaderboard-title">
        <h2 className="monthly-leaderboard">Monthly Leaderboard</h2>
      </div>
      <div className="leaderboard-list">
        <div className="card-background1" />
        <div className="card-background2" />
        <div className="list-divider" />
        <div className="leaderboard-minimalistic">
          <div className="leaderboard-box-small">
            <div className="leaderboard-header">
              <div className="header-content">
                <div className="receivers-title-parent">
                  <div className="receivers-title">
                    <h2 className="top-recievers">{`Top <topic>`}</h2>
                  </div>
                  <img
                    className="trophy-2-icon"
                    loading="lazy"
                    alt=""
                    src="/trophy-2.svg"
                  />
                </div>
              </div>
              <div className="top-receiver">
                <div className="top-receiver-content">
                  <div className="avatar-21">
                    <div className="image-border-wrapper">
                      <img
                        className="image-border-icon"
                        loading="lazy"
                        alt=""
                        src="/frame-6.svg"
                      />
                    </div>
                    <div className="profile-name">
                      <div className="user-name" />
                    </div>
                  </div>
                  <div className="name-6-wrapper">
                    <div className="name-6">Name 1</div>
                  </div>
                </div>
                <div className="menu-5-4-wrapper">
                  <img
                    className="menu-5-4"
                    loading="lazy"
                    alt=""
                    src="/menu-5-4.svg"
                  />
                </div>
              </div>
            </div>
            <LeaderboardEntry name4="Name 2" menu55="/menu-5-5.svg" />
            <LeaderboardEntry name4="Name 3" menu55="/menu-5-6.svg" />
          </div>
        </div>
      </div>
    </div>
  );
};

Leaderboard.propTypes = {
  className: PropTypes.string,
};

export default Leaderboard;
