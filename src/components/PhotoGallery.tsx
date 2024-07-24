import React from "react";
import SimpleText from "./SimpleText";
import './PhotoGallery.css';
import AwardCard from "./AwardCard";
import BoostCard from "./BoostCard";
import SplashScreen from "./Splashscreen";

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
			combinedMessages: [],
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
				}, this.combineAndSortMessages);
			}).catch(error => {
				console.error('Fetch error:', error);
			});
		};

		// Initial fetch
		fetchMessages();

		// Set interval for subsequent fetches
		this.intervalId = setInterval(fetchMessages, 5 * 60 * 1000);

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
		});

		this.setState({ combinedMessages });
	}

	startCarousel = () => {
		this.carouselInterval = setInterval(() => {
			this.setState((prevState) => {
				const nextIndex = (prevState.currentCarouselIndex + 1) % prevState.combinedMessages.length;
				return {
					currentCarouselIndex: nextIndex,
				};
			});
		}, 1000);
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

		const { combinedMessages, currentCarouselIndex } = this.state;

		return (
			<div className="photo-gallery-container">
				<div className="carousel-wrapper" style={{ transform: `translateX(-${currentCarouselIndex * 35}%)` }}>
					{combinedMessages.map((item, index) => (
						<div className="carousel-item" key={index}>
							{'award_title_name' in item ? (
								<AwardCard recipient_display_name={item.award_user_display_name} recipient_profile_url={item.award_profile_url.href} award_name={item.award_title_name} />
							) : (
								<BoostCard message={item.message_content} giver_display_name={item.giver_display_name} giver_profile_url={item.giver_profile_url.href} category={item.category} />
							)}
						</div>
					))}
				</div>
			</div>
		);
	}
}

export default PhotoGallery;
