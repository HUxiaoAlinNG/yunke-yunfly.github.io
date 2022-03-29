---
sidebar_position: 6
---

# 中间件(Middleware)

BFF中间件就是 `koa` 中间件，`koa` 中间件是洋葱圈模型。每次我们编写一个中间件，就相当于在洋葱外面包了一层。

## 函数中间件

```ts
export function use(context: any, next: (err?: any) => Promise<any>): Promise<any> {
    console.log("do something before execution...");
    return next().then(() => {
        console.log("do something after execution");
    }).catch(error => {
        console.log("error handling is also here");
    });
}
```

## class 中间件

```ts
import { KoaMiddlewareInterface } from "routing-controllers";

export class MyMiddleware implements KoaMiddlewareInterface {
    use(context: any, next: (err?: any) => Promise<any>): Promise<any> {
        console.log("do something before execution...");
        return next().then(() => {
            console.log("do something after execution");
        }).catch(error => {
            console.log("error handling is also here");
        });
    }
}
```

## method 中间件

```ts
import { Get, UseBefore, UseAfter } from "routing-controllers";
@Get("/users/:id")
@UseBefore(MyMiddleware)
@UseAfter(loggingMiddleware)
getOne(@Param("id") id: number) {
    // ...
}
```

## Controller 级别中间件

```ts
import { Controller, UseBefore, UseAfter } from "routing-controllers";
import { MyMiddleware } from "./MyMiddleware";
import { loggingMiddleware } from "./loggingMiddleware";
//...
@Controller()
@UseBefore(MyMiddleware)
@UseAfter(loggingMiddleware)
export class UserController {
    // ...
}
```

## 全局中间件

```ts
import "reflect-metadata";
import { LoggingMiddleware } from "./LoggingMiddleware";
import { MyMiddleware } from "./MyMiddleware";
import { useKoaServer } from "routing-controllers";
useKoaServer(app, {
    controllers: [ __dirname + "/controller/*" ],
    defaultErrorHandler: false,
    middlewares: [
      MyMiddleware,
      LoggingMiddleware,
    ],
});
```

详细中间件使用方式请 [参考文档](https://github.com/typestack/routing-controllers#creating-your-own-koa-middleware)
