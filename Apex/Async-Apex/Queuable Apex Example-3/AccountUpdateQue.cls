public class AccountUpdateQue implements Queueable,Database.AllowsCallouts {
    public void execute(QueueableContext qc){
        String endpoint = 'https://api.publicapis.org/random';
        HttpRequest req = new HttpRequest();
        req.setHeader('Content-Type', 'application/json');
        req.setEndpoint(endpoint);
        req.setMethod('GET');  
        Http http = new Http();
        HttpResponse resp = new HttpResponse();
        if (!Test.isRunningTest()){
            resp = http.send(req);
            String response = resp.getBody();
            System.debug('API RESPONSE IN QUEUE : '+response);
        }
        List<Account> accList = [SELECT Id,Name,AnnualRevenue FROM Account WHERE AnnualRevenue = 0 ];
        if(!accList.isEmpty()){
            for(Account acc : accList){
                acc.AnnualRevenue = 10;
            }
        }
        try{
            Database.saveResult[] result = Database.update(accList,FALSE);
            for(Database.saveResult res : result){
                if(!res.isSuccess()){
                    for(Database.Error e : res.getErrors()){
                        system.debug('Error : '+e);
                    }
                }
            }
        }
        Catch(Exception e){
            System.debug('Exception : '+e);
        }
    }
}