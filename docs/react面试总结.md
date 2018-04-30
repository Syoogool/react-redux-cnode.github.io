# 问题
1 如何更新state 
  setState（）
2 setState()有哪些参数
  对象或函数
3 什么情况下使用函数
  计算值依赖于上一个state值（see:）
4 生命周期函数有哪些
5 如何创建异步action
6 redux使用了哪些插件
7 react和vue区别
8 react和传统开发区别
9 如何实现登陆权限控制
10 什么是高阶组件
11 请求数据用哪个生命周期函数
   componentDidMount()  因为这样请求成功时才能使用setState更新组件
12 es7 awit

13 如何设置babel编译es6
14 create-react-app 设置支持less以及其他修改
15 使用redux和使用state区别
16 如何学习react

17 虚拟dom如何实现性能优化的
  答：核心实现是进行最小化的DOM操作

1 如何实现一个三角形 有哪些方式
2 透明度有哪些方式
3 说一下事件，事件委托

1 异步的理解
2 scss和less更喜欢哪一个 理由
3 nodejs了解程度 npm环境
4 原生js封装能力
5 sea.js了解么
6 sessionStorage和localStorage，cookie区别
7 实现三栏布局，两边定宽，中间自适应，有哪些方式
  float + margin
  float + overflow
  绝对定位
  flex(上剩余空间 flex-grow: 1)
  grid

 8 websokt实时通信的了解

 9 react单页面如何实现一个路由系统
   
 10 说说前端路由系统
  主流的前端路由系统是通过 hash 或 history 来实现的
  see: https://zhuanlan.zhihu.com/p/31874420

# 自己准备相关的问题

  see: https://www.zhihu.com/question/57208030
 1 单页面的优缺点
  优点
   页面无刷新
   前端组件化复用
   后端api多端共享
   便于快速发布和做ab测试
  缺点
   首次加载大量资源
   对搜索引擎不友好


 # 面试之todo
  1 底层理解react  不要只限于api
  2 比如vimdom如何优化
  3 jsx底层
  4 react和传统开发的区别 和vue的区别  react的特点
  5 相关库底层原理  解决什么问题  比如路由系统  状态管理系统
  6 redux的理解及优化方式（seletor immutable.js normal,）
  7 redux使用过哪些插件
     redux-logger
     redux-thunk
     reselect
     redux-react-router

     redux相关资源：https://github.com/xgrommx/awesome-redux
  8 webpack等打包工具配置掌握 常见的配置如多页面    less配置，以及优化方式（我主要考虑create-react-app)

  9 关于scss
    变量
    嵌套
    函数
    混合
    导入scss文件
    继承

  10 函数式编程的理解
     see: https://www.gitbook.com/book/llh911001/mostly-adequate-guide-chinese/details
     几个特点：闭包，高阶函数，惰性求值，递归，函数柯里化
     没有赋值语句，变量，没有副作用

  11 AMD和CMD区别
   see: https://www.zhihu.com/question/20351507
  方案 | 优势 | 劣势 | 特点=== | === | === | 
  ===AMD | 速度快 | 会浪费资源 | 预先加载所有的依赖，直到使用的时候才执行
  === | === | === | 
  ===CMD | 只有真正需要才加载依赖 | 性能较差 | 直到使用的时候才定义依赖
  === | === | === | ===

  




