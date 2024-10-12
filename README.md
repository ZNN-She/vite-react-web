# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# 组件库
使用antd
# 主题
配置文件
```
src/layouts/AtndConfigProvider.tsx
```
# layout
```
src/layouts/index.tsx
```
* 可以再LayoutPage中判断需要返回的layout组件，比如登录不需要菜单导航这些

# 路由
* 根据src/page/**/index.tsx终点目录自动生成
* ***注意：文件首字母大写则认为是组件，否则认为是页面***
* 权限控制：如果需要做动态路由的权限控制，可以更具配置在这里过滤不需要注册的路由(菜单导航也可以过滤，做入口控制)

# 导航菜单
```
src/layouts/nav.tsx
```
* 这里包含了所有的菜单配置
* menuData 是对一些隐藏配置的菜单做了过滤，比如：isMenu: false
* 权限控制：如果需要做菜单入口的菜单控制，可以子啊getMenu方法中处理(可以配合路由权限控制一起使用)

# API管理pont-engine
* https://github.com/alibaba/pont#readme
* 通过重写pontCode的fetch方法，可以自定义pont请求
  ```
    import axiosInstance from './utils/axiosInstance.ts'

    import { PontCore } from './api/pontCore.ts'

    PontCore.fetch = axiosInstance;
  ```

# basename
使用package.json中的name作为basename，在构建的base和路由的basename使用

# table-render
列表使用table-render组件

#MOCK数据
* https://github.com/pengzhanbo/vite-plugin-mock-dev-server/tree/main