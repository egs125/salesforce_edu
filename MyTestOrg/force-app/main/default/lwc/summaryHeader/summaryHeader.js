import { LightningElement, api } from 'lwc';
import getTaskFlowOptions from '@salesforce/apex/TestController.getTaskFlowOptions';
import getTaskFlowStepOptions from '@salesforce/apex/TestController.getTaskFlowStepOptions';

export default class SummaryHeader extends LightningElement {
  // Lightning App Builder -> New -> App Page 만들기로 새 페이지 생성 후 설정 화면 -> Tabs -> Lightning Page Tabs에서 추가하면 됨
  
  @api selectedUnitProcess;
  @api selectedTaskFlow;
  @api selectedTaskFlowStep;

  // Unit Process 선택 박스 옵션 목록
  unitProcesses = [
    { label: '영업기회', value: '영업기회' },
    { label: '성약관리', value: '성약관리' },
    { label: '매출전망', value: '매출전망' },
    { label: '판매계획', value: '판매계획' },
  ];

  // Task Flow 선택 박스 옵션 목록
  taskFlows = [];
  originalTaskFlows = [];

  // Task Flow Step 선택 박스 옵션 목록
  taskFlowSteps = [];
  originalTaskFlowSteps = [];

  // Unit Process 변경 이벤트 핸들러
  onChangeUnitProcess({ detail: { value }}) {
    this.selectedUnitProcess = value;

    this.searchTaskFlows();
    this.searchTaskFlowSteps();
  }

  // Task Flow 변경 이벤트 핸들러
  onChageTaskFlow({ detail: { value }}) {
    this.selectedTaskFlow = value;
    this.selectedTaskFlowStep = '';

    this.filterTaskFlowStep();
  }

  // Task Flow Step 변경 이벤트 핸들러
  onChageTaskFlowStep({ detail: { value }}) {
    console.log(value)
  }

  // Task Flow 목록 조회
  searchTaskFlows() {
    getTaskFlowOptions({ unitProcess: this.selectedUnitProcess })
      .then(results => {
        // 터미널에서 sfdx force:apex:log:tail 치면 디버그 로그 출력
        results.unshift({ label: '전체', value: '' });
        
        this.selectedTaskFlow = '';
        this.taskFlows = results;
        this.originalTaskFlows = results;
      });
  }

  // Task Flow Step 목록 조회
  searchTaskFlowSteps() {
    getTaskFlowStepOptions({ unitProcess: this.selectedUnitProcess })
      .then(results => {
        results.unshift({ label: '전체', value: '' });
        
        this.selectedTaskFlowStep = '';
        this.taskFlowSteps = results;
        this.originalTaskFlowSteps = results;
      });
  }

  // Task Flow Step 필터 이벤트 핸들러
  filterTaskFlowStep() {
    this.taskFlowSteps = this.selectedTaskFlow ?
            [
              { label: '전체', value: '' }
              , ...this.originalTaskFlowSteps.filter(el => el.parent === this.selectedTaskFlow)
            ]
            : this.originalTaskFlowSteps;;
  }
}