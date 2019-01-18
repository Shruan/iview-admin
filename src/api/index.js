import io from './io'

export const getMenuList = () => {
  return io.get('/menu/list').then(res => {
    return res.data
  })
}
