public class ContactTriggerHandler implements Queueable, Database.AllowsCallouts{
    
    public list<contact>conList = new list<contact>();
    Map<String,Contact>conMap = new Map<String,Contact>();
	List<Contact>recordsToInsert = new List<Contact>();    
    public list <String>uniqueNameAndDOB = new list<String>();
    
    //constructor to assign trigger.new
    public ContactTriggerHandler(List<Contact> newContacts){        
        this.conList = newContacts;        
    }   
    
    public void execute(QueueableContext qc){
        //system.debug('conList::' +conList);
        for(Contact con : conList){      
            //Storing list of uniqueTexts(firstname+lastname+DOB) in a list and map
            uniqueNameAndDOB.add(con.UniqueText__c);
        	conMap.put(con.UniqueText__c, con);
        }
        
        //converting uniqueTexts list to a string to pass it in a request
        String uniqueTexts = String.join(uniqueNameAndDOB, '_');
        
        Http http = new Http();
        HTTPResponse res;
        HttpRequest req = new HttpRequest(); 
        req.setEndpoint('callout:datastore_API/services/apexrest/v1/contact/'+uniqueTexts);
        req.setMethod('GET');
        req.setHeader('Content-Type','application/json');        
        //System.debug('Request::'+req);
        try{
            res = http.send(req);
            System.debug('RESSSS GET :'+res.getBody());
            String Result = res.getBody();
            if(res.getStatusCode()==200){
               //Deserializing the response and storing in list of type Wrapper
               List<contactWrapperClass> results = (List<contactWrapperClass>)JSON.deserialize(res.getBody(), List<contactWrapperClass>.class);
                
              // System.debug('Result LIST:: '+results);              
                for(contactWrapperClass obj: results){                    
                    String str = obj.UniqueText;
                    
                    //check if the result list has same uniquetext as the record which started the trigger
                    if(conMap.containsKey(str)){
                        
                       //workaround for the afterInsert trigger to update the same record with received fields 
                       contact c = new Contact(id=conMap.get(str).id);
                        
                       c.Email = obj.Email;
                       c.Department = obj.Department;
                       c.Description = obj.Description;
                       c.Phone = obj.Phone;
                       c.HomePhone = obj.HomePhone;
                       c.MobilePhone = obj.MobilePhone;
                       c.record_fetched__c = true; // custom field to show the record has fields imported from DataStore Org
                        
                       //Updating the address fields according the billing or shipping condition
                        if(!obj.addWrapper.isEmpty()){
                            for(addressWrapperClass addr :obj.addWrapper ){
                                if(addr.Type == 'Billing'){
                                    c.OtherCity = addr.City;
                                    c.OtherState = addr.State;
                                    c.OtherStreet = addr.Street+','+addr.Landmark;                                    
                                }
                                else if(addr.type == 'Shipping'){
                                    c.MailingCity = addr.City;
                                    c.MailingState= addr.State;
                                    c.MailingStreet= addr.Street+','+addr.Landmark;
                                }
                            }
                        }                        
                       recordsToInsert.add(c);
                    }                   
            	}             
                if(!recordsToInsert.isEmpty()){
                    system.debug('recordsToInsert:: '+recordsToInsert);
                    update recordsToInsert;
                }
            }                
        }
        catch(Exception e){
            System.debug('Exception '+e);
        }              
    }
    //Wrapper Class for contact
    public class contactWrapperClass{
        public String FirstName;
        public String LastName;
        public Date Birthdate;
        public String Email;
        public String Department;
        public String Description;
        public String HomePhone;
        public String MobilePhone;
        public String phone;
        public String UniqueText;
        public list<addressWrapperClass> addWrapper;        
    }
    //Wrapper Class for Address related to Contact record
    public class addressWrapperClass{
        public String Type;
        public String State;
        public String City;
        public String Street;
        public String Landmark;
    }
}