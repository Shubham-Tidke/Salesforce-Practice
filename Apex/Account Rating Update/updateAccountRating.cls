public class updateAccountRating {
    public static void setAccountRating(){
        List<Account>acc = [SELECT Id,Name,AnnualRevenue from Account WHERE AnnualRevenue > 0];
        if(!acc.isEmpty()){
            for(Account a :acc){
                if(a.AnnualRevenue <= 500000){
                        a.Rating = 'Cold';
                }else if(a.AnnualRevenue <= 100000){
                    a.Rating = 'Warm';
                }
                else{
                    a.Rating = 'Hot';
                }
            }
            try{
                Database.SaveResult[] result = Database.update(acc,FALSE);
                for(Database.SaveResult res: result){
                    if(res.isSuccess()){
                        System.debug('Record updated : ' + res.getId());
                    }
                    else {
                        for(Database.Error err : res.getErrors()){
                            System.debug('ERROR WHILE UPDATING: '+err);
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