public with sharing class PrintExpenseListController {
  public List<Expense__c> listExpense { get; set; }

  public PrintExpenseListController() {

    Id recordId = ApexPages.currentPage().GetParameters().get('recordId');

    listExpense = new List<Expense__c>();
    listExpense = [
      SELECT Id, Spending__c
      FROM Expense__c
      WHERE Project__r.Id = :recordId
    ];
    
  }
}