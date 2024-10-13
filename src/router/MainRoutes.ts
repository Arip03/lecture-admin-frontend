const MainRoutes = {
    path: '/main',
    meta: {
        requiresAuth: false
    },
    redirect: '/main',
    component: () => import('@/layouts/full/FullLayout.vue'),
    children: [
        {
            name: 'Dashboard',
            path: '/',
            component: () => import('@/views/dashboard/index.vue')
        },
        {
            name: 'Users',
            path: '/user',
            component: () => import('@/views/components/UserList.vue')
        },
        {
            name: 'Form',
            path: '/form/:id',
            props: true,
            component: () => import('@/views/components/Form.vue')
        },
    ]
};

export default MainRoutes;
