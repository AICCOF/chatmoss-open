import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            name: 'Index',
            path: '/',
            component: () => import('@/pages/index.vue'),
            meta: {
                title: '首页'
            }
        },
        {
            name: 'search-key',
            path: '/search/key',
            component: () => import('@/pages/search/key.vue'),
            meta: {
                title: 'Key信息查询'
            }
        }
    ],
    scrollBehavior: () => ({ left: 0, top: 0 })
})

router.beforeEach((to, from, next) => {
    document.title = `ChatMoss开放平台-${to.meta.title}`
    next()
})

export default router