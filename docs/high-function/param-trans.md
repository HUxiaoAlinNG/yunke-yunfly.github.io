---
sidebar_position: 4
---

# 参数透传

- yunfly `v3.1.22+` 版本开始支持, `node >= 12.17.0`

- `yunfly` 框架支持 `metadata` 参数透传，即某些参数直接从 `controller` 透传到 `rpc` , 而不用中间一层一层传递。


## 使用

- 全局透传
  
  `config.default.ts` 文件添加下面配置

  ```ts
  // apm translate
  config.translate = (ctx: Context, metadata: Metadata) => {
    // 在jwt开启的情况下可以通过 ctx.state.payload 获得解密之后的jwt数据
    // 可以通过ctx.config 获得所有config配置信息
    if (orgcode) { metadata.add('orgcode', 'gzmj_test') }
    if (appid) { metadata.add('appid', '123456') }
  }
  ```

  | 参数 | 类型 | 说明 |
  | ------ | ------  | ------ |
  | ctx | `Context` | `koa context`对象 |
  | metadata | `Metadata` | `metadata`对象 |

  <br/>

- 局部透传
  
  在 `Controller、Service、middleware、util` 等位置注入 `metadata`，可通过 `@yunke/yunfly` 暴露的 `metadata` 对象添加透传参数 `metadata.add`

  ```ts
  import { Get, metadata } from '@yunke/yunfly'
  // 
  // 案例：Controller中使用
  class SomeController {
    // 
    Get('/user')
    async getUser() {
      // 通过 metadata.add  metadata.set 设置metadata
      metadata.add('name','zane');
      // 
      return true;
    }
  }
  ```

