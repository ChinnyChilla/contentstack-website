import { FunctionComponent } from "react";
import "./EarthCard.css";

export type EarthCardType = {
  className?: string;
};

const EarthCard: FunctionComponent<EarthCardType> = ({ className = "" }) => {
  return (
    <div className={`earth-card ${className}`}>
      <div className="earth-card-child" />
      <div className="where-the-globe1">Where the globe will be</div>
      <div className="glassmorphism-group">
        <div className="glassmorphism1">
          <div className="rectangle1" />
        </div>
        <div className="succesful-calls-group">
          <div className="succesful-calls1">Succesful Calls</div>
          <img className="vector-icon1" alt="" src="/vector.svg" />
          <div className="ms1">312ms</div>
        </div>
      </div>
    </div>
  );
};

export default EarthCard;