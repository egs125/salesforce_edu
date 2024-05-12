/*
  테스트 클래스 실행하려면 developer console -> Test -> New Run 에서 선택하여 실행
*/
@IsTest
private class Account_tr_test {
    @TestSetup
    static void Account_tr_testSetup() {
        //code_block
    }

    @IsTest
    static void Account_tr_test () {

        Test.startTest();

        Account objAccount = new Account();
        objAccount.Name = 'Test Account';
        insert objAccount;

        objAccount.Rating = 'Hot';
        update objAccount;

        objAccount.Rating = 'Warm';
        update objAccount;

        delete objAccount;
        
        objAccount.Description = 'Test Description';

        Test.stopTest();
    }
}