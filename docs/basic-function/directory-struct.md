---
sidebar_position: 2
---

# 目录结构

```

├── package.json
├── grpc-code-gen.config.js
├── grpc-service.dev.config.js
├── README.md
├── tsconfig.json  
├── Dockerfile
├── .gitignore
├── .gitlab-ci.yml
├── src
│    ├── config
│    │  └── config.default.ts
│    │  └── config.local.ts (可选)
│    │  └── config.test.ts  (可选)
│    │  └── config.release.ts (可选)
│    │  └── config.prod.ts (可选)
│    │  └── config.middleware.ts (可选)
│    ├── controller
│    │  └── MainController.ts
│    │  └── ProbeController.ts
│    │  └── UserController.ts
│    ├── middleware
│    │  └── ErrorMIddleware.ts
│    │  └── LogMIddleware.ts
│    ├── service
│    │  └── Example.ts
│    │  └── UserService.ts
│    ├── alone
│    │  └── alone1.ts
│    │  └── alone2.ts 
│    ├── schedule
│    │  └── task1.ts (一个文件即是一个定时任务)
│    │  └── task2.ts 
│    ├── socket
│    │  └── controller
│    │  │  └── MainController.ts
│    │  └── middleware
│    │  │  └── socketMiddleware.ts
│    ├── utils
│    │  └── util.ts
│    │  └── config.ts
│    ├── grpc-code-gen (grpc代码文件)
│    │  └── getGrpcClient.ts
│    │  └── grpcObj.ts
│    │  └── serviceWrapper.ts
│    │  └──yued (空间)
│    │  │  └── user (服务)
│    │  │  │  └── UserService.ts (grpc服务service)
│    │  │  └── types.ts
│    ├── plugin
│    │   └── yunfly-plugin-email
│    │       ├── src
│    │       │   ├── config
│    │       │   │   └── config.default.ts
│    │       │   └── app.ts
│    │       ├── .gitlab-ci.yml
│    │       ├── tsconfig.json
│    │       ├── README.md
│    │       └── package.json
│    └── app.ts
```

> * `grpc-code-gen.config.js` BFF根据proto生成grpc-code-gen核心配置项
> * `grpc-service.dev.config.js` 开发环境grpc服务配置项
> * `tsconfig.json` Ts规则配置项
> * `controller` BFF控制器
> * `middleware` Koa2中间件
> * `service` BFF service层
> * `alone` alone进程执行文件
> * `schedule` 定时任务文件
> * `socket` socket文件
> * `utils` 工具目录
> * `grpc-code-gen` 根据proto文件生成的grpc调用相关文件（自动生成）
> * `config` BFF 配置
> * `app.ts` 启动node服务

## 备注

* 为保持代码规范一致性 `controller`，`service` 文件尽量以大写字母开头，分别以 `Controller`、`Service` 后缀结尾
* 根据自身业务的复杂度来决定 `controller` 和 `service` 下是否再拆分文件夹

<br/>
<br/>
<br/>
