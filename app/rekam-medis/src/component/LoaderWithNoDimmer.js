import React from 'react';
import { Loader } from 'semantic-ui-react';

export default function LoaderWithNoDimmer() {
  return (
    <div className="relative h-full">
      <Loader
        active
        inverted
        className="text-gray-900 before:border-gray-500 before:w-6 before:h-6 after:border-gray-300 after:border-r-0 after:w-6 after:h-6"
      />
    </div>
  );
}
