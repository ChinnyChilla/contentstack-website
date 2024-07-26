import { FunctionComponent } from "react";
import "./AwardCard.css";

export type AwardCardType = {
	recipient_display_name: string;
	recipient_profile_url: string;
	award_name: string
};

const AwardCard: FunctionComponent<AwardCardType> = ({recipient_display_name, recipient_profile_url, award_name}) => {
  return (
    <div className="award-card">
		<div className="award-card-image-container">
			  <img className="award-card-profile" src={recipient_profile_url}/>
      </div>
      <div className="award-card-recipient">{recipient_display_name}</div>
      <b className="award-card-award-title">{award_name == "null" ? "Award" : award_name} Recipient</b>
    </div>
  );
};

export default AwardCard;
