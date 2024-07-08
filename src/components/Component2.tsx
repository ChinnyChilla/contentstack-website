import { FunctionComponent, useMemo, type CSSProperties } from "react";
import "./Component2.css";

export type Component2Type = {
  className?: string;

  /** Style props */
  component9Width?: CSSProperties["width"];
  component9Height?: CSSProperties["height"];
  component9Position?: CSSProperties["position"];
  component9Top?: CSSProperties["top"];
  component9Right?: CSSProperties["right"];
  component9Bottom?: CSSProperties["bottom"];
  component9Left?: CSSProperties["left"];
};

const Component2: FunctionComponent<Component2Type> = ({
  className = "",
  component9Width,
  component9Height,
  component9Position,
  component9Top,
  component9Right,
  component9Bottom,
  component9Left,
}) => {
  const component9Style: CSSProperties = useMemo(() => {
    return {
      width: component9Width,
      height: component9Height,
      position: component9Position,
      top: component9Top,
      right: component9Right,
      bottom: component9Bottom,
      left: component9Left,
    };
  }, [
    component9Width,
    component9Height,
    component9Position,
    component9Top,
    component9Right,
    component9Bottom,
    component9Left,
  ]);

  return (
    <div className={`component-9 ${className}`} style={component9Style}>
      <div className="component-9-child" />
      <div className="avatar-236">
        <img className="frame-icon6" alt="" src="/frame.svg" />
        <div className="frame6">
          <div className="text6" />
        </div>
      </div>
      <div className="name-here6">Name Here</div>
      <b className="some-milestone-number6">Some milestone number here</b>
    </div>
  );
};

export default Component2;
