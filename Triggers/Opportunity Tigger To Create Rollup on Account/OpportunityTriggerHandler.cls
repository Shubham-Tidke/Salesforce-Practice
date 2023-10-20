public class OpportunityTriggerHandler {
    public static void updateOppDescription(List<Opportunity>oppList){
        for(Opportunity opp : oppList){
            if(opp.Amount >= 100000 && opp.Amount <= 500000){
                opp.Description = 'Hot Opportunity';
            }
            if(opp.StageName == 'Closed Won'){
                opp.Description = 'Opportunity is Closed Won';
            }else if(opp.StageName == 'Closed Lost'){
                opp.Description = 'Opportunity is Closed Lost';
            }
            
        }
    }
    public static void addRevenueToAccount(List<Opportunity>oppList){
        Set<Id>accIds = new Set<Id>();
        List<Account>accToBeUpdated  = new List<Account>();
        for(Opportunity opp : oppList){
            if(opp.AccountId!=null){
                accIds.add(opp.AccountId);
            }
        }
        accToBeUpdated = updateAccountRevenue(accIds);
        if(!accToBeUpdated.isEmpty()){
            try{
                Database.SaveResult[] result = Database.update(accToBeUpdated, false);
                for(Database.SaveResult res : result){
                    if(res.isSuccess()){
                        System.debug('Account Revenue updated: '+res.getId());
                    }else{
                        for(Database.Error err:res.getErrors()){
                            System.debug('ERROR : '+err);
                        }
                    }
                }
            }
            catch(Exception e){
                System.debug('EXCEPTION! '+e);
            }
        }
    }
    public static void UpdateRevenueToAccount(List<Opportunity>oppList, Map<Id,Opportunity>oppMap){
        Set<Id>accIds = new Set<Id>();
        List<Account>accToBeUpdated  = new List<Account>();
        for(Opportunity opp : oppList){
            if(opp.AccountId!=null && opp.Amount != oppMap.get(opp.Id).Amount){
                accIds.add(opp.AccountId);
            }
        }
        accToBeUpdated = updateAccountRevenue(accIds);
        if(!accToBeUpdated.isEmpty()){
            try{
                Database.SaveResult[] result = Database.update(accToBeUpdated, false);
                for(Database.SaveResult res : result){
                    if(res.isSuccess()){
                        System.debug('Account Revenue updated: '+res.getId());
                    }else{
                        for(Database.Error err:res.getErrors()){
                            System.debug('ERROR : '+err);
                        }
                    }
                }
            }
            catch(Exception e){
                System.debug('EXCEPTION! '+e);
            }
        }
    }
    public static void RemoveRevenueFromAccount(List<Opportunity>oppList){
        Set<Id>accIds = new Set<Id>();
        List<Account>accToBeUpdated  = new List<Account>();
        for(Opportunity opp : oppList){
            if(opp.AccountId!=null ){
                accIds.add(opp.AccountId);
            }
        }
        accToBeUpdated = updateAccountRevenue(accIds);
        if(!accToBeUpdated.isEmpty()){
            try{
                Database.SaveResult[] result = Database.update(accToBeUpdated, false);
                for(Database.SaveResult res : result){
                    if(res.isSuccess()){
                        System.debug('Account Revenue updated: '+res.getId());
                    }else{
                        for(Database.Error err:res.getErrors()){
                            System.debug('ERROR : '+err);
                        }
                    }
                }
            }
            catch(Exception e){
                System.debug('EXCEPTION! '+e);
            }
        }
    }
    public static List<Account> updateAccountRevenue(Set<Id> accIds){
        List<Account>accToBeUpdated  = new List<Account>();
        Map<Id, Decimal> IdToRevenue = new Map<Id, Decimal>();
        for(Opportunity opp : [SELECT Id,Amount,AccountId FROM Opportunity WHERE AccountId IN :accIds]){
            Decimal total  = 0;
            if(IdToRevenue.containsKey(opp.AccountId)){
                total = IdToRevenue.get(opp.AccountId);
            }
            if(opp.Amount != null){
                total = total + opp.Amount;
            }
            IdToRevenue.put(opp.AccountId,total);
        }
        if(!IdToRevenue.isEmpty()){
            for(Id i: IdToRevenue.keySet()){
                Account acc = new Account();
                acc.id = i;
                acc.AnnualRevenue = IdToRevenue.get(i);
                accToBeUpdated.add(acc);
            }
        }
        return accToBeUpdated;
    }
}