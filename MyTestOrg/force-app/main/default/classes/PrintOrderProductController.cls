/************************************************************************************
 * Description :
 *
 * Ver      Date           Author          Modification
 * ===================================================================================
   1.0      2022-09-06     yr.lee          Create
*************************************************************************************/

public with sharing class PrintOrderProductController {
  public List<OrderItem> listOrderItem { get; set; }
  public PrintOrderProductController() {
      //url속 "recordId" 라는 파라미터를 가져오는 코드
      Id recordId = ApexPages.currentPage().GetParameters().get('recordId');

      listOrderItem = new List<OrderItem>();
      //해당 Order의 OrderItem을 가져오는 쿼리 작성해보기
      listOrderItem = [
          SELECT Id, Product2.Name, OrderItemNumber, Quantity, UnitPrice
          FROM OrderItem
          WHERE OrderId = :recordId
      ];
  }
}