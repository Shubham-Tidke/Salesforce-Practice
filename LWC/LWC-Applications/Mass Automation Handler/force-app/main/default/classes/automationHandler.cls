
public with sharing class automationHandler {

    @AuraEnabled(cacheable=true)
    public static Map<String,List<ApexTrigger>> fetchAllTriggers(){
        List<ApexTrigger> allTriggers = [SELECT Id, Name,status, TableEnumOrId FROM ApexTrigger ORDER BY TableEnumOrId];
        Map<String,List<ApexTrigger>> triggerMap =  new Map<String,List<ApexTrigger>>();
        for(ApexTrigger t : allTriggers){
            if(triggerMap.containsKey(t.TableEnumOrId)){
                triggerMap.get(t.TableEnumOrId).add(t);
            }else{
                List<ApexTrigger> secList = new List<ApexTrigger>();
                secList.add(t);
                triggerMap.put(t.TableEnumOrId, secList);
            }
        }
        return triggerMap;
    }    
    // @AuraEnabled(cacheable=true)
    // public static Map<String,List<FlowDefinitionView>> fetchAllFlows(){
    //     SELECT Id, Label, ProcessType FROM FlowDefinitionView
    // }
}

