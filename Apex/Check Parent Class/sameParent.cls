public class sameParent {
	public static Boolean checkSameParent(Contact c, Opportunity opp) {
    if(c.AccountId !=null)
    return (c.AccountId == opp.AccountId);
    return false;
}
}