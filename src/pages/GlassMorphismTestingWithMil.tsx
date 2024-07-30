import React from "react";
import High5 from "../components/High5";
import Leaderboard from "../components/Leaderboard";
import PhotoGallery from "../components/PhotoGallery";
import SplashScreen from "../components/Splashscreen";
import "./GlassMorphismTestingWithMil.css";

interface BoostMessageType {
	title: string;
	message_content: string;
	message_content_parsed: string;
	giver_user_id: string;
	giver_display_name: string;
	giver_profile_url: {
		title: string;
		href: string;
	};
	category: string;
	created_at: string;
}

interface GlassMorphismTestingWithMilState {
	newMessagesQueue: Array<BoostMessageType>;
	showSplashScreen: boolean;
	currentMessage: BoostMessageType | null;
	processedTitles: Array<string>;
	reloadKey: number;
}

class GlassMorphismTestingWithMil extends React.Component<{}, GlassMorphismTestingWithMilState> {
	intervalId: NodeJS.Timer | null = null;
	checkQueueInterval: NodeJS.Timer | null = null;

	constructor(props: any) {
		super(props);

		this.state = {
			newMessagesQueue: [],
			showSplashScreen: false,
			currentMessage: null,
			processedTitles: [],
			reloadKey: 0,
		};
	}

	componentDidMount() {
		this.fetchBoostMessages();

		this.intervalId = setInterval(this.fetchBoostMessages, 60 * 1000);

		this.checkQueueInterval = setInterval(this.checkQueue, 30 * 1000);
	}

	componentWillUnmount() {
		if (this.intervalId) {
			clearInterval(this.intervalId);
		}
		if (this.checkQueueInterval) {
			clearInterval(this.checkQueueInterval);
		}
	}

	fetchBoostMessages = () => {
		const parameters = new URLSearchParams({
			environment: process.env.REACT_APP_CONTENTSTACK_ENVIRONMENT_NAME || "",
			locale: "en-us",
			include_fallback: "true",
			include_branch: "false"
		});

		const headers = new Headers();
		headers.set("api_key", process.env.REACT_APP_CONTENTSTACK_API_KEY || "");
		headers.set("access_token", process.env.REACT_APP_CONTENTSTACK_ACCESS_TOKEN || "");

		const boost_url = `${process.env.REACT_APP_CONTENTSTACK_BASE_URL}/v3/content_types/boost_message/entries?${parameters.toString()}`;
		console.log(`Fetched url ${boost_url}`);
		fetch(boost_url, {
			method: "GET",
			headers: headers
		}).then(response => {
			if (!response.ok) {
				console.error('HTTP error:', response.status, response.statusText);
				throw new Error('Network response was not ok');
			}
			return response.json();
		}).then(data => {
			this.handleNewMessages(data.entries.slice(0, 11));
		}).catch(error => {
			console.error('Fetch error:', error);
		});
	}

	handleNewMessages = (newMessages: Array<BoostMessageType>) => {
		this.setState((prevState) => {
			const existingMessages = prevState.newMessagesQueue;
			const processedTitles = prevState.processedTitles;
			const newEntries = newMessages.filter((message) =>
				!existingMessages.some((existing) => existing.title === message.title) &&
				!processedTitles.includes(message.title)
			);
			console.log(newEntries);
			if (newEntries.length > 0) {
				console.log("added new entries");
				const updatedQueue = [...existingMessages, ...newEntries];
				return {
					newMessagesQueue: updatedQueue,
				};
			} else {
				return null;
			}
		});
	}

	checkQueue = () => {
		console.log("this is checkQueue state");
		console.log(this.state)
		this.setState((prevState) => {
			if (prevState.newMessagesQueue.length > 0) {
				const [currentMessage, ...remainingQueue] = prevState.newMessagesQueue;
				setTimeout(() => {
					console.log("timeout called")
					this.setState((innerState) => ({
						showSplashScreen: false,
						currentMessage: null,
						newMessagesQueue: remainingQueue,
						processedTitles: [...innerState.processedTitles, currentMessage.title],
					}));
				}, 15 * 1000);

				setTimeout(() => {
					this.setState((innerState) => ({
						reloadKey: innerState.reloadKey + 1
					}));
				}, 2 * 1000)

				return {
					showSplashScreen: true,
					currentMessage: currentMessage,
					newMessagesQueue: remainingQueue,
				};
			} else {
				return {
					showSplashScreen: false,
					currentMessage: null,
					newMessagesQueue: []
				};
			}
		});
	}

	render() {
		const { showSplashScreen, currentMessage, reloadKey } = this.state;

		return (
			<div className="background">
				<div className="vertical-line"></div>
				<High5 key={`high5-${reloadKey}`} />
				<Leaderboard />
				<PhotoGallery key={`photo-${reloadKey}`} />
				{showSplashScreen && currentMessage && (
					<SplashScreen
						giver={{
							display_name: currentMessage.giver_display_name === "" ? currentMessage.giver_profile_url.title : currentMessage.giver_display_name,
							profile_url: currentMessage.giver_profile_url.href,
						}}
						value={currentMessage.category}
						message={currentMessage.message_content_parsed == null ? currentMessage.message_content : currentMessage.message_content_parsed}
					/>
				)}
			</div>
		);
	}
}

export default GlassMorphismTestingWithMil;
