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
	}
	animationDuration: string;
	animationDelay: string;
	animationDirection: string;
	
};

const High5Pairing: FunctionComponent<High5PairingProps> = ({ top, left, giver, reciever, animationDuration, animationDelay, animationDirection }) => {
	return (
		<div className="high5-pairing-container" style={{
			top, left, position: 'absolute', animationDuration,
			animationDelay,
			animationDirection}}>
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
