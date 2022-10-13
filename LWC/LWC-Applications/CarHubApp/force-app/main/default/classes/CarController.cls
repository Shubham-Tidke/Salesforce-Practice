public with sharing class CarController {
//wrapper class
public class Filters{
    @AuraEnabled
    public String searchKey{get;set;}
    @AuraEnabled
    public Decimal maxPrice{get;set;}
    @AuraEnabled
    public String[] categories{get;set;}
    @AuraEnabled
    public String[] makeType{get;set;}

}

    @AuraEnabled(cacheable=true)
    public static List<Car__c> getCars(Filters filters){
        String key,whereClaus = '';
        Decimal maxPrice;
        String[] categories, makeType, criteria = new List<String>{};
        
        if(filters!=null){
            maxPrice = filters.maxPrice;
            categories = filters.categories;
            makeType = filters.makeType;
            if(!String.isEmpty(filters.searchKey)){
                key = '%'+filters.searchKey+'%';
                criteria.add('Name LIKE: key');
            }
            if(filters.maxPrice >= 0){
                criteria.add('MSRP__c <= :maxPrice');
            }
            if(filters.categories!=null){
                criteria.add('Category__c IN :categories');
            }
            if(filters.makeType!=null){
                criteria.add('Make__c IN :makeType');
            }
            if(criteria.size() > 0){
                whereClaus = 'WHERE ' +String.join(criteria, ' AND ');
            }
        }
        String query = 'SELECT Id,Name,	MSRP__c,Picture_URL__c,Description__c,Category__c  FROM Car__c '+ whereClaus +' WITH SECURITY_ENFORCED ORDER BY Name';
        return Database.query(query);
    }
    @AuraEnabled(cacheable=true)
    public static Car__c[] getSimilarCars(Id carId,String[]makeType){
        return [SELECT Id,Name,	MSRP__c,Picture_URL__c,Description__c,Category__c  FROM Car__c WHERE Make__c IN :makeType AND Id != :carId];
    }
}
