import React from "react";
import "./High5.css";
import High5Pairing, { High5PairingProps } from './High5Pairing';

const INITAL_PAIRING_AMOUNT = 6;

const TOP_DIFFERENCE = 10;
const SIDE_DIFFERENCE = 25;

const TOP_LIMIT = 73;
const SIDE_LIMIT = 70;

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
	group: Array<BoostMessageRecipientType>,
	category: string,
}

interface High5State {
	pairings: Array<High5PairingProps>;
	pool: Array<High5PairingProps>;
	poppingIndex: number | null;
}

class High5 extends React.Component<{}, High5State> {
	deletePairingInterval: NodeJS.Timer | null;
	addPairingInterval: NodeJS.Timer | null;

	constructor(props: any) {
		super(props);
		this.deletePairingInterval = null;
		this.addPairingInterval = null;
		this.state = {
			pairings: [],
			pool: [],
			poppingIndex: null
		};
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
				const pool: Array<High5PairingProps> = []
				data.entries.forEach((entry: BoostMessageEntryType) => {
					if (entry.giver_display_name == "undefined" || entry.giver_profile_url.href == "undefined") {
						return;
					}
					entry.group.forEach((recipient: BoostMessageRecipientType) => {
						if (recipient.receiver_display_name == "undefined" || recipient.receiver_profile_picture.href == "undefined") {
							return;
						}
						
						const animationName = 'float-animation'
						pool.push({
							top: '0%',
							left: '0%',
							giver: {
								display_name: entry.giver_display_name == "" ? entry.giver_profile_url.title : entry.giver_display_name,
								profile_url: entry.giver_profile_url.href,
							},
							reciever: {
								display_name: recipient.receiver_display_name == "" ? recipient.receiver_profile_picture.title : recipient.receiver_display_name,
								profile_url: recipient.receiver_profile_picture.href,
							},
							animationName,
							value: entry.category,
						});
					})
				});
				console.log("Pool size is: " + pool.length);
				this.setState({
					pool: pool.slice(-100)
				}, () => this.initalPairings());
			}).catch(error => {
				console.error('Fetch error:', error);
			});
		};
		fetchMessages();
		this.addPairingInterval = setInterval(this.addPairing, 5 * 1000)
		this.deletePairingInterval = setInterval(this.popAndDelete, 10 * 1000);
	}

	componentWillUnmount(): void {
		if (this.addPairingInterval) {
			clearInterval(this.addPairingInterval);
		}
		if (this.deletePairingInterval) {
			clearInterval(this.deletePairingInterval);
		}
	}

	initalPairings(): void {
		const pool = this.state.pool;

		var pairings = [];

		for (var i=0; i<INITAL_PAIRING_AMOUNT; i++) {
			var newPairing = pool[i];
			let attempts = 0;
			let isValidPosition = false;
			let top: number = 0;
			let left: number = 0;
			while (!isValidPosition && attempts < 100) {
				attempts += 1;
				top = 5 + Math.random() * TOP_LIMIT;
				left = Math.random() * SIDE_LIMIT;
				isValidPosition = pairings.every(pairing => {
					const topDiff = Math.abs(parseFloat(pairing.top) - top);
					const leftDiff = Math.abs(parseFloat(pairing.left) - left);
					return topDiff >= TOP_DIFFERENCE && leftDiff >= SIDE_DIFFERENCE;
				});
			}
			if (!isValidPosition) {
				continue;
			}
			pairings.push(
				{ ...newPairing, top: `${top}%`, left: `${left}%`, animationName: 'intro-animation'}
			)
		}
		this.setState({
			pairings: pairings
		})

		setTimeout(() => {
			this.setState((prevState) => ({
				pairings: prevState.pairings.map(pairing => ({
					...pairing,
					animationName: 'float-animation'
				}))
			}));
		}, 1000);

	}

	popAndDelete = () => {
		console.log("deletePairing called")
		if (this.state.pairings.length === 0) return;
		
		this.setState((prevState) => {
			// Get the first pairing and update its animationName
			let updatedPairings = prevState.pairings.slice(); // Create a copy of the pairings array
			if (updatedPairings.length > 0) {
				updatedPairings[0] = {
					...updatedPairings[0], // Spread the properties of the first pairing
					animationName: 'leave-animation' // Update the animationName property
				};
			}
			return {
				pairings: updatedPairings // Set the updated pairings array to the state
			};
		});

		setTimeout(() => {
			this.setState((prevState) => {
				return {
					pairings: prevState.pairings.slice(1)
				}
			})
		}, 500)

		
	};

	addPairing = () => {
		console.log("addPairing called")
		const alreadyShownPairings = this.state.pairings;
		const remainingPool = this.state.pool.filter((pairing) => {
			for (const remainingPair of alreadyShownPairings) {
				if ((remainingPair.giver.display_name == pairing.giver.display_name) &&
					remainingPair.reciever.display_name == pairing.reciever.display_name
				) {
					return false;
				}
			}
			return true;
		})
		const newPairing = remainingPool[Math.floor(Math.random() * remainingPool.length)];
		let attempts = 0;
		let isValidPosition = false;
		let top: number = 0;
		let left: number = 0;

		while (!isValidPosition && attempts < 100) {
			attempts += 1;
			top = 5 + Math.random() * TOP_LIMIT;
			left = Math.random() * SIDE_LIMIT;
			isValidPosition = this.state.pairings.every(pairing => {
				const topDiff = Math.abs(parseFloat(pairing.top) - top);
				const leftDiff = Math.abs(parseFloat(pairing.left) - left);
				return topDiff >= TOP_DIFFERENCE && leftDiff >= SIDE_DIFFERENCE;
			});
		}
		if (!isValidPosition) {
			return null;
		}

		this.setState({
			pairings: [...this.state.pairings, { ...newPairing, top: `${top}%`, left: `${left}%`, animationName: 'intro-animation'}],
		});

		setTimeout(() => {
			this.setState((prevState) => {
				let updatedPairings = prevState.pairings.slice(); // Create a copy of the pairings array
				if (updatedPairings.length > 0) {
					updatedPairings[updatedPairings.length - 1] = {
						...updatedPairings[updatedPairings.length - 1], // Spread the properties of the last pairing
						animationName: 'float-animation' // Update the animationName property
					};
				}
				return {
					pairings: updatedPairings // Set the updated pairings array to the state
				};
			});
		}, 500);



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
							animationName={pairing.animationName}
							value={pairing.value}
						/>
					
				))}
			</div>
		);
	}
}

export default High5;
