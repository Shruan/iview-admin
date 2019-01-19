import io from './io'

export const getMenuList = () => {
  return io.get('/menu/list')
}

export const getUserInfo = () => {
  return io.get('/user/info')
}
