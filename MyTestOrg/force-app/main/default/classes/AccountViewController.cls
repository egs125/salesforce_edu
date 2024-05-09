public with sharing class AccountViewController {

  @AuraEnabled(cacheable=true)
  public static List<Account> getAcc(Id recordId){
  
    List<Account> listAcc = new List<Account>();
  
    // 적절한 코드
    listAcc = [
      SELECT Id, Name, AccountNumber, Phone, Description
      FROM Account
      WHERE Id = :recordId
    ];

    return listAcc;
  }

  @AuraEnabled(cacheable=true)
  public static List<Account> searchAcc(String accNm){
  
    String searchString = '%' + accNm + '%';
    List<Account> searchResults = [
                                    SELECT Id, Name, AccountNumber, Phone, Description
                                    FROM Account
                                    WHERE 
                                      Name LIKE :searchString
                                  ]; 
   
    return searchResults;
  
  }

}