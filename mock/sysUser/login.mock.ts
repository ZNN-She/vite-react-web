import { defineMock } from 'vite-plugin-mock-dev-server'

export default defineMock({
  url: '/sys/sysuser/login',
  body: {
    code: 200,
    message: 'success',
    data: {
      code: 200,
      msg: 'success',
      token: '<PASSWORD>'
    }
  }
})