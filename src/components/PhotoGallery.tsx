import React from "react";
import SimpleText from "./SimpleText";
import './PhotoGallery.css';
import AwardCard from "./AwardCard";
import SplashScreen from "./Splashscreen";

interface AwardCardType {
	award_title_name: string,
	award_user_display_name: string,
	award_profile_url: {
		title: string,
		href: string,
	}
}

interface BoostMessageType {

}
interface PageState {
	awardCards: Array<AwardCardType>;
	boostMessages: Array<BoostMessageType>;
	isLoading: boolean;
	currentCarouselIndex: number;
	isTransitioning: boolean;
}

class PhotoGallery extends React.Component<{}, PageState> {
	intervalId: NodeJS.Timer | null;
	carouselInterval: NodeJS.Timer | null;
	numClones: number;

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
		};
	}

	componentDidMount() {
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
				}, this.startCarousel);
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
				}, this.startCarousel);
			}).catch(error => {
				console.error('Fetch error:', error);
			});
		};

		// Initial fetch
		fetchMessages();

		// Set interval for subsequent fetches
		this.intervalId = setInterval(fetchMessages, 5 * 60 * 1000);
	}

	componentWillUnmount(): void {
		if (this.intervalId) {
			clearInterval(this.intervalId);
		}
		if (this.carouselInterval) {
			clearInterval(this.carouselInterval);
		}
	}

	startCarousel = () => {
		// if (this.carouselInterval) {return;}

		// this.carouselInterval = setInterval(() => {
		// 	this.setState((prevState) => {
		// 		const nextIndex = prevState.currentCarouselIndex + 1; // number of messages moved by (1)
		// 		const isLastIndex = nextIndex >= (prevState.messages.length + 1)

		// 		return {
		// 			currentCarouselIndex: isLastIndex ? 0 : nextIndex,
		// 			isTransitioning: !isLastIndex,
		// 		};
		// 	});
		// }, 3000);
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


		var user = {
			display_name: "Michael",
			profile_url: "https://ca.slack-edge.com/TKLUV7DCL-U077W921K2L-5c933dd9a52e-512"
		}
		var message = "I love chicken";
		var value = "Care";



		return (
			<div className="photo-gallery-container">
					<AwardCard />
					<SplashScreen giver={user} message={message} value={value} />
			</div>
		);
	}
}

export default PhotoGallery;
