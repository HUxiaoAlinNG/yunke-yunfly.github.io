---
sidebar_position: 7
---

# 服务(service)

## 使用场景

`Service`层一般用于复杂逻辑的计算。路由经过 `Controller` 后执行内部方法(一般指向于 `Service` 定义的方法)。

## 使用案例

`Service` 的写法比较常规，就是一个 `javascript 面向对象`，使用 `class 语法糖`来进行编写，一个常规的 `Service` 如下：

```ts
import { Service } from "typedi";
// types
import * as types from "../grpc-code-gen/yued/grpc-server-example/types";
// service
import { userLoginService } from '../grpc-code-gen/yued/grpc-server-example/user/UserLoginService';

@Service()
export default class UserService {
  // 用户鉴权
  async auth(userId: number, ctx: any): Promise<types.user.UserAuthResponse> {
    try {
      const isLogin = await this.checkLogin(ctx);
      if (!isLogin) {
        return { code: 200, message: '请先进行登录' };
      }
      const { response } = await userLoginService.UserAuthV2({
        request: {
          user_id: userId,
        },
      });
      return response;
    } catch (e) {
      console.info('err', e);
      throw e;
    }
  }
}
```

## 注入Controller

由于 `routing-controllers` 集成了 `typedi`，故也可以将 `Service` 注入 `Controller`。

```ts

import { createExpressServer, useContainer } from 'routing-controllers';
import { Container } from 'typedi';

// its important to set container before any operation you do with routing-controllers,
// including importing controllers
useContainer(Container);

// create and run server
createExpressServer({
  controllers: [__dirname + '/controllers/*.js'],
  middlewares: [__dirname + '/middlewares/*.js'],
  interceptors: [__dirname + '/interceptors/*.js'],
}).listen(3000);
```

> 注： `yunfly` 框架内部已自动注入，无需开发者手动注入。

<br />

- 使用案例

```ts
import { Service } from "typedi";
import { Controller } from "routing-controllers";

@Controller()
@Service()
export class UsersController {
  constructor(private userRepository: UserRepository) {}

  // ... controller actions
}
```

## Service错误处理说明

- 使用全局 `ErrorMiddleware` 进行错误处理

框架所有方法错误信息默认由全局 `ErrorMiddleware` 中间件进行错误处理，一旦有任何报错，都会返回error信息

```ts
import { Service } from "typedi";
@Service()
export default class UserService {
    // 用户鉴权
    async auth(userId: number, ctx: any): Promise<any> {
      const response = {}
      // 以下代码会报错，会使用全局的 ErrorMiddleware 进行错误处理
      response.data.name = 'xiaowang'
      return response
    }
}
```

- 手动处理 `Error` 信息

```ts
import { Service } from "typedi";
@Service()
export default class UserService {
    // 用户鉴权
    async auth(userId: number, ctx: any): Promise<any> {
        // 使用 try catch 手动处理error信息
        // 使用场景： 聚合多个接口时，此接口的报错不影响整个请求的成功状态
        try {
            const response = {}
            response.data.name = 'xiaowang'
            return response
        } catch(err) {
            return err
        }
    }
}
```

- 使用自定义 `Catch` 装饰器处理错误信息

```ts
import { Service } from "typedi";
import { Catch } from "../utils/decorator"
@Service()
export default class UserService {
    // 用户鉴权
    @Catch()
    async auth(userId: number, ctx: any): Promise<any> {
        // 使用 Catch 装饰器处理error信息
        // 使用场景： 聚合多个接口时，此接口的报错不影响整个请求的成功状态
        const response = {}
        response.data.name = 'xiaowang'
        return response
    }
}
```

错误信息的处理方式根据各自业务需求来进行选择
