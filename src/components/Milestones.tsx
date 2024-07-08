import { FunctionComponent } from "react";
import Component1 from "./Component1";
import Component3 from "./Component3";
import "./Milestones.css";

export type MilestonesType = {
  className?: string;
};

const Milestones: FunctionComponent<MilestonesType> = ({ className = "" }) => {
  return (
    <div className={`milestones ${className}`}>
      <div className="milestones-child" />
      <b className="leaderboard">Milestones</b>
      <Component1
        component16Position="absolute"
        component16Top="78px"
        component16Left="22px"
      />
      <Component3
        component3Component17="/component-17.svg"
        component17IconOverflow="unset"
        component17IconPosition="absolute"
        component17IconTop="491px"
        component17IconLeft="368px"
      />
    </div>
  );
};

export default Milestones;