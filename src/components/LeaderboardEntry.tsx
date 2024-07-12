import PropTypes from "prop-types";
import "./LeaderboardEntry.css";
interface LeaderboardEntryType {
	display_name: string,
	score: number,
	profile_url: string

}

const LeaderboardEntry = ({display_name, score, profile_url} : LeaderboardEntryType) => {
  return (
	  <div className="leaderboard-card-entry">
		  <div className="leaderboard-entry-left">
			  <div className="leaderboard-entry-avatar">
				  <img className="leaderboard-entry-image" alt="" src={profile_url} />
			  </div>
			  <div className="leaderboard-entry-name">
				<span className="leaderboard-entry-name-span">
					  {display_name}
				</span>
			  </div>
		  </div>

		  <div className="leaderboard-entry-score">
			  <span>
				  {score}
			  </span>

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
