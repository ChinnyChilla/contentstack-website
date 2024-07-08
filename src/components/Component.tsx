import { FunctionComponent } from "react";
import "./Component.css";

export type ComponentType = {
  className?: string;
};

const Component: FunctionComponent<ComponentType> = ({ className = "" }) => {
  return (
    <div className={`component-121 ${className}`}>
      <div className="component-12-item" />
      <div className="avatar-238">
        <img className="frame-icon12" alt="" src="/frame.svg" />
        <div className="frame12">
          <div className="text12" />
        </div>
      </div>
      <div className="name-here11">Name Here</div>
      <b className="some-milestone-number7">Some milestone number here</b>
    </div>
  );
};

export default Component;
