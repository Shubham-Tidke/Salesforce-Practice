@IsTest
public class AccountUpdateQueTest {
    @TestSetup
    static void setup(){
        List<Account> accList = new List<Account>();
        for(Integer i = 0 ; i < 100 ; i++){
            Account acc = new Account();
            acc.Name = 'Test Account '+i;
            acc.AnnualRevenue = 0;
            accList.add(acc);
        }
        insert accList;
    }
    @IsTest
    static void executeTest(){
        Test.startTest();
        System.enqueueJob(new AccountUpdateQue());
        Test.stopTest();
        System.assertEquals(100,[SELECT count() FROM Account WHERE AnnualRevenue = 10]);
    }
}