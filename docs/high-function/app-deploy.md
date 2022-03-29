---
sidebar_position: 3
---

# 应用部署

云客有完整的BFF自动化构建链路，只需在项目根目录配置好 `Dockerfile` 和 `.gitlab.ci.yml` 文件，提测之后告诉测试或相关人员 分支名 + 服务名 即可，具体咨询相关团队 SM 或 测试工程师

## 文件配置

- Dockerfile 示例
  
```dockerfile
# node@14.18.1 & grpc@1.24.6
# 基础镜像
FROM yunke-registry.cn-hangzhou.cr.aliyuncs.com/yued/alinode:14.18.1-1.24.6

WORKDIR /workspace/app
# 安装依赖
ADD ./package.json /workspace/app/package.json
ADD ./yarn.lock /workspace/app/yarn.lock
RUN yarn run yunke_install

COPY . /workspace/app
ARG BRANCH
# 编译
RUN branch=$BRANCH yarn run build && yarn cache clean

# LABEL probe="none"
LABEL ssl="disable"

# 应用启动命令
CMD yarn run run
```

- .gitlab.ci.yml 示例

```yml
# 使用packer构建镜像、部署测试环境，详细请看 https://ci-cd.myscrm.cn/doc/#/gitlab-ci
stages:
  - pack

include:
  - project: 'ci-cd/gitlab-ci-public'
    file: '/.packer-template.yml'

pack:
  stage: pack
  script:
    - packer
```
