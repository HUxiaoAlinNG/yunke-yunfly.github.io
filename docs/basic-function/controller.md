---
sidebar_position: 5
---

# 控制器(Controller)

`yunfly` 底层采用 `routing-controllers` ，故通过装饰器的方式来进行 `koa-router` 的开发。更多详细用法见[参考文档](https://github.com/typestack/routing-controllers#readme)

## 使用案例

* 一个常规的 `Controller` 写法

```ts
import { Get, JsonController, QueryParam } from "routing-controllers";
import { Inject } from "typedi";
import * as types from "../grpc-code-gen/yued/grpc-server-example/types";
import Example from "../service/Example";

@JsonController('/main')
export default class MainController {
    @Inject()
    private example: Example;

    @Get('/test')
    async test(
        @QueryParam("name") name: string,
        @QueryParam("orgcode") orgcode: string
    ): Promise<types.example.Response | undefined> {
        console.info('====query====', { name, orgcode });
        const res = await this.example.doSomething(name, orgcode);
        return res;
    }
}
```

## 路由前缀

* 全局路由前缀

`config.default.ts` 配置 `routingControllersOptions`:

```ts
  config.routingControllersOptions = {
    routePrefix: '/api',
  }
```

* `controller` 路由前缀

```ts
import { Controller } from "routing-controllers";

@Controller('/users')
export class UserController {
  // ...
}
```

## 动态路由

* `controller` 动态路由

```ts
import { Controller } from "routing-controllers";

@Controller('/users/:id')
export class UserController {
  // ...
}
```

* `method` 动态路由

```ts
import { Controller, Param } from "routing-controllers";

@Controller()
export class UserController {
  @Get("/users/:id")
  getOne(@Param("id") id: number) { 
    // ... 
  }
}
```

## Controller 装饰器

* `@Controller`

用于注册路由

```ts
import { Controller, Param } from "routing-controllers";

@Controller('/users')
export class UserController {
  @Get("/users/:id")
  getOne(@Param("id") id: number) { 
    // ... 
  }
}
```

* `@JsonController`

如果接受的数据为 `JSON`，那么您可以使用 `@JsonController` 装饰器而不是 `@Controller`，这将保证您的控制器 `Action` 返回的数据始终将转换为 `JSON`,并且 `Content-Type` 将始终设置为应用程序 `application/json`，这也意味着 请求体 `body`也会被解析成 `JSON`。

```ts
import { JsonController, Body, Post } from 'routing-controllers';

@JsonController()
export class UserController {

  @Post('/users')
  post(@Body() user: User) {
    return userRepository.insert(user);
  }
}
```

## Method 装饰器

| 标识 | 示例 | 描述 |
| ------ | ------ | ------ |
| @Get(route: string\|RegExp) | @Get("/users") all() | 匹配 HTTP GET 方法 |
| @Post(route: string\|RegExp) | @Post("/users") save() | 匹配 HTTP Post 方法  |
| @Put(route: string\|RegExp) | @Put("/users/:id") update() | 匹配 HTTP Put 方法  |
| @Patch(route: string\|RegExp) | @Patch("/users/:id") patch() | 匹配 HTTP Patch 方法  |
| @Delete(route: string\|RegExp) | @Delete("/users/:id") delete() | 匹配 HTTP Delete 方法  |
| @Head(route: string\|RegExp) | @Head("/users/:id") head() | 匹配 HTTP Head 方法  |
| @All(route: string\|RegExp) | @All("/users/me") rewrite() | 匹配所有 HTTP 方法  |

示例

```ts

import { JsonController, Param, Body, Get, Patch, Post, Head, Put, Delete } from 'routing-controllers';

@JsonController()
export class UserController {
  @All('/users')
  getAll() {
    return userRepository.findAll();
  }

  @Get('/users/:id')
  getOne(@Param('id') id: number) {
    return userRepository.findById(id);
  }

  @Post('/users')
  post(@Body() user: User) {
    return userRepository.insert(user);
  }

  @Put('/users/:id')
  put(@Param('id') id: number, @Body() user: User) {
    return userRepository.updateById(id, user);
  }

  @Delete('/users/:id')
  remove(@Param('id') id: number) {
    return userRepository.removeById(id);
  }

  @Patch('/users/:id')
  patch() {
    return userRepository.updateById(id, user);
  }

  @Head('/users/:id')
  head() {
    return userRepository.removeById(id);
  }
}
```

## Method Parameter 装饰器

| 标识 | 示例 | 描述 | 模拟 |
| ------ | ------ | ------ | ------ |
| @Req() | getAll(@Req() request: Request)| 注入请求体 | function (request, response) |
| @Res() | getAll(@Res() response: Response) | 注入响应体 | function (request, response) |
| @Ctx() | getAll(@Ctx() context: Context) | 注入 `Context`  | --- |
| @Param(name: string, options?: ParamOptions) |  options?: ParamOptions) get(@Param("id") id: number) | 注入一个路由参数 | request.params["id"] |
| @Params() | get(@Params() params: any) | 注入所有路由参数 | request.params |
| @QueryParam(name: string, options?: ParamOptions) | get(@QueryParam("id") id: number) | 注入一个 query 参数  | request.query["id"] |
| @QueryParams() | get(@QueryParams() params: any) | 注入所有 query 参数 | request.query |
| @HeaderParam(name: string, options?: ParamOptions) | get(@HeaderParam("token") token: string) | 注入一个请求头信息  | request.headers.token |
| @HeaderParams() | get(@HeaderParams() params: any) | 注入所有请求头信息  | request.headers |
| @CookieParam(name: string, options?: ParamOptions) | get(@CookieParam("username") username: string) | 注入一个 Cookie 信息  | request.cookies["username"] |
| @CookieParams() | get(@CookieParams() params: any) | 注入所有 Cookie 信息  | request.cookies |
| @Body(options?: BodyOptions) | post(@Body() body: any) | 注入请求 Body 所有数据 | request.body |
| @BodyParam(name: string, options?: ParamOptions) | post(@BodyParam("name") name: string) | 注入请求 Body 某个参数 | request.body["name] |

示例

```ts

import { JsonController, QueryParam, Param, Body, Get, Patch, Post, Head, Put, Delete } from 'routing-controllers';

@JsonController()
export class UserController {

  @Get('/users')
  getAllUsers(@Req() request: any, @Res() response: any) {
    return response.send('Hello response!');
  }

  @Get('/users/:id')
  getOne(
    @QueryParam('id') queryId:number,
    @Param('id') id: number,
    ) {
    return userRepository.findById(queryId,id);
  }

  @Post('/users')
  post(
    @QueryParams() query: Query,
    @Body() user: User,
    ) {
    return userRepository.insert(query,user);
  }

}
```

## 中间件装饰器

| 标识 | 示例 | 描述 |
| ------ | ------ | ------ |
| @Middleware({ type: "before"\|"after" }) | @Middleware({ type: "before" }) <br />class SomeMiddleware | 注册全局中间件 |
| @UseBefore() | @UseBefore(CompressionMiddleware)| 请求开始前调用  |
| @UseAfter() | @UseAfter(CompressionMiddleware) | 请求结束后调用  |
| @Interceptor() | @Interceptor() class SomeInterceptor | 注册全局拦截器  |
| @UseInterceptor() | @UseInterceptor(BadWordsInterceptor) | 拦截 `Controller` / `Action`，替换某些值 |

## 其他装饰器

| 标识 | 示例 | 描述 |
| ------ | ------ | ------ |
| @Authorized(roles?: string\|string[]) | @Authorized("SUPER_ADMIN") get() | 授权检查 |
| @CurrentUser(options?: { required?: boolean }) | get(@CurrentUser({ required: true }) user: User)| 注入当前授权的用户 |
| @Header(headerName: string, headerValue: string) | headerValue: string) @Header("Cache-Control", "private") get() | 自定义相应头部信息 |
| @ContentType(contentType: string) | @ContentType("text/csv") get() | 自定义响应头部 `HTTP Content-Type` 信息 |
| @Location(url: string) | @Location("http://github.com") get() | 自定义响应头部 `HTTP Location` 信息 |
| @Redirect(url: string) | @Redirect("http://github.com") get() | 自定义响应头部 `HTTP Redirect` 信息 |
| @HttpCode(code: number) | @HttpCode(201) post() | 自定义响应 `HTTP code` |
| @OnNull(codeOrError: number\|Error) | @OnNull(201) post() | 当真实响应的 `HTTP code`  为 `null` 时，设置 `HTTP code` |
| @OnUndefined(codeOrError: number\|Error) | @OnUndefined(201) post() | 当真实响应的 `HTTP code`  为 `undefined` 时，设置 `HTTP code` |
| @Render(template: string) | @Render("user-list.html") get() | 渲染给定的 `HTML` 模板，控制器返回的数据用作模板变量 |

## 自定义装饰器

可以通过包装现有装饰器或者采用 `routing-controllers` 提供的方法创建新的装饰器。

* 示例1
  
```ts

import { createParamDecorator } from 'routing-controllers';

export function UserFromSession(options?: { required?: boolean }) {
  return createParamDecorator({
    required: options && options.required ? true : false,
    value: action => {
      const token = action.request.headers['authorization'];
      return database.findUserByToken(token);
    },
  });
}

```

* 示例2
  
```ts

import { UseAfter } from 'routing-controllers';
import { IResponseType } from '../types';
import { handleResponseType } from './handle';

export const ResponseType = function (type: IResponseType) {
  // 进行包装
  return UseAfter(handleResponseType(type, true));
};


```
