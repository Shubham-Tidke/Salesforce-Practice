public class UpdateContactMailingAddress implements Database.Batchable<sobject> {
    public Database.QueryLocator start(Database.BatchableContext bc){
        	return database.getQueryLocator([Select Id,BillingStreet,BillingState,BillingCity,BillingPostalCode,
                                            (Select Id,MailingStreet,MailingCity,MailingState,MailingPostalCode From Contacts)
                                             From Account]);
    }
    public void execute(Database.BatchableContext bc,List<Account>accList){
        List<Contact>conList = new List<Contact>();
        for(Account acc:accList){
            for(Contact con:acc.Contacts){
                con.MailingCity = acc.BillingCity;
                con.MailingStreet = acc.BillingStreet;
                con.MailingPostalCode = acc.BillingPostalcode;
                con.MailingState = acc.BillingState;
                conList.add(con);
            }
        }
        update conList;
    }
    public void finish(Database.BatchableContext bc){}
}