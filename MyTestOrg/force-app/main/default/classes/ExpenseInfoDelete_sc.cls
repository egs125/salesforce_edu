global class ExpenseInfoDelete_sc implements Schedulable{
  global void execute(SchedulableContext sc) {
      // Scheduled job 등록할 때는 아래와 같이 입력
      // CRON example ) '0 30 16 * * ? *'  //16:30pm everyday
      // String CRON = '0 0 22 * * ? *'; 
      // System.schedule('스케줄 이름', CRON, new ExpenseInfoDelete_sc());
      Database.executeBatch(new ExpenseInfoDelete_ba() , 2);
  }
}