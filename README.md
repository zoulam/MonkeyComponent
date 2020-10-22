# monkey component library

### 这是一个基于 React + typescript 开发的组件库

[演示文档](https://zoulam.github.io/MonkeyComponent/)
[npm地址](https://www.npmjs.com/package/monkey-component)


### 安装方式
~~~javascript
npm install monkey-component --save
~~~

### 使用方式

~~~javascript
// 加载样式,一般放在 index.js文件下
import 'monkey-component/dist/index.css'
// 引入组件
import { Button } from 'monkey-component'
~~~

### 使用库

| 库名                   | 用途                   |
| ---------------------- | ---------------------- |
| react-testing-library  | 完成单元测试           |
| storybook              | 本地调试和生成文档页面 |
| react-doc-gen          | 自动生成文档           |
| react-fontawesome      | 图标                   |
| react-transition-group | 动画                   |


最后的 npm publish，husky提交发布前验证（做测试和代码lint，**新增**打包storybook），travis实现 CI/CD 集成，发布文档站点等

### 一些本地开发命令

~~~
// 启动本地环境
npm run stroybook

//跑单元测试
npm run test

//build可发布静态文件
npm run build

//发布到 npm
npm run publish

// 删除上一次打包的文件
npm run clean

// 命令行校验代码
npm lint

// 打包TS=>ES5、SCSS=>CSS
npm run build

// 非开发环境（CI）测试
npm run test:nowatch

// 只打包TS=>ES5
npm run build build-ts

// 只打包SCSS=>CSS
npm run build-css

// 将storybook打包为静态文件
npm run build-storybook

// 只在 npm publish之前运行（添加上only是避免在CI环境运行）
prepublishOnly
~~~