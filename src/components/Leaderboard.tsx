import React from "react";
import "./Leaderboard.css";
import LeaderboardCard from "./LeaderboardCard";


interface LeaderboardState {
	users: Array<UserType>,
	leaderboard: Array<LeaderboardType>,
	coreValues: Array<CoreValue>,
	isLoading: boolean
  }

  export interface CoreValue {
	name: string;
	count: number;
	icon?: string;
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
		  
		  const processedCoreValues = data.entries
			.sort((a: CoreValue, b: CoreValue) => b.count - a.count)
			.slice(0, 5);
	  
		  this.setState({ coreValues: processedCoreValues });
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
			<b className="monthly-leaderboard">Monthly Leaderboard</b>
			{this.state.leaderboard.map((leaderboardRanking, index) => (
			  <LeaderboardCard
				topic={leaderboardRanking.topic}
				leaderboard={leaderboardRanking.highest}
				key={index}
			  />
			))}
			<LeaderboardCard
			topic="top.booster"
			leaderboard=>
			{/* <div className="core"> */}
			  {/* <div className="core-container">
				<div className="top-core">
				<h2>Top Core Values</h2> 
				</div>
				{this.state.coreValues.map((coreValue, index) => (
				  <div key={index} className="core-value-item">
					{coreValue.icon && <img src={coreValue.icon} alt={coreValue.name} className="core-value-icon" />}
					<div className="core-value-info">
					  <span className="core-value-name">{coreValue.name}</span>
					  <span className="core-value-count">{coreValue.count} times</span>
					</div>
				  </div>
				))}
			  </div>
			</div> */}
		  </div>
		);
	  }}
export default Leaderboard;