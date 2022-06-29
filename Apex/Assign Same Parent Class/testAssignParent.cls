@isTest
public class testAssignParent  {
	@isTest
    public static void checkAssignedParent(){
       Account a = new Account(Name = 'acc1');
        insert a;
        Contact c = new Contact(firstName = 'Cname', lastName = 'lname');
        Opportunity op = new Opportunity(Name = 'OppName',StageName = 'Prospecting', CloseDate= Date.newInstance(2026, 7, 21));
        insert c;insert op;   
        assignParent.setParent(a,c,op);
        System.assertEquals(c.AccountId,op.AccountId);
    }
}