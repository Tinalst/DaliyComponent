 class pdxI18n {
  constructor (obj){
    this.currentLang = obj['currentLang'];
    this.useFileName = obj['useFileName'];
    this.host = obj['host'];
  }

  // Set the current international language
  // 设置当前国际化语言
  setLang(){

    switch (this.currentLang) {
      case 'zh_Hans_HK':  // 繁体中文
      case 'zh-HK':       // // 繁体中文
      case 'zh-TW':       // // 繁体中文
        this.currentLang = 'zh-HK';
        break;
      case 'es':          // 西班牙语 | 原生传入
      case 'es-AR':       // 西班牙语-阿根廷
      case 'es-BO':       // 西班牙 -玻利维亚
      case 'es-CL':       // 西班牙 -智利
      case 'es-CO':       // 西班牙 -哥伦比亚
      case 'es-CR':       // 西班牙 - 哥斯达黎加
      case 'es-DO':       // 西班牙 - 多米尼加共和国
      case 'es-EC':       // 西班牙 -厄瓜多尔
      case 'es-SV':       // 西班牙 - 萨尔瓦多
      case 'es-GT':       // 西班牙 -危地马拉
      case 'es-HN':       // 西班牙 -洪都拉斯
      case 'es-MX':       // 西班牙 -墨西哥
      case 'es-NI':       // 西班牙 -尼加拉瓜
      case 'es-PA':       // 西班牙 -巴拿马
      case 'es-PY':       // 西班牙 -巴拉圭
      case 'es-PE':       // 西班牙 -秘鲁
      case 'es-PR':       // 西班牙 - 波多黎各
      case 'es-ES':       // 西班牙 -西班牙
      case 'es-UY':       // 西班牙 -乌拉圭
      case 'es-VE':       // 西班牙 -委内瑞拉
        this.currentLang = 'es';
        break;
      case 'ko_KR':       // 原生传入
      case 'ko':          // 韩语
      case 'ko-KR':       // 韩语-韩国
        this.currentLang = 'ko';
        break;
      case 'de_DE':       // 原生传入
      case 'de':
      case 'de-DE':       // 德语-德国
      case 'de-AT':       // 德国 -奥地利
      case 'de-LI':       // 德国 -列支敦士登
      case 'de-LU':       // 德国 -卢森堡
      case 'de-CH':       // 德国 -瑞士
        this.currentLang = 'de';
        break;
      case 'en_US':       // 原生传入
      case 'en':          // 英国
      case 'en-AU':       // 英国 -澳洲
      case 'en-BZ':       // 英国 -伯利兹
      case 'en-CA':       // 英国 -加拿大
      case 'en-CB':       // 英国 -加勒比海
      case 'en-IE':       // 英国 -爱尔兰
      case 'en-JM':       // 英国 -牙买加
      case 'en-NZ':       // 英国 - 新西兰
      case 'en-PH':       // 英国 -菲律宾共和国
      case 'en-ZA':       // 英国 - 南非
      case 'en-GB':       // 英国 - 英国
      case 'en-US':       // 英国 - 美国
      case 'en-ZW':       // 英国 -津巴布韦
        this.currentLang = 'en';
        break;
      case 'pt':          // 葡萄牙 | 原生传入
      case 'pt-BR':       // 葡萄牙 -巴西
      case 'pt-PT':       // 葡萄牙 -葡萄牙
        this.currentLang = 'pt';
        break;
      default:            // 默认语言
        this.currentLang = 'en';
    }

  }

  // Get current international language translation copy
  // 获取当前国际化语言翻译文案
  static getI18nFile(fileUrl){
    return import(/* webpackIgnore: true */ fileUrl).then(({default: ctx}) => {
      return ctx;
    })
  }

  // Transform internationalization
  // 变换国际化
  setInnerHtml(lang){
    lang && (this.currentLang = lang);
    let ele = document.querySelectorAll('.i18n');
    if (!(ele.length > 0)) {
      return new Error('Please check if the class has added i18n class');
    }
    this.setLang();
    pdxI18n.getI18nFile(`${this.host}i18n/${this.currentLang}/${this.useFileName}.js`)
      .then(ctx => {
        for (let i = 0; i < ele.length; i++) {
          if (this.currentLang && ctx) {
            if (!ele[i].getAttribute('placeholder')) {
              ele[i].innerText = ctx[ele[i].getAttribute('data-i18n')];
            }
          } else {
            if (!(ctx)) {
              console.error('Failed to get copy： Path specification error？ file does not exist？');
              return
            }
          }
        }
      }).catch(err => {
        console.log('err', err);
      });
  }
   // 国际化placeholder类型
   setPlaceholderLang (lang) {
     lang && (this.currentLang = lang);
     let ele = document.querySelectorAll('.i18n');
     !(ele.length > 0) && (console.log('Please check if the class has added i18n class'));
     this.setLang();
     pdxI18n.getI18nFile(`${this.host}i18n/${this.currentLang}/${this.useFileName}.js`)
     .then(ctx => {
       for (let i = 0; i < ele.length; i++) {
         if (this.currentLang && ctx && ele[i].getAttribute('placeholder')) {
           ele[i].setAttribute('placeholder', ctx[ele[i].getAttribute('data-i18n')])
         } else {
           if (!this.currentLang) {
             console.error('unspecified' + this.currentLang + 'File internationalization js file not configured')
           } else if (!(ctx)) {
             console.error('unspecified' + this.currentLang + 'Language js file not introduced')
           }
         }
       }
     })
     .catch(err => {
       console.log('err', err);
     });
   }

   // 国际化变量类型
   setObjsLang (valName, lang = "", callback) {
     lang && (this.currentLang = lang);
     this.setLang();
     pdxI18n.getI18nFile(`${this.host}i18n/${this.currentLang}/${this.useFileName}.js`)
      .then(ctx => {
        if (this.currentLang && ctx) {
          callback(ctx[valName]);
        } else {
          if (!this.currentLang) {
            console.error('unspecified' + this.currentLang + 'File internationalization js file not configured')
          } else if (!(pack[this._type][this.currentLang])) {
            console.error('unspecified' + this.currentLang + '\'Language js file not introduced')
          }
        }
      })
      .catch(err => {
        console.log('err', err);
      })

   }

   /**
    * 用于不同语序变量的插入
    * @param str 涵盖{{a}}的国际化语言文案
    * @param valueObj
    * @return {*}
    * 使用示例：
    * let str = 'xxx{{a}}xx{{a}}xx{{b}}xxx{{c}}xxx';
    * let valueObj = {
    *   a: '1',
    *   b: '2',
    *   c: '3'
    * }
    * replaceCurlyBrace(str, valueObj)
    */
   replaceCurlyBrace(str, valueObj) {
     let result = '';
     for(let key in valueObj) {
       str = str.replace(new RegExp('{{' + key + '}}', 'g'), valueObj[key]);
     }

     return str;
   }

}

module.exports = pdxI18n;
