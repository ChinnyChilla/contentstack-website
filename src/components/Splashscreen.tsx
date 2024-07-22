import React from "react"
import ReactConfetti from "react-confetti";
import "./Splashscreen.css"

interface User {
	display_name: string;
	profile_url: string;
}

interface SplashScreenProps {
	giver: User;
	receiver: User;
	value: string;
	message: string;
}

interface SplashScreenState {
	animationStage: string;
	giver: User;
	receiver: User;
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
			receiver: {
				display_name: this.props.receiver.display_name,
				profile_url: this.props.receiver.profile_url
			},
			value: this.props.value,
			message: this.props.message
		};
	}


	componentDidMount(): void {
		setTimeout(() => {
			this.setState({
				animationStage: 'confetti'
			})
		}, 2 * 1000)
		setTimeout(() => {
			this.setState({
				animationStage: 'shrink'
			})
		}, 10 * 1000)
	}

	// componentDidMount() 
	render() {
		return(
			<div className={`splashscreen ${this.state.animationStage}`}>
				{
					this.state.animationStage == "confetti" && <ReactConfetti width={window.innerWidth * 0.8 - 100} />
				}
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
							{this.state.message}
						</div>
						<div className="splashscreen-value-picture">
							<img className="splashscreen-value-image" src={`${this.state.value}_icon.png`} alt={this.state.value} />
						</div>
						
					</div>
					<div className="splashscreen-value">
						Living our Value: ❤️ {this.state.value} ❤️
					</div>
				
				</div>
			</div>
		)
	};
}

export default SplashScreen;