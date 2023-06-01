public class OppProcesser implements Database.Batchable<sObject>,Database.stateful {
	public integer recordCount = 0;
    public Database.QueryLocator start(Database.BatchableContext bc){
        return Database.getQueryLocator([SELECT Id,Name from Opportunity]);
    }
    public void execute(Database.BatchableContext bc,List<Opportunity>opps){
        for(Opportunity op:opps){
            op.Amount = 12345;
        }
        update opps;
        recordCount = recordCount + opps.size();
    }
    public void finish(Database.BatchableContext bc){
        system.debug('Total Records :: '+recordCount);
    }
}