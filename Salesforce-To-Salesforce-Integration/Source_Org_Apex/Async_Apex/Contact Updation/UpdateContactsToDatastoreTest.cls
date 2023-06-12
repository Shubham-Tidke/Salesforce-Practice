@isTest
private class UpdateContactsToDatastoreTest {
    @isTest
    static void testBatchExecute() {
        // Create test data
          // Create test data       
        Contact contact1 = new Contact(
            FirstName = 'John',
            LastName = 'Doe',
            Birthdate = Date.newInstance(1990, 1, 1)            
        );                              
        insert contact1;
        Test.setCreatedDate(contact1.Id, DateTime.newInstance(2020,12,12));
        List<Contact> InsertedContacts = [Select Id,FirstName,LastName,Description from Contact Where FirstName = 'John'AND LastName = 'Doe'];
        for(Contact con:InsertedContacts){
            con.Description = 'Updated Description';
        }
        Update InsertedContacts;
        // Set the batch size
        Integer batchSize = 200;
        
        // Create an instance of the batch class
        UpdateContactsToDatastore batch = new UpdateContactsToDatastore();
        
        // Start the batch execution
        Test.startTest();
        Database.executeBatch(batch, batchSize);
        Test.stopTest();
        
     
    }
}