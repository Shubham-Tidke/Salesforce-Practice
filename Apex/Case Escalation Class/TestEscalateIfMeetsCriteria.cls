@isTest
public class TestEscalateIfMeetsCriteria {
	@isTest
    public static void testContactBirthday(){
       Case c = new Case(Status = 'In Progress',Origin = 'Phone',Type = 'Mechanical',Reason = 'Breakdown');
       insert c;
       escalateIfMeetsCriteria.escalate(c);
       System.assertEquals(c.IsEscalated,true);       
        
    }
}