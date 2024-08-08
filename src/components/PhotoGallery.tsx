import React from "react";
import './PhotoGallery.css';
import AwardCard from "./AwardCard";
import BoostCard from "./BoostCard";
import PubNub from "pubnub";
interface AwardCardType {
	award_title_name: string,
	award_user_display_name: string,
	award_profile_url: {
		title: string,
		href: string,
	},
	created_at: string,
}

interface BoostMessageType {
	message_content: string,
	message_content_parsed: string,
	giver_user_id: string,
	giver_display_name: string,
	giver_profile_url: {
		title: string,
		href: string,
	}
	category: string,
	created_at: string
}
interface PageState {
	awardCards: Array<AwardCardType>;
	boostMessages: Array<BoostMessageType>;
	isLoading: boolean;
	currentCarouselIndex: number;
	isTransitioning: boolean;
	combinedMessages: Array<AwardCardType | BoostMessageType>;
	newAwards: boolean;
}

class PhotoGallery extends React.Component<{}, PageState> {
	intervalId: NodeJS.Timer | null;
	carouselInterval: NodeJS.Timer | null;
	numClones: number;
	PubNub: PubNub;
	

	constructor(props: any) {
		super(props);

		this.intervalId = null;
		this.carouselInterval = null;
		this.numClones = 6; // Number of items to clone

		this.state = {
			awardCards: [],
			boostMessages: [],
			isLoading: true,
			currentCarouselIndex: 0,
			isTransitioning: false,
			combinedMessages: [],
			newAwards: false,
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

	addListener = () => {
		this.PubNub.addListener({
			message: ({ channel, message, publisher }: any) => {
				console.log("NEW PUBNUB MESSAGE")
				console.log(message);
				this.setState({
					newAwards: true
				})
			}
		})
	}
	fetchMessages() {
		const parameters = new URLSearchParams({
			environment: process.env.REACT_APP_CONTENTSTACK_ENVIRONMENT_NAME || "",
			locale: "en-us",
			include_fallback: "true",
			include_branch: "false"
		});

		const headers = new Headers();
		headers.set("api_key", process.env.REACT_APP_CONTENTSTACK_API_KEY || "");
		headers.set("access_token", process.env.REACT_APP_CONTENTSTACK_ACCESS_TOKEN || "");

		const url = `${process.env.REACT_APP_CONTENTSTACK_BASE_URL}/v3/content_types/award_card/entries?${parameters.toString()}`;
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
			console.log("this is for award cards")
			console.log(data.entries);
			this.setState({
				awardCards: data.entries.slice(0, 11), // Ensure only 11 items are fetched
			}, this.combineAndSortMessages);
		}).catch(error => {
			console.error('Fetch error:', error);
		});
		const boost_url = `${process.env.REACT_APP_CONTENTSTACK_BASE_URL}/v3/content_types/boost_message/entries?${parameters.toString()}`;
		console.log(`Fetched url ${url}`);
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
			console.log("this is for boost messages")
			console.log(data.entries);
			this.setState({
				boostMessages: data.entries.slice(0, 11), // Ensure only 11 items are fetched
				isLoading: false,
				newAwards: false,
			}, this.combineAndSortMessages);
		}).catch(error => {
			console.error('Fetch error:', error);
		});
	}
	componentDidMount() {

		this.addListener();
		this.PubNub.subscribe({ channels: ["award"] });

		// Initial fetch
		this.fetchMessages();
		// Start the carousel
		this.startCarousel();
	}

	componentWillUnmount(): void {
		if (this.intervalId) {
			clearInterval(this.intervalId);
		}
		if (this.carouselInterval) {
			clearInterval(this.carouselInterval);
		}
	}

	combineAndSortMessages = () => {
		const { awardCards, boostMessages } = this.state;

		const combinedMessages = [...awardCards, ...boostMessages].sort((a, b) => {
			return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
		}).slice(0, 15);

		this.setState({ combinedMessages });
	}

	startCarousel = () => {
		if (this.carouselInterval) { return; }

		this.carouselInterval = setInterval(() => {
			this.setState((prevState) => {
				const nextIndex = prevState.currentCarouselIndex + 1;
				const isLastIndex = nextIndex >= (prevState.combinedMessages.length + 1)

				if (isLastIndex && prevState.newAwards) {
					this.fetchMessages();
				}

				return {
					currentCarouselIndex: isLastIndex ? 0 : nextIndex,
					isTransitioning: !isLastIndex,
				};
			});
		}, 5000);
	}

	render() {
		if (this.state.isLoading) {
			return (
				<div className="photo-gallery-container">
					<span>
						Loading...
					</span>
				</div>
			);
		}

		const { combinedMessages, currentCarouselIndex,  isTransitioning } = this.state;

		const clonedMessages = this.state.combinedMessages.slice(0, 4);

		var messagesToRender = combinedMessages.concat(clonedMessages)

		return (
			<div className="photo-gallery-container">
				<div className={`carousel-wrapper ${isTransitioning ? "" : "no-transition"}`} style={{ transform: `translateX(-${currentCarouselIndex * 35}%)` }}>
					{messagesToRender.map((item, index) => (
						<div className="carousel-item" key={index}>
							{'award_title_name' in item ? (
								<AwardCard recipient_display_name={item.award_user_display_name} recipient_profile_url={item.award_profile_url.href} award_name={item.award_title_name} />
							) : (
								<BoostCard message={item.message_content_parsed == null ? item.message_content : item.message_content_parsed} 
											giver_display_name={item.giver_display_name == "" ? item.giver_profile_url.title : item.giver_display_name} 
											giver_profile_url={item.giver_profile_url.href} category={item.category} />
							)}
						</div>
					))}
				</div>
			</div>
		);
	}
}

export default PhotoGallery;
