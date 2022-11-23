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
                System.debug(errMessage);
            }
        }catch(System.Exception e){
            if(String.valueOf(e.getMessage()).startsWith('Unauthorized')){
                errMessage = 'Unexpected error, Status: '+response.getStatus()+' Status Code: '+response.getStatusCode();
            }
            System.debug(e);
        }
    }
    public static void createTicket(){
        
    }
}