public class CountCasesByOrigin {
    @future
    public static void getCasesbyOrigin(List<Id>accIds){
        List<Account>accList = [Select Id,name,WebCases__c,PhoneCases__c,EmailCases__c,
                                (Select Id,origin from cases) from Account where Id in:accIds];
        for(Account acc: accList){
            Integer phone=0;
            Integer web = 0;
            Integer email = 0;
            for(Case c : acc.cases){
                if(c.Origin == 'Phone'){
                    phone = phone+1;
                }
                if(c.Origin == 'Email'){
                    web = web+1;
                }
                if(c.Origin == 'Web'){
                    email = email+1;
                }
            }
            acc.PhoneCases__c = phone;
            acc.EmailCases__c = email;
            acc.WebCases__c = web;
        }
        update accList;
    }
}