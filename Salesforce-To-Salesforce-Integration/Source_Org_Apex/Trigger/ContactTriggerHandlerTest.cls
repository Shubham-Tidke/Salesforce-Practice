@isTest
private class ContactTriggerHandlerTest {
    @isTest
    static void testExecute() {
        // Create test data
        List<Contact> contacts = new List<Contact>();
        Contact contact1 = new Contact(
            FirstName = 'John',
            LastName = 'Doe',
            Birthdate = Date.newInstance(1990, 1, 1)           
        );
        contacts.add(contact1);
        
        Contact contact2 = new Contact(
            FirstName = 'Jane',
            LastName = 'Smith',
            Birthdate = Date.newInstance(1995, 5, 5)            
        );
        //contacts.add(contact2);
        
        insert contacts;
     
        // Set up mock callout response       
        Test.setMock(HttpCalloutMock.class, new MockHttpResponseGenerator());
        
        // Create an instance of the queueable class
        ContactTriggerHandler handler = new ContactTriggerHandler(contacts);
        Test.startTest();
        // Enqueue the queueable job
        System.enqueueJob(handler);
        
        // Ensure the queueable job is processed
        Test.stopTest();
        
        // Verify the updated contact records
        List<Contact> updatedContacts = [SELECT Id, Email, Department, Description, Phone, HomePhone, MobilePhone, record_fetched__c,
                                         OtherCity, OtherState, OtherStreet, MailingCity, MailingState, MailingStreet
                                         FROM Contact WHERE Id IN :contacts];
                
    }
    
    static String getMockCalloutResponseBody() {
        return '[{"FirstName":"John","LastName":"Doe","Birthdate":"1990-01-01","Email":"test@example.com","Department":"Test Department","Description":"Test Description","HomePhone":"1111111111","MobilePhone":"9999999999","Phone":"1234567890","UniqueText":"JohnDoe19900101","addWrapper":[{"Type":"Billing","State":"Test State","City":"Test City","Street":"Test Street","Landmark":"Test Landmark"},{"Type":"Shipping","State":"Test State","City":"Test City","Street":"Test Street","Landmark":"Test Landmark"}]}'+
               ',{"FirstName":"Jane","LastName":"Smith","Birthdate":"1995-05-05","Email":"test@example.com","Department":"Test Department","Description":"Test Description","HomePhone":"1111111111","MobilePhone":"9999999999","Phone":"1234567890","UniqueText":"JaneSmith19950505","addWrapper":[{"Type":"Billing","State":"Test State","City":"Test City","Street":"Test Street","Landmark":"Test Landmark"},{"Type":"Shipping","State":"Test State","City":"Test City","Street":"Test Street","Landmark":"Test Landmark"}]}]';
    }
}