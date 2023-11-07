public class DatatableLwcController {
    @AuraEnabled(cacheable=true)
    public static List<Account>getAccounts(){
        List<Account> accList = [SELECT Id,Name FROM Account];
        return accList;
    }
}