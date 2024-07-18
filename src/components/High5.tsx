import { FunctionComponent } from "react";
import Component1 from "./Component1";
import Component3 from "./Component3";
import "./High5.css";

export type MilestonesType = {
  className?: string;
};

const Milestones: FunctionComponent<MilestonesType> = ({ className = "" }) => {
  return (
    <div className={`milestones ${className}`}>
      <div className="milestones-child" />
      <b className="leaderboard">Most Recent High-5's</b>
      
    </div>
  );
};

export default Milestones;
