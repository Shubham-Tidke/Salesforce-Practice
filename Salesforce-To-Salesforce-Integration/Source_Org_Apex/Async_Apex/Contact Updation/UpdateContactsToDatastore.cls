public class UpdateContactsToDatastore implements Database.Batchable<sObject>,Database.AllowsCallouts {
    
    public Database.QueryLocator start(Database.BatchableContext bc){
        //Is_Updated_Today__c to get records which are updated today 
        return Database.getQueryLocator([SELECT Id,Name,FirstName,LastName, Birthdate, Department, Description,
                                         Email,HomePhone, MobilePhone,LastModifiedDate,Phone,UniqueText__c,Is_Updated_Today__c FROM Contact 
                                         WHERE Is_Updated_Today__c  = true AND LastModifiedDate = Today]);  
    }
    public void execute(Database.BatchableContext bc,List<Contact>conList){
        
        Http http = new Http();
        HttpRequest req = new HttpRequest(); 
        req.setEndpoint('callout:datastore_API/services/apexrest/v1/contact');
        req.setMethod('PATCH');            
        req.setHeader('Content-Type', 'application/json');            
        req.setBody(JSON.serialize(conList));
        
        try{
            HttpResponse res = http.send(req);
            //System.debug('RESSSS PATCH :'+res.getStatusCode());
        }catch(exception e){
            System.debug('EXCEPTION :: '+e);
        }
    }
    public void finish(Database.BatchableContext bc){}   
}