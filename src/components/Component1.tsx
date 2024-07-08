import { FunctionComponent, useMemo, type CSSProperties } from "react";
import "./Component1.css";

export type Component1Type = {
  className?: string;

  /** Style props */
  component16Position?: CSSProperties["position"];
  component16Top?: CSSProperties["top"];
  component16Left?: CSSProperties["left"];
};

const Component1: FunctionComponent<Component1Type> = ({
  className = "",
  component16Position,
  component16Top,
  component16Left,
}) => {
  const component16Style: CSSProperties = useMemo(() => {
    return {
      position: component16Position,
      top: component16Top,
      left: component16Left,
    };
  }, [component16Position, component16Top, component16Left]);

  return (
    <div className={`component-16 ${className}`} style={component16Style}>
      <img className="component-16-child" alt="" src="/rectangle-47.svg" />
      <div className="component-10">
        <div className="component-10-child" />
        <div className="avatar-23">
          <img className="frame-icon" alt="" src="/frame.svg" />
          <div className="frame">
            <div className="text" />
          </div>
        </div>
        <div className="name-here">Name Here</div>
        <b className="some-milestone-number">Some milestone number here</b>
      </div>
      <div className="component-13">
        <div className="component-10-child" />
        <div className="avatar-23">
          <img className="frame-icon" alt="" src="/frame.svg" />
          <div className="frame">
            <div className="text" />
          </div>
        </div>
        <div className="name-here">Name Here</div>
        <b className="some-milestone-number">Some milestone number here</b>
      </div>
      <div className="component-14">
        <div className="component-10-child" />
        <div className="avatar-23">
          <img className="frame-icon" alt="" src="/frame.svg" />
          <div className="frame">
            <div className="text" />
          </div>
        </div>
        <div className="name-here">Name Here</div>
        <b className="some-milestone-number">Some milestone number here</b>
      </div>
      <div className="component-15">
        <div className="component-10-child" />
        <div className="avatar-23">
          <img className="frame-icon" alt="" src="/frame.svg" />
          <div className="frame">
            <div className="text" />
          </div>
        </div>
        <div className="name-here">Name Here</div>
        <b className="some-milestone-number">Some milestone number here</b>
      </div>
      <div className="component-11">
        <div className="component-10-child" />
        <div className="avatar-23">
          <img className="frame-icon" alt="" src="/frame.svg" />
          <div className="frame">
            <div className="text" />
          </div>
        </div>
        <div className="name-here">Name Here</div>
        <b className="some-milestone-number">Some milestone number here</b>
      </div>
      <div className="component-12">
        <div className="component-10-child" />
        <div className="avatar-23">
          <img className="frame-icon" alt="" src="/frame.svg" />
          <div className="frame">
            <div className="text" />
          </div>
        </div>
        <div className="name-here">Name Here</div>
        <b className="some-milestone-number">Some milestone number here</b>
      </div>
    </div>
  );
};

export default Component1;
