import { FunctionComponent } from "react";
import "./PhotoText.css";

export type PhotoTextType = {
  className?: string;
};

const PhotoText: FunctionComponent<PhotoTextType> = ({ className = "" }) => {
  return (
    <div className={`photo-text ${className}`}>
      <img className="photo-text-child" alt="" src="/rectangle-47-1.svg" />
      <div className="name-here19">Name Here</div>
      <div className="avatar-205">
        <img className="frame-icon21" alt="" src="/frame-11.svg" />
        <div className="frame21">
          <div className="text21" />
        </div>
      </div>
      <img className="photo-text-item" alt="" src="/info-background@2x.png" />
      <div className="i-would-like1">
        I would like to thank @___ team for their hard work!
      </div>
    </div>
  );
};

export default PhotoText;