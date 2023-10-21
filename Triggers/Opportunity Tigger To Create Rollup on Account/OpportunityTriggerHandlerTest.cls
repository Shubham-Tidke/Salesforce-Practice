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
        Opportunity opp1 = new Opportunity();
        opp1.Name = 'Test Opportunity1';
        opp1.StageName = 'Closed Won';
        opp1.CloseDate = System.today()+2;
        Opportunity opp2 = new Opportunity();
        opp2.Name = 'Test Opportunity2';
        opp2.StageName = 'Closed Lost';
        opp2.CloseDate = System.today()+2;

        Test.startTest();
        insert opp;
        insert opp1;
        insert opp2;
        Test.stopTest();
        Opportunity oppor  = [SELECT id,Name,Description FROM Opportunity WHERE Name = 'Test Opportunity' AND Amount > 10000 ];
        Opportunity oppor1  = [SELECT id,Name,Description FROM Opportunity WHERE Name = 'Test Opportunity1'];
        Opportunity oppor2  = [SELECT id,Name,Description FROM Opportunity WHERE Name = 'Test Opportunity2'];
        Account updatedAcc = [SELECT Id,Name,AnnualRevenue FROM Account WHERE Name = 'Test Account'];
        System.assertEquals(400000, updatedAcc.AnnualRevenue);
        System.assertEquals('Hot Opportunity', Oppor.Description);
        System.assertEquals('Opportunity is Closed Won', Oppor1.Description);
        System.assertEquals('Opportunity is Closed Lost', Oppor2.Description);
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
    @IsTest
    public static void CreateTaskOnOpportunityTest(){
        Opportunity oppor  = [SELECT id,StageName,Description,Amount FROM Opportunity WHERE Name = 'Test Opportunity 1' LIMIT 1 ];
        oppor.StageName = 'Need Analysis';
        Test.startTest();
        update oppor;
        Test.stopTest();
        List<Task> taskList = [SELECT id,WhatId FROM Task WHERE WhatId =: oppor.Id];
        System.assertEquals(1, taskList.Size());
    }
}