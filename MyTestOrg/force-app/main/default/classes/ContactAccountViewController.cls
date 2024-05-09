/************************************************************************************
 * Description :
 *
 * Ver      Date           Author          Modification
 * ===================================================================================
   1.0                     yr.lee         Create
*************************************************************************************/
public with sharing class ContactAccountViewController{
  // AuraEnabled 어노테이션이 있어야 helper에서 메소드 호출 가능
  @AuraEnabled
  public static Contact getInitData(String recordId){
      List<Contact> listContact = new List<Contact>();
      listContact = [
              SELECT Id, Account.Name, Account.AccountNumber, Account.Industry, Account.Type
              FROM Contact
              WHERE Id = :recordId
      ];
      return listContact[0];
  }
}