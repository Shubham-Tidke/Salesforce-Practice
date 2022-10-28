@isTest
public with sharing class AccountManagerTest {
    public static testMethod void getAccountTest(){
        String recordId = createTestRecord();
        String url = '/services/apexrest/v1/Account/'+recordId;

        RestRequest req = new RestRequest();
        req.requestURI = url;
        req.httpMethod = 'GET';
        RestContext.request = req;

        Test.startTest();
            AccountManager.AccountWrapper wrapper =   AccountManager.getAccount();
            system.assertNotEquals(null,wrapper);
        Test.stopTest();
    }
    public static testMethod void postAccountTest(){
        String url = '/services/apexrest/v1/Account/';
        RestRequest request = new RestRequest();
        request.requestURI = url;
        request.httpMethod = 'POST';
        

        Account acc = new Account(Name = 'Test');
        AccountManager.postAccountWrapper record = new AccountManager.postAccountWrapper();
        record.accountRecord = acc;
        RestContext.request = request;
        Test.startTest();
        AccountManager.postAccountWrapper rec = AccountManager.createAccount(record);
        Test.stopTest();
    }

    static Id createTestRecord(){
        Account testAcc = new Account(
            Name = 'test account'
        );
        insert testAcc;
        Contact testCon = new Contact(
            LastName = 'test contact',
            AccountId = testAcc.Id
        );
        insert testCon;
        return testAcc.Id;
    }
}
