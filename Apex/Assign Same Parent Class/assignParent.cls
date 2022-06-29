public class assignParent {
	public static void setParent(Account acc, Contact con, Opportunity opp) {
    //code here
    if(acc !=null){
        if(acc.Id!=null){
            con.AccountId = acc.Id;
            opp.AccountId = acc.Id;
        }            
    }
    }
}