## tool 
  1 create-react-app
  2 npx
  3 commitizen


## react
 1 props 和 state
 2 生命周期函数
 3 事件系统
 4 样式(classnames styled-components)
 5 表单
 6 组件间通信

 7 高阶组件
   最常见应该是react-redux种的connect 突然发现router4种也有很实用的高阶组件
   1 比如自定义实现的 PrivateRoute 能识别登陆权限
   2 自定义实现router代码分割组件 AsyncComponent
   3 自定义实现滚到顶部组件 ScrollToTopOnMount
 8 组件性能优化 



## react-router-dom
   1 代码拆分（see: http://www.wukai.me/2017/09/25/react-router-v4-code-splitting/
     and: https://www.dorefan.com/2017/10/18/code-split-of-react-router-v4.html)
   2 



## redux
1 action
2 reducers
3 state
reselect
 4  异步选型  see: https://zhuanlan.zhihu.com/p/24337401?refer=purerender


## react-redux
 1 provider
 2 connect



## react-router-redux
1 ConnectedRouter
2 routerMiddleware


# fetch data
 1 fetch
 2 axios


# style
1 styled-components

## 单元测试
  jest


## 优化技术
  react-boilerplate
   react优化最佳实践脚手架 下面的技术里面都有使用

 1 react-loadable  
   异步载入组件，比异步载入路由的粒度更细
   see: https://www.jianshu.com/p/697669781276

 2 Reselect
   在组件交互操作的时候,state发生变化的时候如何减少渲染的压力
   see https://www.jianshu.com/p/8d89c67dfefd

 3 immutable.js
 

  ### 其他优化文章
  [唯快不破：Web 应用的 13 个优化步骤](https://zhuanlan.zhihu.com/p/21417465)
  [React移动web极致优化](https://github.com/lcxfs1991/blog/issues/8)
  [React 同构与极致的性能优化](http://web.jobbole.com/93421/?utm_source=blog.jobbole.com&utm_medium=relatedPosts)

 项目结构优化
 see https://zhuanlan.zhihu.com/p/21490605

 想要图使用的技术
 redux-saga  https://redux-saga-in-chinese.js.org/docs/introduction/BeginnerTutorial.html
 Draft.js  富文本编辑器
 React Select
 redux-form  https://segmentfault.com/a/1190000010088546#articleHeader1


 