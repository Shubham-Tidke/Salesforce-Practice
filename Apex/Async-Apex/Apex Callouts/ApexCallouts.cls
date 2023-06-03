public class ApexCallouts {
    public static String endpoint = 'https://gorest.co.in/public/v2/users';
    public static String token = 'Bearer 204ca301473176c2de9fc2e072dae328cf919e5466bfeb0869f53169b26193dc';
    public static string userId;
    public static void getUserData(){        
        HttpRequest req = new HttpRequest();
        req.setEndpoint(endpoint);
        req.setMethod('GET');
        req.setHeader('Accept', 'application/json');
        req.setHeader('Content-Type', 'application/json');
        req.setHeader('Authorization',token);
        Http http = new Http();
        try{
            HttpResponse res = http.send(req);
            if(res.getStatusCode()==200){
                System.debug('GET RESPONSE :: '+res.getBody());
            }
            else{               
                System.debug('Unexpected Error, Status: '+res.getStatus()+' Status code: '+res.getStatusCode()+' BODY: '+res.getBody());
            }
        }
        catch(System.Exception e){            
            System.debug('Exception:: '+e);
        }
    }
    public static void createUser(){
        String body = '{"name": "ShubhamTalwar2","email": "Shubham@wehner.test","gender": "male","status": "active"}';
        HttpRequest req = new HttpRequest();
        req.setEndpoint(endpoint);
        req.setMethod('POST');
        req.setHeader('Accept', 'application/json');
        req.setHeader('Content-Type', 'application/json');
        req.setHeader('Authorization',token);
        req.setBody(body);
        Http http = new Http();        
        try{
           HttpResponse res = http.send(req);
           if(res.getStatusCode()==201){
                System.debug('POST RESPONSE :: '+res.getBody());
            }
            else{               
                System.debug('Unexpected Error, Status: '+res.getStatus()+' Status code: '+res.getStatusCode()+' BODY: '+res.getBody());
            }
        }
        catch(Exception e){
            System.debug('Exception ::'+e);
        }                    
    }
    public static void updateUser(){
        String body = '{"name": "ShubhamTalwar1232"}';
        HttpRequest req = new HttpRequest();
        req.setEndpoint(endpoint+'/2427726');
        req.setMethod('PATCH');
        req.setHeader('Accept', 'application/json');
        req.setHeader('Content-Type', 'application/json');
        req.setHeader('Authorization',token);
        req.setBody(body);
        Http http = new Http();        
        try{
           HttpResponse res = http.send(req);
           if(res.getStatusCode()==200){
                System.debug('PATCH RESPONSE :: '+res.getBody());
            }
            else{               
                System.debug('Unexpected Error, Status: '+res.getStatus()+' Status code: '+res.getStatusCode()+' BODY: '+res.getBody());
            }
        }
        catch(Exception e){
            System.debug('Exception ::'+e);
        }        
    }
}