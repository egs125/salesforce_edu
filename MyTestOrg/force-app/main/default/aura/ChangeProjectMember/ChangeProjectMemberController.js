({
  fnInit : function(component, event, helper) {
      helper.getInitData(component);
  },

  fnCheckPosition : function(component, event, helper) {
    console.log('fnCheckPosition: ' + component);  
    helper.doCheckPosition(component, event);
  },

  fnChange : function(component, event, helper) {
      var result = confirm("정말로 프로젝트 멤버를 교체 하시겠습니까?");
      if(result){
          helper.doChangeMember(component);
      }
  },

  fnCancel : function(component, event, helper){
      $A.get("e.force:closeQuickAction").fire();
  }

});