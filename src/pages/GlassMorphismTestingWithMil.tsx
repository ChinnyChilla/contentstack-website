import React from "react";
import High5 from "../components/High5";
import Leaderboard from "../components/Leaderboard";
import PhotoGallery from "../components/PhotoGallery";
import SplashScreen from "../components/Splashscreen";
import "./GlassMorphismTestingWithMil.css";
import PubNub from "pubnub"

const INITAL_MESSAGES_SPLASHSCREEN = false;

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
	initalLoading: boolean;
}

class GlassMorphismTestingWithMil extends React.Component<{}, GlassMorphismTestingWithMilState> {
	intervalId: NodeJS.Timer | null = null;
	checkQueueInterval: NodeJS.Timer | null = null;
	PubNub: PubNub;
	

	constructor(props: any) {
		super(props);

		this.state = {
			initalLoading: true,
			newMessagesQueue: [],
			showSplashScreen: false,
			currentMessage: null,
			processedTitles: [],
			reloadKey: 0,
		};
		var publishKey = process.env.REACT_APP_PUBNUB_PUBLISHKEY ?? ""
		var subscribeKey = process.env.REACT_APP_PUBNUB_SUBSCRIBEKEY ?? ""

		if (publishKey == "" || subscribeKey == "") {
			console.error("WARNING: PUBNUB INVALID KEY")
		}

		this.PubNub = new PubNub({
			publishKey: publishKey,
			subscribeKey: subscribeKey,
			userId: "server"
		})
	}

	componentDidMount() {
		this.addListener();
		this.PubNub.subscribe({ channels: ["website"]});
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
		this.PubNub.unsubscribeAll();
	}

	addListener = () => {
		this.PubNub.addListener({
			message: ({channel, message, publisher}: any) => {
				console.log("NEW PUBNUB MESSAGE")
				console.log(message);
				this.fetchBoostMessages();
			}
		})
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
			if (this.state.initalLoading && !INITAL_MESSAGES_SPLASHSCREEN) {
				this.placeMessagesIntoRead(data.entries.slice(0, 11));
			} else {
				this.handleNewMessages(data.entries.slice(0, 11));
			}
			this.setState({...this.state, initalLoading: false});
			
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

	placeMessagesIntoRead = (newMessages: Array<BoostMessageType>) => {
		var titles = [];

		for (var i=0; i<newMessages.length; i++) {
			titles.push(newMessages[i].title);
		}
		this.setState({...this.state, processedTitles: titles});
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
