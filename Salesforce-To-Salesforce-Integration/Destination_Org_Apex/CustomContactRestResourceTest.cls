@isTest
private class CustomContactRestResourceTest {
    @isTest
    static void testGetContacts() {
        // Create test data              
        Contact contact = new Contact(
            FirstName = 'John',
            LastName = 'Doe',
            Birthdate = Date.newInstance(1990, 1, 1),
            Department = 'Sales',
            Email = 'johndoe@example.com',
            Description = 'Test description',
            HomePhone = '1234567890',
            MobilePhone = '9876543210',
            Phone = '5555555555'           	
        );       
        insert contact;
        Address__c add = new Address__c(            
            City__c = 'Test City',
            State__c = 'Test State',
            Street__c = 'Test Street',
            Landmark__c = 'Test Landmark'
        );
        Insert add;
        Address_Junction__c adj = new Address_Junction__c(
            Type__c ='Shipping',
            Contact__c = contact.Id,
            Address__c = add.Id
        );
		insert adj;
        // Set the REST request URL with the unique text
        RestRequest request = new RestRequest();
        request.requestURI = '/v1/contact/JohnDoe1990-01-01';
        RestContext.request = request;
        
        // Call the REST resource method
        List<customContactRestResource.contactWrapperClass> result = customContactRestResource.getContacts();
        
        // Verify the result
        System.assertEquals(1, result.size());
        customContactRestResource.contactWrapperClass contactWrapper = result[0];
        System.assertEquals('John', contactWrapper.FirstName);
        System.assertEquals('Doe', contactWrapper.LastName);
        System.assertEquals(Date.newInstance(1990, 1, 1), contactWrapper.Birthdate);
        System.assertEquals('Sales', contactWrapper.Department);
        System.assertEquals('johndoe@example.com', contactWrapper.Email);
        System.assertEquals('Test description', contactWrapper.Description);
        System.assertEquals('1234567890', contactWrapper.HomePhone);
        System.assertEquals('9876543210', contactWrapper.MobilePhone);
        System.assertEquals('5555555555', contactWrapper.phone);
        System.assertEquals('JohnDoe1990-01-01', contactWrapper.UniqueText);        
    }
    
    @isTest
    static void testSaveContacts() {
        // Set the REST request body with new contact data
        RestRequest request = new RestRequest();
        request.requestBody = Blob.valueOf('[{"FirstName":"John","LastName":"Doe","Birthdate":"1990-01-01","Department":"Sales","Email":"johndoe@example.com","Phone":"5555555555","HomePhone":"1234567890","Description":"Test description"}]');
        RestContext.request = request;
        
        // Call the REST resource method
        Test.startTest();
        customContactRestResource.saveContacts();
        Test.stopTest();
        
        // Verify the inserted contact
        List<Contact> insertedContacts = [SELECT FirstName, LastName, Birthdate, Department, Email, Phone, HomePhone, Description, UniqueText__c FROM Contact WHERE UniqueText__c = 'JohnDoe1990-01-01'];
        System.assertEquals(1, insertedContacts.size());
        
        Contact insertedContact = insertedContacts[0];
        System.assertEquals('John', insertedContact.FirstName);
        System.assertEquals('Doe', insertedContact.LastName);
        System.assertEquals(Date.newInstance(1990, 1, 1), insertedContact.Birthdate);
        System.assertEquals('Sales', insertedContact.Department);
        System.assertEquals('johndoe@example.com', insertedContact.Email);
        System.assertEquals('5555555555', insertedContact.Phone);
        System.assertEquals('1234567890', insertedContact.HomePhone);
        System.assertEquals('Test description', insertedContact.Description);
        System.assertEquals('JohnDoe1990-01-01', insertedContact.UniqueText__c);                
    }
    
    @isTest
    static void testUpdateContacts() {
        // Create test data
        Contact contact = new Contact(
            FirstName = 'John',
            LastName = 'Doe',
            Birthdate = Date.newInstance(1990, 1, 1),
            Department = 'Sales',
            Email = 'johndoe@example.com',
            Phone = '5555555555',
            HomePhone = '1234567890',
            Description = 'Test description'           
        );
        insert contact;
        Test.setCreatedDate(contact.Id, DateTime.newInstance(2020,12,12));
        
        // Set the REST request body with updated contact data
        RestRequest request = new RestRequest();
        request.requestBody = Blob.valueOf('[{"Id":"' + contact.Id + '","FirstName":"John","LastName":"Doe","Birthdate":"1990-01-01","Department":"Marketing","Email":"updatedjohndoe@example.com","Phone":"9999999999","HomePhone":"9876543210","UniqueText__c":"JohnDoe1990-01-01","Description":"Updated description"}]');
        
 		
   		RestContext.request = request;
        // Call the REST resource method
        Test.startTest();
        customContactRestResource.updateContacts();
        Test.stopTest();
        
        // Verify the updated contact
        Contact updatedContact = [SELECT FirstName, LastName, Birthdate, Department, Email, Phone, HomePhone, Description FROM Contact WHERE Id = :contact.Id];
        
        
        System.assertEquals('Marketing', updatedContact.Department);
        System.assertEquals('updatedjohndoe@example.com', updatedContact.Email);
        System.assertEquals('9999999999', updatedContact.Phone);
        System.assertEquals('9876543210', updatedContact.HomePhone);
        System.assertEquals('Updated description', updatedContact.Description);               
    }
}