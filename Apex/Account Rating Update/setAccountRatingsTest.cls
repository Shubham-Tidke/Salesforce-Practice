@isTest
public class setAccountRatingsTest {
	@isTest
    public static void testAccountRating(){
        Account a = new Account(First_Name__c = 'TestFName', Last_Name__c = 'TestLName', Name='TestAccount');
        insert a;
        a.AnnualRevenue = 10000;
        setAccountRatings.setAccountRating(a);
        System.assertEquals(a.Rating,'Cold'); 
        a.AnnualRevenue = 300000;
        setAccountRatings.setAccountRating(a);
        System.assertEquals(a.Rating,'Warm');
         a.AnnualRevenue = 600000;
        setAccountRatings.setAccountRating(a);
        System.assertEquals(a.Rating,'Hot');
    }
}