import request from './index'

export function login (data) {
  return request({
    url:'/login',
    method:'post',
    data
  })
}

export function getMenus () {
  return request({
    url:'/menus',
    method:'get'
  })
}