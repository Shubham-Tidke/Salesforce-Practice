public with sharing class CarController {
    @AuraEnabled(cacheable=true)
    public static List<Car__c> getCars(){
        return [SELECT Id,Name,	MSRP__c,Picture_URL__c,Description__c,Category__c  FROM Car__c];
    }
}
