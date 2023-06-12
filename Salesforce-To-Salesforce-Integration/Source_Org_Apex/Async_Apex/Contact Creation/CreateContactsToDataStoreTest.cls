@isTest
private class CreateContactsToDataStoreTest {
    @isTest
    static void testBatchExecute() {
        // Create test data
        List<Contact> contacts = new List<Contact>();
        Contact contact = new Contact(
            FirstName = 'John',
            LastName = 'Doe',
            Birthdate = Date.newInstance(1990, 1, 1),
            Department = 'Sales',
            Email = 'johndoe@example.com',
            Description = 'Test description',
            HomePhone = '1234567890',
            MobilePhone = '9876543210',
            Phone = '5555555555',
            //UniqueText__c = 'ABC123',
            MailingStreet = '123 Main St',
            MailingCity = 'City',
            MailingState = 'State',
            MailingPostalCode = '12345',
            OtherStreet = '456 Elm St',
            OtherCity = 'City',
            OtherState = 'State',
            OtherPostalCode = '67890'
        );
        contacts.add(contact);
        insert contacts;
        
        // Set the batch size
        Integer batchSize = 200;
        
        // Create an instance of the batch class
        CreateContactsToDataStore batch = new CreateContactsToDataStore();
        
        // Start the batch execution
        Test.startTest();
        Database.executeBatch(batch, batchSize);
        Test.stopTest();
        
        
    }
}