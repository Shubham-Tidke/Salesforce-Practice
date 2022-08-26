public with sharing class AccountController {
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccountList(){
        return [SELECT Id,Name,Type FROM Account LIMIT 5];
    }
    //apex method with parameter
    @AuraEnabled(cacheable=true)
    public static List<Account> filterAccounts(String type){
        return [SELECT Id,Name,Type FROM Account WHERE Type =:type LIMIT 5];
    }
    //imperative apex method with parameter
    @AuraEnabled(cacheable=true)
    public static List<Account> findAccounts(String searchKey){
        String key = '%'+searchKey+'%';
        return [SELECT Id,Name,Type FROM Account WHERE Name LIKE :key LIMIT 5];
    }
}
