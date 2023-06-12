public class ScheduleContactCreation implements Schedulable {
    public void execute(SchedulableContext sc){
        CreateContactsToDataStore obj = new CreateContactsToDataStore();
		Database.executeBatch(obj);
    }
}