public with sharing class TestController {
  @AuraEnabled
  public static List<Map<String, String>> getTaskFlowOptions(String unitProcess){
    List<Map<String, String>> taskFlowOptions = new List<Map<String, String>>();
    
    System.debug('@@@@@@@');
    System.debug('unitProcess : ' + unitProcess);
    
    try {
      Map<String, String> obj = new Map<String, String>();
      obj.put('label', 'T01 ddd');
      obj.put('value', 'T01');
      taskFlowOptions.add(obj);

      Map<String, String> obj2 = new Map<String, String>();
      obj2.put('label', 'T02 dddd');
      obj2.put('value', 'T02');
      taskFlowOptions.add(obj2);

    } catch (Exception e) {
      throw new AuraHandledException(e.getMessage());
    }

    return taskFlowOptions;
  }

  @AuraEnabled
  public static List<Map<String, String>> getTaskFlowStepOptions(String unitProcess){
    List<Map<String, String>> taskFlowStepOptions = new List<Map<String, String>>();
    
    System.debug('@@@@@@@');
    System.debug('unitProcess : ' + unitProcess);
    
    try {
      Map<String, String> obj = new Map<String, String>();
      obj.put('label', '01.ddd');
      obj.put('value', '01');
      obj.put('parent', 'T01');
      taskFlowStepOptions.add(obj);

      Map<String, String> obj2 = new Map<String, String>();
      
      obj2.put('label', '02.dddd');
      obj2.put('value', '02');
      obj2.put('parent', 'T02');
      taskFlowStepOptions.add(obj2);

    } catch (Exception e) {
      throw new AuraHandledException(e.getMessage());
    }

    return taskFlowStepOptions;
  }
}