public with sharing class MakeKeyAccount {
    public Boolean isKeyAccount(Account a) {
        //code here
        if(a.Industry == 'Banking' && a.AnnualRevenue == 600000 ||
           a.Industry == 'Technology' && a.AnnualRevenue == 800000 ||
           a.Industry == 'Retail' && a.AnnualRevenue == 2000000 ||
            a.AnnualRevenue == 500000 )
            {return true;}
        return false;
    }
}