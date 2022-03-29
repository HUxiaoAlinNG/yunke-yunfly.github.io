---
sidebar_position: 8
---

# 日志

测试正式环境会将日志上传至阿里云日志系统，可以向管理员（团队SM|运维团队）索取帐号查看

* npm包：@yunke/logger
* 在 `index.ts` 顶部加入如下代码

```ts
// 保证尽量早的引入logger配置
import loggerConfig from "@yunke/logger";
const packageJson = require('../package.json');
loggerConfig({ name: packageJson.name });
```

* 使用

```ts
console.log('日志记录')
console.info(obj, 'string');
console.error(err);
```

云客BFF日志主要分为3种类型的日志：
>
> * 记录常规业务需求日志的 `business.log` 日志
> * 记录错误信息的 `error.log` 日志
> * 记录框架请求链路的 `access.log` 日志

* `business.log` 日志
在业务代码和框架中的任何以下打印日志都会输出到 `business.log` 中

```js
console.log
console.info
console.warn
console.trace
console.debug
```

备注：尽量使用 `console.info` 进行日志的打印

* `error.log` 日志
所有业务和框架中的 `console.error` 日志都会输出到 `error.log` 中

* `access.log` 日志
`access.log` 主要记录框架请求链路日志，不要再业务代码中使用，一个完整的请求链路日志如下：

|  案例图片   |
|  ----  |
| ![](http://big-c.oss-cn-hangzhou.aliyuncs.com/cms/img/2020/05/18/yHmaK3nBY61589773478118.jpeg) |

主要输出以下内容：
>
> * `grpc` 服务 `path` 完整地址
> * 客户端请求`url地址`和`请求类型`
> * 完整的 `metadata` 请求参数
> * 完整的 `客户端请求参数` option
> * BFF到Go服务的请求链路 `trace.id`

## 日志自动添加 trace-id

对于基于 `console` 生成的阿里云日志，我们可以通过配置 `src/config` 中 `trace.log` 为 `true` 开启自动添加 `trace-id` 的能力。

```js
{
  config.trace = {
    log: true
  }
}
```

开启前后对比为：

![console-trace](https://yunke-oss.oss-cn-hangzhou.aliyuncs.com/bff-basis-fe-sites/imgs/2021/09/03/1630660513404-0-cosnole-trace.jpg)

## 日志查询平台

查询日志的主要方式有：
>
> * 阿里云日志系统
> * 阿里云容器服务
> * 云客自身搭建的apm服务

具体账号和查询方式请咨询相关团队人员，（SM、团队前端或者BFF维护者）

<br/>
<br/>
<br/>
