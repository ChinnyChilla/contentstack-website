import { FunctionComponent } from "react";
import "./SimpleText.css";

export type SimpleTextType = {
  className?: string;
};

const SimpleText: FunctionComponent<SimpleTextType> = ({ className = "" }) => {
  return (
    <div className={`simple-text ${className}`}>
      <img className="simple-text-child" alt="" src="/rectangle-47-1.svg" />
      <div className="name-here15">Name Here</div>
      <div className="avatar-204">
        <img className="frame-icon16" alt="" src="/frame-11.svg" />
        <div className="frame16">
          <div className="text16" />
        </div>
      </div>
      <div className="just-boosted-people-container2">
        <p className="just-boosted-people2">
          <b className="b6">@____</b>
          <span> Just boosted people!</span>
        </p>
        <p className="just-boosted-people2">Now is it normal?</p>
        <p className="just-boosted-people2">This is just normal text</p>
        <p className="just-boosted-people2">
          <span>{`Thank you `}</span>
          <b className="b6">@__</b>
          <span className="b6">{` and `}</span>
          <b className="b6">@____</b>
        </p>
      </div>
    </div>
  );
};

export default SimpleText;
