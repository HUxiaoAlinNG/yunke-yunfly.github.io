---
sidebar_position: 9
---

# 生命周期

- 1、框架提供了统一的入口文件（`/src/app.ts`）进行BFF生命周期的定义
- 2、生命周期导出一个 `AppLifeHook` 的类，在类中定义各种生命周期

- 3、生命周期说明：

| 字段 | 类型 | 说明 |
| ------ | ------ |------ |
| beforeStart | `function` | BFF应用开始前执行的内容，此处可做一些日志打印标识 |
| configDidReady | `function` | Config配置文件加载完成，此处可以对Config配置进行更改 |
| appDidReady | `function` | 单线程：此处表示初始化koa服务完成。 多线程：此处表示alone进程与所有worker进程初始化koa服务完成。此处可以做一些初始化操作，例如redis初始化。 |
| afterStart | `function` | BFF应用启动完毕之后执行，此处可做一些日志打印标识 |

<br />

- 示例

根目录 `src` 下新建 `app.ts` 文件，文件内容如下：

```ts
import { Config } from '@yunke/yunfly'

/**
 * BFF 生命周期
 *
 * @export
 * @class AppLifeHook
 */
export default class AppLifeHook {
  constructor() { }

  // app启动之前执行 
  beforeStart() {
    console.log('---------beforeStart----------')
  }

  // config配置加载完成之后执行
  configDidReady(config: Config) {
    // config.name = 'zane'
  }

  // 多线程时：当alone进程和worker进程执行完成之后执行
  // 多线程时，此处的代码将会再worker中执行
  appDidReady(config: Config, app: any) {

  }

  // app启动之后执行
  afterStart(config: Config) {
    console.log('---------afterStart----------')
  }

}
```
