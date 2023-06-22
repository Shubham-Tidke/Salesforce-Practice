public with sharing class SearchAccountController {
    @AuraEnabled(cacheable=true)
    public static List<Account> getSearchedAccounts(String Region,String Country,String State){
        try{
            return [SELECT id,name,Region_Picklist__c,Country_Picklist__c,State_Picklist__c FROM Account  WHERE Region_Picklist__c= :Region OR Country_Picklist__c = :Country OR State_Picklist__c = :State];
        }catch (Exception e){
            throw new AuraHandledException(e.getMessage());
        }
    }
}