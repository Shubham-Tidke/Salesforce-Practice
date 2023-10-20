@IsTest
public class CaseTriggerHandlerTest {
    @TestSetup
    static void setup(){
        Account acc = new Account();
        acc.Name = 'Test Account';
        insert acc;
    }
    
    

    @IsTest
    static void updateRelatedAccountTest(){
        Account acc = [SELECT Id,Name FROM Account WHERE Name = 'Test Account'];
        Case c = new Case();
        c.Status = 'New';
        c.Origin = 'Phone';
        c.AccountId = acc.Id;
        Test.startTest();
        insert c;
        Test.stopTest();
        Account ac = [SELECT Id,Latest_case__c FROM Account WHERE Id =: acc.Id];
        Case cs = [SELECT Id,CaseNumber,AccountId FROM Case WHERE AccountId =: acc.Id];
        System.assertEquals(ac.Latest_case__c,cs.CaseNumber);
    }
}