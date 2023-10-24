@IsTest
public class UpdateOpportunitiesBatchTest {

    @TestSetup
    static void setup(){
        List<Opportunity>oppList = new List<Opportunity>();
        for(Integer i = 0 ; i < 100 ; i++){
            Opportunity opp = new Opportunity();
            opp.Name = 'Test Opportunity '+i;
            opp.StageName = 'Prospecting';
            opp.CloseDate = System.today()+2;
            oppList.add(opp);
        }
        insert oppList;
    }
    @IsTest
    static void testExecute(){
        UpdateOpportunitiesBatch batch = new UpdateOpportunitiesBatch();
        Test.startTest();
        Database.executeBatch(batch,100);
        Test.stopTest();
        List<Opportunity>opps = [SELECT Id,Name,Amount FROM Opportunity WHERE Amount = 1000 AND Name = 'Test Opportunity %'];
        System.assertEquals(100,opps.size());
    }
}