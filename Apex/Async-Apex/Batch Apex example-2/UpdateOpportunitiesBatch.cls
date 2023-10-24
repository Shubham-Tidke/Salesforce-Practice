global class UpdateOpportunitiesBatch implements Database.Batchable<sObject>{

    public Database.QueryLocator start(Database.BatchableContext bc){
        return Database.getQueryLocator([SELECT Id,Name,Amount FROM Opportunity WHERE Amount = null]);
    }
    public void execute(Database.BatchableContext bc,List<Opportunity> oppList){
        for(Opportunity opp : oppList){
            opp.Amount = 1000;
        }
        try{
            Database.SaveResult[] result = Database.update(oppList);
            for(Database.SaveResult res : result){
                if(!res.isSuccess()){
                    for(Database.Error err : res.getErrors()){
                        system.debug('Error updating record : '+err);
                    }
                }
            }
        }
        Catch(Exception e){
            System.debug('Exception '+e);
        }
    }
    public void finish(Database.BatchableContext bc){
        AsyncApexJob[] jobs = [SELECT Id,NumberOfErrors FROM AsyncApexJob WHERE Id = :bc.getJobId()];
        if(jobs[0].NumberOfErrors > 0){
            System.debug('Errors occured in batch '+jobs[0]);
        }
        else{
            System.debug('All jobs are successful!');
        }
    }
}