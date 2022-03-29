---
sidebar_position: 8
---

# 异常处理

异常主要分为，框架异常 和 业务代码异常

* 框架异常
框架异常可以通过阿里云日志输入：`-------grpc error--------`  进行查询
框架异常主要是grpc调用异常，grpc服务异常等信息

|  案例图片   |
|  ----  |
| ![](http://big-c.oss-cn-hangzhou.aliyuncs.com/cms/img/2020/05/19/Hk65wKa8RM1589881998549.jpeg) |

* 业务代码异常
业务代码异常尽量使用 `try catch` 进行代码异常的捕获，使用 `cnosole.error` 进行代码的记录

## Service错误处理说明

* 使用全局 `ErrorMiddleware` 进行错误处理

框架所有方法错误信息默认由全局 `ErrorMiddleware` 中间件进行错误处理，一旦有任何报错，都会返回error信息

```typescript
import { Service } from "typedi";
// 
@Service()
export default class UserService {
    // 用户鉴权
    async auth(userId: number, ctx: any): Promise<any> {
      const response = {}
      // 以下代码会报错，会使用全局的ErrorMiddleware进行错误处理
      response.data.name = 'xiaowang'
      return response
    }
}
```

* 手动处理 `Error` 信息

```typescript
import { Service } from "typedi";
// 
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

* 使用自定义 `Catch` 装饰器处理错误信息

```typescript
import { Service } from "typedi";
import { Catch } from "../utils/decorator"
// 
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

* 使用自定义 `ServiceV2` 接收错误信息并手动处理

```
升级grpc-code-gen@6.1.10 版本
```

```typescript
import { Service } from "typedi";
import { Catch } from "../utils/decorator"
// services
import { usrUserServiceV2 } from "../grpc-code-gen/2c/marvel-user/user/UsrUserService";
//
export interface RpcServiceResponse<T = any> {
  'error'?: any;
  'error_derails'?: string;
  'response': T;
  'metadata': any;
}
//
@Service()
export default class UserService {
    // 用户鉴权
    async auth(request: AnyOptions, ctx: any): Promise<any> {
        // 使用 ServiceV2 处理error信息
        // 使用场景： 聚合多个接口时，此方式可以自定义错误抛出方式
        const { error, response }: RpcServiceResponse = await usrUserServiceV2.GetUserInfotV2({ request });
        // 
        if (error) {
          throw error;
        }
        // 
        return response
    }
}
```

<br/>
<br/>
<br/>
