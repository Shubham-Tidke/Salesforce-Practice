
public with sharing class automationHandler {

    @AuraEnabled(cacheable=true)
    public static Map<String,List<triggerWrapper>> fetchAllTriggers(){

        List<ApexTrigger> allTriggers = [SELECT Id, Name,status, TableEnumOrId FROM ApexTrigger ORDER BY TableEnumOrId];
        Map<String,List<triggerWrapper>> triggerMap =  new Map<String,List<triggerWrapper>>();
        for(ApexTrigger t : allTriggers){
            triggerWrapper tgr = new triggerWrapper();
            tgr.apx = t;
            
            if(t.status == 'Active'){
                tgr.activeStatus = true;
            }
            else{
                tgr.activeStatus = false;
            }            
            if(triggerMap.containsKey(t.TableEnumOrId)){
               
                triggerMap.get(t.TableEnumOrId).add(tgr);

            }else{
                List<triggerWrapper> secList = new List<triggerWrapper>();
                secList.add(tgr);
                triggerMap.put(t.TableEnumOrId, secList);
            }
        }
        return triggerMap;
    } 
    public class triggerWrapper{
        @AuraEnabled
        public ApexTrigger apx;
        @AuraEnabled
        public Boolean activeStatus;
        
    } 
    @AuraEnabled(cacheable=true)
    public static List<Trigger_Settings__mdt> fetchMdtRecords() {
        return [SELECT Label,MasterLabel,bypass_trigger__c,Trigger_name__c FROM Trigger_Settings__mdt];

    }  
    // @AuraEnabled(cacheable=true)
    // public static Map<String,List<FlowDefinitionView>> fetchAllFlows(){
    //     SELECT Id, Label, ProcessType FROM FlowDefinitionView
    // }
}
