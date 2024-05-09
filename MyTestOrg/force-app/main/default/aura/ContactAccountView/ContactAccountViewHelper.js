({
  getInitData : function(component) {
      var action = component.get("c.getInitData");
      action.setParams({
          //recordId 넘기기
          recordId: component.get("v.recordId")
      });
      action.setCallback(this, function(response) {
          var state = response.getState();
          if(state === "SUCCESS") {
              var returnValue = response.getReturnValue();
              console.log(returnValue);
              //component.set 함수를 이용하여 반환값 대입하기
              component.set("v.objAccount", returnValue);
          } else if(state === "ERROR") {
              this.showToast("error", "시스템 에러입니다.");
          }
      });
      $A.enqueueAction(action);
  },

  //토스트 메시지를 사용할 helper에 이 함수를 꼭 추가해주세요
  showToast : function(type, message) {
      var evt = $A.get("e.force:showToast");
      evt.setParams({
          key : "info_alt"
          , type : type
          , message : message
      });
      evt.fire();
  }
});