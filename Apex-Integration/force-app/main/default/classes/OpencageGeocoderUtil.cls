global with sharing class OpencageGeocoderUtil {

    @AuraEnabled(cacheable=true)
    public static void forwardGeoCoding(Id recordId){

        String endPoint = System.Label.openCageEndpoint;
        String apiKey = System.Label.openCageAPIKey;
        String errMessage = '';
        

        Account acc = [SELECT Name,coordinates__Latitude__s,coordinates__Longitude__s ,ShippingCity,ShippingState,ShippingPostalCode,ShippingCountry,ShippingStreet from Account WHERE Id =:recordId];
        String address = acc.ShippingStreet+','+acc.ShippingCity+','+acc.ShippingState+','+acc.ShippingPostalCode+','+acc.ShippingCountry;
        String encodedAddress = EncodingUtil.urlEncode(address, 'UTF-8');
        String finalEndpoint = endPoint+'key='+apiKey+'&q='+encodedAddress+'&pretty=1&limit=1';

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
                openCageData data = (openCageData)System.JSON.deserialize(body,openCageData.class);
                List<openCageData.results> results = data.results;
                openCageData.results result = results.get(0);
				acc.coordinates__Latitude__s= result.geometry.lat;
                acc.coordinates__Longitude__s= result.geometry.lng ;
                update acc;
                System.debug(result);
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
