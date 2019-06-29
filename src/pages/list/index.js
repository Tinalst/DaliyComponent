import {List} from '../../js/module/List';
import {listData} from '../../service/mockService/listData';

class ListPage {
  constructor(obj){
  }

  InitPage(){
    const data = this.fetchMockData();
    this.render(data);
  }

  render(data){
    new List({
      data: data
    }).init()
  }

  fetchMockData() {
    return listData;
  }
}
window.onload = new ListPage().InitPage();
