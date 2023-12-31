import axios from 'axios'
import store from '../store/index'
import ApiResult from '../class/ApiResult'
import { ElMessage } from 'element-plus'
import router from '../router/index'
import { FormatToken } from '../tool'
const instance = axios.create({
    timeout: 3000,
    headers: {
        "Content-Type": "application/json",
        // 这这里无法使用pinia
        // "Authorization":"Bearer "+"你的token"
    }
})

// 拦截请求
instance.interceptors.request.use(
    config => {
        // 全局状态管理需要在这里获取，否则会提示没有初始化引用（需要安装什么的）
        config.headers.Authorization = "Bearer " + store().token
        return config
    }
)
// 拦截响应
instance.interceptors.response.use(
    response => {
        // 拿到请求结果后统一返回，并设置返回结果
        const res: ApiResult = response.data
        if (!res.IsSuccess) {
            ElMessage.error(res.Msg)
        }
        // 对于业务模块，只需关注结果，无需做验证提示
        return res.Result
    },
    // 请求异常走这里
    async error => {
        // 请求的配置对象
        const originalRequest = error.config
        if (!originalRequest) return Promise.reject(error)
        // 根据不同状态码，做出不同的响应
        // _retry 表示是否应该重试
        // RefreshTokenNum 表示token可以刷新的次数
        if (error.response.status === 401 && !originalRequest._retry && store().RefreshTokenNum < 2 && store().token != "") {
            console.log("进入刷新机制....")
            // 每次重试时设置为true
            originalRequest._retry = true;
            // 请求刷新token的接口
            const newAccessToken = (await getNewToken(FormatToken(store().token)?.Id!)).data.Result as string;
            if (newAccessToken) {
                // 拿到token之后更新全局状态、设置下次请求的token，返回实例
                let num = store().RefreshTokenNum + 1
                store().$patch({
                    token: newAccessToken,
                    RefreshTokenNum: num
                })
                instance.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
                return instance(originalRequest);
            }
        }
        // 401表示未授权=>跳到登录页
        else if (error.response.status === 401) {
            router.push({
                path: "/login"
            })
        } else if (error.response.status === 500) {
            ElMessage.error("内部服务器错误，请检查服务是否启动！")
        } else if (error.response.status === 404) {
            ElMessage.error("接口地址不存在，请检查接口地址！")
        } else if ((JSON.stringify(error)).indexOf('time out') > 1) {
            ElMessage.error("接口超时！")
        }
        // ...

        // 请求失败就返回错误信息
        return Promise.reject(error)
    }
)




export const getToken = (obj: {}) => {
    return instance.post(`/api/Login/GetToken`, obj)
}
export const getNewToken = (userId: string) => {
    return axios.get(`/api/Login/RefreshToken?userId=${userId}`);
}

// --------------------- 菜单模块 Start ---------------------
export const getTreeMenu = (obj: {}) => {
    return instance.post("/api/Menu/GetMenus", obj)
}
export const addMenu = (req: {}) => {
    return instance.post("/api/Menu/Add", req)
}
export const editMenu = (req: {}) => {
    return instance.post("/api/Menu/Edit", req)
}
export const delMenu = (id: string) => {
    return instance.get(`/api/Menu/Del?id=${id}`)
}
// --------------------- 菜单模块 End   ---------------------

// --------------------- 角色模块 Start ---------------------
export const getRoles = (obj: {}) => {
    return instance.post("/api/Role/GetRoles", obj)
}
export const addRole = (req: {}) => {
    return instance.post("/api/Role/Add", req)
}
export const editRole = (req: {}) => {
    return instance.post("/api/Role/Edit", req)
}
export const delRole = (id: string) => {
    return instance.get(`/api/Role/Del?id=${id}`)
}
export const settingMenu = (rid: string, mids: string) => {
    return instance.get(`/api/Menu/SettingMenu?rid=${rid}&mids=${mids}`)
}
// --------------------- 角色模块 End   ---------------------

// --------------------- 用户模块 Start ---------------------
export const getUsers = (obj: {}) => {
    return instance.post("/api/User/GetUsers", obj) 
}
export const addUser = (req: {}) => {
    return instance.post("/api/User/Add", req)
}
export const editUser = (req: {}) => {
    return instance.post("/api/User/Edit", req)
}
export const delUser = (id: string) => {
    return instance.get(`/api/User/Del?id=${id}`)
}
export const settingRole = (uid: string, rids: string) => {
    return instance.get(`/api/User/SettingRole?uid=${uid}&rids=${rids}`)
}
// --------------------- 用户模块 End   ---------------------

// --------------------- 个人信息模块 Start -------------------
export const editPersonInfo = (req: {}) => {
    return instance.post(`/api/User/EditNickNameOrPassword`, req)
}
// --------------------- 个人信息模块 End ---------------------