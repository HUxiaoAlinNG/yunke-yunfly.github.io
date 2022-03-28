---
sidebar_position: 5
---

# 控制器(Controller)

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
