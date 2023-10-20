public class CaseTriggerHandler {
    public static void updateRelatedAccount(List<Case> caseList){
        //Map<Id,Id>accToCaseMap = new Map<Id,Id>();
        //List<Case> cases = [select AccountId,Id  from Case WHERE Id IN :caseList ];
        List<Account>accList = new List<Account>();
        for(Case c : caseList){
            //accToCaseMap.put(c.AccountId,c.Id);
            Account acc = new Account();
            acc.Id = c.AccountId;
            acc.Latest_case__c = c.CaseNumber;
            accList.add(acc);
        }
        try{
            Database.SaveResult[] result = Database.update(accList,false);
            for(Database.SaveResult res : result){
                if(res.isSuccess()){
                    System.debug('Account Updated :'+res.getId());
                }else{
                    for(Database.Error e :res.getErrors()){
                        System.debug('Account Update Error :'+e);
                    }
                }
            }
        }
        catch(Exception e){
            System.debug('EXCEPTION : '+e);
        }
    }
}