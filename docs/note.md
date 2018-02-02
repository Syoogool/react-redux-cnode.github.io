# 遇到的问题
 1 全局的路由设置
 2 刷新时同步用户登陆信息
   利用sessionStorage 让我纠结的是再每一处需要登陆信息的时候过去sessionStorage还是在应用入口文件中检测sessionStorage 获取token  然后dispath(anth(token)) 这样全局肯定是比较合适的方案，但是dispatch(anth())里面会有重定向，那就利用js的函数参数数目没有固定要求。
   因为PrivateRoute里面要检测是否登陆，所以这里也需要检测sessionStorage是否有登陆信息

# 难点 
 1 异步action creator(目前使用redux-thunk)
 2 登陆认证
   router + redux 解决
   see: https://github.com/ReactTraining/react-router/blob/67bcd88c8c00ee3164333c5981daa461b7f834ec/packages/react-router-redux/examples/AuthExample.js + sessionStorage

3 数据加载逻辑细节问题
  比如文章列表，有初始化加载，有选择主题加载（同一个组件展示），还有滚动加载三种，前两种需要加载条件判断是否之前有数据，否则容易造成加载数据重复， 当然可以省去加载判断，而是在reducer种每次加载（滚动加载除外）都清楚之前的数据，这样的话数据没有了缓存功能，同时要应该需要写多个reducer

  同时上面这些细节问题都是通过打印日志中间件就发现的  说明调试日志和调试工具非常重要，不然就是黑箱操作


# 一些思考和疑问
  1 使用redux 每个不同类型的请求都需要单独写action reducers ?
  2 评论是否需要redux  貌似只需要登录状态就可以

