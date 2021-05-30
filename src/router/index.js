import Vue from 'vue'
import Router from 'vue-router'
import store from "../store/index";

Vue.use(Router);


//获取原型对象上的push函数
const originalPush = Router.prototype.push
//修改原型对象中的push方法
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

const baseRouters = [
    {
        path: "/",
        name: 'home',
        component: () =>
            import('@/view/home/index.vue')
    },
    {
        path: "/login",
        name: 'Login',
        component: () =>
            import('@/view/Login/index.vue')
    },
    {
        path: "/dashboard",
        name: 'Dashboard',
        component: () =>
            import('@/view/Dashboard/index.vue'),
        meta: {
            requiresAuth: true, // 添加表示需要验证
            keepAlive: false // 不需要缓存

        }
    }
]

// 需要通过后台数据来生成的组件

const createRouter = () => new Router({
    routes: baseRouters
})

const router = createRouter()


router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        //这里判断用户是否登录，验证本地存储是否有token
        if (store.getters["getAuthData"].token ==='') { // 判断当前的token是否存在
            // next({
            //     path: '/login',
            //     query: { redirect: to.fullPath }
            // })
            router.push('/login')
        } else {
            next()
        }
    } else {
        next() // 确保一定要调用 next()
    }

    if (to.matched.some(record => record.path==="/login")) {
        if (store.getters["getAuthData"].token) {
            router.back()
        }else {
            // next({
            //     path: '/login',
            //     query: { redirect: to.fullPath }
            // })
            router.push('/login')
        }
    }else {
        next() // 确保一定要调用 next()
    }
})

export default router