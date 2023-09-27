public class AccountTriggerHandler {
    public static void beforeAccInsert(List<Account> accList){
        for(Account acc : accList){
            acc.Rating = 'Warm';
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
}