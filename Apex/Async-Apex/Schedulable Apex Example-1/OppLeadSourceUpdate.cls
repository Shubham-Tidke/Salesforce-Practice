public class OppLeadSourceUpdate implements Schedulable {
    public void execute(SchedulableContext sc){
        list<Opportunity>oppList = [Select id from Opportunity where LeadSource =''];
        if(!oppList.isEmpty()){
            for(Opportunity opp:oppList){
                opp.LeadSource = 'Web';
            }
            try{
                Database.SaveResult[]result = Database.update(oppList);
                for(Database.SaveResult sr:result){
                    if(sr.isSuccess()){
                        system.debug('Schedule Success!!'); 
                    }
                    else{
                        system.debug('Error::'+sr.getErrors());
                    }
                }
            }
            catch(Exception e){
                System.debug('Exception:: '+ e);
            }            
        }        
    }
}