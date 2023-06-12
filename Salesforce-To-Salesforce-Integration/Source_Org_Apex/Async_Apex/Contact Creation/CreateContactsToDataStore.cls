public class CreateContactsToDataStore implements Database.Batchable<sObject>,Database.AllowsCallouts{
    
    public Database.QueryLocator start(Database.BatchableContext bc){
        
        //Fetching contact records which are created today and are not synced by datastore to avoid duplication of records in Datastore
        return Database.getQueryLocator([SELECT Name,FirstName,LastName, Birthdate, Department, Description, Email, 
                                         HomePhone, MobilePhone, phone,UniqueText__c,MailingStreet, MailingCity, 
                                         MailingState, MailingPostalCode, OtherStreet, OtherCity,OtherState, OtherPostalCode 
                                         FROM Contact WHERE CreatedDate = Today AND record_fetched__c = false]);
    }
    public void execute(Database.BatchableContext bc,List<Contact>conList){       
        Http http = new Http();
        HttpRequest req = new HttpRequest(); 
        req.setEndpoint('callout:datastore_API/services/apexrest/v1/contact');
        req.setMethod('POST');            
        req.setHeader('Content-Type', 'application/json');            
        req.setBody(JSON.serialize(conList));
        
        try{
            HttpResponse res = http.send(req);
            System.debug('RESSSS :'+res.getStatusCode());
        }catch(exception e){
            System.debug('EXCEPTION :: '+e);
        }
    }
    public void finish(Database.BatchableContext bc){}
}