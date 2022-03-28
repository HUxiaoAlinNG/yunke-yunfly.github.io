"use strict";(self.webpackChunkyunfly_docs=self.webpackChunkyunfly_docs||[]).push([[564],{3905:function(e,t,n){n.d(t,{Zo:function(){return p},kt:function(){return f}});var r=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var c=r.createContext({}),u=function(e){var t=r.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},p=function(e){var t=u(e.components);return r.createElement(c.Provider,{value:t},e.children)},s={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,a=e.originalType,c=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),d=u(n),f=o,m=d["".concat(c,".").concat(f)]||d[f]||s[f]||a;return n?r.createElement(m,i(i({ref:t},p),{},{components:n})):r.createElement(m,i({ref:t},p))}));function f(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=n.length,i=new Array(a);i[0]=d;var l={};for(var c in t)hasOwnProperty.call(t,c)&&(l[c]=t[c]);l.originalType=e,l.mdxType="string"==typeof e?e:o,i[1]=l;for(var u=2;u<a;u++)i[u]=n[u];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},2853:function(e,t,n){n.r(t),n.d(t,{assets:function(){return p},contentTitle:function(){return c},default:function(){return f},frontMatter:function(){return l},metadata:function(){return u},toc:function(){return s}});var r=n(7462),o=n(3366),a=(n(7294),n(3905)),i=["components"],l={sidebar_position:1},c="\u4ecb\u7ecd",u={unversionedId:"introduction/introduce",id:"introduction/introduce",title:"\u4ecb\u7ecd",description:"Yunfly \u4e00\u6b3e Node.js WEB \u6846\u67b6, \u4f7f\u7528 Typescript \u6784\u5efa\u6211\u4eec\u7684\u5e94\u7528\u3002",source:"@site/docs/introduction/introduce.md",sourceDirName:"introduction",slug:"/introduction/introduce",permalink:"/docs/introduction/introduce",editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/introduction/introduce.md",tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1},sidebar:"tutorialSidebar",next:{title:"\u8bbe\u8ba1\u539f\u5219",permalink:"/docs/introduction/design-principles"}},p={},s=[{value:"Yunfly \u4e0e Koa2",id:"yunfly-\u4e0e-koa2",level:2},{value:"Koa2",id:"koa2",level:2},{value:"Yunfly",id:"yunfly",level:2},{value:"\u6846\u67b6\u6280\u672f\u6808",id:"\u6846\u67b6\u6280\u672f\u6808",level:2}],d={toc:s};function f(e){var t=e.components,n=(0,o.Z)(e,i);return(0,a.kt)("wrapper",(0,r.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"\u4ecb\u7ecd"},"\u4ecb\u7ecd"),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"Yunfly")," \u4e00\u6b3e Node.js WEB \u6846\u67b6, \u4f7f\u7528 ",(0,a.kt)("inlineCode",{parentName:"p"},"Typescript")," \u6784\u5efa\u6211\u4eec\u7684\u5e94\u7528\u3002\n\u4f7f\u7528 ",(0,a.kt)("inlineCode",{parentName:"p"},"Koa2")," \u505a\u4e3a HTTP \u5e95\u5c42\u6846\u67b6, \u4f7f\u7528 ",(0,a.kt)("inlineCode",{parentName:"p"},"routing-controllers")," \u3001 ",(0,a.kt)("inlineCode",{parentName:"p"},"typedi")," \u6765\u9ad8\u6548\u6784\u5efa\u6211\u4eec\u7684 Node \u5e94\u7528\u3002"),(0,a.kt)("p",null,"Yunfly \u5728 Koa \u6846\u67b6\u4e4b\u4e0a\u63d0\u5347\u4e86\u4e00\u4e2a\u62bd\u8c61\u7ea7\u522b, \u4f46\u4ecd\u7136\u652f\u6301 Koa \u4e2d\u95f4\u4ef6\u3002\u5728\u6b64\u57fa\u7840\u4e4b\u4e0a, \u63d0\u4f9b\u4e86\u4e00\u5957\u5f3a\u5927\u7684\u63d2\u4ef6\u7cfb\u7edf, \u7ed9\u5f00\u53d1\u8005\u63d0\u4f9b\u66f4\u5f3a\u5927\u66f4\u7075\u6d3b\u7684\u80fd\u529b\u3002"),(0,a.kt)("h2",{id:"yunfly-\u4e0e-koa2"},"Yunfly \u4e0e Koa2"),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"Node.js")," \u662f\u4e00\u4e2a\u5f02\u6b65\u7684\u4e16\u754c, \u5b98\u65b9 API \u652f\u6301\u7684\u90fd\u662f callback \u5f62\u5f0f\u7684\u5f02\u6b65\u7f16\u7a0b\u6a21\u578b, \u8fd9\u4f1a\u5e26\u6765\u8bb8\u591a\u95ee\u9898, \u56e0\u6b64\u793e\u533a\u63d0\u4f9b\u4e86\u5404\u79cd\u5f02\u6b65\u7684\u89e3\u51b3\u65b9\u6848, \u6700\u7ec8\u80dc\u51fa\u7684\u662f Promise\u3002"),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"async function")," \u662f\u8bed\u8a00\u5c42\u9762\u63d0\u4f9b\u7684\u8bed\u6cd5\u7cd6, \u5728 async function \u4e2d, \u6211\u4eec\u53ef\u4ee5\u901a\u8fc7 await \u5173\u952e\u5b57\u6765\u7b49\u5f85\u4e00\u4e2a Promise \u88ab resolve\uff08\u6216\u8005 reject, \u6b64\u65f6\u4f1a\u629b\u51fa\u5f02\u5e38\uff09,  Node.js \u73b0\u5728\u7684 LTS \u7248\u672c\uff088.x\uff09\u5df2\u539f\u751f\u652f\u6301\u3002"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},"const fn = async function() {\n  const user = await getUser();\n  const posts = await fetchPosts(user.id);\n  return { user, posts };\n};\nfn().then(res => console.log(res)).catch(err => console.error(err.stack));\n")),(0,a.kt)("h2",{id:"koa2"},"Koa2"),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"Koa2")," \u662f\u4e00\u4e2a\u65b0\u7684 web \u6846\u67b6\uff0c\u7531 Express \u5e55\u540e\u7684\u539f\u73ed\u4eba\u9a6c\u6253\u9020\uff0c \u81f4\u529b\u4e8e\u6210\u4e3a web \u5e94\u7528\u548c API \u5f00\u53d1\u9886\u57df\u4e2d\u7684\u4e00\u4e2a\u66f4\u5c0f\u3001\u66f4\u5bcc\u6709\u8868\u73b0\u529b\u3001\u66f4\u5065\u58ee\u7684\u57fa\u77f3\u3002"),(0,a.kt)("h2",{id:"yunfly"},"Yunfly"),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"Koa")," \u662f\u4e00\u4e2a\u975e\u5e38\u4f18\u79c0\u7684\u6846\u67b6\uff0c\u7136\u800c\u5bf9\u4e8e\u4f01\u4e1a\u7ea7\u5e94\u7528\u6765\u8bf4\uff0c\u5b83\u8fd8\u6bd4\u8f83\u57fa\u7840\u3002",(0,a.kt)("inlineCode",{parentName:"p"},"Yunfly")," \u4f7f\u7528 ",(0,a.kt)("inlineCode",{parentName:"p"},"Koa")," \u505a\u4e3a\u5e95\u5c42 HTTP \u6846\u67b6, \u5728\u5176\u57fa\u7840\u4e0a\u63d0\u5347\u4e86\u4e00\u4e2a\u62bd\u8c61\u7ea7\u522b, \u63d0\u4f9b\u4e86\u66f4\u591a\u7684\u80fd\u529b\u4e0e\u7ea6\u675f\u89c4\u8303\u3002"),(0,a.kt)("h2",{id:"\u6846\u67b6\u6280\u672f\u6808"},"\u6846\u67b6\u6280\u672f\u6808"),(0,a.kt)("blockquote",null,(0,a.kt)("ul",{parentName:"blockquote"},(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"Koa2")," node.js http \u6846\u67b6, async await\u5f02\u6b65\u7f16\u7a0b ",(0,a.kt)("a",{parentName:"li",href:"https://koa.bootcss.com/"},"\u53c2\u8003\u6587\u6863")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"typescript")," \u5fae\u8f6f\u5f00\u53d1\u7684\u81ea\u7531\u548c\u5f00\u6e90\u7684\u7f16\u7a0b\u8bed\u8a00, \u5b83\u662fJavaScript\u7684\u4e00\u4e2a\u8d85\u96c6, \u6dfb\u52a0\u4e86\u53ef\u9009\u7684\u9759\u6001\u7c7b\u578b\u548c\u57fa\u4e8e\u7c7b\u7684\u9762\u5411\u5bf9\u8c61\u7f16\u7a0b ",(0,a.kt)("a",{parentName:"li",href:"https://www.tslang.cn/docs/home.html"},"\u53c2\u8003\u6587\u6863")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"routing-controllers"),"  \u4f7f\u7528\u88c5\u9970\u5668\u7684\u65b9\u5f0f\u6765\u8fdb\u884ckoa-router\u7684\u5f00\u53d1 ",(0,a.kt)("a",{parentName:"li",href:"https://github.com/typestack/routing-controllers#readme"},"\u53c2\u8003\u6587\u6863")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"typedi"),": \u4f9d\u8d56\u6ce8\u5165\u63d2\u4ef6\u5de5\u5177  ",(0,a.kt)("a",{parentName:"li",href:"https://github.com/typestack/typedi"},"\u53c2\u8003\u6587\u6863")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"grpc"),": \u4e00\u4e2a\u9ad8\u6027\u80fd\u3001\u5f00\u6e90\u548c\u901a\u7528\u7684 RPC \u6846\u67b6  ",(0,a.kt)("a",{parentName:"li",href:"https://grpc.github.io/grpc/node/index.html"},"\u53c2\u8003\u6587\u6863")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"log4js"),": javascript \u7684 log \u65e5\u5fd7\u63d2\u4ef6 ",(0,a.kt)("a",{parentName:"li",href:"https://github.com/log4js-node/log4js-node"},"\u53c2\u8003\u6587\u6863")))))}f.isMDXComponent=!0}}]);