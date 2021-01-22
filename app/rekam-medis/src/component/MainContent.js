import React from 'react';
import classNames from 'classnames';
import { isDesktop } from '@simrs/common/src/helpers/deviceDetector';

export default function MainContent({ children }) {
  return (
    <div
      className={classNames('fixed right-0 left-0 bg-white', {
        'top-14 bottom-0': !isDesktop,
        'top-25.5 bottom-12': isDesktop,
      })}
    >
      {children}
    </div>
  );
}
