import { FunctionComponent } from "react";
import './BoostCard.css'

export type BoostCardType = {
	message: string;
	giver_display_name: string;
	giver_profile_url: string;
	category: string
};

const BoostCard: FunctionComponent<BoostCardType> = ({ message, giver_display_name, giver_profile_url, category }) => {
	let valueEmoji;

	switch (category) {
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
	const createMarkup = (html: any) => {
		return { __html: html };
	}
	return (
		<div className="boost-card">
			<div className="boost-card-inner">
				<div className="boost-card-front">
					<div className="boost-card-header">
						<div className="boost-avatar-container">
							<img className="boost-card-profile" alt="" src={giver_profile_url} />
						</div>
						<div className="boost-card-name">{giver_display_name}</div>
					</div>
					<div className="boost-card-text-container">
						<span className="boost-card-message-body-text" dangerouslySetInnerHTML={createMarkup(message)} />
					</div>
				</div>
				<div className="boost-card-back">
					<div className="boost-card-value">
						{valueEmoji} {category == "do_the_right_thing" ? "Do the Right Thing" : category.charAt(0).toUpperCase() + category.slice(1)} {valueEmoji}
					</div>
					<div className="boost-card-image">
						<img src={`${category}_icon.png`} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default BoostCard;