---
sidebar_position: 7
---

# Context 活动对象

- `v3.1.20`新增，`node.js >= 12.17.0`

- `yunfly` 提供在 `service`、`npm包`、`自定义函数`、`plugin` 等位置获取当前 `context` 对象的能力。

## 使用

- 自定义函数获取

  ```ts
  import { getCurrentContext } from '@yunke/yunfly'
  import { Context } from 'koa'
  // 获得koa 的 ctx对象
  const ctx = getCurrentContext();
  ```

- 在`Service`中或取`Context`对象

  ```ts
  // service
  import { getCurrentContext } from '@yunke/yunfly'
  import { Context } from 'koa'
  import { Service } from "typedi";

  @Service()
  export default class ExampleService {

    async getContextInService(): Promise<Object> {
      // 在service代码中获取当前的context对象
      const ctx: Context = getCurrentContext();
      const res = {
        config: ctx.config,
        trace.id: ctx.req.traceId,
      }
    }
  }
  ```
