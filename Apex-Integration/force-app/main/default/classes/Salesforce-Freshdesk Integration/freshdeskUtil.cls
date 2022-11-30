public class freshdeskUtil {
	public static FINAL STRING CONTACT_ENDPOINT = 'https://myself9744.freshdesk.com/api/v2/contacts';
    public static FINAL STRING TICKET_ENDPOINT = 'https://myself9744.freshdesk.com/api/v2/tickets';
    
    public static void createContact(String name,String email,String phone){
        String errMessage='';
        String endpoint = CONTACT_ENDPOINT;
        String requestBody ='{'+
            				'"name": "'+name+'",'+
            				'"email": "'+email+'",'+
            				'"phone": "'+phone+'"'+
            				'}';
        String creds = System.Label.freshdeskUsername;
        Http http = new Http();
        HttpRequest req = new HttpRequest();
        req.setMethod('POST');
        req.setHeader('Content-Type','application/json');
        req.setBody(requestBody);
        req.setEndpoint(endpoint);
        req.setHeader('Authorization','Basic ' +EncodingUtil.base64Encode(Blob.valueOf(creds)));
        HttpResponse response = new HttpResponse();
        
        try{
            response = http.send(req);
            if(response.getStatusCode() == 201){
                String body = response.getBody();
                System.debug(System.LoggingLevel.DEBUG,' Response '+body);
            }else{
                errMessage = 'Unexpected Error, Status: '+response.getStatus()+' Status code: '+response.getStatusCode();
                System.debug(response.getBody());
            }
        }catch(System.Exception e){
            if(String.valueOf(e.getMessage()).startsWith('Unauthorized')){
                errMessage = 'Unexpected error, Status: '+response.getStatus()+' Status Code: '+response.getStatusCode();
            }
            System.debug(e);
        }
    }
    public static void createTickets(String subject,String description,Integer priority,Integer status,String email){
        String errMessage='';
        String endpoint = TICKET_ENDPOINT;
        String requestBody ='{'+
            				'"subject": "'+subject+'",'+
            				'"description": "'+description+'",'+
            				'"priority": '+priority+','+
            				'"status": '+status+','+
            				'"email": "'+email+'"'+
            				'}';
        String creds = System.Label.freshdeskUsername;
        Http http = new Http();
        HttpRequest req = new HttpRequest();
        req.setMethod('POST');
        req.setHeader('Content-Type','application/json');
        req.setBody(requestBody);
        req.setEndpoint(TICKET_ENDPOINT);
        req.setHeader('Authorization','Basic ' +EncodingUtil.base64Encode(Blob.valueOf(creds)));
        HttpResponse response = new HttpResponse();
        
         try{
            response = http.send(req);
            if(response.getStatusCode() == 201){
                String body = response.getBody();
              //  System.debug(System.LoggingLevel.DEBUG,' Response '+body);
            }else{
                errMessage = 'Unexpected Error, Status: '+response.getStatus()+' Status code: '+response.getStatusCode();
                System.debug(response.getBody());
            }
        }catch(System.Exception e){
             if(String.valueOf(e.getMessage()).startsWith('Unauthorized')){
                errMessage = 'Unexpected error, Status: '+response.getStatus()+' Status Code: '+response.getStatusCode();
            }
            System.debug(e);
        }
    }
    public static void getContacts(){
        String errMessage='';
        String endpoint = CONTACT_ENDPOINT;
        
        String creds = System.Label.freshdeskUsername;
        Http http = new Http();
        HttpRequest req = new HttpRequest();
        req.setMethod('GET');
        req.setHeader('Content-Type','application/json');
        req.setEndpoint(endpoint);
        req.setHeader('Authorization','Basic ' +EncodingUtil.base64Encode(Blob.valueOf(creds)));
        HttpResponse response = new HttpResponse();
        try{
            response = http.send(req);
            if(response.getStatusCode() == 200){
                String body = response.getBody();
                System.debug(System.LoggingLevel.DEBUG,' Response '+body);
                List<Contact>cons = new List<Contact>();
           		List<freshdeskContactWrapper>contacts = (List<freshdeskContactWrapper>)System.JSON.deserialize(body, List<freshdeskContactWrapper>.class);
                System.debug('total contacts'+contacts.size());
                for(freshdeskContactWrapper c:contacts){
                    Contact temp = new Contact();
                    temp.LastName = c.name;
                    temp.Email = c.email;
                    temp.Phone = c.phone;
                    temp.Title = c.job_title;
                    temp.MobilePhone =c.mobile;
                    cons.add(temp);
                }
                insert cons;
            }else{
                errMessage = 'Unexpected Error, Status: '+response.getStatus()+' Status code: '+response.getStatusCode();
                System.debug(response.getBody());
            }
        }catch(System.Exception e){
            if(String.valueOf(e.getMessage()).startsWith('Unauthorized')){
                errMessage = 'Unexpected error, Status: '+response.getStatus()+' Status Code: '+response.getStatusCode();
            }
            System.debug(e);
        }
    }
    public static void getTickets(){
        String errMessage='';
        String endpoint = TICKET_ENDPOINT;
        
        String creds = System.Label.freshdeskUsername;
        Http http = new Http();
        HttpRequest req = new HttpRequest();
        req.setMethod('GET');
        req.setHeader('Content-Type','application/json');
        req.setEndpoint(endpoint);
        req.setHeader('Authorization','Basic ' +EncodingUtil.base64Encode(Blob.valueOf(creds)));
        HttpResponse response = new HttpResponse();
        try{
            response = http.send(req);
             if(response.getStatusCode() == 200){
                String body = response.getBody();
                System.debug(System.LoggingLevel.DEBUG,' Response '+body);
                List<fr_Ticket__c>tickt = new List<fr_Ticket__c>();
           		List<freshdeskTicketWrapper>tickets = (List<freshdeskTicketWrapper>)System.JSON.deserialize(body, List<freshdeskTicketWrapper>.class);
                System.debug('total tickets '+tickets.size());
                for(freshdeskTicketWrapper t:tickets){
                   fr_Ticket__c tkt = new fr_Ticket__c();
                   tkt.Source__c = t.source;
                   tkt.Priority__c = t.priority;
                  // tkt.due_by__c = t.due_by;
                   tkt.id__c = t.id;
                   tkt.description__c = t.subject;
                   tkt.Status__c = t.status;
                   tkt.Type__c = t.type;
                   tickt.add(tkt);
                }
                insert tickt;
            }else{
                errMessage = 'Unexpected Error, Status: '+response.getStatus()+' Status code: '+response.getStatusCode();
                System.debug(response.getBody());
            }
            
        }catch(System.Exception e){       
            if(String.valueOf(e.getMessage()).startsWith('Unauthorized')){
                errMessage = 'Unexpected error, Status: '+response.getStatus()+' Status Code: '+response.getStatusCode();
            }
            System.debug(e);
        }
    }
}