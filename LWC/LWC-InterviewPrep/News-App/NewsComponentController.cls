public class NewsComponentController {
    @AuraEnabled
    public static Map<String, Object> getNews(String category){
        newsAPIKey__c keyString = newsAPIKey__c.getOrgDefaults();
        String apiKey = keyString.key__c;
        String endpoint = keyString.endpoint__c;
        HttpRequest request = new HttpRequest();
        if(category!=null){
            endpoint = endpoint+'?country=in&category='+category+'&apiKey='+apiKey;
        }else{
            endpoint = endpoint+'&apiKey='+apiKey;
        }
        request.setEndpoint(endpoint);
        request.setMethod('GET');
        Map<String, Object> newsJsonData = new Map<String, Object>();
        String strResponse = null;
        try{
            Http http = new Http();
            HttpResponse response = http.send(request);
            if(response.getStatusCode() == 200){
                strResponse = response.getBody();
            }
            else{
                throw new CalloutException(response.getBody());
            }
        }Catch(Exception e){
            throw e;
        }
        if(!String.isBlank(strResponse)){
            newsJsonData = (Map<String,Object>)Json.deserializeUntyped(strResponse);
        }
        if(!newsJsonData.isEmpty()){
            return newsJsonData;
        }else
            return null;
    }
}