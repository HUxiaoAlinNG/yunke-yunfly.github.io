---
sidebar_position: 8
---

# 插件开发

## 插件架构图

![](https://yunke-oss.oss-cn-hangzhou.aliyuncs.com/bff-basis-fe-sites/imgs/2022/03/08/1646709290055-0-image.png)

## 初始化模版

1. 安装 `ycli`

```js
yarn global add @yunke/ycli
```

2. 初始化 `yunfly plugin` 模板

```js
ycli package yunfly-plugin-xxxxxx

? select package sport platform (Use arrow keys)
  Node
❯ Yunfly Plugin
  Yunfly Controller Plugin
  Monorepo Node
  Browser
  Monorepo Browser
```

> 备注： 初始化模板参考文档： <https://yued.myscrm.cn/ycli-doc/#/docs/ycli/basics/create-npm>

- 说明：

  - `Yunfly Plugin` 常用的插件开发模板，如：
    - [`@yunke/yunfly-plugin-redis`](https://xxx/yued/yunfly-plugin-redis)
      <br />
  - `Yunfly Controller Plugin` 有 `controller`, `rpc` 请求的插件模板，如：
    - [`@yunke/yunfly-plugin-controller-example`](https://xxx/yued/yunfly-plugin-controller-example)
    - [`@yunke/yunfly-plugin-schedule-example`](https://xxx/yued/yunfly-plugin-schedule-example)

## 目录结构

```
. yunfly-plugin-xxx
├── package.json
├── src
│   ├── app.ts (可选)
│   ├── config
│   |   ├── config.default.ts
│   |   ├── config.local.ts (可选)
│   |   ├── config.test.ts (可选)
│   |   ├── config.release.ts (可选)
│   |   ├── config.prod.ts (可选)
│   |   ├── config.middleware.ts (可选)
│   ├── middleware (可选)
│   |   └── SomeMiddleware.js
│   ├── controller (可选)
│   |   ├── SomeController.ts
│   ├── service (可选)
│   |   ├── SomeService.ts
│   ├── schedule (可选)
│   |   ├── task1.ts
│   |   ├── task2.ts
│   ├── __tests__  (可选)
│   |   ├── test.xxx1.ts
│   |   └── test.xxx2.ts
│   |   └── 其他文件
├── README.md
├── tsconfig.json
├── .gitignore
├── .gitlab-ci.yml
├── .eslintrc.js
├── jest.config.js
├── grpc-code-gen.config.js
└── grpc-service.dev.config.js
```

- 插件目录说明
  1. 插件入口文件为 `app.ts`
  2. 插件 `config` 同样支持`多环境`，config配置优先级：`bff config > yunfly config > plugin config`
  3. 插件支持 `controller`, 插件 `controller` 默认会自动增加`相应插件名的路由前缀`
  4. 插件支持定时任务

## 命名规范

- 插件命名规范

1. `npm`包名以`yunfly-plugin`开头，且为全小写，例如：`yunfly-plugin-xx`。比较长的词组用中划线：`yunfly-plugin-hello-world`
2. 对应的`npm`包名使用 `@yunke/yunfly-plugin-xxx` 为准

- `package.json` 书写规范

1. 遵循`yunfly`模板库规范
2. 在`keywords`里加上`yunfly`、`yunfly-plugin` 等关键字，便于索引