@IsTest
public class OpportunityTriggerHandlerTest {
    @TestSetup
    static void setup(){
        Account acc = new Account();
        List<Opportunity>oppList = new List<Opportunity>();
        acc.Name = 'Test Account';
        acc.AnnualRevenue = 0;
        insert acc;
        for(Integer i = 0 ; i < 10 ; i++){
            Opportunity opp = new Opportunity();
            opp.Name = 'Test Opportunity '+i;
            opp.StageName = 'Prospecting';
            opp.CloseDate = System.today()+2;
            opp.Amount = 20000;
            opp.AccountId = acc.Id;
            oppList.add(opp);
        }
        insert oppList;
    }
    @IsTest
    public static void updateOppDescriptionTest(){
        Account acc = [SELECT Id,Name,AnnualRevenue FROM Account WHERE Name = 'Test Account'];
        Opportunity opp = new Opportunity();
        opp.Name = 'Test Opportunity';
        opp.StageName = 'Prospecting';
        opp.CloseDate = System.today()+2;
        opp.Amount = 200000;
        opp.AccountId = acc.Id;
        Test.startTest();
        insert opp;
        Test.stopTest();
        Opportunity oppor  = [SELECT id,Name,Description FROM Opportunity WHERE Name = 'Test Opportunity' AND Amount > 10000 ];
        Account updatedAcc = [SELECT Id,Name,AnnualRevenue FROM Account WHERE Name = 'Test Account'];
        System.assertEquals(400000, updatedAcc.AnnualRevenue);
        System.assertEquals('Hot Opportunity', Oppor.Description);
    }
    @IsTest
    public static void removeAccountRevenueTest(){
        Opportunity oppor  = [SELECT id,Name,Description FROM Opportunity WHERE Name = 'Test Opportunity 1' LIMIT 1 ];
        Test.startTest();
        delete oppor;
        Test.stopTest();
        Account updatedAcc = [SELECT Id,Name,AnnualRevenue FROM Account WHERE Name = 'Test Account'];
        System.assertEquals(180000, updatedAcc.AnnualRevenue);
    }
    @IsTest
    public static void updateAccountRevenueTest(){
        Opportunity oppor  = [SELECT id,Name,Description,Amount FROM Opportunity WHERE Name = 'Test Opportunity 1' LIMIT 1 ];
        oppor.Amount = 0;
        Test.startTest();
        update oppor;
        Test.stopTest();
        Account updatedAcc = [SELECT Id,Name,AnnualRevenue FROM Account WHERE Name = 'Test Account'];
        System.assertEquals(180000, updatedAcc.AnnualRevenue);
    }
}