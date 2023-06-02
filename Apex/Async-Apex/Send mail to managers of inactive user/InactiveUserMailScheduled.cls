global class InactiveUserMailScheduled implements Schedulable {
    global void execute(SchedulableContext sc){
        SendMailToManager obj = new SendMailToManager();
		Id batchId = Database.executeBatch(obj);
    }

}