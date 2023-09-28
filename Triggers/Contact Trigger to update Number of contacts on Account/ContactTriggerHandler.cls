public class ContactTriggerHandler {
    public static void beforeContactDelete(List<Contact>conList , Map<Id,Contact>conMap){
        for(Contact con : conList){
            if(conMap.get(con.Id).Level__c == 'Primary'){
                con.addError('Record cannot be deleted');
            }
        }
    }
    public static void afterContactDelete(List<Contact>conList){
        Set<Id>accIds = new Set<Id>();
        for(Contact con : conList){
            if(con.AccountId != null){
                accIds.add(con.AccountId);
            }
        }
        List<Account>accList = [SELECT Id,No_of_Contacts__c,(SELECT Id FROM Contacts) FROM Account WHERE Id IN :accIds];
        if(!accList.isEmpty()){
            for(Account acc : accList){
                acc.No_of_Contacts__c = acc.Contacts.size();
            }
        }
        try{
            Database.SaveResult[] result = Database.update(accList, TRUE);
            for(Database.SaveResult res : result){
                if(res.isSuccess()){
                    system.debug('Contacts updated for : '+res.getId());
                }
                else{
                    for(Database.Error err : res.getErrors()){
                        System.debug('Error : '+err);
                    }
                }
            }
        }Catch(Exception e){
            system.debug(e);
        }
    }
}