public class AccountTriggerHandler {
    public static void beforeAccInsert(List<Account> accList){
        for(Account acc : accList){
            if(acc.Industry == 'Media'|| acc.Industry == 'Energy')
            acc.Rating = 'Hot';
            else{
                acc.Rating = 'Warm';
            }
        }
    }
    public static void afterAccInsert(List<Account> accList){
        List<Opportunity> opps = new List<Opportunity>();
        for(Account acc : accList){
            Opportunity opp = new Opportunity();
            opp.AccountId = acc.Id;
            opp.Name = acc.Name + ' OPPORTUNITY';
            opp.StageName = 'Qualification';
            opp.CloseDate = date.newInstance(2023, 12, 17);
            opp.Amount = 12345;
            opps.add(opp);
        }
        if(!opps.isEmpty()){
            try{
                Database.SaveResult[] result = Database.insert(opps, false);
                for(Database.SaveResult res : result){
                    if(res.isSuccess()){
                        System.debug('OPPORTUNITY CREATED : '+res.getId());
                    }
                    else{
                        for(Database.Error err: res.getErrors()){
                            System.debug('ERROR WHILE INSERTING '+err);

                        }
                    }
                }
            }
            catch(Exception e){
                System.debug(e);
            }
        }
    }
    public static void beforeAccUpdate(List<Account>accList , Map<Id,Account>accMap){
        for(Account acc:accList){
            if(acc.Phone != accMap.get(acc.Id).Phone){
                acc.Description = 'Acconut Phone is updated.';
            }
        }
    }
    public static void afterAccUpdate(List<Account>accList , Map<Id,Account>accMap){
        System.debug('Code Inside');
        Map<Id,Account>accountMap = new Map<Id,Account>();
        List<Opportunity>oppList = new List<Opportunity>();
        for(Account acc:accList){
            if(acc.Phone != accMap.get(acc.Id).Phone){
                accountMap.put(acc.Id,acc);
            }
        }
        oppList = [SELECT Id,Description,AccountId FROM opportunity WHERE AccountId IN :accountMap.keySet()];
        if(!oppList.isEmpty()){
            for(Opportunity opp : oppList){
                opp.Description = accountMap.get(opp.AccountId).Phone;
            }
        }  
        try{
            Database.SaveResult[] result = Database.update(oppList, false);
            for(Database.SaveResult res : result){
                if(res.isSuccess()){
                    system.debug('RECORD UPDATED : '+res.getId());
                }else{
                    for(Database.Error err : res.getErrors()){
                        system.debug('ERROR UPDATING RECORD : '+err);
                    }
                }
            }
        }
        Catch(Exception e){
                system.debug(e);
        }
    }
}