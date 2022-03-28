---
sidebar_position: 4
---

# Config 配置

## config 配置

- config 文件目录下可新增如下文件：

> - config.default.ts : 默认配置项 （优先级最低）
> - config.local.ts   : `local` 环境配置项，（本地环境时生效）
> - config.test.ts    : `test` 环境配置项，（测试环境时生效）
> - config.release.ts : `release` 环境配置项，（预发环境发时生效）
> - config.prod.ts    : `prod` 环境配置项，（生产环境时生效）

- 配置说明：

> - 所有的配置文件均为非必须项，（建议：最少有一个 default 配置文件）
> - 通过不同的环境加载不同的配置项，做到环境的隔离。（备注：default 配置项在任何环境都会生效）
> - 环境配置项里面的配置会覆盖掉 default 里面的配置项
> - `config.plugin.ts` 中声明需要启用的插件
> - `config.default.ts | config.[ENV].ts` 中配置插件启动所需要的配置项
<br />

- config.default.ts

| 字段 | 类型 | 说明 |
| ------ | ------ |------ |
| log | `LogConfig` | log中间件配，日志输出，也可自定义过滤掉某些敏感的日志字段 |
| cluster | `ClusterConfig` | cluster模式 |
| jwt | `JWTOptions` | jwt配置项，使用enable配置项开启与关闭 |
| trace | `TraceConfig` | 链路追踪 |
| translate | `Translate` | BFF参数透传自定义函数 |
| apm | `ApmActiveConfig` | 启用apm服务条件 |
| routingControllersOptions | `RoutingControllersOptions / () => RoutingControllersOptions` | routing-controller配置项，参考`routing-controllers` 包类型说明 |
| error | `ErrorConfig` | BFF全局错误拦截，兜底错误处理，主要处理 `unhandledRejection`、`uncaughtException` 和 `error` 错误 |
| apollo | `ApolloConfig` | 阿波罗配置项，使用enable配置项开启与关闭 |
| socket | `SocketConfig` | socket配置项，使用enable配置项开启与关闭 |
| response | `ResponseConfig` | response中间件配置，使用enable配置项开启与关闭 |
| security | `SecurityOptions` | 安全配置项，（`v3.1.0 版本新增`）|
| bodyParser | `BodyParserOptions` | bodyParser中间件参数配置，（`v3.1.10 版本新增`）[文档参考地址](https://www.npmjs.com/package/koa-bodyparser#options) |

### 各类配置项具体说明

- `LogConfig`

| `LogConfig` | 类型 | 说明 |
| ------ | ------ |------ |
| enable | `boolean` | 是否启用 |
| headers | `boolean` | 是否打印header内容 |
| response | `boolean` | 是否打赢response内容 |
| filter | `string[]` | 需要过滤log的api，默认：['/metrics'] |
| customLog | `(err: any, ctx: Koa.Context) => any` | 自定义日志处理函数 |

- `ClusterConfig`

| `ClusterConfig` | 类型 | 默认值 |必填 | 说明 |
| ------ | ------ | ------ | ------ | ------ |
| enable | `boolean` |  `true`  | 是 | 是否启用模式（true为开启、false为关闭） |
| count | `number` |  `4` | 否 | cluster模式下的worker数量 (生产环境自动获取docker容器的cpu核数，开发环境默认为1)，（建议使用默认配置） |
| reloadDelay | `number`| `600` |  否  | reload模式下频繁保存时重启cluster服务延迟时间 [单位：毫秒] |
| useAloneWorker | `boolean` |  `true` |  否  | 是否开启alone独立进程（推荐开启） |
| env | `object` |  `{}` |  否  | 多进程模型注入的环境变量集合，默认已注入以下环境变量：（NODE_ENV/YUNKE_ENV/APOLLO_META_SERVER_URL/ETCDV3_SERVER_URLS/PRIVATE_TOKEN/CLUSTER/TENANT_NAMESPACE） |

- `JWTOptions`

| `JWTOptions` | 类型 | 默认值 |必填 | 说明 |
| ------ | ------ | ------ | ------ | ------ |
| enable | `boolean` |  `true`  | 是 | 是否启用JWT校验（true为开启、false为关闭） |
| expiredPassThrough | `boolean` |  `true`  | 否 | 当`JWT`过期时是`自动重签`还是向外`抛出过期错误`, 当选择向外抛出`过期错误`信息时,外层中间件自定义`JWT`过期逻辑 `v3.2.0+` |
| secret | `string` |  `YUNKE_BFF_JWT_TOKEN_RANDOM_V1` | 是 | jwt盐值 （常量，最好保持唯一） |
| expire | `string/number`| `3h` |  否  | 过期时间 Eg: 60, "2 days", "10h", "7d".  ("120" is equal to "120ms"). |
| token | `JWTTokenOptions` |  `{ type:'header', key: 'Authorization' }` |  否  |token配置项 （重要参数，请关注下面说明。）|
| rsSign | `RsSignOptions` |  `{ enable?: boolean, interval?: number }` |  否  |自动续签,`interval`单位为分，默认为15分钟。若开启，当判断过期时间是否快超过`interval`分钟， 如果快超过就重新生成JWT秘钥。若`expire`小于等于`interval`则不处理|
| global | `boolean` | `true` | 否 |   是否全局启用JWT校验 （重要参数，请关注下面说明。） |
| unless | `string[]` | `['/favicon.ico']` | 否  | {gobbal:true}时，此参数可用，需要排除jwt验证的接口 |
| passThrough | `boolean` | `false`| 否  | {gobbal:true}时，此参数可用，校验不通过时是否继续执行 |

- `TraceConfig`

| `TraceConfig` | 类型 | 说明 |
| ------ | ------ |------ |
| log | `boolean` | console 方法自动增加 trace-id 输出|
| devLog | `boolean` | 开发环境是否开启 trace-id 输出|

- `ApmActiveConfig`

| `ApmActiveConfig` | 类型 | 说明 |
| ------ | ------ |------ |
| active | `boolean` | 是否启用apm服务 |
| logLevel | `string` | 日志Level |

- `RoutingControllersOptions`

| `RoutingControllersOptions` | 类型 | 说明 |
| ------ | ------ |------ |
| routePrefix | `string` | 路由前缀 |
| currentUserChecker | `function` |  |
| defaultErrorHandler | `boolean` | 是否使用默认的错误处理 |
| controllers | `any[]` |  |
| middlewares | `any[]` |  |

- `ErrorConfig`

| `ErrorConfig`      | 类型                                  | 默认值  | 必填              | 说明                  |
| ------------------ | ------------------------------------- | ------- | ----------------- | --------------------- |
| enable             | `boolean`                             | `true`  | 是                | 是否开启错误处理      |
| errCode            | `number \| true \| Record<Key, Key>`  | `2`     | 否                | 错误码 `v3.2.1+`              |
| useYunflyLog       | `boolean`                             | `true`  | 否                | 是否开启yunfly日志格式记录    |
| enableHttpCode     | `boolean`                             | `false` | 否                | 是否开启 HTTP 状态码 `v3.2.1+`   |
| useRpcErrorMessage | `boolean`                             | `true`  | 否                | 是否返回 rpc 错误信息 `v3.2.1+`  |
| showMessageDetail  | `boolean`                             | `false` | 否                | 是否返回错误详情  `v3.2.1+`      |
| customError        | `(err: any, ctx: Koa.Context) => any` |         | 否                | 自定义错误，若定义，则不会执行`yunfly-plugin-error`中间件后续逻辑            |
| customErrorHandle  | `(err: any, ctx: Koa.Context) => any` |         | 否                | 可用于重新组装错误，并不影响`yunfly-plugin-error`中间件后续逻辑的执行           |
| unhandledRejection | `(err: any, ctx: Koa.Context) => any` |         | 否                | 自定义 Promise 错误   |
| uncaughtException  | `(err: any, ctx: Koa.Context) => any` |         | 否                | 自定义未能捕获的异常  |

- `ApolloConfig`

| `ApolloConfig` | 类型 | 说明 |
| ------ | ------ |------ |
| enable | `boolean` | 是否启用 |
| prodGray | `boolean` | 配置是否区分 g0, g1, g2 |
| secret | `string` | 阿波罗秘钥 |

- `SocketConfig`

| `SocketConfig` | 类型 | 说明 |
| ------ | ------ |------ |
| enable | `boolean` | 是否启用 |
| path | `string` | socket path |
| type | `string` | 可选值 `worker`: 随机选择一个 `worker` 执行， `all`: 所有 `worker`都执行, 默认为 `worker` |

- `ResponseConfig`

| `ResponseConfig` | 类型 | 说明 |
| ------ | ------ |------ |
| enable | `boolean` | 是否启用 |
| succCode | `number` | 自定义接口成功返回code值（不传则默认为0） |
| customResponse | `(err: any, ctx: Koa.Context) => any` | 自定义response处理函数 |

- `SecurityOptions`

| `SecurityOptions` | 类型 | 说明 |
| ------ | ------ |------ |
| enable | `boolean` | 是否开启安全配置 |
| ignore | `string[]` | 忽略路径（生效于所有安全配置项） |
| match | `string[]` | 命中路径（生效于所有安全配置项） |
| methods | `MethodsConfig` | 请求类型安全配置 |
| whitelist | `WhitelistConfig` | 域名白名单安全配置 |
| csrf | `CsrfConfig` | csrf相关安全配置 |
| xframe | `XframeConfig` | iframe相关安全配置 |
| hsts | `HstsConfig` | 禁止http协议打开相关安全配置 |
| cors | `CorsConfig` | 跨域相关安全配置 |
| csp | `CspConfig` | 资源限制相关安全配置 |
| rateLimiter | `RateLimiterConfig` | 限流相关安全配置 |
| crypto | `CryptoConfig` | 接口加密安全配置 |

- `MethodsConfig`

| `MethodsConfig` | 类型 | 说明 |
| ------ | ------ | ------ |
| enable | `boolean` | 是否开启`方法`安全限制 |
| values | `string[]` | 只允许通过的方法，如 ['GET', 'POST', 'OPTIONS'] |

- `WhitelistConfig`

| `WhitelistConfig` | 类型 | 说明 |
| ------ | ------ | ------ |
| enable | `boolean` | 是否开启`域名白名单`安全限制 |
| values | `string[]` | 只允许通过的域名，如 ['www.baidu.com'] |

- `CsrfConfig`

| `CsrfConfig` | 类型 | 说明 |
| ------ | ------ |------ |
| enable | `boolean` | 是否启用 |
| match | `string[]` | 命中路径 |
| ignore | `string[]` | 忽略路径 |
| ignoreMethods | `string[]` | 忽略方法 |
| keyName | `string` | 获取验证`touken`值的`header key`名或`cookie key`名 |
| bodyName | `string` | 如果 token 通过参数传值时，定义的 key 名称 |
| saltLength | `number` | 盐值长度（一般默认即可） |
| secretLength | `number` | 加密密钥长度（一般默认即可） |

- `XframeConfig`

| `XframeConfig` | 类型 | 说明 |
| ------ | ------ |------ |
| enable | `boolean` | 是否开启 |
| match | `string[]` | 需要开启 csrf 规则的 url 列表，命中规则为`indexOf`, 值为空则命中所有路由 |
| ignore | `string[]` | 需要忽略 csrf 规则的 url 列表，命中规则为`indexOf` |
| value | `string` | 值为：`deny/sameorigin/allow-from uri` |

- `HstsConfig`

| `HstsConfig` | 类型 | 说明 |
| ------ | ------ |------ |
| enable | `boolean` | 是否开启 |
| match | `string[]` | 需要开启 csrf 规则的 url 列表，命中规则为`indexOf`, 值为空则命中所有路由 |
| ignore | `string[]` | 需要忽略 csrf 规则的 url 列表，命中规则为`indexOf` |
| maxAge | `number` | https 访问过期时间（默认：15552000，即：180 天） |
| includeSubDomains | `boolean` | 是否开启子域 |

- `CorsOptions`

| `CorsOptions` | 类型 | 说明 |
| ------ | ------ |------ |
| enable | `boolean` | 是否启用 |
| origin | `string / ((ctx: Koa.Context) => boolean / string)` | 域 |
| exposeHeaders | `string[]` |  |
| maxAge | `number` |  |
| credentials | `boolean` |  |
| allowMethods | `string[]` | 允许的请求类型 |
| allowHeaders | `string[]` | 允许的请求头信息 |

- `CspConfig`

| `CspConfig` | 类型 | 说明 |
| ------ | ------ |------ |
| enable | `boolean` | 是否开启 |
| match | `string[]` | 需要开启 csrf 规则的 url 列表，命中规则为`indexOf`, 值为空则命中所有路由 |
| ignore | `string[]` | 需要忽略 csrf 规则的 url 列表，命中规则为`indexOf` |
| reportOnly | `boolean` | 使用 Content-Security-Policy-Report-Only 指令 |
| directives | `DirectivesConfig` | 指令规则 (值为`key->value`对象类型，value 是`string[]`类型) |

- `RateLimiterConfig`

| `RateLimiterConfig` | 类型 | 默认值 |必填 | 说明 |
| ------ | ------ | ------ | ------ | ------ |
| enable | `boolean` | 是 | 是否开启配置 |
| match | `string[]` | 否 | 需要开启 csrf 规则的 url 列表，命中规则为`indexOf`, 值为空则命中所有路由 |
| ignore | `string[]` | 否 | 需要忽略 csrf 规则的 url 列表，命中规则为`indexOf` |
| errorCode | `number` | 否 | 自定义错误码（默认 429） |
| errorMsg | `string` | 否 | 自定义错误信息 （默认当前限流类型提示）|

- `CryptoConfig`

| `CryptoConfig` | 类型 | 默认值 |必填 | 说明 |
| ------ | ------ | ------ | ------ | ------ |
| enable | `boolean` | 是 | 是否开启配置 |
| match | `string[]` | 否 | 需要开启 csrf 规则的 url 列表，命中规则为`indexOf`, 值为空则命中所有路由 |
| ignore | `string[]` | 否 | 需要忽略 csrf 规则的 url 列表，命中规则为`indexOf` |
| errorCode | `number` | 否 | 自定义错误码（默认 429） |
| errorMsg | `string` | 否 | 自定义错误信息 （默认当前限流类型提示）|

## 插件配置

- config.plugin.ts

完整的`config.plugin.ts`案例

```ts
/**
 * yunfly 插件
 * 数组顺序就是插件的加载顺序
 */
import * as path from 'path'
// 
const plugins: {[key:string]: string}[] = [
  /**
   * 使用path模式，插件在项目目录
   */
  {
    name: 'hello',
    path: path.join(__dirname, '../plugin/yunfly-plugin-hello'),
  },
  /**
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

## 中间件配置

- config.middleware.ts

`config.middleware.ts`配置参考

```ts
import { KoaApp, Config } from '@yunke/yunfly'
export default function KoaMiddleware(app: KoaApp, config: Config) {
  // 
  app.use(async (ctx: any, next: any) => {
    // doing something here.
    ctx.name = 'zane'
    await next()
  })
  // 
}
```
