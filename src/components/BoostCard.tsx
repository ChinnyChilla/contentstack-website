import { FunctionComponent } from "react";
import "./BoostCard.css";

export type BoostCardType = {
  className?: string;
};

const BoostCard: FunctionComponent<BoostCardType> = ({ className = "" }) => {
  return (
    <div className={`boost-card ${className}`}>
      <img className="boost-card-child" alt="" src="/rectangle-47-1.svg" />
      <div className="new-boost1">New Boost!</div>
      <div className="just-boosted-people-container3">
        <p className="just-boosted-people3">
          <b className="b9">@____</b>
          <span> Just boosted people!</span>
        </p>
        <p className="just-boosted-people3">Now is it normal?</p>
        <p className="here-is-the1">Here is the boost message!</p>
        <p className="just-boosted-people3">
          <span>{`Thank you `}</span>
          <b className="b9">@__</b>
          <span className="b9">{` and `}</span>
          <b className="b9">@____</b>
        </p>
      </div>
      <div className="avatar-205">
        <img className="frame-icon20" alt="" src="/frame-9.svg" />
        <div className="frame20">
          <div className="text20" />
        </div>
        <img className="image-12-icon1" alt="" src="/image-12@2x.png" />
      </div>
      <img className="boost-card-item" alt="" src="/rectangle-40@2x.png" />
    </div>
  );
};

export default BoostCard;
