@IsTest
public class AccountTriggerHandlerTest {

    // @TestSetup 
    // static void accountSetup(){
        
        
    // }
    @IsTest
    static void beforeAccInsertTest(){
        List<Account>accList = new List<Account>();
        List<Account>accLst = new List<Account>();
        for(Integer i = 0 ; i < 5 ; i++){
            Account a = new Account();
            a.Name = 'TestIndustry '+i;
            a.Industry = 'Energy';            
            accList.add(a);
        }
         for(Integer i = 0 ; i < 5 ; i++){
            Account a = new Account();
            a.Name = 'TestIndustry '+i;
            a.Industry = 'Energy';            
            accList.add(a);
        }
        for(Integer i = 0 ; i < 10 ; i++){
            Account a = new Account();
            a.Name = 'Test '+i;
            accLst.add(a);
        }
        Test.startTest();
        insert accList;
        insert accLst;
        Test.stopTest();
        List<Account>accIndustry = [SELECT id,name,Industry,Rating from Account WHERE Industry IN ('Media','Energy') AND Rating =:'Hot'];
        List<Opportunity>oppList = [SELECT id,Name,AccountId FROM Opportunity WHERE AccountId IN : accIndustry];
        System.assertEquals(10, accIndustry.size(),'Accounts with hot rating');
        System.assertEquals(10, oppList.size(),'Opportunity related to accounts');
        List<Account>accIndustrylst = [SELECT id,name,Industry,Rating from Account WHERE Industry NOT IN ('Media','Energy') AND Rating =:'Warm'];
        System.assertEquals(10, accIndustrylst.size());
    }
    @IsTest
    static void updateOpptest(){
        List<Account>accList = new List<Account>();
         for(Integer i = 0 ; i < 5 ; i++){
            Account a = new Account();
            a.Name = 'TestIndustry '+i;
            a.phone = '1234567';            
            accList.add(a);
        }
        insert accList;
        List<Account>updateAccList = [SELECT Id,Phone,Name from Account where phone = '1234567'];
        Contact c = new Contact();
        c.Lastname = 'Test Contact';
        c.AccountId = updateAccList[0].Id;
        c.Email = 'abc@test.com';
        insert c;
        for(Account acc : updateAccList){
            acc.phone = '99887766';
        }
        Test.startTest();
        update updateAccList;
        Test.stoptest();
        List<Account>updatedAccList = [SELECT id,phone,name from Account where phone = '99887766' ];
        Contact updatedcon = [SELECT Id,LastName ,HomePhone from Contact where LastName  = 'Test Contact' ];
        System.assertEquals(5, updatedAccList.size());
        System.assertEquals('99887766',updatedcon.HomePhone);
    }
}