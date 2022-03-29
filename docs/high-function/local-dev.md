---
sidebar_position: 1
---

# 本地开发

* 本地启动应用进行开发活动，当我们修改代码并保存后，应用会自动重启实时生效。

## 添加命令

本地使用 `nodemon` 进行热重启, 安装依赖

```js
yarn add nodemon --dev
```

添加 `npm scripts` 到 `package.json`：

```json
"watch:dev": "cross-env NODE_ENV=dev nodemon --exec ./node_modules/.bin/ts-node src/index.ts",
```

这样我们就可以通过 `npm run watch:dev` 命令启动应用。

## 环境配置

本地开发时我们需要配置一些相应的环境，大部分配置已在示例项目 `bff-example` 中配置完成

* 端口说明：BFF服务端口会通过 `@yunke/getServiceConfig` 包进行自动获取，不需要手动配置

* `grpc-code-gen.config.js` 配置

  1、 配置项 `gitUrls` 填写相应的微服务 `proto` 仓库地址（若不知可咨询相关的后台开发人员）。<br />`gitUrls`有两种配置方式，`string` 和 `object` 两种类型, 当类型为 `object` 时，可配置 `url` 和 `branch` 两项，此处 `branch` 配置的优先级是最高的

  2、配置 `clientOptions` 参数，此参数主要处理 `grpc` 请求的证书配置，当服务名为 `antman-banner`时配置为 `antman`，当服务名为 `uc-user-center` 是配置为 `uc`，其他的同理

* `grpc-service.dev.config.js` 配置

  此配置主要是为本地请求grpc服务配置，主要的配置格式为：

  ```js
  module.exports = {
    "antman-banner": {
      "host": "112.74.75.140",
      "port": 58487,
      "defaultCa": true
    },
  };
  ```

  说明：

  > * `antman-banner` 微服务名称 （根据自身业务决定）
  > * `host` grpc请求host地址，开发环境默认为 `112.74.75.140`
  > * `port` 请求相应微服务的端口号，具体端口号查询可通过此地址获得： <http://112.74.75.140:2379/v2/keys>
  > * `defaultCa` 是否使用默认的证书，开发环境统一配置为 `true` 使用默认证书配置

* 本地 host 配置

  此配置主要是为本地请求 `grpc` 服务配置，主要的配置格式为：

  找到本地电脑的 host 文件，开发环境下进行如下配置即可，服务名->host 地址

  ```
  112.74.75.140  antman-banner
  112.74.75.140  antman-statistics
  112.74.75.140  antman-seller
  ...
  ```

> * 备注：```grpc-service.dev.config.js``` 与 ```本地host配置``` 可二选其一

## 编译 proto 文件

所有准备工作完成之后就可以进行 `proto` 文件的编译了，编译方式如下：

```js
// branch 为分支名
yarn grpc-gen -b {branch}

// 开发环境
yarn grpc-gen -b dev

// 测试环境
yarn grpc-gen -b test
```

编译完成后会生成一个 `grpc-code-gen` 文件夹，文件存放地址： `根目录/src/grpc-code-gen`

<br/>
<br/>
<br/>
