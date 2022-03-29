---
sidebar_position: 2
---

# 单元测试

## 说明
>
> * 使用jest测试框架 [文档地址](https://jestjs.io/docs/en/getting-started)
> * 使用supertest进行接口模拟请求 [文档地址](https://www.npmjs.com/package/supertest)
> * 单元测试目录为 根目录下的test文件夹，单元测试文件为 .test. （可进行自定义配置）
> * `@yunke/bff-unit-test` 只支持 `@yunke/yunfly` 的项目
> * `bff-example` 已内置单元测试能力

## 使用

* 安装依赖

```js
yarn add @yunke/bff-unit-test --dev
```

* `package.json` 新增 `test` 脚本命令

```js
"scripts": {
  "test": "yarn clean && yarn compile && cross-env NODE_ENV=production YUNKE_ENV=test jest -runInBand --forceExit --colors"
}
```

* 项目根目录下新建 `babel.cofig.js` 文件, 文件内容如下：

```js
module.exports = {
    presets: [
        ['@babel/preset-env', { targets: { node: 'current' } }],
        '@babel/preset-typescript',
    ],
    plugins: [
        ["@babel/plugin-proposal-decorators", { "legacy": true }],
    ]
  }
```

* 项目根目录下新建 `jest.config.js` 文件，文件内容如下：

```js
// https://jestjs.io/docs/en/configuration.html
const { defaults } = require('jest-config');
module.exports = {
  // All imported modules in your tests should be mocked automatically
  // automock: false,
  // Stop running tests after `n` failures
  // bail: 0,
  // The directory where Jest should store its cached dependency information
  // cacheDirectory: "C:\\Users\\wangw19\\AppData\\Local\\Temp\\jest",
  // Automatically clear mock calls and instances between every test
  clearMocks: true,
  // Indicates whether the coverage information should be collected while executing the test
  // collectCoverage: false,
  // An array of glob patterns indicating a set of files for which coverage information should be collected
  // collectCoverageFrom: [],
  // The directory where Jest should output its coverage files
  coverageDirectory: "coverage",
  // An array of regexp pattern strings used to skip coverage collection
  // coveragePathIgnorePatterns: [
  //   "\\\\node_modules\\\\"
  // ],
  // Indicates which provider should be used to instrument code for coverage
  coverageProvider: "v8",
  // A list of reporter names that Jest uses when writing coverage reports
  // coverageReporters: [
  //   "json",
  //   "text",
  //   "lcov",
  //   "clover"
  // ],
  // An object that configures minimum threshold enforcement for coverage results
  // coverageThreshold: undefined,
  // A path to a custom dependency extractor
  // dependencyExtractor: undefined,
  // Make calling deprecated APIs throw helpful error messages
  // errorOnDeprecated: false,
  // Force coverage collection from ignored files using an array of glob patterns
  // forceCoverageMatch: [],
  // A path to a module which exports an async function that is triggered once before all test suites
  // globalSetup: undefined,
  // A path to a module which exports an async function that is triggered once after all test suites
  // globalTeardown: undefined,
  // A set of global variables that need to be available in all test environments
  // globals: {},
  // The maximum amount of workers used to run your tests. Can be specified as % or a number. E.g. maxWorkers: 10% will use 10% of your CPU amount + 1 as the maximum worker number. maxWorkers: 2 will use a maximum of 2 workers.
  // maxWorkers: "50%",
  // An array of directory names to be searched recursively up from the requiring module's location
  // moduleDirectories: [
  //   "node_modules"
  // ],
  // An array of file extensions your modules use
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
  // A map from regular expressions to module names or to arrays of module names that allow to stub out resources with a single module
  // moduleNameMapper: {},
  // An array of regexp pattern strings, matched against all module paths before considered 'visible' to the module loader
  // modulePathIgnorePatterns: [],
  // Activates notifications for test results
  // notify: false,
  // An enum that specifies notification mode. Requires { notify: true }
  // notifyMode: "failure-change",
  // A preset that is used as a base for Jest's configuration
  preset: 'ts-jest',
  // Run tests from one or more projects
  // projects: undefined,
  // Use this configuration option to add custom reporters to Jest
  // reporters: undefined,
  // Automatically reset mock state between every test
  // resetMocks: false,
  // Reset the module registry before running each individual test
  // resetModules: false,
  // A path to a custom resolver
  // resolver: undefined,
  // Automatically restore mock state between every test
  // restoreMocks: false,
  // The root directory that Jest should scan for tests and modules within
  rootDir: './test',
  // A list of paths to directories that Jest should use to search for files in
  // roots: [
  //   "<rootDir>"
  // ],
  // Allows you to use a custom runner instead of Jest's default test runner
  // runner: "jest-runner",
  // The paths to modules that run some code to configure or set up the testing environment before each test
  // setupFiles: [],
  // A list of paths to modules that run some code to configure or set up the testing framework before each test
  // setupFilesAfterEnv: [],
  // The number of seconds after which a test is considered as slow and reported as such in the results.
  // slowTestThreshold: 5,
  // A list of paths to snapshot serializer modules Jest should use for snapshot testing
  // snapshotSerializers: [],
  // The test environment that will be used for testing
  testEnvironment: "node",
  // Options that will be passed to the testEnvironment
  // testEnvironmentOptions: {},
  // Adds a location field to test results
  // testLocationInResults: false,
  // The glob patterns Jest uses to detect test files
  // testMatch: [
  //   "**/__tests__/**/*.[jt]s?(x)",
  //   "**/?(*.)+(spec|test).[tj]s?(x)"
  // ],
  // An array of regexp pattern strings that are matched against all test paths, matched tests are skipped
  // testPathIgnorePatterns: [
  //   "\\\\node_modules\\\\"
  // ],
  // The regexp pattern or array of patterns that Jest uses to detect test files
  // testRegex: [],
  // This option allows the use of a custom results processor
  // testResultsProcessor: undefined,
  // This option allows use of a custom test runner
  // testRunner: "jasmine2",
  // This option sets the URL for the jsdom environment. It is reflected in properties such as location.href
  // testURL: "http://localhost",
  // Setting this value to "fake" allows the use of fake timers for functions such as "setTimeout"
  // timers: "real",
  testTimeout: 10000,
  // A map from regular expressions to paths to transformers
  transform: {
    "^.+\\.(js|ts)$": "babel-jest"
  },
  // An array of regexp pattern strings that are matched against all source file paths, matched files will skip transformation
  // transformIgnorePatterns: [
  //   "\\\\node_modules\\\\",
  //   "\\.pnp\\.[^\\\\]+$"
  // ],
  // An array of regexp pattern strings that are matched against all modules before the module loader will automatically return a mock for them
  // unmockedModulePathPatterns: undefined,
  // Indicates whether each individual test should be reported during the run
  verbose: true,
  // An array of regexp patterns that are matched against all source file paths before re-running tests in watch mode
  // watchPathIgnorePatterns: [],
  // Whether to use watchman for file crawling
  // watchman: true,
};
```

## 测试案例

测试 BFF 接口

* 通过 FlyServer 方式

```ts
import { FlyServer } from '@yunke/bff-unit-test'
const request = require('supertest');

describe('GET /test/jest', function () {
  test('GET /', async () => {
    const servers = request(await FlyServer())

    const res = await servers.get('/test/jest')

    expect(res.body).toEqual({ "code": 0, "data": "success" })

  })
});

describe('Post /test/jest', function () {
  test('Post /', async () => {
    const servers = request(await FlyServer())

    const res = await servers.post('/test/jest').send({ name: 'zane' })

    expect(res.body).toEqual({ "code": 0, "data": "zane" })

  })
});

```

* 通过 http 方式

```ts
const request = require('supertest');

describe('GET /test/jest', function () {
  test('GET /', async () => {
    const servers = request('http://127.0.0.1:3000')

    const res = await servers.get('/test/jest')

    expect(res.body).toEqual({ "code": 0, "data": "success" })

  })
});

describe('Post /test/jest', function () {
  test('Post /', async () => {
    const servers = request('http://127.0.0.1:3000')

    const res = await servers.post('/test/jest').send({ name: 'zane' })

    expect(res.body).toEqual({ "code": 0, "data": "zane" })

  })
});
```
