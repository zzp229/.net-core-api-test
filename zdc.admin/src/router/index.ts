import { createRouter, createWebHistory } from 'vue-router'
import { SettingUserRouter } from '../tool/index'

const router = createRouter({
    history: createWebHistory(),
    //全局的放这里，不然就是放到子类
    routes: [
        {
            name: "login",
            path: "/login",
            component: () => import("../view/index/LoginPage.vue")
        },
        {
            name: "notfound",
            path: "/:pathMatch(.*)",
            component: () => import("../view/index/NotFound.vue")
        },
        {
            name: "admin",
            path: "/",
            component: () => import("../view/index/RootPage.vue"),
            children: [
                {
                    name: " ",
                    path: "/desktop",
                    component: () => import("../view/index/Desktop.vue")
                },
                {
                    name: "person",
                    path: "/person",
                    component: () => import("../view/index/PersonPage.vue")
                },
                // {
                //     name: "menu",
                //     path: "/menu",
                //     component: () => import("../view/admin/menu/menu.vue")
                // },
                // {
                //     name: "role",
                //     path: "/role",
                //     component: () => import("../view/admin/role/role.vue")
                // },
                // {
                //     name: "user",
                //     path: "/user",
                //     component: () => import("../view/admin/user/user.vue")
                // },
            ]
        },
        
    ]
})


// 路由导航：到某页面之前的拦截
// 当路由存在时，则跳转；不存在时，则404
router.beforeEach((to, from, next) => {

    // 未登录时，没有权限，也不需要读取路由
    if (to.path != "/login") {
        // 读取数据并设置动态路由
         SettingUserRouter();
    }

    // 未登录时，重定向到登录页
    // if (store().token == "" || !store().token) {
    //     if (to.path != "/login") {
    //         next("/login")
    //     }
    // } else {
    //     // Todo：判断登录有效期，并且避免重定向次数过多

    // }

    // // 动态路由已经添加进去了，但是刷新页面后404
    // console.log(router.getRoutes())
    // // 原因是动态添加的路由需要在下次导航时，才生效
    // if (to.name == "notfound") {
    //     // 所以要进行手动跳转到动态添加的路由，但是前提是跳转的path在路由中存在才行
    //     if (router.getRoutes().find(p => p.path == to.path))
    //     {
    //         // 存在则跳转
    //         next(to.path)
    //     }
    // }
    next();
})


export default router