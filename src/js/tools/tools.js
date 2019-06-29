/* eslint-disable */

export class Tools {
  /**
   * 函数节流
   * @param  {Function} 调用的函数
   * @param  {Int}      时间，单位毫秒
   * @return {Function} 返回客户调用函数
   */
  static throttle(action, delay) {
    let last = 0;
    return function() {
      let curr = +new Date();
      if (curr - last > delay) {
        action.apply(this, arguments);
        last = curr;
      }
    };
  }

  /**
   * 绑定具有节流效应的监听事件
   * @param selector: string 元素选择器
   * @param event: string     监听事件名
   * @action event: function 事件函数（不需要立即调用）
   * @action time: 节流时间
   */
  static addListener(selector, event, action, time) {
    let el = document.querySelector(selector);
    el.addEventListener(event, Tools.throttle(action, time))
  }

  /**
   * 获取地址查询参数
   * @param name
   */
  static getUrlParam(name){
    // const reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    // const r = window.location.search.substr(1).match(reg);
    // if(!r || !r[2]){
    //   return null
    // }
    // const param = decodeURI(r[2]);
    // return param.replace(/(%|"|')/g, '');
    const reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    const r = window.location.search.substr(1).match(reg);
    if(!r || !r[2]){
      return null
    }
    return r[2];
  }

  /**
   * 有演示的console
   * @param msg e.g '%cdsdsds'
   */
  static consoleCustom(msg) {
    console.log(msg, 'font-size:15px;color:blue;')
  }

  /**
   * 保留n位小数
   * @param str
   * @param n
   * @return {string}
   */
  static stayDecimal(str, n){
    const result = str.toString();
    const arr = result.split(".");
    if(!arr[1] || arr[1].length <= n) {
      return str;
    }
    const decimal = arr[1].slice(0, n);
    return arr[0] + '.' + decimal;
  }

  static numToExponential(num){
    let m = num.toExponential().match(/\d(?:\.(\d*))?e([+-]\d+)/);
    return num.toFixed(Math.max(0, (m[1] || '').length - m[2]));
  }
  /**
   * 获取元素
   * @param el
   * @return {{top: number, bottom: number, left: number, right: number}}
   */
  static getViewportRet(el) {
    let rect = el.getBoundingClientRect() // 距离视窗的距离
    let top = document.documentElement.clientTop ? document.documentElement.clientTop : 0 // html元素对象的上边框的宽度
    let left = document.documentElement.clientLeft ? document.documentElement.clientLeft : 0
    return {
      top: rect.top - top,
      bottom: rect.bottom - top,
      left: rect.left - left,
      right: rect.right - left
    }
  }

  static getViewportHeight() {
    return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
  }

  /**
   * 合并对象
   * @param target
   * @param source
   */
  static combineObj(target, source){
    for (var obj in source) {
      target[obj] = source[obj];
    }
    return target;
  }

  /**
   * 两位数时间补零修正
   * @param t
   * @param type
   */
  static zeroPadding (t){
    if (t < 10) {
      return `0${t}`;
    }else {
      return `${t}`;
    }
  }

  /**
   * 时间日期转换
   * @param time
   * @return {string}
   */
  static dateTurn(time) {
    const myDate = new Date(time)
    let count = {}
    count.year = myDate.getFullYear()
    count.month = myDate.getMonth() + 1 < 10 ? '0' + (myDate.getMonth() + 1) : myDate.getMonth() + 1
    count.date = myDate.getDate() < 10 ? '0' + (myDate.getDate()) : myDate.getDate()
    count.hour = myDate.getHours() < 10 ? '0' + myDate.getHours() : myDate.getHours()
    count.min = myDate.getMinutes() < 10 ? '0' + myDate.getMinutes() : myDate.getMinutes()
    count.sec = myDate.getSeconds() < 10 ? '0' + myDate.getSeconds() : myDate.getSeconds()
    const result = count.year + '-' + count.month + '-' + count.date + ' ' + count.hour + ':' + count.min + '' + count.sec
    return result
  }

  /**
   * 获取当前浏览器语言
   * @return {string}
   */
  static getAgentLang() {
    return navigator.language;
  }

  /**
   * 获取webview浏览器的语言
   * @return {*}
   */
  static getWebViewLanguage () {
    var r = window.navigator.userAgent.substr(1).match(/language=(.*)/);
    if (!r) return;
    return unescape(r[1]);
  }
}
