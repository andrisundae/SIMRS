import { lazy } from 'react';

export default [
  {
    key: '_anamnesis',
    path: '/anamnesis',
    component: lazy(() => import('@module/anamnesis')),
  },
];
