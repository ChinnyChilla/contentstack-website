import { FunctionComponent } from "react";
import "./Leaderboard.css";

export type LeaderboardType = {
  className?: string;
};

const Leaderboard: FunctionComponent<LeaderboardType> = ({
  className = "",
}) => {
  return (
    <div className={`leaderboard1 ${className}`}>
      <div className="leaderboard-child" />
      <div className="leaderboard-item" />
      <div className="leaderboard-inner" />
      <div className="rectangle-div" />
      <b className="monthly-leaderboard">Monthly Leaderboard</b>
      <div className="leaderboard-minimalistic">
        <div className="leaderboard-box-small">
          <div className="avatar-21">
            <img className="frame-icon22" alt="" src="/frame-6.svg" />
            <div className="frame22">
              <div className="text22" />
            </div>
          </div>
          <div className="name-4">Name 2</div>
          <div className="avatar-222">
            <img className="frame-icon22" alt="" src="/frame-6.svg" />
            <div className="frame23">
              <div className="text23" />
            </div>
          </div>
          <div className="name-5">Name 3</div>
          <div className="avatar-2314">
            <img className="frame-icon22" alt="" src="/frame-6.svg" />
            <div className="frame23">
              <div className="text23" />
            </div>
          </div>
          <b className="top-recievers">{`Top <topic>`}</b>
          <div className="name-6">Name 1</div>
          <img className="menu-5-4" alt="" src="/menu-5-4.svg" />
          <img className="menu-5-5" alt="" src="/menu-5-5.svg" />
          <img className="menu-5-6" alt="" src="/menu-5-6.svg" />
          <img className="trophy-2-icon" alt="" src="/trophy-2.svg" />
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;