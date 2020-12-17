import React, { useState, useCallback } from 'react';

export default function TableContainer({
  children,
  height = 'auto',
  maxHeight = 'auto',
  maxHeightMinus = 50,
  width = 'auto',
  maxWidth = 'auto',
  maxWidthMinus = 15,
}) {
  /**
   * set maxHeight props to 'screen-height' to set table height auto end of screen
   * set height props to '..px' to set table height manual
   * if maxWidth not set, default always use auto and auto calculate to prevent overflow content
   * set width props to '..px' to set table width manual
   */
  const [divHeight, setDivHeight] = useState(
    height === 'auto' ? window.innerHeight : height
  );
  const [divMaxHeight, setDivMaxHeight] = useState(
    maxHeight === 'auto' ? window.innerHeight : maxHeight
  );
  const [divWidth, setDivWidth] = useState(
    width === 'auto' ? window.innerWidth : width
  );
  const [divMaxWidth, setDivMaxWidth] = useState(
    maxWidth === 'auto' ? window.innerWidth : maxWidth
  );

  const position = useCallback((node) => {
    if (node !== null && maxHeight === 'screen-height') {
      setDivMaxHeight(
        'calc(100vh - ' +
          (node.getBoundingClientRect().top + maxHeightMinus) +
          'px)'
      );
      setDivHeight('unset');
    } else {
      setDivMaxHeight('unset');
      setDivHeight('unset');
    }
    if (node !== null && maxWidth === 'auto') {
      setDivMaxWidth(
        'calc(100vw - ' +
          (node.getBoundingClientRect().left + maxWidthMinus) +
          'px)'
      );
      setDivWidth('unset');
    }
  }, []);

  return (
    <div
      className="border"
      ref={position}
      style={{
        overflow: 'auto',
        height: divHeight,
        maxHeight: divMaxHeight,
        width: divWidth,
        maxWidth: divMaxWidth,
      }}
    >
      {children}
    </div>
  );
}
