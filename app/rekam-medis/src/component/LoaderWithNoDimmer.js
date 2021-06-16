import React from 'react';
import { Loader } from 'semantic-ui-react';

export default function LoaderWithNoDimmer({ children = null }) {
  return (
    <div className="h-full flex justify-center items-center">
      <div>
        <Loader
          active
          inverted
          className="w-6 h-6 text-gray-900 before:border-gray-500 before:w-6 before:h-6 after:border-gray-300 after:border-r-0 after:w-6 after:h-6"
          style={{ marginLeft: 5 }}
        />
      </div>
      <div className="mt-24">{children}</div>
    </div>
  );
}
