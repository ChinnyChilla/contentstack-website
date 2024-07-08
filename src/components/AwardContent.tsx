import { useMemo } from "react";
import PropTypes from "prop-types";
import "./AwardContent.css";

const AwardContent = ({ className = "", propPadding }) => {
  const awardContentStyle = useMemo(() => {
    return {
      padding: propPadding,
    };
  }, [propPadding]);

  return (
    <div className={`award-content ${className}`} style={awardContentStyle}>
      <div className="avatar-233">
        <div className="avatar-border-wrapper">
          <img
            className="avatar-border-icon"
            loading="lazy"
            alt=""
            src="/frame-10.svg"
          />
        </div>
        <div className="recipient-name">
          <div className="profile-name2" />
        </div>
      </div>
    </div>
  );
};

AwardContent.propTypes = {
  className: PropTypes.string,

  /** Style props */
  propPadding: PropTypes.any,
};

export default AwardContent;
