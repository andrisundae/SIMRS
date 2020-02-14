import { lazy } from 'react';

const routers = [
    {
        key: '_farmasi_master_supplier',
        path: '/farmasi/master/supplier',
        component: lazy(() => import('@module/supplier'))
    },
    {
        key: '_system_portal_change_password',
        path: '/system/portal/change-password',
        component: lazy(() => import('@module/change-password'))
    },
]

export default routers;

