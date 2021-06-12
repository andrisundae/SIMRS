import React, { useState, useCallback } from 'react';

export default function TableContainer({
  children,
  height = 'auto',
  maxHeight = 'screen-height',
  maxHeightMinus = 65,
  width = 'auto',
  maxWidth = 'auto',
  maxWidthMinus = 0,
  className,
  style = {},
}) {
  /**
   * set maxHeight props to 'auto' or '..px' to set table max height manual
   * set height props to '..px' to set table height manual
   * if maxWidth not set, default always use auto and auto calculate to prevent overflow content
   * set width props to '..px' to set table width manual
   */
  const [divHeight, setDivHeight] = useState(
    height === 'auto' ? height : parseInt(height, 10)
  );
  const [divMaxHeight, setDivMaxHeight] = useState(
    maxHeight.constructor === String
      ? maxHeight === 'auto' ||
        maxHeight === 'screen-height' ||
        -1 < maxHeight.indexOf('%')
        ? maxHeight
        : parseInt(maxHeight, 10)
      : parseInt(maxHeight, 10)
  );
  const [divWidth, setDivWidth] = useState(
    width === 'auto' ? width : parseInt(width, 10)
  );
  const [divMaxWidth, setDivMaxWidth] = useState(
    maxWidth.constructor === String
      ? maxWidth === 'auto' ||
        maxWidth === 'screen-width' ||
        -1 < maxWidth.indexOf('%')
        ? maxWidth
        : parseInt(maxWidth, 10)
      : parseInt(maxWidth, 10)
  );

  const position = useCallback((node) => {
    if (node !== null && maxHeight === 'screen-height') {
      setDivMaxHeight(
        'calc(100vh - ' +
          (node.getBoundingClientRect().top + parseInt(maxHeightMinus, 10)) +
          'px)'
      );
      setDivHeight('unset');
    } else if (maxHeight !== 'auto' && height === 'auto') {
      setDivHeight('unset');
    }
    if (node !== null && maxWidth === 'auto') {
      setDivMaxWidth(
        'calc(100vw - ' +
          (node.getBoundingClientRect().left + parseInt(maxWidthMinus, 10)) +
          'px)'
      );
      setDivWidth('unset');
    }
  }, []);

  return (
    <div
      className={'border rounded overflow-auto ' + className}
      ref={position}
      style={{
        ...style,
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
