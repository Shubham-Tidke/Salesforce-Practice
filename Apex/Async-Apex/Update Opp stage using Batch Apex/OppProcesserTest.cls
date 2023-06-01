@isTest
public class OppProcesserTest {
    @isTest
    public static void testOppProcessor() {
        // Create test data
        List<Opportunity> opportunities = new List<Opportunity>();
        for (Integer i = 0; i < 10; i++) {
            Opportunity opp = new Opportunity(Name = 'Test Opportunity ' + i,StageName='Staging', CloseDate=System.today());
            opportunities.add(opp);
        }
        insert opportunities;
        
        Test.startTest();
        // Instantiate the OppProcesser batch class
        OppProcesser batch = new OppProcesser();
        
        // Start the batch
        Id batchId = Database.executeBatch(batch);
        Test.stopTest();
        // Verify the batch execution
        List<Opportunity> updatedOpportunities = [SELECT Id, Amount FROM Opportunity];
        System.assertEquals(10, updatedOpportunities.size(), 'Unexpected number of opportunities');
        for (Opportunity opp : updatedOpportunities) {
            System.assertEquals(12345, opp.Amount, 'Amount not updated correctly');
        }
        
        // Verify the batch finish method
      //  System.assertEquals(10, batch.recordCount, 'Record count not updated correctly');
    }
}