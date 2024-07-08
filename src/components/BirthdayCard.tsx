import { FunctionComponent } from "react";
import "./BirthdayCard.css";

export type BirthdayCardType = {
  className?: string;
};

const BirthdayCard: FunctionComponent<BirthdayCardType> = ({
  className = "",
}) => {
  return (
    <div className={`birthday-card ${className}`}>
      <img className="birthday-card-child" alt="" src="/rectangle-47-1.svg" />
      <div className="avatar-221">
        <img className="frame-icon15" alt="" src="/frame-10.svg" />
        <div className="frame15">
          <div className="text15" />
        </div>
      </div>
      <div className="happy-birthday1">Happy Birthday!!</div>
      <div className="name-here14">Name Here</div>
      <img className="image-10-icon1" alt="" src="/image-10@2x.png" />
      <img className="image-11-icon1" alt="" src="/image-11@2x.png" />
    </div>
  );
};

export default BirthdayCard;
