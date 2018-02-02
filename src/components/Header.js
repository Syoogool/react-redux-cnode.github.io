import { Link } from 'react-router-dom'

const navArr = [
  {path: '/tab', name: '首页'},
  {path: '/', name: '创建'},
  {path: '/message', name: '消息'},
  {path: '/my', name: '我的'}
]

const Header = () => (

  <nav>
    {navArr.map((item, i) =>
      <Link key={i} to={item.path}>
        {item.name}
      </Link>
    )}
  </nav>
)

export default Header
