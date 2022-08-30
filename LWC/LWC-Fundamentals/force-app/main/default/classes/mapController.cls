public with sharing class mapController {
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccounts(){
       return [SELECT Id,Name,BillingStreet,BillingCountry,BillingState,BillingCity,BillingPostalCode FROM Account ORDER BY Name LIMIT 10];
    }
}
