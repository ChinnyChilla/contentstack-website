import React from "react"
import ReactConfetti from "react-confetti";
import { Fireworks } from "fireworks-js"
import "./Splashscreen.css"


interface User {
	display_name: string;
	profile_url: string;
}

interface SplashScreenProps {
	giver: User;
	value: string;
	message: string;
}

interface SplashScreenState {
	animationStage: string;
	giver: User;
	value: string;
	message: string;
}

class SplashScreen extends React.Component<SplashScreenProps, SplashScreenState> {

	constructor(props: any) {
		super(props);
		this.state = {
			animationStage: "intro",
			giver: {
				display_name: this.props.giver.display_name,
				profile_url: this.props.giver.profile_url
			},
			value: this.props.value,
			message: this.props.message
		};
	}


	componentDidMount(): void {
		setTimeout(() => {
			let shuffle = Math.random();

			if (shuffle > 0.5) {
				const container = document.querySelector('.splashscreen-firework')
				if (!container) return;
				const fireworks = new Fireworks(container, {intensity: 50})
				fireworks.start();
			} else {
				this.setState({
					animationStage: 'confetti'
				})
			}
 			
		}, 2 * 1000)
		setTimeout(() => {
			this.setState({
				animationStage: 'shrink'
			})
		}, 20 * 1000)
	}

	createMarkup = (html: any) => {
		return { __html: html };
	}
	render() {

		let valueEmoji;

		switch (this.state.value) {
			case "tribe":
				valueEmoji = "🌻"
				break;
			case "trendsetters":
				valueEmoji = "💡"
				break;
			case "dreamer":
				valueEmoji = "✨"
				break;
			default:
				valueEmoji = "❤️"
		}
		

		return(
			<div className={`splashscreen ${this.state.animationStage}`}>
				{
					this.state.animationStage == "confetti" && <ReactConfetti width={window.innerWidth} height={window.innerHeight}/>
				}
				<div className="splashscreen-firework">

				</div>
				<div className="splashscreen-content">
					<div className="splashscreen-header">
						<div className="splashscreen-header-picture">
							<img className="splashscreen-header-image" src={this.state.giver.profile_url} alt={this.state.giver.display_name} />
						</div>
						<div className="splashscreen-header-text">
							<span>
								New Boost Message from {this.state.giver.display_name}
							</span>
						</div>
					</div>
					<div className="splashscreen-body">
						<div className="splashscreen-body-text">
							<span dangerouslySetInnerHTML={this.createMarkup(this.state.message)} />
						</div>
						<div className="splashscreen-value-picture">
							<img className="splashscreen-value-image" src={`${this.state.value}_icon_old.png`} alt={this.state.value} />
						</div>
						
					</div>
					<div className="splashscreen-value">
						Living our Value: {valueEmoji} {this.state.value == "do_the_right_thing" ? "Do the Right Thing" : this.state.value.charAt(0).toUpperCase() + this.state.value.slice(1)} {valueEmoji}
					</div>
				
				</div>
			</div>
		)
	};
}

export default SplashScreen;