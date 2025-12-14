import { Jelly, Infinity as InfinitySpinner, Helix, Mirage, TailChase } from 'ldrs/react';

import 'ldrs/react/Jelly.css';
import 'ldrs/react/Infinity.css';
import 'ldrs/react/Helix.css';
import 'ldrs/react/Mirage.css';
import 'ldrs/react/TailChase.css';

export enum SpinnerTypes {
  JELLY,
  INFINITY,
  HELIX,
  MIRAGE,
  TAIL_CHASE,
}

interface SpinnerProperties  {
  type?:         SpinnerTypes;
  size?:         number;
  speed?:        number;
  stroke?:       number;
  strokeLength?: number;
  bgOpacity?:    number;
  color?:        string;
  className?:    string;
}

export function Spinner(properties: SpinnerProperties) {
  const {
    type = SpinnerTypes.INFINITY,
    size = 20,
    speed = 1,
    stroke = 2,
    strokeLength = 0.2,
    bgOpacity = 0.1,
    color = 'white',
    className,
  } = properties;

  function renderType() {
    switch (type) {
      case SpinnerTypes.JELLY:
        return <Jelly size={size} speed={speed} color={color} />;
      case SpinnerTypes.INFINITY:
        return <InfinitySpinner size={size} speed={speed} color={color} stroke={stroke} stroke-length={strokeLength} bg-opacity={bgOpacity}  />;
      case SpinnerTypes.HELIX:
        return <Helix size={size} speed={speed} color={color} stroke-length={strokeLength} bg-opacity={bgOpacity}  />;
      case SpinnerTypes.MIRAGE:
        return <Mirage size={size} speed={speed} color={color} />;
      case SpinnerTypes.TAIL_CHASE:
        return <TailChase size={size} speed={speed} color={color} />;
      default:
        return <p>Spinner</p>;
    }
  }
  return (
    <div className={className}>
      {renderType()}
    </div>
  );
}
