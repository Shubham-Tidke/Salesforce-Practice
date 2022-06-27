@isTest
public class TestSameParent {
	@isTest
    public static void checkParent(){
        Account a = new Account(Name = 'acc1');
        Contact c = new Contact(firstName = 'Cname', lastName = 'lname', AccountId= a.Id);
        Opportunity op = new Opportunity(Name = 'OppName',AccountId= a.Id,StageName = 'Prospecting', CloseDate= Date.newInstance(2026, 7, 21));
        insert c;insert a;insert op;   
        Boolean parent = sameParent.checkSameParent(c,op);
        System.assertEquals(parent,true);
    }
}