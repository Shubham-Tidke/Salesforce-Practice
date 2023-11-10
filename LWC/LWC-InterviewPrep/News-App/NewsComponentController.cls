public class NewsComponentController {
    @AuraEnabled
    public static Map<String, Object> getNews(){
        HttpRequest request = new HttpRequest();
        request.setEndpoint('https://newsapi.org/v2/top-headlines?country=in&category=sports&apiKey=1ba8790e15da4818a4a5d80ad9875c4c');
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