import { ComponentType } from 'react';

import Square from '../shapes/square.svg?react';
import Circle from '../shapes/circle.svg?react';

export type ShapeType = 'triangle' | 'square' | 'circle' | 'star';

interface Properties {
  type:                ShapeType;
  fill?:               string;
  stroke?:             string;
  strokeWidthPercent?: number;
  width?:              number;
  height?:             number;
}

export function Shape(properties: Properties) {
  const { type, fill, width, height, stroke, strokeWidthPercent } = properties;

  const SvgComponent = getShape();

  function getShape(): ComponentType<any> {
    switch (type) {
      case 'square':
        return Square;
      case 'circle':
        return Circle;
      default:
        return Square;
    }
  }

  const radius = strokeWidthPercent ? 50 - strokeWidthPercent / 2 : 50;

  return (
    <SvgComponent
      width={width}
      height={height}
      fill={fill}
      stroke={stroke}
      strokeWidth={strokeWidthPercent}
      style={{ display: 'block' }}
      r={radius}
    />
  );
}
