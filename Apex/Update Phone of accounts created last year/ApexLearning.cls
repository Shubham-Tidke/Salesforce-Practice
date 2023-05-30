public class ApexLearning {
    public static void createdAcc(){
        List<Account>accList = [Select Id,name,createdDate from account where createdDate = LAST_YEAR];        
        if(!accList.isEmpty()){
            for(Account acc:accList){
               acc.Phone = '123456789';
            }
        }
        if(!accList.isEmpty()){
            Database.SaveResult[] result = Database.update(accList);
            for(Database.SaveResult sr: result){
                if(sr.isSuccess()){
                    system.debug('SUCCESS :'+ sr.getId());
                }
                else{
                    system.debug('ERROR '+sr.getErrors());
                }
            }            
        }        
    }
}