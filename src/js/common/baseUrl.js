/* eslint-disable */
let baseUrl = {
  // 本地请求地址
  ipConfig: '',
  // 是否开启桥接调试模式
  isDebuger: true
};

// 判断打包方式 开发模式
if (process.env.NODE_ENV === 'development') {
  baseUrl = {
    ipConfig: 'http://api.dev-20.90.pundix.com'
  }
// 打包模式
} else if (process.env.NODE_ENV === 'production') {
  switch (process.env.env_config) {
    // 开发环境
    case 'dev':
      baseUrl = {
        ipConfig: 'http://api.dev-20.90.pundix.com',
        isDebuger: true,
      };
      break;
    // 测试环境
    case 'test':
      baseUrl = {
        isDebuger: false,
        ipConfig: 'http://api.dev-20.90.pundix.com'
      };
      break;
    // 仿真环境: 访问自己
    case 'order':
      baseUrl = {
        isDebuger: false,
        ipConfig: 'http://api.dev-20.90.pundix.com'
      };
      break;
    // 仿真环境
    case 'uat':
      baseUrl = {
        isDebuger: false,
        ipConfig: 'http://red-packet-uat-3.pundix.com'
      };
      break;
    // 生产环境
    case 'prod':
      baseUrl = {
        isDebuger: false,
        ipConfig: 'http://api.dev-20.90.pundix.com'
      };
      break;
  }
}

export default baseUrl
