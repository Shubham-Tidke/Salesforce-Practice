public class OpportunityStageUpdateJob implements Schedulable {
    public void execute(SchedulableContext sc){
        List<Opportunity>oppList = [SELECT id,StageName,Amount FROM Opportunity WHERE Amount = 2000 AND StageName = 'Prospecting'];
        if(!oppList.isEmpty()){
            for(Opportunity opp:oppList){
                opp.StageName = 'Qualification';
            }
        }
        try{
            Database.SaveResult[] result = Database.update(oppList,FALSE);
            for(Database.SaveResult res : result){
                if(!res.isSuccess()){
                    for(Database.Error err : res.getErrors()){
                        System.debug('Error while Updating : '+err);
                    }
                }
            }
        }
        Catch(Exception e){
            System.debug('Exception '+e);
        }
    }
}
//String CRON = '0 19 21 25 10 ?';
//String jobId = System.schedule('Scheduled Apex',CRON,new OpportunityStageUpdateJob());
