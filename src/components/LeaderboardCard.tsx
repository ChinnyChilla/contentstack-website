import React from "react";
import LeaderboardEntry from "./LeaderboardEntry";
import "./LeaderboardCard.css";
import { LeaderboardEntryType } from "./Leaderboard";

const LeaderboardCard = ({ topic, leaderboard }: { topic: string; leaderboard: Array<LeaderboardEntryType> }) => {
  return (
    <div className="leaderboard-card-container">
	<div className="leaderboard-header-container">
		<div className="leaderboard-card-topic">
			<span>{topic}</span>
		</div>
		<div className="leaderboard-trophy-icon">
			<img
				src="https://static-00.iconduck.com/assets.00/trophy-winner-prize-icon-2013x2048-rfqmn1p2.png" // Replace with your actual trophy image URL
				alt="Trophy"
				className="trophy-icon"
			/>
		</div>
	</div>
     
      <div className="leaderboard-entries-container">
        {leaderboard.map((entry, index) => (
          <div key={index} className="leaderboard-entry-wrapper">
            <LeaderboardEntry
              score={entry.score}
              profile_url={entry.image == "undefined" ? "default_profile.png" : entry.image}
              display_name={entry.name}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeaderboardCard;
