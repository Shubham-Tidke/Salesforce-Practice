public class ComponentCommunicationHandler {
    @AuraEnabled
    public static String getResponse(){
        String endpoint = 'https://api.publicapis.org/categories';
        HttpRequest req = new HttpRequest();
        req.setHeader('Content-Type', 'application/json');
        req.setEndpoint(endpoint);
        req.setMethod('GET');  
        Http http = new Http();
        HttpResponse resp = new HttpResponse();
        try{
            resp = http.send(req);
        }
        Catch(Exception e){
            System.debug(e);
        }
        
        System.debug('API RESPONSE : '+resp.getBody());
        return  resp.getBody();            
    }
}