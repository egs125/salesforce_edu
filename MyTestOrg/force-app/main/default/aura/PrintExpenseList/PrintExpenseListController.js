({
  fnInit : function(component, event, helper){
    component.set("v.vfPageUrl" , "/apex/PrintExpensesList?recordId=" + component.get("v.recordId"));
  },

  // 취소 버튼 클릭 시 창닫기 실행
  fnCancel : function(component, event, helper){
      $A.get("e.force:closeQuickAction").fire();
  },

  // 저장 버튼 클릭 이벤트 핸들러
  fnSave : function(component, event, helper){
      console.log("call Save");
      //저장버튼 누를 시, 액션
      //helper.saveAction(component);
  }
})
