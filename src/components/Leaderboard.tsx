import React from "react";
import "./Leaderboard.css";
import LeaderboardCard from "./LeaderboardCard";

export interface LeaderboardEntryType {
	name: string,
	score: number,
	image: string
}
interface LeaderboardType {
  topic: string;
  highest: Array<LeaderboardEntryType>
};

enum TopicChoices {
	"Top Booster" = "boost_given",
	"Top Boosted" = "boost_recieved"
}
interface UserType {
	title: string,
	display_name: string,
	boost_given: number,
	boost_recieved: number,
	username: string
	profile_picture: {
		href: string;
		title: string;
	};
}
interface LeaderboardState {
	users: Array<UserType>,
	leaderboard: Array<LeaderboardType>
	isLoading: boolean
}

class Leaderboard extends React.Component<{}, LeaderboardState> {
	constructor(props: any) {
		super(props);

		this.state = {
			users: [],
			isLoading: true,
			leaderboard: []
		}
	}

	getHighest(amount: number, users: Array<UserType>) {
		var leaderboard = []
		for (const [name,choice] of Object.entries(TopicChoices)) {
			const usersSorted = [...users].sort((u1, u2) => u2[choice] - u1[choice])

			const topUsers = usersSorted.slice(0, amount);
			var convertedArray: Array<LeaderboardEntryType> = []
			for (var i=0; i<amount; i++) {
				const user = topUsers[i];
				convertedArray.push({
					name: user.display_name,
					score: user[choice],
					image: user.profile_picture.href
				})
			}
			leaderboard.push({
				topic: name as keyof typeof TopicChoices,
				highest: convertedArray
		})
		}
		this.setState({
			isLoading: false,
			leaderboard: leaderboard
		})
	}

	componentDidMount(): void {
		const parameters = new URLSearchParams({
			environment: process.env.REACT_APP_CONTENTSTACK_ENVIRONMENT_NAME || "",
			locale: "en-us",
			include_fallback: "true",
			include_branch: "false"
		});
		const headers = new Headers();
		headers.set("api_key", process.env.REACT_APP_CONTENTSTACK_API_KEY || "");
		headers.set("access_token", process.env.REACT_APP_CONTENTSTACK_ACCESS_TOKEN || "");
		const url = `${process.env.REACT_APP_CONTENTSTACK_BASE_URL}/v3/content_types/slack_user/entries?${parameters.toString()}`;
		console.log(`Fetched url ${url}`);
		fetch(url, {
			method: "GET",
			headers: headers
		}).then(response => {
			if (!response.ok) {
				console.error('HTTP error:', response.status, response.statusText);
				throw new Error('Network response was not ok');
			}
			return response.json();
		}).then(data => {
			console.log(data.entries)
			this.getHighest(3, data.entries)
		}).catch(error => {
			console.error('Fetch error:', error);
		});

	}

	render() {
		if (this.state.isLoading) {
			return (
				<div className="leaderboard-container">
					<div className="leaderboard-child" />
					
					<div className="monthly-leaderboard">
						<span>
							Loading...
						</span>
					</div>
				
					
				</div>
			);
		}
		return (
			<div className="leaderboard-container">
				<div className="leaderboard-child" />
				<b className="monthly-leaderboard">Monthly Leaderboard</b>
				{this.state.leaderboard.map((leaderboardRanking, index) => {
					return (
						<LeaderboardCard
							topic={leaderboardRanking.topic}
							leaderboard={leaderboardRanking.highest}
							key={index}
						/>
					);
				})}
			</div >
		);
	}
	
}
export default Leaderboard;
