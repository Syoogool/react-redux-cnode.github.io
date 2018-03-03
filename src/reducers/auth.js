const initialState = {
  isAuthenticated: false,
  isLogining: false,
  token: '',
  userInfo: {}
}

const auth = (state = initialState, action) => {
  switch (action.type) {
    case 'AUTH_SUCESS':
      return {
        ...state,
        isAuthenticated: true,
        isLogining: false,
        token: action.token,
        userInfo: action.userInfo
      }
    case 'AUTH_FAIL':
      return {
        ...state,
        isAuthenticated: false,
        isLogining: false,
        token: '',
        userInfo: {}
      }
    default:
      return state
  }
}

export default auth
