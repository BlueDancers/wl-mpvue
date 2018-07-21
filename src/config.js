//配置项

let host = 'http://localhost:5757'
const config = {
  host,
  loginUrl: `${host}/weapp/login`,
  userUrl: `${host}/weapp/user`   //用户完整信息的接口
}


export default config;