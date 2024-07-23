import react from "react"
import LeaderboardEntry from "./LeaderboardEntry"
import "./LeaderboardCard.css"
import { LeaderboardEntryType } from "./Leaderboard"
import { CoreValue } from "./Leaderboard"


const LeaderboardCard = ({topic, leaderboard}: {topic: string, leaderboard: Array<LeaderboardEntryType>}) => {

	return (
		<div className="leaderboard-card-container">
			<div className="leaderboard-card-topic">
				<span>
				{topic}
				</span>
			</div>

			<div className="leaderboard-entries-container">
				{leaderboard.map((entry, index) => {
					return (
						<LeaderboardEntry score={entry.score} profile_url={entry.image} display_name={entry.name} key={index} />
					)
				})}
			</div>
		</div>
	)
}

export default LeaderboardCard