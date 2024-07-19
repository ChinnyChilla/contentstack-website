import React from "react"
import ReactConfetti from "react-confetti";
import "./Splashscreen.css"

interface SplashScreenState {
	animationStage: string,
}

class SplashScreen extends React.Component<{}, SplashScreenState> {

	constructor(props: any) {
		super(props);
		this.state = {
			animationStage: 'intro'
		}
	}


	componentDidMount(): void {
		setTimeout(() => {
			this.setState({
				animationStage: 'confetti'
			})
		}, 5 * 1000)
		setTimeout(() => {
			this.setState({
				animationStage: 'shrink'
			})
		}, 15 * 1000)
	}

	// componentDidMount() 
	render() {
		return(
			<div className={`splashscreen ${this.state.animationStage}`}>
				{
					this.state.animationStage == "confetti" && <ReactConfetti width={window.innerWidth * 0.8 - 100}/>
				}
			</div>
		)
	};
}

export default SplashScreen;