---
sidebar_position: 5
---

# 链路追踪

- `v3.1.20`新增, `node.js >= 12.17.0`

- 为了给开发者更好的开发体验，日志中间件已内置在引擎中

`config.default.ts`文件添加配置

```ts
config.trace = {
  log: true, // 日志自动添加 trace-id 输出
  devLog: true, // 开发环境是否开启 trace-id 输出
}
```

## 日志自动增加 `trace-id`

`trace.log` 用于控制当我们调用 `console` 相关方法时，是否增加 `trace-id`，开关前后的对比为：

![console-trace](https://yunke-oss.oss-cn-hangzhou.aliyuncs.com/bff-basis-fe-sites/imgs/2021/09/03/1630660513404-0-cosnole-trace.jpg)

- 备注： `异步接口中`的`trace-id可能会有问题`，一般不做为日志参考标准
