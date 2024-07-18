import React from "react";
import "./High5.css";
import High5Pairing, { High5PairingProps } from './High5Pairing';

interface BoostMessageRecipientType {
	receiver_display_name: string,
	receiver_profile_picture: {
		title: string,
		href: string,
	}
}
interface BoostMessageEntryType {
	giver_display_name: string,
	giver_profile_url: {
		title: string,
		href: string,
	},
	giver_user_id: string,
	group: Array<BoostMessageRecipientType>
}

interface High5State {
	pairings: Array<High5PairingProps>;
}

class High5 extends React.Component<{}, High5State> {
	intervalId: NodeJS.Timer | null;

	constructor(props: any) {
		super(props);
		this.intervalId = null;
		this.state = {
			pairings: [],
		}
	}

	componentDidMount(): void {
		const fetchMessages = () => {
			const parameters = new URLSearchParams({
				environment: process.env.REACT_APP_CONTENTSTACK_ENVIRONMENT_NAME || "",
				locale: "en-us",
				include_fallback: "true",
				include_branch: "false"
			});

			const headers = new Headers();
			headers.set("api_key", process.env.REACT_APP_CONTENTSTACK_API_KEY || "");
			headers.set("access_token", process.env.REACT_APP_CONTENTSTACK_ACCESS_TOKEN || "");

			const url = `${process.env.REACT_APP_CONTENTSTACK_BASE_URL}/v3/content_types/boost_message/entries?${parameters.toString()}`;
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
				const pairings: Array<High5PairingProps> = []
				data.entries.forEach((entry: BoostMessageEntryType) => {
					entry.group.forEach((recipient: BoostMessageRecipientType) => {
						if (pairings.length < 5) {
							let top: number = 0
							let left: number = 0
							let isValidPosition = false;
							while (!isValidPosition) {
								top = 5 + Math.random() * 70;
								left = Math.random() * 80;
								isValidPosition = pairings.every(pairing => {
									const topDiff = Math.abs(parseFloat(pairing.top) - top);
									const leftDiff = Math.abs(parseFloat(pairing.left) - left);
									return topDiff >= 10 && leftDiff >= 20;
								});
								
							};
							const animationDuration = `${8 + Math.random() * 3}s`;
							const animationDelay = `${Math.random() * 2}s`;
							const animationDirection = Math.random() > 0.5 ? 'normal' : 'reverse';
							pairings.push({
								top: `${top}%`,
								left: `${left}%`,
								giver: {
									display_name: entry.giver_display_name,
									profile_url: entry.giver_profile_url.href,
								},
								reciever: {
									display_name: recipient.receiver_display_name,
									profile_url: recipient.receiver_profile_picture.href,
								},
								animationDuration,
								animationDelay,
								animationDirection
							});
						}
					})
				});
				this.setState({
					pairings: pairings
				});
			}).catch(error => {
				console.error('Fetch error:', error);
			});
		};
		fetchMessages();
		this.intervalId = setInterval(fetchMessages, 5 * 60 * 1000);
	}

	componentWillUnmount(): void {
		if (this.intervalId) {
			clearInterval(this.intervalId);
		}
	}

	render() {
		return (
			<div className='high5-container'>
				<b className="high5-title-text">Most Recent High-5's</b>
				{this.state.pairings.map((pairing, index) => (
					<High5Pairing
						key={index}
						top={pairing.top}
						left={pairing.left}
						giver={pairing.giver}
						reciever={pairing.reciever}
						animationDuration={pairing.animationDuration}
						animationDelay={pairing.animationDelay}
						animationDirection={pairing.animationDirection}
					/>
				))}
			</div>
		);
	}
};

export default High5;
