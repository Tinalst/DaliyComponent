import {Tools} from '../tools/tools';

export class List {
  constructor(obj){
    this.data = obj && obj['data'] ? obj['data'] : [];
    this.finished = obj && obj['finished'] ? obj['finished'] : '';
    this.parentDocker = null;  // 最外层容器
    this.listContainer = null; // 列表容器
    this.loadingContainer = null; // 底部加载器
    this.fragment = document.createDocumentFragment(); // 空白片段
  }

  init(){
    Tools.consoleCustom('%cInitList');
    if(this.data && this.data.length === 0) {
      List.getBodyEl().appendChild(List.renderNoData());
      return;
    }
    this.renderListItem();
    this.creatParentDocker();
    this.createListContainer();
    this.createLoadingEl();
  }

  creatParentDocker() {
    if(this.parentDocker) return;

    this.parentDocker = document.createElement('div');
    this.parentDocker.classList.add('.bottom-container');

    return this.parentDocker;
  }

  createListContainer() {
    if(this.listContainer) return;

    this.listContainer = document.createElement('div');
    this.listContainer.classList.add('.list-container');

    return this.listContainer;
  }

  renderListItem() {
    this.data.map((item, itemIndex) => {
      let li = document.createElement('li');
      li.classList.add('item-container');
      li.setAttribute('resource-id', itemIndex);
      List.createLeftCtx(item);
      List.createCenterCtx(item);
      List.createRightCtx(item);
    })
  }

  /**
   * 左边内容
   * @param item
   * @return {HTMLDivElement}
   */
  static createLeftCtx(item) {
    let leftContainer = document.createElement('div');
    leftContainer.classList.add('left-container');

    let avatarEl = document.createElement('img');
    avatarEl.src = List.getValueOf(item, 'iconUrl');
    leftContainer.appendChild(avatarEl);
    return leftContainer;
  }

  /**
   * 中间内容
   * @param item
   * @return {HTMLDivElement}
   */
  static createCenterCtx(item) {
    let centerContainer = document.createElement('div');
    centerContainer.classList.add('center-container');

    // 名称
    const nameEl = List.createName(item);
    // 标题
    const titleEl = List.createTitle(item);
    // 运气王
    const lukiestEl = List.createKingOfLucky(item);
    // 时间
    const timeEl = List.creatTime(item);
    name && centerContainer.appendChild(nameEl);
    name && centerContainer.appendChild(titleEl);
    name && centerContainer.appendChild(lukiestEl);
    name && centerContainer.appendChild(timeEl);

    return centerContainer;
  }

  /**
   * 名称
   * @param item
   * @return {HTMLParagraphElement}
   */
  static createName(item){
    let nameEl = document.createElement('p');
    nameEl.innerText = List.getValueOf(item, 'username');
    return nameEl;
  }

  /**
   * 标题
   * @param item
   * @return {HTMLParagraphElement}
   */
  static createTitle(item){
    let titleEl = document.createElement('p');
    titleEl.innerText = List.getValueOf(item, 'title');
    return titleEl;
  }

  /**
   * 运气王
   * @param item
   */
  static createKingOfLucky(item) {
    let isLuckiest = document.createElement('div');
    isLuckiest.classList.add('lukiest-container');

    let luckiestLabel = document.createElement('span');
    luckiestLabel.classList.add('luckiest-label');
    luckiestLabel.innerText = 'king of lucky';

    let luckiestImg = document.createElement('img');
    luckiestImg.classList.add('luckiest-img');
    luckiestImg.src = '../../public/images/ic_luckiest_draw.svg';

    isLuckiest.appendChild(luckiestLabel);
    isLuckiest.appendChild(luckiestImg);
  }

  static creatTime(item) {

  }

  /**
   * 右边内容
   * @param item
   * @return {HTMLDivElement}
   */
  static createRightCtx(item){
    let rightContainer = document.createElement('div');
    rightContainer.classList.add('right-container');

    const exchangeEl = this.creatExchangeEl(item);
    rightContainer.appendChild(exchangeEl);

    return rightContainer;
  }

  /**
   * 金额
   * @param item
   * @return {HTMLParagraphElement}
   */
  static creatExchangeEl(item) {
    let exchangeAccount = document.createElement('p');
    exchangeAccount.classList.add('exchange-account');
    exchangeAccount.innerText = 'exchangeAcoount';

    return exchangeAccount;
  }

  createLoadingEl(){
    if(this.loadingContainer) return;

    this.loadingContainer = document.createElement('div');
    this.loadingContainer.classList.add('.load-container');

    return this.loadingContainer;
  }

  static renderNoData() {
    let containerEl = document.createElement('div');
    containerEl.classList.add('no-data-contianer');

    let imgEl = document.createElement('img');

    let descrEl = document.createElement('p');
    descrEl.innerText = 'No Data';

    containerEl.appendChild(imgEl);
    containerEl.appendChild(descrEl);

    return containerEl;
  }

  static getBodyEl() {
    return document.querySelector('body');
  }

  /**
   * 获取对象value
   * @param param
   * @param name
   * @return {*}
   */
  static getValueOf(param, name) {
    return param[name];
  }
}
