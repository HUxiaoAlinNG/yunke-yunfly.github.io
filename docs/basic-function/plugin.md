---
sidebar_position: 11
---

# 插件

## 插件概述

### 为什么要用插件

1. 中间件加载其实是有先后顺序的, `koa` 中间件无法管理这种顺序
2. 中间件的定位是拦截用户请求，并在它前后做一些事情，例如：`鉴权`、`安全检查`、`访问日志`等等。但实际情况是，有些功能是和请求无关的，例如：`redis`、`apollo`、`定时任务`、`消息订阅`、`业务逻辑`等等。
3. 有些功能包含非常复杂的初始化逻辑，需要在应用启动的时候完成。这显然也不适合放到中间件中去实现。

综上几点，我们需要一套更加强大的机制，来管理、运行那些相对独立的业务逻辑。

## 插件使用

- 下面以 `redis` 插件为案例

  - 备注：`redis` 插件已集成到 `yunfly` 框架中

1. 安装 `redis npm包`

```ts
yarn add @yunke/yunfly-plugin-redis
```

2. `config/config.plugin.ts` 下声明插件

```ts
/**
 * yunfly 插件
 * 数组顺序就是插件的加载顺序
 */
const plugins: {[key:string]: string}[] = [
  /**
   * redis 插件
   * 使用npm包模式
   */
  {
    name: 'redis',
    package: '@yunke/yunfly-plugin-redis'
  }
];
// 
export default plugins;
```

3. `config.default.ts` 中新增 `redis` 插件配置

```ts
/**
 * 使用私有的redis库（从apollo获取redis账号信息）
 * 备注：可通过顶层注入的apolloConfig获取配置
 */
config.redis = (apolloConfig: { [key: string]: any }) => {
  return {
    enable: true,
    host: apolloConfig['BFF-COMMON-REDIS-HOST'],
    password: apolloConfig['BFF-COMMON-REDIS-PASSWORD'],
    port: apolloConfig['BFF-COMMON-REDIS-PORT'],
  }
};
```

- 插件配置参数说明

| 字段 | 类型 | 必选 | 说明 |
| ------ | ------ |------ |------ |
| name | `string` | 是 | 当前插件配置的唯一标识`name`, 跟`config.default.ts`中字段保持一致, `name` 字段很有用，它用来标识`是否有重复插件`和`插件覆盖`的能力 |
| package | `string` | 否 | `npm包`插件名，例如: `@yunke/yunfly-plugin-redis`。 (备注：`package`与`path`必须有一个字段为真)|
| path | `string` | 否 | `本地开发`插件目录地址 (备注：`package`与`path`必须有一个字段为真)|

<br/>

### package 和 path

- `package` 是 `npm` 方式引入，也是最常见的引入方式
- `path` 是绝对路径引入，如应用内部抽了一个插件，但还没达到开源发布独立 `npm` 的阶段
