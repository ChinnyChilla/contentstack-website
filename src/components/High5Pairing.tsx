import { FunctionComponent } from "react";
import "./High5Pairing.css";

export type High5PairingProps = {
	top: string;
	left: string;
	giver: {
		display_name: string,
		profile_url: string,
	};
	reciever: {
		display_name: string,
		profile_url: string,
	};
	animationName: string; // Add this line
};

const High5Pairing: FunctionComponent<High5PairingProps> = ({ top, left, giver, reciever, animationName }) => {
	var animationDuration = '0.5s';
	var animationDelay = '0s';
	var animationDirection = 'normal';

	if (animationName == 'float-animation') {
		animationDuration = `${8 + Math.random() * 3}s`;
		animationDelay = `${Math.random() * 2}s`;
		animationDirection = Math.random() > 0.5 ? 'normal' : 'reverse';
	}
	return (
		<div className={`high5-pairing-container ${animationName}`} style={{
			top, left, position: 'absolute', animationDuration,
			animationDelay,
			animationDirection
		}}>
			<div className="high5-pairing-wrapper">
				<div className="high5-pairing-avatar">
					<img className="high5-pairing-image" src={giver.profile_url} alt="Avatar 1" />
					<span className="high5-pairing-name">{giver.display_name}</span>
				</div>
			</div>
			<div className="high5-pairing-icon">
				<img className="image-icon" src="temp.png" alt="Icon" />
			</div>
			<div className="high5-pairing-wrapper">
				<div className="high5-pairing-avatar">
					<img className="high5-pairing-image" src={reciever.profile_url} alt="Avatar 1" />
					<span className="high5-pairing-name">{reciever.display_name}</span>
				</div>
			</div>
		</div>
	);
};

export default High5Pairing;
