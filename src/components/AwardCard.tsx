import { FunctionComponent } from "react";
import "./AwardCard.css";

export type AwardCardType = {
  className?: string;
};

const AwardCard: FunctionComponent<AwardCardType> = ({ className = "" }) => {
  return (
    <div className={`award-card ${className}`}>
      <img className="award-card-child" alt="" src="/rectangle-47-1.svg" />
      <div className="avatar-239">
        <img className="frame-icon13" alt="" src="/frame-10.svg" />
        <div className="frame13">
          <div className="text13" />
        </div>
      </div>
      <div className="name-here12">Name Here</div>
      <b className="thank-you-award1">Thank You Award Recipient</b>
    </div>
  );
};

export default AwardCard;
