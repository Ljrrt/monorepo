import { cn }                                           from '@monorepo/common';
import { MotionValue, motion, useSpring, useTransform } from 'framer-motion';
import { CSSProperties, useEffect }                     from 'react';

interface NumberProps {
  mv:     MotionValue<number>;
  number: number;
  height: number;
}

function Number({ mv, number, height }: NumberProps) {
  const y = useTransform(mv, (latest) => {
    const placeValue = latest % 10;
    const offset     = (10 + number - placeValue) % 10;
    let memo         = offset * height;
    if (offset > 5) {
      memo -= 10 * height;
    }
    return memo;
  });

  return (
    <motion.span
      className="absolute inset-0 flex items-center justify-center"
      style={{ y }}
    >
      {number}
    </motion.span>
  );
}

interface DigitProps {
  place:       number;
  value:       number;
  height:      number;
  digitStyle?: string;
}

function Digit({ place, value, height, digitStyle }: DigitProps) {
  const valueRoundedToPlace = Math.floor(value / place);
  const animatedValue       = useSpring(valueRoundedToPlace);

  useEffect(() => {
    animatedValue.set(valueRoundedToPlace);
  }, [animatedValue, valueRoundedToPlace]);

  return (
    <div className={cn('relative w-[1ch] tabular-nums typo-number text-neutral place-self-center', digitStyle)} style={{ height }}>
      {Array.from({ length: 10 }, (_, i) => (
        <Number key={i} mv={animatedValue} number={i} height={height} />
      ))}
    </div>
  );
}

interface CounterProperties {
  value:                  number;
  places?:                number[];
  className?:             string;
  style?:                 CSSProperties;
  digitClassName?:        string;
  bottomGradientClasses?: string;
  topGradientClasses?:    string;
  containerHeight:        number;
}

export function Counter(properties: CounterProperties) {
  const {
    value,
    places = [100, 10, 1],
    className,
    digitClassName,
    bottomGradientClasses = 'from-transparent',
    topGradientClasses = 'from-transparent',
    containerHeight,
    style,
  } = properties;

  return (
    <div className={cn('relative inline-block', className)} style={style}>

      <div className={cn('flex overflow-hidden')}>
        {places.map(place => (
          <Digit
            key={place}
            place={place}
            value={value}
            height={containerHeight}
            digitStyle={digitClassName}
          />
        ))}
      </div>

      <div className="pointer-events-none absolute inset-0">
        <div className={cn('h-10 bg-linear-to-b from-black to-transparent', topGradientClasses)} />
        <div className={cn('absolute bottom-0 h-10 w-full bg-linear-to-t from-black to-transparent', bottomGradientClasses)} />
      </div>
    </div>
  );
}
