global with sharing class ExpenseInfoDelete_ba implements Database.Batchable<sObject>, Database.Stateful, Database.AllowsCallouts {
  global Boolean isError = false;
  global String strId;

  public ExpenseInfoDelete_ba() {
  }

  global Database.QueryLocator start(Database.BatchableContext BC) {

      Date dateThreeMonthAgo = Date.today().addMonths(-3);
      String strQuery = 'SELECT Id ';
      strQuery += '   FROM Expense__c';
      strQuery += '   WHERE  Project__r.EndDate__c < :dateThreeMonthAgo ';
      strQuery += '   ORDER BY Description__c LIMIT 10';
      // Project__r <- Lookup 관계에 있을 때 조회하고자 하면 __r 붙임

      return DataBase.getQueryLocator(strQuery);

      // 수동 실행하려면 developer console -> debug -> open excute ... 선택해서 아래 코드 실행
      // Database.executeBatch(new ExpenseInfoDelete_ba() , 50);
      // 배치 실행 후 결과 확인은 setup -> Apex Jobs 화면에서 확인
  }

  global void execute(Database.BatchableContext BC, List<Expense__c> listTarget){
      try {
          for (Expense__c objExpense : listTarget ) {
            objExpense.Description__c = null;
          }

          update listTarget; // update 시 Id 가 필요한데, 이미 Id를 위에서 조회해와서 업데이트 바로 실행 가능

      }catch(Exception e) {
          this.isError = true;
          System.debug('Error ===================> Error : ' + e.getMessage() + '/' + e.getLineNumber());
      }
  }

  global void finish(Database.BatchableContext BC) {
  }
}