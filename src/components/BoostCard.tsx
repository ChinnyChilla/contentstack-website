import PropTypes from "prop-types";
import "./BoostCard.css";

const BoostCard = ({ className = "" }) => {
  return (
    <div className={`boost-card ${className}`}>
      <img className="boost-card-child" alt="" src="/rectangle-47-1.svg" />
      <div className="avatar-201">
        <img
          className="avatar-container-icon"
          loading="lazy"
          alt=""
          src="/frame-9.svg"
        />
        <div className="name-display1">
          <div className="profile-name1" />
        </div>
        <img className="image-12-icon" alt="" src="/image-12@2x.png" />
      </div>
      <div className="new-boost-info">
        <div className="new-boost">New Boost!</div>
        <div className="just-boosted-poeple-here-container">
          <p className="just-boosted-poeple">@____ Just boosted poeple!</p>
          <p className="blank-line2">&nbsp;</p>
          <p className="blank-line3">&nbsp;</p>
          <p className="blank-line4">&nbsp;</p>
          <p className="here-is-the">Here is the boost message!</p>
          <p className="blank-line5">&nbsp;</p>
          <p className="blank-line6">&nbsp;</p>
          <p className="blank-line7">&nbsp;</p>
          <p className="blank-line8">&nbsp;</p>
          <p className="thank-you-">Thank you @___ and @____</p>
        </div>
        <img
          className="message-background-icon"
          loading="lazy"
          alt=""
          src="/rectangle-40@2x.png"
        />
      </div>
    </div>
  );
};

BoostCard.propTypes = {
  className: PropTypes.string,
};

export default BoostCard;
