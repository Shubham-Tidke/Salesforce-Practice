@RestResource(urlMapping='/v1/contact/*')
global class customContactRestResource {  
    @httpGet
    global static list<contactWrapperClass> getContacts(){        
        List<contact> existingContacts = new list<contact>();
        List<contactWrapperClass> existingContactsWrapper = new list<contactWrapperClass>();
        
        //fetching the parameter uniquetext using RestRequest
        RestRequest request = RestContext.request;
        String requestURI = request.requestURI;
        String uniqueTexts = requestURI.subStringAfterLast('/');
        
        //converting the paramter into list of uniquetexts
        List<String>uniqueTextsList = uniqueTexts.split('_');
        //system.debug('StringLISTTTT ::: '+uniqueTextsList);
        
        if(!uniqueTextsList.isEmpty()){
            
            //Query to find the contact in datastore org which has uniquetext same as uniqueTextsList
        	existingContacts = [SELECT Id, Name,FirstName,LastName, Birthdate, Department, Description, Email, HomePhone,MobilePhone, phone,
                                UniqueText__c,MailingStreet, MailingCity, MailingState, MailingPostalCode,OtherStreet, OtherCity,OtherState, OtherPostalCode, 
                                (SELECT Address__r.State__c,Address__r.City__c,Address__r.Street__c,Address__r.Landmark__c,Type__c FROM Address_Junction__r)
                                FROM Contact WHERE UniqueText__c IN :uniqueTextsList];            
            
            //Storing the contact fields address junction fields in contact wrapper by iterating over existingContacts list
            for(Contact c:existingContacts){
                contactWrapperClass contactWrapper = new contactWrapperClass();
                contactWrapper.FirstName = c.FirstName;
                contactWrapper.LastName = c.LastName;
                contactWrapper.Birthdate = c.Birthdate;
                contactWrapper.Department = c.Department;
                contactWrapper.Description = c.Description;
                contactWrapper.HomePhone = c.HomePhone;
                contactWrapper.MobilePhone = c.MobilePhone;
                contactWrapper.phone = c.phone;
                contactWrapper.Email = c.Email;
                contactWrapper.UniqueText = c.UniqueText__c;                
                List<addressWrapperClass>addWrap = new List<addressWrapperClass>();
                for(Address_Junction__c add :c.Address_Junction__r){
                    addressWrapperClass addObj = new addressWrapperClass();
                    addObj.Type = add.Type__c;
                    addObj.State = add.Address__r.State__c;
                    addObj.City = add.Address__r.City__c;
                    addObj.Street = add.Address__r.Street__c;
                    addObj.Landmark = add.Address__r.Landmark__c; 
                    addWrap.add(addObj);
                } 
                contactWrapper.addWrapper =  addWrap;
                existingContactsWrapper.add(contactWrapper);
            }     
        }       
        return existingContactsWrapper; //returns list of contactWrapperClass objects
    }
    
    @HttpPost
    global static void saveContacts(){ 
        list<contact>contactToInsert = new list<contact>();
        RestRequest req = RestContext.request;        
        //system.debug('request Body :: '+req.requestBody.toString());
        
        //Type casting the body received in POST call to list of contacts
        list<contact> newContacts = (list<contact>)json.deserialize(req.requestBody.toString(),list<contact>.class);
        List<String>uniqueList = new List<String>();
        //system.debug('new contacts :: '+newContacts);
        if(!newContacts.isEmpty()){
            for(contact con:newContacts){                
                //creating contact records for the received records
                contact c = new contact();
                c.FirstName = con.FirstName;
                c.LastName = con.LastName;
                c.Birthdate = con.Birthdate;
                c.Department  = con.Department;
                c.Email = con.Email;
                c.Phone = con.Phone;
                c.HomePhone = con.HomePhone;
                c.Description = con.Description;
                c.MailingCity  = con.MailingCity;
                uniqueList.add(con.UniqueText__c);
                contactToInsert.add(c);
            }
            insert contactToInsert;                        
        }               
    }
    
    @httpPatch
    global static void updateContacts(){        
        list<contact>contactToUpdate = new list<contact>();
        Map<String,Contact>conMap = new Map<String,Contact>();
        RestRequest req = RestContext.request;        
        system.debug('request Update Body :: '+req.requestBody.toString());
        contactToUpdate = (list<contact>)json.deserialize(req.requestBody.toString(),list<contact>.class);        
        system.debug('new contacts :: '+contactToUpdate);
        for(contact con: contactToUpdate){
            conMap.put(con.UniqueText__c,con);
        }
        list<contact>existingContacts = [Select Id,Name,FirstName,LastName, Birthdate, Department, Description, Email, HomePhone, MobilePhone, Phone,UniqueText__c from contact where UniqueText__c IN:conMap.keySet()];
        for(Contact c :existingContacts){
            Contact temp = conMap.get(c.UniqueText__c);
            c.FirstName = temp.FirstName;
            c.LastName = temp.LastName;
            c.Birthdate = temp.Birthdate;
            c.Department  = temp.Department;
            c.Email = temp.Email;
            c.Phone = temp.Phone;
            c.HomePhone = temp.HomePhone;
            c.Description = temp.Description;           
        }
        system.debug('EXISTING UPDATED: '+existingContacts);
        update existingContacts;
    }
    
    
    global class contactWrapperClass{
        public String FirstName;
        public String LastName;
        public Date Birthdate;
        public String Department;
        public String Email;
        public String Description;
        public String HomePhone;
        public String MobilePhone;
        public String phone;
        public String UniqueText;
        public list<addressWrapperClass> addWrapper;        
    } 
    public class addressWrapperClass{
        public String Type;
        public String State;
        public String City;
        public String Street;
        public String Landmark;
    }
}