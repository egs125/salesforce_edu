import { LightningElement, api, wire, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent'
import getAcc from '@salesforce/apex/AccountViewController.getAcc';
import searchAcc from '@salesforce/apex/AccountViewController.searchAcc';
// 데이터 업데이트하는 함수
import {updateRecord} from 'lightning/uiRecordApi';

// @wire 데코레이터가 사용된 컴포넌트 갱신시 사용
import {refreshApex} from "@salesforce/apex";

// 현재 Account 페이지의 Name, AccountNumber, Phone, Description 출력 
// 대소문자 구분에 주의
// 수정 들어갈것이므로 editable: true 속성 추가
const columns = [
  { label: '회사명', fieldName: 'Name', editable: true },
  { label: '기업번호', fieldName: 'AccountNumber', type: 'text', editable: true },
  { label: '전화번호', fieldName: 'Phone', type: 'phone', editable: true },
  { label: '설명', fieldName: 'Description', type: 'text', editable: true }
];


export default class AccountDataView extends LightningElement {

  columns = columns;

  accNm = '';

  searchResults = [];

  @api
  recordId;

  @wire(getAcc, {recordId : '$recordId'})
  wiredAccounts;
  
  fnSetKeyword(e) {
    this.accNm = e.target.value;
    
    if ( e.keyCode === 13 ) {
      this.fnSearch();
    }
  }

  fnSearch() {
    if ( !this.accNm.trim() ) {
      this.handleToastMessage({ message: '공백 검색 불가', variant: 'warning' });
      return false;
    }

    searchAcc({ accNm: this.accNm })
      .then(data => this.searchResults = data)
      .catch(e => this.handleToastMessage({ message: '에러 발생', variant: 'error' }));

  }

  get tableData() {
    return this.searchResults.length === 0 ? this.wiredAccounts.data : this.searchResults;
  }

  handleToastMessage({ message, variant}) {
    const toast = new ShowToastEvent({
      title: 'Toast message',
      message,
      variant,
      mode: 'dismissable'
    });

    this.dispatchEvent(toast);
  }

  async handleSave(e) {
    const draftValues = e.detail.draftValues;

    const updatePromises = draftValues.map(item => {
      const fields =  {};

      Object.keys(item).forEach(key => {
        fields[key] = item[key];
      });

      return updateRecord({ fields });
    });

    await Promise.all(updatePromises)
      .then(async data => {

        // 인라인 수정값을 임시로 담고있던것 비워줌
        this.draftValues = [];

        // 성공했으므로 토스트 하나 띄워주기
        this.handleToastMessage({ message: '저장되었습니다', variant: 'success' });
            
        // wiredAccounts 수정시 refreshApex로 컴포넌트 갱신해줌
        await refreshApex(this.wiredAccounts);
        
        // searchResults 수정시 리턴값인 data를 searchResults에 잘 담아주기
        const tempArr = [ ...this.searchResults ];
        data.forEach(row => {
          const {
            id,
            fields
          } = row;

          const matchedIdx = tempArr.findIndex(d => d.Id === id);
          if ( matchedIdx > -1) {
            tempArr[matchedIdx] = {
              Id: id,
              Name: fields.Name.value,
              AccountNumber: fields.AccountNumber.value,
              Phone: fields.Phone.value,
              Description: fields.Description.value,
            }
          }
        });

        this.searchResults = tempArr; 
      })
      .catch(error => this.handleToastMessage({ message: '에러 발생', variant: 'error' }));
  }
}