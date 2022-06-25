@isTest
public class testMakeKeyAccount  {
	@isTest
    public static void testKeyAccount(){
         Account a1 = new Account(Name = 'name1', Industry = 'Banking',AnnualRevenue = 600000);    
         Account a2 = new Account(Name = 'name2', Industry = 'Technology',AnnualRevenue = 800000);    
         Account a3 = new Account(Name = 'name3', Industry = 'Retail',AnnualRevenue = 2000000);    
         Account a4 = new Account(Name = 'name4',AnnualRevenue = 500000);    
         Account a5 = new Account(Name = 'name5', Industry = 'Banking',AnnualRevenue = 70000);    
        insert a1;insert a2;insert a3;insert a4;insert a5;       
        System.assertEquals(MakeKeyAccount.isKeyAccount(a1),true);
        System.assertEquals(MakeKeyAccount.isKeyAccount(a2),true);
        System.assertEquals(MakeKeyAccount.isKeyAccount(a3),true);
        System.assertEquals(MakeKeyAccount.isKeyAccount(a4),true);
        System.assertEquals(MakeKeyAccount.isKeyAccount(a5),false);
    }
}