public class updateParentAccount implements Queueable {
    private List<Account>accList;
    private Id parentAccId;
    
    public updateParentAccount(List<Account>accRecs,Id id){
        this.accList = accRecs;
        this.parentAccId = id;
    }
    public void execute(QueueableContext qc){
        if(!accList.isEmpty()){
            for(Account acc:accList){
            	acc.ParentId = parentAccId;
            }
            try{
                Database.SaveResult[]result = Database.update(accList);
                for(Database.SaveResult sr : result){
                    if(!sr.isSuccess()){
                        system.debug('Error saving result:: '+sr.getErrors());
                    }
                }
            }
            catch(Exception e){
                system.debug('Exception:: '+e.getMessage());
            }
        }        
    }
}