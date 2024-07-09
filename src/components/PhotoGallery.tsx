import AwardCard from "./AwardCard";
import PhotoText from "./PhotoText";

import BirthdayCard from "./BirthdayCard";
import SimpleText from "./SimpleText";
import BoostCard from "./BoostCard";
import React from "react";

import './PhotoGallery.css'

interface MessageType {
	creator_user_display_name: string,
	creator_user_id: string,
	message_content: string
	creator_user_profile_url: {
		href: string,
		title: string
	}
}
interface PageState {
	messages: Array<MessageType>,
	isLoading: boolean,
}
class PhotoGallery extends React.Component<{}, PageState> {
	constructor(props: any) {
		super(props)

		this.state = {
			messages: [],
			isLoading: true
		}
	}

	componentDidMount(): void {
		console.log("Component mounted");
		console.log('Environment Variables:', process.env.REACT_APP_CONTENTSTACK_ENVIRONMENT_NAME, process.env.REACT_APP_CONTENTSTACK_API_KEY, process.env.REACT_APP_CONTENTSTACK_ACCESS_TOKEN, process.env.REACT_APP_CONTENTSTACK_BASE_URL);


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
		console.log('Fetching URL:', url);

		fetch(url, {
			method: "GET",
			headers: headers
		})
			.then(response => {
				if (!response.ok) {
					console.error('HTTP error:', response.status, response.statusText);
					throw new Error('Network response was not ok');
				}
				return response.json();
			})
			.then(data => {
				console.log(data.entries);
				this.setState({
					messages: data.entries,
					isLoading: false,
				})
			})
			.catch(error => {
				console.error('Fetch error:', error);
			});
	}

	render() {
		if (this.state.isLoading) {
			return (
				<div>
					Loading...
				</div>
			)
		}

		return (
			<div className="photo-gallery-container">
				{
					this.state.messages.map((message, index) => {
						if (index > 5) {
							return;
						}
						return (
						<SimpleText message={message.message_content} creator_display_name={message.creator_user_display_name} creator_profile_url={message.creator_user_profile_url.href}/>
					)} )
				}
			
			</div>

		)
	}
   
}

export default PhotoGallery