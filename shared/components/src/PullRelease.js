import React from 'react';
import _ from 'lodash';
import { useSpring, animated } from 'react-spring';
import { useDrag } from 'react-use-gesture';

export default function PullRelease({ children, onEndDrag }) {
  const [{ xy }, set] = useSpring(() => ({ xy: [0, 0] }));
  const bind = useDrag(({ down, delta, velocity, movement, last }) => {
    velocity = _.clamp(velocity, 1, 8);
    set({
      xy: down ? delta : [0, 0],
      config: { mass: velocity, tension: 500 * velocity, friction: 50 },
    });
    if (last && (0 !== movement[0] || 0 !== movement[1])) {
      onEndDrag();
    }
  });

  return (
    <animated.div
      {...bind()}
      style={{
        cursor: 'move',
        userSelect: 'none',
        transform: xy.interpolate((x, y) => `translate3d(${x}px, ${y}px, 0)`),
      }}
    >
      {children}
    </animated.div>
  );
}
