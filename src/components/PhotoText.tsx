import PropTypes from "prop-types";
import "./PhotoText.css";

const PhotoText = ({ className = "" }) => {
  return (
    <div className={`photo-text ${className}`}>
      <img className="photo-text-child" alt="" src="/rectangle-47-1.svg" />
      <div className="avatar-20-wrapper">
        <div className="avatar-202">
          <img
            className="avatar-border-icon1"
            loading="lazy"
            alt=""
            src="/frame-11.svg"
          />
          <div className="profile-display">
            <div className="profile-name3" />
          </div>
        </div>
      </div>
      <div className="name-here-parent">
        <div className="name-here6">Name Here</div>
        <img
          className="info-background-icon"
          alt=""
          src="/info-background@2x.png"
        />
      </div>
      <div className="photo-message">
        <div className="congratulate-on-everything-container">
          <p className="congratulate-on-everything">
            Congratulate on everything that we did @_____.  
          </p>
          <p className="we-accomplished-a">We accomplished a lot!</p>
          <p className="blank-line9">&nbsp;</p>
          <p className="blank-line10">&nbsp;</p>
          <p className="i-love-our">{`I love our team! ❤️ `}</p>
        </div>
      </div>
    </div>
  );
};

PhotoText.propTypes = {
  className: PropTypes.string,
};

export default PhotoText;
