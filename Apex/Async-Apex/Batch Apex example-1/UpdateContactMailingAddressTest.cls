@isTest
private class UpdateContactMailingAddressTest {
    @isTest
    static void testBatchExecute() {
        // Create test data
        List<Account> accounts = new List<Account>();
        Account account = new Account(
            Name = 'Test Account',
            BillingStreet = '123 Main St',
            BillingCity = 'New York',
            BillingState = 'NY',
            BillingPostalCode = '12345'
        );
        accounts.add(account);
        insert accounts;
        List<Contact> contacts = new List<Contact>();
        Contact contact = new Contact(
            FirstName = 'John',
            LastName = 'Doe',
            AccountId = account.Id
        );
        contacts.add(contact);
        
       
        insert contacts;
        
        // Set the batch size
        Integer batchSize = 200;
        
        // Create an instance of the batch class
        UpdateContactMailingAddress batch = new UpdateContactMailingAddress();
        
        // Start the batch execution
        Test.startTest();
        Database.executeBatch(batch, batchSize);
        Test.stopTest();
        
        // Perform assertions or verifications
        List<Contact> updatedContacts = [SELECT Id, MailingStreet, MailingCity, MailingState, MailingPostalCode FROM Contact WHERE Id = :contact.Id];
        System.assertEquals(account.BillingStreet, updatedContacts[0].MailingStreet);
        System.assertEquals(account.BillingCity, updatedContacts[0].MailingCity);
        System.assertEquals(account.BillingState, updatedContacts[0].MailingState);
        System.assertEquals(account.BillingPostalCode, updatedContacts[0].MailingPostalCode);
    }
}