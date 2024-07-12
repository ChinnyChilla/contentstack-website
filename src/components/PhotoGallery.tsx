import React from "react";
import SimpleText from "./SimpleText";
import './PhotoGallery.css';

interface MessageType {
	creator_user_display_name: string;
	creator_user_id: string;
	message_content: string;
	creator_user_profile_url: {
		href: string;
		title: string;
	};
	message_content_parsed: string;
}

interface PageState {
	messages: Array<MessageType>;
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
			messages: [],
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

			const url = `${process.env.REACT_APP_CONTENTSTACK_BASE_URL}/v3/content_types/slack_message/entries?${parameters.toString()}`;
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
				console.log(data.entries);
				this.setState({
					messages: data.entries.slice(0, 11), // Ensure only 11 items are fetched
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
		if (this.carouselInterval) {return;}

		this.carouselInterval = setInterval(() => {
			this.setState((prevState) => {
				const nextIndex = prevState.currentCarouselIndex + 1;
				const isLastIndex = nextIndex >= (prevState.messages.length+1)

				return {
					currentCarouselIndex: isLastIndex ? 0 : nextIndex,
					isTransitioning: !isLastIndex,
				};
			});
		}, 3000);
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

		const { messages, currentCarouselIndex, isTransitioning } = this.state;

		// Create a list with appended cloned items to achieve the looping effect
		const clonedMessages = [...messages, ...messages.slice(0, this.numClones)];

		return (
			<div className="photo-gallery-container">
				<div
					className={`carousel-wrapper ${isTransitioning ? "" : "no-transition"}`}
					style={{
						display: 'flex',
						transform: `translateX(-${currentCarouselIndex * (100 / 13)}%)`,
					}}
				>
					{clonedMessages.map((message, index) => (
						<div
							key={index}
							className="carousel-item"
						>
							<SimpleText
								message={message.message_content_parsed}
								creator_display_name={message.creator_user_display_name}
								creator_profile_url={message.creator_user_profile_url.href}
							/>
						</div>
					))}
				</div>
		</div>
		);
	}
}

export default PhotoGallery;
