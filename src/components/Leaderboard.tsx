import React from "react";
import "./Leaderboard.css";
import LeaderboardCard from "./LeaderboardCard";


interface LeaderboardState {
	users: Array<UserType>,
	leaderboard: Array<LeaderboardType>,
	coreValues: Array<LeaderboardEntryType>,
	isLoading: boolean
  }

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
			leaderboard: [],
			coreValues: []
		}
	}

	getHighest(amount: number, users: Array<UserType>) {
		var leaderboard = []
		for (const [name,choice] of Object.entries(TopicChoices)) {
			const usersSorted = [...users].sort((u1, u2) => u2[choice] - u1[choice])
			console.log(usersSorted)

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
		console.log(leaderboard);
		this.setState({
			isLoading: false,
			leaderboard: leaderboard
		})
	}

	fetchCoreValues = async () => {
		try {
		  const parameters = new URLSearchParams({
			environment: process.env.REACT_APP_CONTENTSTACK_ENVIRONMENT_NAME || "",
			locale: "en-us",
			include_fallback: "true",
			include_branch: "false"
		  });
		  const headers = new Headers();
		  headers.set("api_key", process.env.REACT_APP_CONTENTSTACK_API_KEY || "");
		  headers.set("access_token", process.env.REACT_APP_CONTENTSTACK_ACCESS_TOKEN || "");
		  const url = `${process.env.REACT_APP_CONTENTSTACK_BASE_URL}/v3/content_types/leaderboard_category_count/entries?${parameters.toString()}`;
		  
		  const response = await fetch(url, { method: "GET", headers: headers });
		  if (!response.ok) {
			throw new Error('Network response was not ok');
		  }
		  const data = await response.json();
		  if (!data) {
			throw new Error("Failed to find value leaderboard")
		  }
		  const entry_value: any = data.entries[0];

		  var values = {
			"Care": entry_value.care,
			"Diverse": entry_value.diverse,
			"Do_the_right_thing": entry_value.do_the_right_thing,
			"Dreamers": entry_value.dreamer,
			"Trendsetters": entry_value.trendsetters,
			"Tribe": entry_value.tribe
		  };

		  var numerical_value = Object.entries(values);

		  numerical_value.sort((a, b) => b[1] - a[1]);

		  var top3 = numerical_value.slice(0, 3);

		  var top3Value = Object.fromEntries(top3);

		  console.log(top3Value);

		  var leaderboardEntries = Object.entries(top3Value).map(([key, score]) => {
			return {
				name: key == "Do_the_right_thing" ? "Do the Right Thing" : key,
				score: score,
				image: `${key}_icon.png`
			}
		  })

	  
		  this.setState({ coreValues: leaderboardEntries });
		} catch (error) {
		  console.error('Error fetching core values:', error);
		}
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
		this.fetchCoreValues();

	}

	render() {
		if (this.state.isLoading) {
		  return (
			<div className="leaderboard-container">
			  <div className="leaderboard-child" />
			  <div className="monthly-leaderboard">
				<span>Loading...</span>
			  </div>
			</div>
		  );
		}
		return (
		  <div className="leaderboard-container">
			{/* <b className="monthly-leaderboard">Monthly Leaderboard</b> */}
			{this.state.leaderboard.map((leaderboardRanking, index) => (
			  <LeaderboardCard
				topic={leaderboardRanking.topic}
				leaderboard={leaderboardRanking.highest}
				key={index}
			  />
			))}
			  <LeaderboardCard 
			      topic={"Top Core Value"}
				  leaderboard={this.state.coreValues}
				  key={2}
			  />
		  </div>
		);
	  }}
export default Leaderboard;