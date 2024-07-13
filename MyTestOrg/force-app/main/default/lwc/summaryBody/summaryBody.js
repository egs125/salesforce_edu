import { LightningElement } from 'lwc';

export default class SummaryBody extends LightningElement {
  
  pages = [];
  isRendered = false;

  renderedCallback() {
    console.log('render');

    if ( !this.isRendered ) {
      this.isRendered = true;
      this.pages = [
        { id: 'TETS!1', src: 'header1', desc: 'test1' },
        { id: 'TETS2', src: 'header2', desc: 'test2' },
        { id: 'TETS!3', src: 'header3', desc: 'test3' },
      ];
    }
  }
}