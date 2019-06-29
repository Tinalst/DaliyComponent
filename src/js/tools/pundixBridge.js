/* eslint-disable */
import baseUrl from '../common/baseUrl';

export class PundixBridge {
  /**
   * 解析桥接返回内容
   * @param obj
   */
  static parseResture(obj){
    console.log(obj['fun']);
    let res = JSON.parse(obj['data']);
    if(res.code === 200) {
      obj['succ'](res['data']);
    }else {
      obj['err'](res['msg']);
    }
  }

  /**
   * 写入appID
   * @param succ
   * @param err
   */
  static setUp(succ, err) {
    pundixJs.setup('TelegramRed201906141560492531', {debug: baseUrl.isDebuger}, function (data) {
      PundixBridge.parseResture({
        data: data,
        succ: succ,
        err: err,
        fun: 'setUp'
      })
    })
  }

  /**
   * 重定向首页
   * @param succ
   */
  static home (succ) {
    pundixJs.router.home(function (data) {
      console.log(data)
    });
  }

  /**
   * 获取缓存
   * @param key
   * @param succ
   * @param err
   */
  static getStrorage (key, succ, err) {
    pundixJs.storage.get(key, function (data) {
      PundixBridge.parseResture({
        data: data,
        succ: succ,
        err: err,
        fun: 'getStrorage'
      })
    })
  }

  static parseResponse(obj){
    console.log(obj);
    let res = JSON.parse(obj['data']);
    if(res.code === 200) {
      let parseRespoen = JSON.parse(res['data']);
      if(parseRespoen.code != 200) {
        obj['cb'](parseRespoen.msg, null);
        PundixBridge.toast({
          msg: parseRespoen.msg
        });
        return;
      }
      obj['cb'](null, parseRespoen.data);
    }else {
      obj['cb'](res['msg'], null);
      PundixBridge.toast({
        msg: res['msg']
      });
    }
  }
  /**
  * 功能：网络get请求
  * @param para
  * {
  *    url  请求地址
  *    data  请求数据
  * }
  * @param callback  回调
   */
  static get (param, callback) {
    pundixJs.service.get(param.url, param.data, data => {
      PundixBridge.parseResponse({
        data: data,
        fun: 'get',
        cb: callback
      })
    })
  }

  /**
   * 网络post请求
   * @param para ：
   * {
   *   url  请求地址
   *   data  请求数据
   * }
   * @param callback 回调
   */
  static post (param, callback) {
    pundixJs.service.post(
      param.url? param.url: '',
      param.data ? param.data : {},
      data => {
        PundixBridge.parseResponse({
          data: data,
          fun: 'post',
          cb: callback
        })
      }
    );
  }

  /**
   * 显示弹出提示
   * @param msg
   */
  static toast (msg) {
    pundixJs.system.toast(msg)
  }

  // 路由跳转
  static push (path, param, succ, err) {
    pundixJs.router.push(path, param, function (data) {
      PundixBridge.parseResture({
        data: data,
        succ: succ,
        err: err,
        fun: 'push'
      })
    })
  }

}
