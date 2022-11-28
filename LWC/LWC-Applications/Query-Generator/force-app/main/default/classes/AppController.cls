public with sharing class AppController {

    @AuraEnabled(cacheable = true)
    public static List<sObject> getAllObjects() {
        List<sObject> objList = [SELECT SobjectType FROM ObjectPermissions GROUP BY SobjectType ORDER BY SobjectType];    
        return objList;
    }
}