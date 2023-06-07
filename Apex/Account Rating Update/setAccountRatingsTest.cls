@IsTest
private class setAccountRatingsTest {
    @IsTest
    static void testSetAccountRating_ColdRating() {
        // Create a test Account with AnnualRevenue below 100,000
        Account testAccount = new Account(AnnualRevenue = 50000);
        
        // Call the method under test
        setAccountRatings.setAccountRating(testAccount);
        
        // Verify the rating is set to 'Cold'
        System.assertEquals('Cold', testAccount.Rating);
    }
    
    @IsTest
    static void testSetAccountRating_WarmRating() {
        // Create a test Account with AnnualRevenue between 100,000 and 500,000
        Account testAccount = new Account(AnnualRevenue = 200000);
        
        // Call the method under test
        setAccountRatings.setAccountRating(testAccount);
        
        // Verify the rating is set to 'Warm'
        System.assertEquals('Warm', testAccount.Rating);
    }
    
    @IsTest
    static void testSetAccountRating_HotRating() {
        // Create a test Account with AnnualRevenue above 500,000
        Account testAccount = new Account(AnnualRevenue = 800000);
        
        // Call the method under test
        setAccountRatings.setAccountRating(testAccount);
        
        // Verify the rating is set to 'Hot'
        System.assertEquals('Hot', testAccount.Rating);
    }
}
