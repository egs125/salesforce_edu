public with sharing class Account_tr extends TriggerHandler {
  private List<Account> listNew {get; set;}
  private List<Account> listOld {get; set;}
  private Map<Id, Account> mapNew {get; set;}
  private Map<Id, Account> mapOld {get; set;}

  public Account_tr(){
    listNew = (List<Account>)Trigger.new;
    listOld = (List<Account>)Trigger.old;
    mapNew = (Map<Id,Account>)Trigger.newMap;
    mapOld = (Map<Id,Account>)Trigger.oldMap;
  }

  public override void beforeInsert(){
    doInsertAccount();
  }

  public override void afterInsert(){
  }

  public override void beforeUpdate(){
    doUpdateAccount();
  }

  public override void afterUpdate(){
  }

  public override void beforeDelete(){
    doDeleteAccount();
  }

  public void doInsertAccount() {
    for (Account objNew : listNew) {
      if ( objNew.Rating == null )  {
        objNew.Rating = 'Cold';
      }
    }
  }

  public void doUpdateAccount() {
    for (Account objNew : listNew) {
      if ( objNew.Rating == 'Cold' && mapOld.get(objNew.Id).Rating == 'Hot' )  {
        objNew.addError('Hot일때는 cold로 변경 불가');
      }
    }
  }

  public void doDeleteAccount() {
    // delete 트리거에는 올드 변수만 들어오고 new 변수는 들어오지 않음
    for (Account objOld : listOld) {
      if ( objOld.Rating == 'Hot' )  {
        objOld.addError('Hot일때는 삭제 불가');
      }
    }
  }
}