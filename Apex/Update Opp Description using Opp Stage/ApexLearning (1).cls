public class ApexLearning {
    public static void OppThisWeek(){
        List<Opportunity>oppList = [Select Id,name,createdDate,StageName from Opportunity where createdDate = THIS_WEEK];        
        if(!oppList.isEmpty()){
            for(Opportunity opp:oppList){
                if(opp.StageName == 'Staging'){
                    opp.Description='Opportunity is Staging';                      
                }
                if(opp.StageName == 'Closed Lost'){
                    opp.Description='Opportunity is Closed Lost';                      
                }                
            }
        }
        if(!oppList.isEmpty()){
            Database.SaveResult[] result = Database.update(oppList);
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