@IsTest
public class ContactTriggerHandlerTest {
    @TestSetup
    static void setup(){
        Account acc = new Account();
        acc.Name = 'Test Account';
        insert acc;
        List<Contact>conList = new List<Contact>();
        for(Integer i = 0; i < 10 ; i++){
            Contact c = new Contact();
            c.LastName = 'Test '+i;
            c.Level__c = 'Secondary';
            c.Email = 'shubham.tidke.165@gmail.com';
            c.AccountId = acc.id;
            conList.add(c);
        }
        insert conList;
        Contact c = new Contact();
        c.LastName = 'Test 10';
        c.Level__c = 'Primary';
        c.Email = 'shubham.tidke.165@gmail.com';
        insert c;
    }
    @IsTest
    static void beforeContactDeleteTest(){
        Contact con = [SELECT id,Name,Level__c FROM Contact WHERE Name ='Test 10' AND Level__c ='Primary' LIMIT 1];
       // System.debug('before deleteX : '+con);
        Test.starttest();
        delete con;
        Test.stopTest();
        List<Contact> delCon = [SELECT id,Name,Level__c FROM Contact WHERE Name ='Test 10' AND Level__c ='Primary' LIMIT 1];
        System.assertEquals(0, delCon.size());
      
    }
    @IsTest
    static void afterContactDelete(){
        Contact con = [SELECT id,Name,Level__c FROM Contact WHERE  Level__c ='Secondary' LIMIT 1];
        Test.starttest();
        delete con;
        Test.stopTest();
        Account testAcc = [SELECT Id,No_of_Contacts__c,Name FROM Account WHERE Name ='Test Account' LIMIT 1 ];
        System.assertEquals(9, testAcc.No_of_Contacts__c);
    }
    @IsTest
    static void afterContactUndeleteTest(){
        List<Contact> Con = [SELECT id,Name,Level__c FROM Contact WHERE Name = 'Test 5' AND  Level__c ='Secondary' LIMIT 1];
        delete con;
        List<Contact> UndeleteCon = [SELECT id,Name,Level__c FROM Contact WHERE Name = 'Test 5' AND  Level__c ='Secondary' ALL ROWS];
        Test.startTest();
        undelete UndeleteCon;
        Test.stopTest();
        List<Contact> retrievedCon = [SELECT id,Name,Level__c FROM Contact WHERE Name = 'Test 5' AND  Level__c ='Secondary' LIMIT 1];
        //system.debug('retrieved contactsss :'+retrievedCon.size());
        System.assertEquals(1, retrievedCon.size());
    }
}