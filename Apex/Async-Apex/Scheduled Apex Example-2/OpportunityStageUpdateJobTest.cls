@IsTest
public class OpportunityStageUpdateJobTest {
    @TestSetup
    public static void setup(){
        Opportunity opp = new Opportunity();
        opp.Name = 'Test Opportunity';
        opp.StageName = 'Prospecting';
        opp.CloseDate = System.today()+2;
        opp.Amount = 20000;
        insert opp;
    }
    @IsTest
    static void executeTest(){
        String CRON = '0 45 21 25 10 ?';
        Test.startTest();
        String jobId = System.schedule('Test Job', CRON, new OpportunityStageUpdateJob());
        CronTrigger CT = [SELECT Id,CronExpression, TimesTriggered, NextFireTime  FROM CronTrigger WHERE id = :jobId];
        System.assertEquals(CRON, CT.CronExpression);
        Test.stopTest();
    }
}