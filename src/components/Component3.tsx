import { FunctionComponent, useMemo, type CSSProperties } from "react";
import "./Component3.css";

export type Component3Type = {
  className?: string;
  component3Component17?: string;

  /** Style props */
  component17IconOverflow?: CSSProperties["overflow"];
  component17IconPosition?: CSSProperties["position"];
  component17IconTop?: CSSProperties["top"];
  component17IconLeft?: CSSProperties["left"];
};

const Component3: FunctionComponent<Component3Type> = ({
  className = "",
  component3Component17,
  component17IconOverflow,
  component17IconPosition,
  component17IconTop,
  component17IconLeft,
}) => {
  const component17IconStyle: CSSProperties = useMemo(() => {
    return {
      overflow: component17IconOverflow,
      position: component17IconPosition,
      top: component17IconTop,
      left: component17IconLeft,
    };
  }, [
    component17IconOverflow,
    component17IconPosition,
    component17IconTop,
    component17IconLeft,
  ]);

  return (
    <img
      className={`component-17-icon ${className}`}
      alt=""
      src={component3Component17}
      style={component17IconStyle}
    />
  );
};

export default Component3;
