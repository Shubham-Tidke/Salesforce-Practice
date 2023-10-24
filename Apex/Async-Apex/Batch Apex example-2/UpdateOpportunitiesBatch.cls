global class UpdateOpportunitiesBatch implements Database.Batchable<sObject>,Database.stateful,Database.AllowsCallouts{
    public Integer recordCount = 0;
    public Database.QueryLocator start(Database.BatchableContext bc){
        return Database.getQueryLocator([SELECT Id,Name,Amount FROM Opportunity WHERE Amount = 1000]);
    }
    public void execute(Database.BatchableContext bc,List<Opportunity> oppList){
        String endpoint = 'https://api.publicapis.org/entries';
        HttpRequest req = new HttpRequest();
        req.setHeader('Content-Type', 'application/json');
        req.setEndpoint(endpoint);
        req.setMethod('GET');  
        Http http = new Http();
        HttpResponse resp = new HttpResponse();
        if (!Test.isRunningTest()){
            resp = http.send(req);
            String response = resp.getBody();
            System.debug('API RESPONSE : '+response);
        }
        for(Opportunity opp : oppList){
            opp.Amount = 2000;
        }
        recordCount = recordCount + oppList.Size();
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
        System.debug('Total Processed Records : '+recordCount);
        AsyncApexJob[] jobs = [SELECT Id,NumberOfErrors FROM AsyncApexJob WHERE Id = :bc.getJobId()];
        if(jobs[0].NumberOfErrors > 0){
            System.debug('Errors occured in batch '+jobs[0]);
        }
        else{
            System.debug('All jobs are successful!');
        }
    }
}