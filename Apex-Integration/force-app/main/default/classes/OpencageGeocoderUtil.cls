global with sharing class OpencageGeocoderUtil {

    @AuraEnabled(cacheable=true)
    public static void forwardGeoCoding(){

        String endPoint = System.Label.openCageEndpoint;
        String apiKey = System.Label.openCageAPIKey;
        String errMessage = '';
        String finalEndpoint = endPoint+'key='+apiKey+'&q=sydney&pretty=1';
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        request.setMethod('GET');
        request.setEndpoint(finalEndpoint);
        request.setHeader('Content-Type','application/json');
        HttpResponse response = new HttpResponse();
        try{
            response =  http.send(request);
            if(response.getStatusCode() == 200){
                String body = response.getBody();
                System.debug(body);
            }
            else{
                errMessage = 'ERROR!!! Status code : '+response.getStatusCode()+' Status: '+response.getStatus();
                System.debug(errMessage);
            }
        }
        catch(System.Exception e){
            if(String.valueOf(e.getMessage()).startsWith('Unauthorized endpoint')){
                errMessage = 'Authorize endpoint at remote site setting!';
            }
            else {
                errMessage = 'ERROR!!! Status code : '+response.getStatusCode()+' Status: '+response.getStatus(); 
            }
            System.debug(errMessage);
        }
    }
}
