public class ApexLearning {
    public static void createOppOnAcc(){
        List<Account>accList = [Select Id,name,createdDate from account where createdDate = LAST_YEAR];
        List<Opportunity>oppList = new List<Opportunity>();
        if(!accList.isEmpty()){
            for(Account acc:accList){
                Opportunity opp = new Opportunity();
                opp.Name = acc.Name;
                opp.StageName = 'Staging';
                opp.CloseDate = System.today();
                opp.AccountId = acc.Id;
                oppList.add(opp);
            }
        }
        if(!oppList.isEmpty()){
            insert oppList;
        }
        
    }
}