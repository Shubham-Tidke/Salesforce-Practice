public with sharing class setAccountRatings {
    public static void setAccountRating(Account a) {
        //code here
        if(a.AnnualRevenue <= 100000){
            a.Rating = 'Cold';
        }else if(a.AnnualRevenue <= 500000){
             a.Rating = 'Warm';
        }
        else{
             a.Rating = 'Hot';
        }
    }
}