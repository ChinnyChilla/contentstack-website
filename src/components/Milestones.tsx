import { FunctionComponent } from "react";
import Component from "./Component";
import "./Milestones.css";

export type MilestonesType = {
  className?: string;
};

const Milestones: FunctionComponent<MilestonesType> = ({ className = "" }) => {
  return (
    <div className={`milestones ${className}`}>
      <div className="milestones-child" />
      <b className="leaderboard">Milestones</b>
      <div className="component-161">
        <img className="component-16-item" alt="" src="/rectangle-47.svg" />
        <div className="component-101">
          <div className="milestones-child" />
          <div className="avatar-2310">
            <img className="frame-icon17" alt="" src="/frame.svg" />
            <div className="frame17">
              <div className="text17" />
            </div>
          </div>
          <div className="name-here15">Name Here</div>
          <b className="some-milestone-number8">Some milestone number here</b>
        </div>
        <div className="component-131">
          <div className="milestones-child" />
          <div className="avatar-2310">
            <img className="frame-icon17" alt="" src="/frame.svg" />
            <div className="frame17">
              <div className="text17" />
            </div>
          </div>
          <div className="name-here15">Name Here</div>
          <b className="some-milestone-number8">Some milestone number here</b>
        </div>
        <div className="component-141">
          <div className="milestones-child" />
          <div className="avatar-2310">
            <img className="frame-icon17" alt="" src="/frame.svg" />
            <div className="frame17">
              <div className="text17" />
            </div>
          </div>
          <div className="name-here15">Name Here</div>
          <b className="some-milestone-number8">Some milestone number here</b>
        </div>
        <Component />
        <div className="component-111">
          <div className="milestones-child" />
          <div className="avatar-2310">
            <img className="frame-icon17" alt="" src="/frame.svg" />
            <div className="frame17">
              <div className="text17" />
            </div>
          </div>
          <div className="name-here15">Name Here</div>
          <b className="some-milestone-number8">Some milestone number here</b>
        </div>
        <Component />
      </div>
      <img className="component-17-icon1" alt="" src="/component-17.svg" />
    </div>
  );
};

export default Milestones;