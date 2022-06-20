public with sharing class escalateIfMeetsCriteria {
    public void escalate(Case c) {
        //code here
        if(c.Type == 'Mechanical' || c.Type == 'Electrical'){
            if(c.Reason == 'Breakdown' && c.Status == 'In Progress'){
                c.IsEscalated = true;
            }                
        }
    }
}