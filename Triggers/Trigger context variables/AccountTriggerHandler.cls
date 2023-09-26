public class AccountTriggerHandler {
    public static void beforeAccInsert(List<Account>accList){
        for(Account acc : accList){
            acc.Rating = 'Warm';
        }
    }
    
}