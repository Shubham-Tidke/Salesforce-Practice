public class InsertContactToAccounts implements Queueable {
    public void execute(QueueableContext qc){
        List<Account>accList = [SELECT Id,Industry from Account WHERE Industry = 'Media' ];
        List<Contact>conList = new List<Contact>();
        Contact c = new Contact();
        c.FirstName = 'IndustryMedia';
        c.LastName = 'Contact';
        insert c;
        for(Account acc:accList){
            Contact con = c.clone(false,false,false,false);
            con.AccountId  = acc.Id;
            conList.add(con);
        }
        if(!conList.isEmpty()){
            insert conList;
        }
    }

}