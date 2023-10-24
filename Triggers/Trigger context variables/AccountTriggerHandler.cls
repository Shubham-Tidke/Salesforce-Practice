public class AccountTriggerHandler {
    public static void beforeAccInsert(List<Account> accList){
        for(Account acc : accList){
            if(acc.Industry == 'Media'|| acc.Industry == 'Energy')
            acc.Rating = 'Hot';
            else{
                acc.Rating = 'Warm';
            }
        }
    }
    public static void afterAccInsert(List<Account> accList){
        List<Opportunity> opps = new List<Opportunity>();
        for(Account acc : accList){
            Opportunity opp = new Opportunity();
            opp.AccountId = acc.Id;
            opp.Name = acc.Name + ' OPPORTUNITY';
            opp.StageName = 'Qualification';
            opp.CloseDate = date.newInstance(2023, 12, 17);
            //opp.Amount = 12345;
            opps.add(opp);
        }
        if(!opps.isEmpty()){
            try{
                Database.SaveResult[] result = Database.insert(opps, false);
                for(Database.SaveResult res : result){
                    if(res.isSuccess()){
                       // System.debug('OPPORTUNITY CREATED : '+res.getId());
                    }
                    else{
                        for(Database.Error err: res.getErrors()){
                            System.debug('ERROR WHILE INSERTING '+err);

                        }
                    }
                }
            }
            catch(Exception e){
                System.debug(e);
            }
        }
    }
    //future method to avoid MIXED DML ERROR
    @future
    public static void createUser(){
        Profile profId = [select Id from Profile where name='Standard Platform User' limit 1];
        user u = new user();
        u.Username = 'test@samp.com';
        u.Email = 'test@samp.com';
        u.Alias = 'tsamp';
        u.lastName = 'Kiran';
        u.EmailEncodingKey = 'ISO-8859-1';
        u.TimeZoneSidKey = 'America/Los_Angeles';
        u.LocaleSidKey = 'en_US';
        u.LanguageLocaleKey = 'en_US';
        //user.UserRoleId = 'user_role_id_goes_here';
        u.ProfileId = profId.Id;
        u.IsActive = false;  // here we are creating inactive user account
        try
        {
            insert u;  // insert the user record
        }
        catch(Exception e)
        {
            System.debug(e);
        
        }
    }
    @future(callout = true)
    public static void apiCallout(){
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
            System.debug('API RESPONSE : '+response);
        }
    }
    public static void beforeAccUpdate(List<Account>accList , Map<Id,Account>accMap){
        for(Account acc:accList){
            if(acc.Phone != accMap.get(acc.Id).Phone){
                acc.Description = 'Acconut Phone is updated.';
            }
        }
    }
    public static void afterAccUpdate(List<Account>accList , Map<Id,Account>accMap){
        //System.debug('Code Inside');
        Map<Id,Account>accountMap = new Map<Id,Account>();
        List<Opportunity>oppList = new List<Opportunity>();
        List<Contact>conList = new List<Contact>();
        for(Account acc:accList){
            if(acc.Phone != accMap.get(acc.Id).Phone){
                accountMap.put(acc.Id,acc);
            }
        }
        for(Contact con : [SELECT id,AccountId,HomePhone FROM Contact WHERE AccountId IN :accountMap.keySet()]){
            if(accountMap.containsKey(con.AccountId)){
                con.HomePhone =  accountMap.get(con.AccountId).Phone;
                conList.add(con);
            }
        }
        try{
            Database.SaveResult[] result = Database.update(conList);
            for(Database.SaveResult res : result){
                if(res.isSuccess()){
                    System.debug('Contact Updated : '+res.getId());
                }
                else{
                    for(Database.Error err : res.getErrors()){
                        System.debug('ERROR UPDATING CONTACT :'+err);
                    }
                }
            }
        }
        catch(Exception e){
            system.debug('EXCEPTION '+e);
        }
        oppList = [SELECT Id,Description,AccountId FROM opportunity WHERE AccountId IN :accountMap.keySet()];
        if(!oppList.isEmpty()){
            for(Opportunity opp : oppList){
                opp.Description = accountMap.get(opp.AccountId).Phone;
            }
        }  
        try{
            Database.SaveResult[] result = Database.update(oppList, false);
            for(Database.SaveResult res : result){
                if(res.isSuccess()){
                   // system.debug('RECORD UPDATED : '+res.getId());
                }else{
                    for(Database.Error err : res.getErrors()){
                        //system.debug('ERROR UPDATING RECORD : '+err);
                    }
                }
            }
        }
        Catch(Exception e){
                system.debug(e);
        }
    }
}