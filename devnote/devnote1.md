# 基本思考

<img src="https://zoulam-pic-repo.oss-cn-beijing.aliyuncs.com/img/image-20201010114035699.png" alt="image-20201010114035699" style="zoom:50%;" />



## [typescript-utility-types](https://www.typescriptlang.org/docs/handbook/utility-types.html)

​	`parital<a&b>`（中文释义：偏爱偏向） 将两种类型以**可选**的方式合并

​	`omit<>`:忽略类型指定类型 

​		`Omit<InputHTMLAttributes<HTMLElement>, 'size' >`忽略HTML元素的size属性

# 代码结构

![代码结构](https://zoulam-pic-repo.oss-cn-beijing.aliyuncs.com/img/image-20201010114522823.png)

[create-react-app中文文档](https://www.html.cn/create-react-app/docs/setting-up-your-editor/#visual-studio-code)

# 样式



1、inline css 使用js对象写：性能比起写入类名差很多

2、css in js [stop using css in javascript for web development](https://medium.com/@gajus/stop-using-css-in-javascript-for-web-development-fa32fb873dcc)

3、styled component

4、sass/less

![样式文件结构](https://zoulam-pic-repo.oss-cn-beijing.aliyuncs.com/img/image-20201010122021598.png)

### 色彩

[中国色](http://zhongguose.com/)

[色板](https://www.materialpalette.com/colors)

![颜色设置](https://zoulam-pic-repo.oss-cn-beijing.aliyuncs.com/img/image-20201010122945573.png)

背景颜色、按钮颜色

 

### 安装sass处理器

```
  npm install node-sass --save
```

![样式](https://zoulam-pic-repo.oss-cn-beijing.aliyuncs.com/img/image-20201010122854485.png)

### 样式文件

**注：** 以 `_`开头的文件是不会编译成css的，只能作为模块使用

`_variables.scss`：用于变量声明

以$符号开头，

```scss
$button-hover-bg
# 标签名/类名-状态-属性名
```

`_reboot.scss`：改良自[normalize.css](https://github.com/necolas/normalize.css)

`_mixin.scss`：混合模式（一种类似函数的写法），减少重复css，相当于JavaScript的函数

[scss内置的modules](https://www.sasscss.com/documentation/modules)封装好了大量函数

### @import语法

不同于css的语法，这种方式是内联 文件，不用发送额外的http请求

# 第一个组件button

![image-20201010143050069](https://zoulam-pic-repo.oss-cn-beijing.aliyuncs.com/img/image-20201010143050069.png)

## 属性设置

1、用户自定义属性 （自定义类名）

2、可选属性 （有意义的类名）

3、标签原生属性 （事件）

## 让链接失效

### 类名拼接库

```
cnpm install classnames --save
cnpm install @types/classnames --save
```

# 组件测试

![测试金字塔](https://zoulam-pic-repo.oss-cn-beijing.aliyuncs.com/img/image-20201012105401778.png)

Unit Test: 单元测试，相当于是React的组件

service Test：组合单元测试，类似父组件测试

UI Test:模拟用户场景，点击填写表单

## React在测试方面的优势

1、组件之间互不影响

2、hook兴起的函数组件，函数优势：固定的输入就有固定的输出

3、单向数据流

## Jest

`create-react-app` 内置了该测试框架

```
npx jest xx.test.js
npx jest xx.test.js --watch
```

[jest](https://www.jestjs.cn/)

## test-utils

react官方测试工具

[test-utils](https://zh-hans.reactjs.org/docs/test-utils.html#overview)

create-react-app的默认测试模板[testing-library](https://testing-library.com/docs/react-testing-library/intro)

![内置测试模板](https://zoulam-pic-repo.oss-cn-beijing.aliyuncs.com/img/image-20201012111645932.png)

旧版本需要手动安装依赖

testing-library/react: `npm install --save-dev @testing-library/react`

​	jest-dom `npm install --save-dev @testing-library/jest-dom`

[关于测试文件的命名](https://create-react-app.dev/docs/running-tests/#filename-conventions)

`setupTest.ts`文件会为所有测试文件自动引入指定包

**注：**脚手架生成了，`App.test.ts`会干扰测试

## mock-function

[mock-function](https://www.jestjs.cn/docs/mock-functions)

[fireevent](https://testing-library.com/docs/dom-testing-library/api-events#fireeventeventname) 模拟不同的dom事件

## ==最终测试方式==

```
npm run test
npm run test -- -t "<ComponentName(不用写完)>" 
# 示范如下：
npm run test -- -t "auto"
```



# 第二个组件menu

## 要求

划分为简单菜单下拉菜单、横向菜单和纵向菜单

![划分方式](https://zoulam-pic-repo.oss-cn-beijing.aliyuncs.com/img/image-20201012143510286.png)

## 结构设计

### js数组

![js数组](https://zoulam-pic-repo.oss-cn-beijing.aliyuncs.com/img/image-20201012143805940.png)

### html格式（语义化）

![html标签格式](https://zoulam-pic-repo.oss-cn-beijing.aliyuncs.com/img/image-20201012143844438.png)

## 代码升级

观察原有的测试，与测试兼容则说明代码升级是无害的

[使用React.children.map](https://zh-hans.reactjs.org/docs/react-api.html)给MenuItem添加index

## **出现问题**

下拉菜单的index被父级元素占用了，从数字index改为字符串index

```javascript
`${superIndex}-${subIndex}`
```

伪类：作为节点的参考点[:scope](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:scope)

比如你想获取当前层级的li ： `querySelectorAll(':scope>li')`

# 第三个组件icon

[react-fontawesome](https://github.com/FortAwesome/react-fontawesome)

```
cnpm i --save @fortawesome/fontawesome-svg-core \
             @fortawesome/free-solid-svg-icons \
             @fortawesome/react-fontawesome
```

## 二次封装

给图标添加相应的主题颜色

## 引入动画库

安装

```
cnpm install react-transition-group --save
cnpm install @types/react-transition-group --save
```

[react推荐的几个库](https://zh-hans.reactjs.org/docs/faq-styling.html#can-i-do-animations-in-react)

[React Transition Group](https://reactcommunity.org/react-transition-group/)

实现方式类似于Vue，给元素添加特定的类名

![类名](https://zoulam-pic-repo.oss-cn-beijing.aliyuncs.com/img/image-20201014102947081.png)

## 封装动画库（mixin）

# storybook

[storybook-react](https://storybook.js.org/docs/react/get-started/introduction)

​	[typescript支持](https://storybook.js.org/docs/react/configure/typescript)

​	 [参考配置](https://github.com/Luchanso/storybook-cra-ts-example/blob/master/.storybook/webpack.config.js)

​	[如何写stories](https://storybook.js.org/docs/react/api/mdx#writing-stories)

​		[storiesOfapi](https://github.com/storybookjs/storybook/blob/master/lib/core/docs/storiesOf.md)

```
npx -p @storybook/cli sb init
```

​	[配置scss](https://github.com/storybookjs/presets/tree/master/packages/preset-scss)

[插件addons](https://storybook.js.org/docs/react/api/addons)

​	[info-addon](https://github.com/storybookjs/storybook/tree/release/3.4/addons/info) 生成和支持markdown说明

​	[storybook-react-docgen](https://github.com/hipstersmoothie/storybook-addon-react-docgen)自带，但是要安装loader

​		[react-docgen-typescript-loader](https://www.npmjs.com/package/react-docgen-typescript-loader)

## 		两个问题

​		

```typescript
import React, { FC, ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react'
文档生成不支持解析 React.FC这种语法
尾部的 exoort default xx必须添加分号
```

## 显示文本注释

满足JSDoc规范，值得一提的是该注释支持MD语法

# Input组件

## 思考

​	1、使用者在受控组件中添加了 `defaultValue`的属性

​	2、受控组件的值不符合要求，被转化为了非受控组件

```typescript
  const fixControlledValue = (value: any) => {
    if (typeof value === 'undefined' || value === null) {
      return ''
    }
    return value
  }
  if('value' in props) {
    // 避免受控组件出现defaultValue的值
    delete restProps.defaultValue
    // 避免受控组件中的useState设置无效值
    restProps.value = fixControlledValue(props.value)
  }
```

# AutoComplete组件

设计：

- 监听输入，用户自定筛选方式（筛选数据可能数组或者对象，数据的获取可能是同步的，也可能是异步的）
- （键盘上下键+enter）/鼠标点击选取已有值（会关闭下拉列表，同时改变输入框内容）
- 防抖
- 鼠标点击非`AutoComplete`区域则关闭下拉菜单
- 支持异步请求

# upload组件（结合生命周期）

## 生命周期和异步请求选择

**beforeUpload**(检查文件类型，文件大小)=> **onProgress(event,file)**（显示进度）=> **onChange(file)**后面有成功和失败两个分支

​	**onSuccess(response,file)**=> **onRemove(file)**

​	**onError(error, file)**

<img src="https://zoulam-pic-repo.oss-cn-beijing.aliyuncs.com/img/image-20201015154522564.png" alt="image-20201015154522564" style="zoom:50%;" />

<img src="https://zoulam-pic-repo.oss-cn-beijing.aliyuncs.com/img/image-20201015154607107.png" alt="image-20201015154607107" style="zoom:50%;" />

<img src="https://zoulam-pic-repo.oss-cn-beijing.aliyuncs.com/img/image-20201015154651489.png" alt="image-20201015154651489" style="zoom:50%;" />

## 选择axios

封装完善，支持promise，typescript，能够在浏览器和nodejs环境运行

## 上传接口

[jsonppalceholder](https://jsonplaceholder.typicode.com/) (不支持超过100k的文件，**出现503错误**)

[mockey.io](https://designer.mocky.io/design)

## 表单file介绍

`enctype` ：

​	**默认值**`application/x-www-form-urlencoded`  

​	`multipart/form-data`（二进制文件值）

​	`text/plain`出现于 HTML5，用于调试。

### [fromdata](https://developer.mozilla.org/zh-CN/docs/Web/API/FormData)

```javascript
 onChange={(e)=>{
 	files = e.target.files
 	if(files) {
 		UploadFile = files[0]
 		const formData = new FormData()
 		formData.append(UploadFile.name, upLoadFile)
        axios.post('url', formData, {
            headers:{
                'Content-Type':'multipart/form-data'
            }
        }).then(response => {
               	console.log(response)
          })
 	}
 }}
```

## 添加新功能

1、还需要实现用户自定义数据

httppost：name、http header、post formData、withCredentials：cookie、token

input元素：accept（限制文件类型）、multiple（多文件））

2、拖拽上传

## **测试**

[axios mock](https://www.jestjs.cn/docs/mock-functions#mocking-modules)

新问题：uid是不断变化的无法获取

[objectContaining](https://www.jestjs.cn/docs/expect#expectnotobjectcontainingobject) 测试是否包含特定的属性

**拖拽事件的测试**

[drag测试的dataTransfer无法使用](https://github.com/testing-library/react-testing-library/issues/339)

# 新增树形组件

## 设计的思考

### 组件属性

```
type fileType = "floder" | "file"

interface treesProps {
    icon?: IconProp;
    /** 文件名 */
    name: string;
    /** 独一无二的标识 */
    key: string;
    /** 菜单类型 */
    type: fileType;
    /** 是否这个 */
    collapsed: boolean;
    /** children */
    childrens?: treesProps[]
}
```



# 新增级联组件

# 学习CSS

[css-tricks](https://css-tricks.com/)

​	[flex的教学](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)